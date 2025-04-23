// src/data/projects.ts

/**
 * @interface ProjectType
 * Defines the structure for storing project details.
 */
export interface ProjectType {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  githubUrl: string;
  liveUrl?: string | null;
  videoUrl?: string | null;
  tags: string[];
  featured?: boolean; // New property to highlight special projects
  year?: string; // Optional year to show project timeline
}

/**
 * @const projectsData
 * An array containing data for all portfolio projects.
 */
export const projectsData: ProjectType[] = [
  // Project 1: J-Flix Angular Client
  {
    id: 1,
    title: "J-Flix Angular Client",
    description:
      "A responsive movie browsing platform built with Angular. Users can create profiles, browse and search movies, and maintain a favorites list with detailed information and responsive design for all devices.",
    techStack: [
      "Angular",
      "TypeScript",
      "Angular Material",
      "RxJS",
      "LocalStorage",
      "TypeDoc",
    ],
    imageUrl: "/images/angular.jpg",
    githubUrl: "https://github.com/jf8989/jflix-client-2",
    liveUrl: "https://jflix-client-2.vercel.app/",
    videoUrl: null,
    tags: ["Angular", "Frontend", "Client", "TypeScript", "Responsive"],
    featured: true,
    year: "2023",
  },

  // Project 2: j-Flix API
  {
    id: 2,
    title: "J-Flix API",
    description:
      "A robust RESTful API powering the J-Flix platform. Built with Node.js and Express, this API handles user authentication with JWT, manages movie data, and interfaces with MongoDB for persistent storage.",
    techStack: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Passport.js",
      "JWT",
      "JSDoc",
    ],
    imageUrl: "/images/api.jpg",
    githubUrl: "https://github.com/jf8989/j-flix",
    liveUrl: "https://j-flixcom.netlify.app/",
    videoUrl: null,
    tags: ["Node.js", "API", "Backend", "REST", "MongoDB", "Authentication"],
    featured: true,
    year: "2023",
  },

  // Project 3: J-Flix React Client
  {
    id: 3,
    title: "J-Flix React Client",
    description:
      "The original React client for J-Flix with Redux state management. This client offers a seamless movie browsing experience with responsive design, user authentication, and profile management features.",
    techStack: ["React", "Redux", "React Bootstrap", "Parcel", "JavaScript"],
    imageUrl: "/images/jflix-1.jpg",
    githubUrl: "https://github.com/jf8989/j-flix-client",
    liveUrl: "https://j-flixcom.netlify.app/",
    videoUrl: null,
    tags: ["React", "Frontend", "Client", "Redux", "JavaScript"],
    year: "2022",
  },

  // Project 4: Meet App (React PWA)
  {
    id: 4,
    title: "Meet App",
    description:
      "A serverless Progressive Web App built with React that connects to the Google Calendar API. Features include offline capability, test-driven development practices, and interactive data visualizations for event analytics.",
    techStack: [
      "React",
      "PWA",
      "TDD",
      "AWS Lambda",
      "Google Calendar API",
      "OAuth2",
      "Recharts",
    ],
    imageUrl: "/images/meet.jpg",
    githubUrl: "https://github.com/jf8989/meet-app",
    liveUrl: "https://meet-app-kappa.vercel.app/",
    videoUrl: null,
    tags: ["React", "PWA", "Serverless", "TDD", "API Integration", "Data Viz"],
    featured: true,
    year: "2023",
  },

  // Project 5: React Native Chat App
  {
    id: 5,
    title: "React Native Chat App",
    description:
      "A cross-platform mobile chat application built with React Native and Expo. Features include real-time messaging, image and location sharing, and offline access with local storage of messages.",
    techStack: [
      "React Native",
      "Expo",
      "Firebase",
      "Firestore",
      "AsyncStorage",
    ],
    imageUrl: "/images/chat.jpg",
    githubUrl: "https://github.com/jf8989/chat-app",
    liveUrl: null,
    videoUrl: "https://www.youtube.com/watch?v=VQeiYhRNnrI",
    tags: ["React Native", "Mobile", "Firebase", "Real-time", "Cross-platform"],
    year: "2022",
  },

  // Project 6: Pokedex App
  {
    id: 6,
    title: "Pokedex App",
    description:
      "An interactive Pokedex web application that fetches and displays Pokemon data from the PokeAPI. Built with jQuery and Bootstrap, featuring responsive design, pagination controls, and detailed modal views for each Pokemon.",
    techStack: ["JavaScript", "jQuery", "Bootstrap", "HTML", "CSS", "PokeAPI"],
    imageUrl: "/images/pokedex.jpg",
    githubUrl: "https://github.com/jf8989/pokedex-app",
    liveUrl: "https://pokedex-app-seven-gamma.vercel.app/",
    videoUrl: null,
    tags: ["JavaScript", "jQuery", "Frontend", "API Client"],
    year: "2021",
  },
];

// Optional: Add a function to get featured projects
export const getFeaturedProjects = () => {
  return projectsData.filter((project) => project.featured);
};

// Optional: Add a function to get projects by tag
export const getProjectsByTag = (tag: string) => {
  return projectsData.filter((project) =>
    project.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
};
