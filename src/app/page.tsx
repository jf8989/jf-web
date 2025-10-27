/// Path: src/app/page.tsx
/// Role: Home page mounts HashScrollOffset so navigation from other routes with hashes lands correctly.

import React from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import WorkflowSection from "@/components/WorkflowSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import HashScrollOffset from "@/components/utils/HashScrollOffset";

export default function Home() {
  return (
    <>
      <Header />
      {/* Adjust position when the page is loaded with a hash (from another route). */}
      <HashScrollOffset />
      <main className="mt-0">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <WorkflowSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
