"use client";

import { usePathname } from "next/navigation";
import NavBar from "@/Components/NavBar/NavBar";
import Footer from "@/Components/Footer";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideNavbar = pathname === "/login" || pathname === "/register" || pathname === "/profile";

  return (
    <>
      {!hideNavbar && <NavBar />}
      <main className="grow">{children}</main>
      <Footer />
    </>
  );
}