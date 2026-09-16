import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ODD 100 · Esportiva Bet",
  description: "Odd 100 liberada por tempo limitado. Clique e pegue seu bilhete.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body>{children}</body>
    </html>
  );
}
