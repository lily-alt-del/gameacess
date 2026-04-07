'use client';

import { Anton_SC } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "@/Components/NavBar/NavBar";
import { usePathname } from "next/navigation";

const antonSC = Anton_SC({
  weight: "400",
  variable: "--font-anton_sc",
  subsets: ["latin"],
});

const openDyslexic = localFont({
  src: [
    {
      path: "../../public/open_dyslexic/OpenDyslexic-Regular.otf",
      weight: "400",
      style: "normal"
    }
  ],
  variable: "--font-open-dyslexic"
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // rotas que NÃO devem ter navbar
  const hideNavbar = pathname === "/login" || pathname === "/register";

  return (
    <html lang="en">
      <body className={`${antonSC.variable} ${openDyslexic.variable}`}>
        
        {!hideNavbar && <NavBar />}

        {children}
      </body>
    </html>
  );
}