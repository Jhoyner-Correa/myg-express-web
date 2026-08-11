import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = { title: "Política de privacidad" };

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 pb-20 pt-32 text-slate-700">
      <h1 className="text-4xl font-black text-slate-950">Política de privacidad</h1>
      <p className="mt-3 text-sm text-slate-500">Última actualización: 10 de agosto de 2026</p>
      <div className="mt-10 space-y-7 leading-7">
        <section><h2 className="text-xl font-bold text-slate-900">Información que tratamos</h2><p>Cuando utilizas el formulario de contacto tratamos tu nombre, teléfono, sede elegida y mensaje para responder tu consulta. El rastreo procesa el código de guía para mostrar únicamente información operativa del envío.</p></section>
        <section><h2 className="text-xl font-bold text-slate-900">Finalidad y conservación</h2><p>Usamos estos datos exclusivamente para atender consultas, coordinar servicios y proteger el sitio contra abuso. Los conservamos solo durante el plazo necesario para dichas finalidades y las obligaciones aplicables.</p></section>
        <section><h2 className="text-xl font-bold text-slate-900">Proveedores</h2><p>Podemos utilizar proveedores de infraestructura, correo transaccional, protección antiabuso y rastreo. Solo reciben la información necesaria para prestar su servicio.</p></section>
        <section><h2 className="text-xl font-bold text-slate-900">Tus derechos</h2><p>Puedes solicitar acceso, corrección o eliminación de tus datos escribiendo a <a className="font-bold text-[#0E8F45]" href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p></section>
      </div>
    </article>
  );
}
