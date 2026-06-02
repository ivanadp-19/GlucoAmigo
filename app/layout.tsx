import type { Metadata, Viewport } from "next";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";
import { MobileShell } from "@/components/layout/MobileShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "GlucoAmigo",
  description:
    "App educativa de seguimiento de glucosa. Demo visual sin backend.",
  applicationName: "GlucoAmigo",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#58cc02",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        <MobileShell>{children}</MobileShell>
      </body>
    </html>
  );
}
