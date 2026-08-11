import { readFile } from "fs/promises";
import { join } from "path";
import { normalizeTrackingCode } from "@/lib/utils";
import type { Shipment, TrackingStep } from "@/types/tracking";

const ROOT_DIR = process.cwd();
const DATA_FILE = join(ROOT_DIR, "data", "shipments.json");

// ── Constantes de entorno ──
const URBANO_TRACKING_URL = "https://app.urbano.com.pe/gestion/consultaEspecifica/get_scm_api_track_guias/";
const URBANO_STATUS_URL = "https://app.urbano.com.pe/login/index/status_session/";
const URBANO_PUBLIC_TRACKING_URL = process.env.URBANO_PUBLIC_TRACKING_URL ?? "";
const URBANO_PUBLIC_METHOD = (process.env.URBANO_PUBLIC_METHOD ?? "POST").toUpperCase();
const URBANO_PUBLIC_BODY_TYPE = (process.env.URBANO_PUBLIC_BODY_TYPE ?? "json").toLowerCase();
const URBANO_PUBLIC_CODE_PARAM = process.env.URBANO_PUBLIC_CODE_PARAM ?? "guia_barra";
const URBANO_TIMEOUT_MS = Number(process.env.URBANO_TIMEOUT_MS ?? 10000);
const URBANO_SESSION_TTL_MS = Number(process.env.URBANO_SESSION_TTL_MS ?? 20 * 60 * 1000);

// ── Estado de sesión Urbano (singleton en server) ──
let urbanoSessionCookie = "";
let urbanoSessionExpiresAt = 0;
let urbanoLoginPromise: Promise<string> | null = null;

// ── Helpers ──

function cleanText(value: string): string {
  return String(value ?? "")
    .replace(/<br\s*\/?>/gi, " - ")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function fetchWithTimeout(url: string, options: RequestInit = {}): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), URBANO_TIMEOUT_MS);
  return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(timeout));
}

function getSetCookieHeaders(headers: Headers): string[] {
  if (typeof headers.getSetCookie === "function") return headers.getSetCookie();
  const setCookie = headers.get("set-cookie");
  if (!setCookie) return [];
  return setCookie.split(/,(?=[^;,]+?=)/g);
}

function mergeCookies(currentCookie: string, setCookieHeaders: string[]): string {
  const cookieMap = new Map<string, string>();
  String(currentCookie ?? "")
    .split(";")
    .map((p) => p.trim())
    .filter(Boolean)
    .forEach((part) => {
      const [name, ...rest] = part.split("=");
      if (name && rest.length) cookieMap.set(name, rest.join("="));
    });
  setCookieHeaders.forEach((header) => {
    const cookiePair = String(header ?? "").split(";")[0]?.trim();
    const [name, ...rest] = (cookiePair ?? "").split("=");
    if (name && rest.length) cookieMap.set(name, rest.join("="));
  });
  return Array.from(cookieMap.entries()).map(([k, v]) => `${k}=${v}`).join("; ");
}

// ── Configuración ──

function getConfiguredUrbanoCookie(): string {
  if (process.env.URBANO_COOKIE) return process.env.URBANO_COOKIE.trim();
  if (process.env.URBANO_PHPSESSID) return `PHPSESSID=${process.env.URBANO_PHPSESSID.trim()}`;
  return "";
}

function hasUrbanoLoginConfig(): boolean {
  return Boolean(process.env.URBANO_LOGIN_URL && process.env.URBANO_USERNAME && process.env.URBANO_PASSWORD);
}

function hasUrbanoPublicConfig(): boolean {
  return Boolean(URBANO_PUBLIC_TRACKING_URL);
}

function hasAnyUrbanoAccess(): boolean {
  return hasUrbanoPublicConfig() || Boolean(getConfiguredUrbanoCookie()) || hasUrbanoLoginConfig();
}

// ── API Pública Urbano ──

