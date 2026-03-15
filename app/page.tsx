"use client";

import Hero from "@/components/hero/hero";
import Navbar from "@/components/Navbar/navbar";
import TechSection from "@/components/TechSection";

export default function Home() {
  return (
    <div className="bg-[#06051d] font-mono min-h-screen">

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex flex-col items-stretch justify-start">
        {/* Hero Section with animated background */}
        <Hero />
        <TechSection />
      </main>
    </div>
  );
}
