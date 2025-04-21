// src/app/page.tsx
import React from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    // Using React Fragment to group elements without adding extra DOM nodes
    <>
      <Header />
      <main className="mt-16">
        {" "}
        {/* Add margin-top to avoid overlap with fixed header */}
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
