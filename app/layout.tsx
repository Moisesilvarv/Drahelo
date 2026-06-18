import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Dra. Heloisa Pavanello | Dermatologia Veterinária",
    template: "%s | Dra. Heloisa Pavanello"
  },
  description:
    "Dermatologia veterinaria em Moema - SP para cães e gatos com diagnóstico preciso, tratamento personalizado e acompanhamento especializado com a Dra. Heloisa Pavanello.",
  keywords: [
    "Dra. Heloisa Pavanello",
    "dermatologia veterinaria",
    "dermatologia veterinaria Moema",
    "dermatologista veterinaria Moema SP",
    "dermatologista veterinaria",
    "dermatologia para cães",
    "dermatologia para gatos",
    "alergia em cães e gatos",
    "coceira em cachorro",
    "otite recorrente em pets",
    "CRMV-SP 74108"
  ],
  applicationName: "Dra. Heloisa Pavanello",
  authors: [{ name: "Dra. Heloisa Pavanello" }],
  creator: "Dra. Heloisa Pavanello",
  publisher: "Dra. Heloisa Pavanello",
  category: "Veterinary dermatology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  openGraph: {
    title: "Dra. Heloisa Pavanello | Dermatologia Veterinária",
    description:
      "Atendimento em dermatologia veterinaria em Moema - SP para cães e gatos com diagnóstico preciso e tratamento personalizado.",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/dra-heloisa-consultorio.png",
        width: 1200,
        height: 900,
        alt: "Dra. Heloisa Pavanello em consultório veterinário"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Dra. Heloisa Pavanello | Dermatologia Veterinária",
    description:
      "Dermatologia veterinaria em Moema - SP para cães e gatos com diagnóstico preciso e acompanhamento especializado.",
    images: ["/dra-heloisa-consultorio.png"]
  }
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