function buildUrbanoPublicRequest(code: string): { url: string; options: RequestInit } {
  const url = new URL(URBANO_PUBLIC_TRACKING_URL);
  const headers: Record<string, string> = {
    Accept: "application/json",
    Origin: "https://www.urbanoexpress.com",
    Referer: `https://www.urbanoexpress.com/tracking?guides=${encodeURIComponent(code.toLowerCase())}`,
    "X-Requested-With": "XMLHttpRequest",
  };

  if (URBANO_PUBLIC_METHOD === "GET") {
    url.searchParams.set(URBANO_PUBLIC_CODE_PARAM, code);
    extraParams(process.env.URBANO_PUBLIC_EXTRA).forEach((v, k) => url.searchParams.set(k, v));
    return { url: url.toString(), options: { method: "GET", headers } };
  }

  if (URBANO_PUBLIC_BODY_TYPE === "json") {
    const body: Record<string, string> = {};
    extraParams(process.env.URBANO_PUBLIC_EXTRA).forEach((v, k) => { body[k] = v; });
    body[URBANO_PUBLIC_CODE_PARAM] = code;
    return { url: url.toString(), options: { method: "POST", headers: { ...headers, "Content-Type": "application/json" }, body: JSON.stringify(body) } };
  }

  const body = extraParams(process.env.URBANO_PUBLIC_EXTRA);
  body.set(URBANO_PUBLIC_CODE_PARAM, code);
  return { url: url.toString(), options: { method: "POST", headers: { ...headers, "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" }, body } };
}

function extraParams(raw?: string): URLSearchParams {
  return new URLSearchParams(raw ?? "flag_seller=0");
}

async function fetchUrbanoPublic(code: string): Promise<Shipment | null> {
  if (!hasUrbanoPublicConfig()) return null;
  try {
    const { url, options } = buildUrbanoPublicRequest(code);
    const response = await fetchWithTimeout(url, options);
    const body = await response.text();
    if (!response.ok || !body || body.trim().startsWith("<")) return null;
    const payload = JSON.parse(body);
    return normalizeUrbanoPayload(payload, code);
  } catch {
    return null;
  }
}

// ── API Autenticada Urbano ──

function buildUrbanoAuthUrl(code: string): string {
  const url = new URL(URBANO_TRACKING_URL);
  url.searchParams.set("_dc", Date.now().toString());
  url.searchParams.set("vp_guia", code);
  url.searchParams.set("vp_vigilancia", "CSpescifica");
  url.searchParams.set("vp_linea", "3");
  url.searchParams.set("page", "1");
  url.searchParams.set("start", "0");
  url.searchParams.set("limit", "25");
  return url.toString();
}

async function isUrbanoSessionActive(cookie: string): Promise<boolean> {
  if (!cookie) return false;
  try {
    const url = new URL(URBANO_STATUS_URL);
    url.searchParams.set("_dc", Date.now().toString());
    const response = await fetchWithTimeout(url.toString(), {
      headers: { Accept: "application/json", Cookie: cookie, Referer: "https://app.urbano.com.pe/inicio", "X-Requested-With": "XMLHttpRequest" },
    });
    if (!response.ok) return false;
    const text = await response.text();
    if (!text || text.trim().startsWith("<")) return false;
    let payload: any;
    try { payload = JSON.parse(text); } catch { return false; }
    if (payload.success === false || payload.logged === false || payload.active === false) return false;
    return true;
  } catch {
    return false;
  }
}

function buildUrbanoLoginBody(): URLSearchParams {
  const body = new URLSearchParams(process.env.URBANO_LOGIN_EXTRA ?? "");
  const usernameField = process.env.URBANO_USERNAME_FIELD ?? "username";
  const passwordField = process.env.URBANO_PASSWORD_FIELD ?? "password";
  body.set(usernameField, process.env.URBANO_USERNAME ?? "");
  body.set(passwordField, process.env.URBANO_PASSWORD ?? "");
  return body;
}

