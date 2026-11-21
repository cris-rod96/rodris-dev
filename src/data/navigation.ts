export const navIds = ["bio", "services", "projects", "education", "contact"] as const;
export type NavId = (typeof navIds)[number];

export const navHref = (id: NavId): `#${NavId}` => `#${id}`;
