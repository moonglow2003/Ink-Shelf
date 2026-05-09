import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "InkShelf - Comic & Manga Store",
  description: "Curated independent comics, premium graphic novels, and underground manga.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Hanken+Grotesk:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-surface text-on-surface font-body-md text-body-md min-h-screen relative overflow-x-hidden selection:bg-primary selection:text-on-primary">
        {children}
      </body>
    </html>
  );
}
