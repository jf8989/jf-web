// src/components/ContactSection.tsx
import React from "react";

const ContactSection: React.FC = () => {
  return (
    // Added id="contact" for navigation linking
    <section id="contact" className="py-16 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Let&apos;s Connect
        </h2>
        <p className="text-lg mb-8 text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
          Interested in collaborating or have a question? Feel free to reach
          out!
        </p>
        <div className="flex justify-center space-x-6">
          {/* Placeholder Links - Replace # with actual URLs */}
          <a
            href="#" // Replace with your LinkedIn URL
            target="_blank"
            rel="noopener noreferrer"
            className="bg-sky-600 text-white font-medium py-2 px-6 rounded-md hover:bg-sky-700 transition duration-300"
          >
            LinkedIn
          </a>
          <a
            href="#" // Replace with your GitHub URL
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-700 text-white font-medium py-2 px-6 rounded-md hover:bg-gray-800 transition duration-300"
          >
            GitHub
          </a>
          <a
            href="mailto:your-email@example.com" // Replace with your email
            className="bg-gray-500 text-white font-medium py-2 px-6 rounded-md hover:bg-gray-600 transition duration-300"
          >
            Email Me
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
