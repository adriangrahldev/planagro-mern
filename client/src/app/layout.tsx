import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { StrictMode } from "react";

const roboto = Roboto({ subsets: ["latin"], weight: '400' });

export const metadata: Metadata = {
  title: "PlanAgro" ,
  description: "Plataforma de planificación agrícola.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={roboto.className}>
        <main className="w-screen h-screen">
          {children}
        </main>
      
      </body>
    </html>
  );
}
