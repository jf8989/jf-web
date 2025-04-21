// src/components/Header.tsx
import React from "react";

const Header: React.FC = () => {
  // Placeholder navigation items - functionality to be added later
  const navItems = [
    { name: "Home", href: "#home" }, // Assuming sections will have IDs
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="bg-gray-900 text-white fixed top-0 left-0 w-full z-50 shadow-md">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Placeholder for Logo/Brand */}
        <div className="text-xl font-bold">
          <a href="#home">JFMA</a>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="hover:text-sky-300 transition-colors duration-300"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Placeholder for Mobile Menu Button (functionality later) */}
        <div className="md:hidden">
          <button aria-label="Open menu">
            {/* Basic SVG Placeholder */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
