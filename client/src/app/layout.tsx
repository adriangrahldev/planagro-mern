"use client";

import { Roboto } from "next/font/google";
import "./globals.css";
import { AuthContext } from "@/contexts/AuthContext";
import { useAuth } from "@/hooks/useAuth";

const roboto = Roboto({ subsets: ["latin"], weight: '400' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, login, logout, setUser } = useAuth();

  return (
    <html lang="es">
      <body className={roboto.className}>
      <AuthContext.Provider value={{ user, setUser }}>
          <main className="w-screen h-screen">
            {children}
          </main>
      </AuthContext.Provider>      
      </body>
    </html>
  );
}