async function loginToUrbano(): Promise<string> {
  if (!hasUrbanoLoginConfig()) return "";

  const response = await fetchWithTimeout(process.env.URBANO_LOGIN_URL!, {
    method: process.env.URBANO_LOGIN_METHOD ?? "POST",
    headers: {
      Accept: "application/json, text/javascript, */*; q=0.01",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      Origin: "https://app.urbano.com.pe",
      Referer: "https://app.urbano.com.pe/login",
      "X-Requested-With": "XMLHttpRequest",
    },
    body: buildUrbanoLoginBody(),
  });

  const responseBody = await response.text();
  const nextCookie = mergeCookies(urbanoSessionCookie, getSetCookieHeaders(response.headers));

  if (!response.ok) throw new Error(`Login Urbano respondió con estado ${response.status}.`);
  if (!nextCookie) throw new Error("Login Urbano no devolvió una cookie de sesión.");

  if (responseBody && !responseBody.trim().startsWith("<")) {
    try {
      const payload = JSON.parse(responseBody);
      if (payload?.success === false) throw new Error(cleanText(payload.message ?? payload.msg ?? "Credenciales rechazadas por Urbano."));
    } catch (e) {
      if (e instanceof Error) throw e;
    }
  }

  urbanoSessionCookie = nextCookie;
  urbanoSessionExpiresAt = Date.now() + URBANO_SESSION_TTL_MS;
  return urbanoSessionCookie;
}

async function ensureUrbanoCookie(forceLogin = false): Promise<string> {
  const configured = getConfiguredUrbanoCookie();
  if (configured) return configured;
  if (!hasUrbanoLoginConfig()) return "";

  if (!forceLogin && urbanoSessionCookie && Date.now() < urbanoSessionExpiresAt) return urbanoSessionCookie;
  if (!forceLogin && urbanoSessionCookie && (await isUrbanoSessionActive(urbanoSessionCookie))) {
    urbanoSessionExpiresAt = Date.now() + URBANO_SESSION_TTL_MS;
    return urbanoSessionCookie;
  }

  if (!urbanoLoginPromise) {
    urbanoLoginPromise = loginToUrbano().finally(() => { urbanoLoginPromise = null; });
  }
  return urbanoLoginPromise;
}

