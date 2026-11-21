export interface NavItem {
  id: string;
  label: string;
  href: `#${string}`;
}


export const navItems: readonly NavItem[] = [
    { id: "bio", label: "Sobre mí", href: "#bio" },
  { id: "servicios", label: "Servicios", href: "#servicios" },
  { id: "proyectos", label: "Proyectos", href: "#proyectos" },
  { id: "educacion", label: "Educación", href: "#educacion" },
  { id: "contacto", label: "Contacto", href: "#contacto" },

]
