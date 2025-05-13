// src/components/Footer.tsx
import React from "react";
// --- NEW: Import icons from react-icons for consistency and potential replacement ---
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
// --- END NEW ---

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const linkedinUrl = "https://www.linkedin.com/in/jfmarcenaroa/";
  const githubUrl = "https://github.com/jf8989";
  const email = "juanfrajf.contacto@gmail.com";

  return (
    // --- UPDATED: Added top border, subtle gradient ---
    <footer className="bg-gradient-to-t from-gray-900 to-gray-800 dark:from-black/50 dark:to-gray-900/80 text-gray-400 py-10 border-t border-gray-700/50">
      {/* --- END UPDATED --- */}
      <div className="container mx-auto px-4 text-center">
        <div className="mb-6">
          {" "}
          {/* Increased margin slightly */}
          {/* --- UPDATED: Typography --- */}
          <p className="mb-4 text-sm tracking-wide opacity-90">
            Find me on:
          </p>{" "}
          {/* Adjusted size/margin/tracking/opacity */}
          {/* --- END UPDATED --- */}
          {/* --- UPDATED: Icon container and links --- */}
          <div className="flex justify-center items-center space-x-8">
            {" "}
            {/* Increased spacing */}
            {/* LinkedIn Icon Link */}
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="text-gray-400 hover:text-sky-300 transform hover:scale-110 transition-all duration-300" // Added transform/scale
            >
              {/* Using React Icon */}
              <FaLinkedin className="w-7 h-7" /> {/* Increased size */}
            </a>
            {/* GitHub Icon Link */}
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="text-gray-400 hover:text-sky-300 transform hover:scale-110 transition-all duration-300" // Added transform/scale
            >
              {/* Using React Icon */}
              <FaGithub className="w-7 h-7" /> {/* Increased size */}
            </a>
            {/* Email Icon Link */}
            <a
              href={`mailto:${email}`}
              aria-label="Send Email"
              className="text-gray-400 hover:text-sky-300 transform hover:scale-110 transition-all duration-300" // Added transform/scale
            >
              {/* Using React Icon */}
              <FaEnvelope className="w-7 h-7" /> {/* Increased size */}
            </a>
          </div>
          {/* --- END UPDATED --- */}
        </div>
        {/* --- UPDATED: Copyright text --- */}
        <p className="mt-8 text-xs opacity-70 tracking-wide">
          {" "}
          {/* Adjusted size/opacity/margin/tracking */}© {currentYear} Juan
          Francisco Marcenaro A. All rights reserved.
        </p>
        {/* --- END UPDATED --- */}
      </div>
    </footer>
  );
};

export default Footer;
