import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Great_Vibes, Inter } from "next/font/google";
import { getSettings } from "@/lib/data";
import "./globals.css";

const title = Cormorant_Garamond({ variable: "--font-title", subsets: ["latin"], weight: ["500", "600", "700"] });
const body = Inter({ variable: "--font-body", subsets: ["latin"] });
const logo = Great_Vibes({ variable: "--font-logo", subsets: ["latin"], weight: "400" });

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  return {
    title: { default: `${s.nome_negocio} | Agende online`, template: `%s | ${s.nome_negocio}` },
    description: s.slogan || s.hero_subtitulo,
  };
}

export const viewport: Viewport = { themeColor: "#b26b80" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${title.variable} ${body.variable} ${logo.variable}`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
