// src/components/ContactSection.tsx
import React from "react";
// Optional: Import icons if needed

const ContactSection: React.FC = () => {
  return (
    <section
      id="contact"
      className="py-16 sm:py-20 bg-gray-100 dark:bg-gray-800"
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight">
          Let&apos;s Connect
        </h2>
        <p className="text-lg mb-10 text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
          Interested in collaborating or have a question? Feel free to reach
          out!
        </p>
        {/* Button styles made consistent with Hero button */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <a
            href="https://www.linkedin.com/in/jfmarcenaroa/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-sky-600 text-white text-base sm:text-lg font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transform hover:-translate-y-0.5 transition duration-300 ease-in-out w-full sm:w-auto" // Added width control
          >
            {/* Optional: Icon <FaLinkedin className="mr-2" /> */}
            LinkedIn
          </a>
          <a
            href="https://github.com/jf8989?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-gray-700 text-white text-base sm:text-lg font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transform hover:-translate-y-0.5 transition duration-300 ease-in-out w-full sm:w-auto" // Added width control
          >
            {/* Optional: Icon <FaGithub className="mr-2" /> */}
            GitHub
          </a>
          <a
            href="mailto:juanfrajf.contacto@gmail.com"
            className="inline-flex items-center justify-center bg-gray-500 text-white text-base sm:text-lg font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transform hover:-translate-y-0.5 transition duration-300 ease-in-out w-full sm:w-auto" // Added width control
          >
            {/* Optional: Icon <FaEnvelope className="mr-2" /> */}
            Email Me
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
