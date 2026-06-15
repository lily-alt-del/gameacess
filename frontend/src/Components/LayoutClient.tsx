"use client";

import { usePathname } from "next/navigation";
import NavBar from "@/Components/NavBar/NavBar";
import Footer from "@/Components/Footer";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideNavbar = pathname === "/login" || pathname === "/register" || pathname === "/profile" || pathname === "/profile/edit" || pathname === "/admin" || pathname === "/admin/products" || pathname === "/admin/products/new" || pathname === "/admin/products/[id]" || pathname === "/admin/orders" || pathname === "/admin/orders/[id]";

  return (
    <>
      {!hideNavbar && <NavBar />}
      <main className="grow">{children}</main>
      <Footer />
    </>
  );
}