async function requestTrackingWithCookie(code: string, cookie: string): Promise<{ authExpired: boolean; shipment: Shipment | null }> {
  const response = await fetchWithTimeout(buildUrbanoAuthUrl(code), {
    headers: {
      Accept: "application/json",
      Cookie: cookie,
      Referer: "https://app.urbano.com.pe/inicio",
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  const body = await response.text();
  if (response.status === 401 || response.status === 403 || body.trim().startsWith("<")) {
    return { authExpired: true, shipment: null };
  }
  if (!response.ok) throw new Error(`Urbano respondió con estado ${response.status}.`);

  let payload: any;
  try { payload = JSON.parse(body); } catch { return { authExpired: true, shipment: null }; }

  const message = cleanText(payload.message ?? payload.msg ?? payload.msg_error ?? "");
  if (payload?.success === false && /sesion|session|login|ingrese|autentic/i.test(message)) {
    return { authExpired: true, shipment: null };
  }

  const shipment = normalizeUrbanoPayload(payload, code);
  return { authExpired: false, shipment };
}

async function fetchUrbanoAuth(code: string): Promise<Shipment | null> {
  let cookie = await ensureUrbanoCookie();
  if (!cookie) return null;

  let result = await requestTrackingWithCookie(code, cookie);

  if (result.authExpired && !getConfiguredUrbanoCookie() && hasUrbanoLoginConfig()) {
    urbanoSessionCookie = "";
    urbanoSessionExpiresAt = 0;
    cookie = await ensureUrbanoCookie(true);
    result = await requestTrackingWithCookie(code, cookie);
  }

  if (result.authExpired) throw new Error("La sesión de Urbano venció y no se pudo renovar automáticamente.");
  return result.shipment;
}

// ── Normalización ──

function getUrbanoPayloadRow(payload: any): any {
  return payload?.data?.[0] ?? payload?.rs?.[0] ?? null;
}

function isValidUrbanoRow(row: any): boolean {
  if (!row) return false;
  // Urbano devuelve error_sql = -1 cuando la guía no existe
  if (Number(row.error_sql) === -1) return false;
  if (Number(row.sql_error) < 0) return false;
  const hasIdentifier = Boolean(
    row.guia_texto || row.guia || row.gui_numero || row.cod_seguimiento || row.rastreo,
  );
  const hasState = Boolean(row.estado || row.sub_estado || row.fec_estado || row.fecha_estimada);
  const hasMovements = Array.isArray(row.movimientos) && row.movimientos.length > 0;
  return hasIdentifier && (hasState || hasMovements);
}

function normalizeUrbanoPayload(payload: any, code: string): Shipment | null {
  const row = getUrbanoPayloadRow(payload);
  if (!payload?.success || !isValidUrbanoRow(row)) return null;
  return normalizeUrbanoShipment(row, code);
}

function normalizeUrbanoShipment(row: any, requestedCode: string): Shipment {
  const status = cleanText(row.estado ?? row.sub_estado ?? "EN PROCESO");
  const subStatus = cleanText(row.sub_estado ?? row.estado_loginv ?? "");
  const origin = cleanText(row.origen_descri ?? row.origen ?? "");
  const destination = cleanText(row.localidad ?? row.destino_descri ?? row.destino ?? "Destino Urbano");
  const currentDate = cleanText(row.fec_estado ?? row.fecha_ad ?? row.fecha_dd ?? row.fecha_ss ?? row.fec_admision ?? "");
  const estimatedDate = cleanText(row.fecha_estimada ?? row.fecha_dl ?? row.fecha_er ?? "");
  const trackingRef = cleanText(row.rastreo ?? row.guia ?? row.gui_numero ?? "");
  const deliveredText = `${status} ${row.estado_final ?? ""} ${row.fecha_entrega_pedido ?? ""}`.toUpperCase();
  const isDelivered = /ENTREGAD|ENTREGAMOS|ENTREGA A/.test(deliveredText) || Boolean(cleanText(row.fecha_entrega_pedido ?? ""));

  const courier = cleanText(
    row.repartidor ?? row.repartidor_nombre ?? row.nombre_repartidor ?? row.mensajero ?? row.chofer ?? row.encargado_reparto ?? "",
  );
  const courierPhone = cleanText(
    row.repartidor_tel ?? row.repartidor_cel ?? row.repartidor_telefono ?? row.celular_repartidor ?? row.telf_repartidor ?? "",
  );
  const vehicle = cleanText(
    row.unidad ?? row.unidad_vehicular ?? row.vehiculo ?? row.nro_unidad ?? row.placa ?? row.vehiculo_placa ?? "",
  );
  const vehicleType = cleanText(
    row.tipo_vehiculo ?? row.tipo_unidad ?? row.clase_unidad ?? row.vehiculo_tipo ?? "",
  );
  const operator = cleanText(row.operador ?? row.operador_logistico ?? row.empresa ?? "");
  const deliveredTo = cleanText(row.firma ?? row.receptor ?? row.nombre_receptor ?? row.dni_receptor ?? "");
  const recipient = cleanText(row.cliente ?? row.consignado ?? row.destinatario ?? row.nombre_destinatario ?? "");
  const recipientPhone = cleanText(row.telefonos ?? row.telefono ?? row.tel_destinatario ?? row.celular_destinatario ?? "");
  const recipientEmail = cleanText(row.e_mail ?? row.email ?? row.correo ?? row.email_destinatario ?? "");
  const sender = cleanText(row.remite ?? row.remitente ?? row.nombre_remitente ?? "");
  const address = cleanText(row.direccion ?? row.direccion_destinatario ?? row.dir_destino ?? "");

  const obsTitle = cleanText(row.titulo_obs ?? "");
  const obsDetail = cleanText(row.detalle_obs ?? "");
  const isObserved =
    Number(row.flag_obs) === 1 ||
    Boolean(obsTitle) ||
    Boolean(obsDetail) ||
    /VISITADO|NO SE ENTREGO|INTENTAMOS|VISITA N/i.test(`${status} ${subStatus}`);

  const movements: any[] = Array.isArray(row.movimientos) ? [...row.movimientos].reverse() : [];
  const steps: TrackingStep[] = movements.length
    ? movements.map((m: any, i: number) => ({
        title: cleanText(m.detalle),
        description: [cleanText(m.auditoria ?? [m.fecha, m.hora].filter(Boolean).join(" ")), m.agencia ? `Agencia: ${cleanText(m.agencia)}` : "", m.comentario ? cleanText(m.comentario) : ""].filter(Boolean).join(" - "),
        done: true,
        isCurrent: i === movements.length - 1,
      })).filter((s) => s.title).slice(-7)
    : [];

  if (movements.length) {
    if (!isDelivered) {
      steps.push({
        title: isObserved ? "Reprogramación de entrega" : (estimatedDate ? "Entrega estimada" : "Pendiente de entrega"),
        description: isObserved ? (obsDetail || "Se coordinará una nueva visita para la entrega") : (estimatedDate ? `Estimado: ${estimatedDate}` : "Urbano aún no confirma la entrega final"),
        done: false,
      });
    }
  } else {
    steps.push({ title: origin ? `Origen: ${origin}` : "Guía registrada", description: row.fecha_ss ? `Registrado: ${cleanText(row.fecha_ss)}` : "Guía registrada en Urbano", done: true });
    steps.push({ title: "Procesado por Urbano", description: trackingRef ? `Rastreo: ${trackingRef}` : "Paquete en gestión logística", done: true });
    steps.push({ title: status, description: subStatus || "Estado actualizado por Urbano", done: true });
    steps.push({
      title: isDelivered ? "Entregado" : "Entrega estimada",
      description: isDelivered ? cleanText(row.fecha_entrega_pedido ?? currentDate ?? "Entrega confirmada") : (estimatedDate ? `Estimado: ${estimatedDate}` : "Pendiente de confirmación"),
      done: isDelivered,
    });
  }

  return {
    code: cleanText(row.guia_texto ?? requestedCode),
    status,
    summary: subStatus || "Información Urbano",
    updatedAt: currentDate || estimatedDate || "Actualizado por Urbano",
    destination,
    source: "urbano",
    steps,
    courier: courier || undefined,
    courierPhone: courierPhone || undefined,
    vehicle: vehicle || undefined,
    vehicleType: vehicleType || undefined,
    operator: operator || "Urbano Express",
    estimatedDelivery: estimatedDate || undefined,
    deliveredTo: deliveredTo || undefined,
    recipient: recipient || undefined,
    recipientPhone: recipientPhone || undefined,
    recipientEmail: recipientEmail || undefined,
    sender: sender || undefined,
    address: address || undefined,
    obsTitle: obsTitle || undefined,
    obsDetail: obsDetail || undefined,
    isObserved: isObserved || undefined,
  };
}

// ── Fallback local ──

export async function loadLocalShipments(): Promise<Record<string, Shipment>> {
  const raw = await readFile(DATA_FILE, "utf8");
  return JSON.parse(raw);
}

// ── Export principal ──

export async function trackShipment(code: string): Promise<{ ok: boolean; shipment?: Shipment; message?: string }> {
  const normalized = normalizeTrackingCode(code);
  if (!normalized) return { ok: false, message: "Ingresa un código de seguimiento." };

  let urbanoError: Error | null = null;

  // 1. Intentar API pública
  try {
    const publicShipment = await fetchUrbanoPublic(normalized);
    if (publicShipment) return { ok: true, shipment: publicShipment };
  } catch (error) {
    urbanoError = error instanceof Error ? error : new Error(String(error));
  }

  // 2. Intentar API autenticada
  try {
    const authShipment = await fetchUrbanoAuth(normalized);
    if (authShipment) return { ok: true, shipment: authShipment };
  } catch (error) {
    urbanoError = error instanceof Error ? error : new Error(String(error));
  }

  // 3. Fallback a datos locales (solo en modo demo, sin acceso Urbano configurado)
  if (!hasAnyUrbanoAccess()) {
    try {
      const local = await loadLocalShipments();
      const found = local[normalized];
      if (found) return { ok: true, shipment: found };
    } catch {
      // ignorar error de lectura local
    }
  }

  if (!hasAnyUrbanoAccess() && !urbanoError) {
    return { ok: false, message: "El servicio de tracking externo no está configurado. Los datos mostrados son de demostración." };
  }

  return { ok: false, message: `No encontramos el envío "${normalized}". Revisa el código o comunícate con soporte.` };
}
