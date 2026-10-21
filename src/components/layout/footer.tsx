import Link from "next/link";
import { SITE, SOCIAL_LINKS } from "@/lib/constants";
import { getIcon } from "@/lib/icons";

const FOOTER_LINKS = {
  Empresa: [
    { href: "/nosotros", label: "Nosotros" },
    { href: "/#servicios", label: "Servicios" },
    { href: "/#sedes", label: "Nuestras Sedes" },
    { href: "/#proceso", label: "Cómo Funciona" },
  ],
  Sedes: [
    { href: "/sedes/la-merced", label: "La Merced" },
    { href: "/sedes/satipo", label: "Satipo" },
    { href: "/sedes/oxapampa", label: "Oxapampa" },
    { href: "/sedes/huancayo", label: "Huancayo" },
  ],
  Ayuda: [
    { href: "/#contacto", label: "Contacto" },
    { href: "/#proceso", label: "Preguntas Frecuentes" },
    { href: "/#sedes", label: "Cobertura" },
  ],
} as const;

function FooterColumn({ title, links }: { title: string; links: readonly { href: string; label: string }[] }) {
  return (
    <div>
      <p className="mb-4 text-sm font-bold text-white">{title}</p>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-white/70 transition-colors hover:text-green"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#1a1a1a] via-[#141414] to-[#0d1f14] px-6 pb-7 pt-14 text-white/80 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.8fr_1fr_1fr_1fr]">
        <div>
          <div className="mb-3 flex items-baseline gap-0">
            <span className="font-display text-3xl text-white">My</span>
            <span className="font-display text-3xl text-green">G</span>
            <span className="ml-1.5 text-sm font-extrabold text-white">
              Express
            </span>
          </div>
          <p className="mb-5 max-w-[250px] text-sm leading-relaxed text-white/70">
            {SITE.tagline}. {SITE.region}.
          </p>
          <div className="flex gap-2.5">
            {SOCIAL_LINKS.map((social) => {
              const Icon = getIcon(social.icon);
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/7 transition-all hover:bg-green hover:-translate-y-0.5"
                >
                  <Icon className="h-3.5 w-3.5 fill-white/70 text-white/70" />
                </a>
              );
            })}
          </div>
        </div>

        {Object.entries(FOOTER_LINKS).map(([title, links]) => (
          <FooterColumn key={title} title={title} links={links} />
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-white/15 pt-6">
        <div className="flex flex-col items-center justify-center gap-3 text-center md:flex-row md:gap-6">
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.
          </p>
          <span className="hidden h-3 w-px bg-white/20 md:block" />
          <div className="flex items-center justify-center gap-x-6 gap-y-2 text-xs text-white/60">
            <Link href="/terminos" className="transition-colors hover:text-white/70">
              Términos y Condiciones
            </Link>
            <Link href="/privacidad" className="transition-colors hover:text-white/70">
              Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
