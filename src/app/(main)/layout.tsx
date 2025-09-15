import Navbar from "@/components/Navbar";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden">
      <div className="flex fixed top-0 z-50 w-screen md:overflow-hidden">
        <Navbar />
      </div>
      {children}
    </div>
  );
}
