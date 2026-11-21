import type { NavId } from "@/data/navigation";

export const es = {
  meta: {
    title: "rodris-dev | Desarrollador Full-Stack",
    description:
      "Portafolio de rodris-dev: desarrollo web full-stack, interfaces inmersivas y arquitectura limpia.",
  },
  a11y: {
    skipLink: "Saltar al contenido",
    mainNav: "Principal",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    stack: "Tecnologías",
    language: "Cambiar idioma",
    themeToDark: "Cambiar a modo oscuro",
themeToLight: "Cambiar a modo claro",

  },
  nav: {
    bio: "Sobre mí",
    services: "Servicios",
    projects: "Proyectos",
    education: "Educación",
    contact: "Contacto",
  } satisfies Record<NavId, string>,
  header: { cta: "Hablemos" },
  hero: {
    status: "SYS.ONLINE // DISPONIBLE PARA PROYECTOS",
    titleStart: "Construyo experiencias web",
    titleHighlight: "del futuro",
    description:
      "Desarrollador Full-Stack: interfaces inmersivas, arquitectura limpia y detalles que se sienten vivos.",
    ctaProjects: "Ver proyectos",
    ctaContact: "Contactarme",
    cardLabel: "gafete interactivo · fase 7",
  },
  sections: {
    placeholder:
      "Contenido de ejemplo para validar el diseño. Lo reemplazaremos en la Fase 5.",
    module: "MÓDULO",
  },
  footer: { status: "SYS.STATUS: OK · Astro + Tailwind + Supabase" },
} as const;

/** Convierte los strings literales en `string` para que otros idiomas puedan tener textos distintos. */
type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly Widen<U>[]
    : { [K in keyof T]: Widen<T[K]> };

export type Dictionary = Widen<typeof es>;
