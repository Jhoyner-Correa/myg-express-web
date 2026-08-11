import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = { title: "Términos y condiciones" };

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 pb-20 pt-32 text-slate-700">
      <h1 className="text-4xl font-black text-slate-950">Términos y condiciones</h1>
      <p className="mt-3 text-sm text-slate-500">Última actualización: 10 de agosto de 2026</p>
      <div className="mt-10 space-y-7 leading-7">
        <section><h2 className="text-xl font-bold text-slate-900">Uso del sitio</h2><p>Este sitio ofrece información institucional, canales de contacto y consulta del estado de envíos. No debes intentar acceder a información ajena, automatizar consultas abusivas ni interferir con el servicio.</p></section>
        <section><h2 className="text-xl font-bold text-slate-900">Información de rastreo</h2><p>Los estados y fechas dependen de los operadores logísticos y pueden actualizarse con demora. Para confirmar una entrega o incidencia, comunícate con una sede de {SITE.name}.</p></section>
        <section><h2 className="text-xl font-bold text-slate-900">Contacto</h2><p>Para consultas sobre estos términos escríbenos a <a className="font-bold text-[#0E8F45]" href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p></section>
      </div>
    </article>
  );
}
