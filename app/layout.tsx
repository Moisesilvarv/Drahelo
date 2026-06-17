import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dra. Heloisa Pavanello | Dermatologia Veterinária",
  description:
    "Dermatologia veterinaria premium para cães e gatos com diagnóstico preciso, tratamento personalizado e acompanhamento especializado."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

