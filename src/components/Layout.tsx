import React from "react";
import Navbar from "./Navbar"; // se você já tiver
import Footer from "./Footer"; // se você já tiver

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 md:px-8 pt-28 pb-12">
        {children}
      </main>
      <Footer />
    </div>
  );
}
