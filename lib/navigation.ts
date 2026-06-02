export type NavTabId = "inicio" | "glucosa" | "aprende" | "retos";

export type NavTab = {
  id: NavTabId;
  label: string;
  href: string;
};

export const NAV_TABS: NavTab[] = [
  { id: "inicio", label: "Inicio", href: "/" },
  { id: "glucosa", label: "Glucosa", href: "/glucosa" },
  { id: "aprende", label: "Aprende", href: "/aprende" },
  { id: "retos", label: "Retos", href: "/retos" },
];
