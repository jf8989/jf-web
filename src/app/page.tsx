// src/app/page.tsx
import React from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import WorkflowSection from "@/components/WorkflowSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
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
