// src/components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 py-8 mt-16">
      <div className="container mx-auto px-4 text-center">
        {/* Placeholder for Social Links */}
        <div className="mb-4">
          <p>Find me on:</p>
          {/* Add actual links later */}
          <a href="#" className="mx-2 hover:text-sky-300">
            LinkedIn
          </a>
          <a href="#" className="mx-2 hover:text-sky-300">
            GitHub
          </a>
          <a href="#" className="mx-2 hover:text-sky-300">
            Email
          </a>
        </div>
        <p>© {currentYear} Juan Francisco Marcenaro A. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
