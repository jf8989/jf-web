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
  imageUrl: string; // Placeholder path - update later
  githubUrl: string;
  liveUrl?: string | null;
  videoUrl?: string | null;
  tags: string[];
}

/**
 * @const projectsData
 * An array containing data for all portfolio projects.
 */
export const projectsData: ProjectType[] = [
  // Project 1: J-Flix Angular Client
  {
    id: 1,
    title: "J-Flix Angular Client (J-Flix 2.0)",
    description:
      "Angular frontend for j-Flix. Browse movies, manage profiles, and track favorites with a responsive interface.",
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
  },

  // Project 2: j-Flix API
  {
    id: 2,
    title: "J-Flix API",
    description:
      "Robust Node.js/Express REST API serving movie/series data. Features JWT authentication and MongoDB integration.",
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
    liveUrl: "https://j-flixcom.netlify.app/", // Link to API (might show default message)
    videoUrl: null,
    tags: ["Node.js", "API", "Backend", "REST", "MongoDB", "Authentication"],
  },

  // Project 3: J-Flix React Client
  {
    id: 3,
    title: "J-Flix React Client",
    description:
      "Original React-based client for j-Flix using Redux for state management and React Bootstrap for UI.",
    techStack: ["React", "Redux", "React Bootstrap", "Parcel", "JavaScript"],
    imageUrl: "/images/jflix-1.jpg",
    githubUrl: "https://github.com/jf8989/j-flix-client",
    liveUrl: "https://j-flixcom.netlify.app/",
    videoUrl: null,
    tags: ["React", "Frontend", "Client", "Redux", "JavaScript"],
  },

  // Project 4: Meet App (React PWA)
  {
    id: 4,
    title: "Meet App",
    description:
      "Serverless React PWA using Google Calendar API. Features offline capability, TDD, and data visualization.",
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
  },

  // Project 5: React Native Chat App
  {
    id: 5,
    title: "React Native Chat App",
    description:
      "Mobile chat app (iOS/Android) using React Native & Expo. Features real-time chat, image/location sharing, offline access.",
    techStack: [
      "React Native",
      "Expo",
      "Firebase",
      "Firestore",
      "AsyncStorage",
    ],
    imageUrl: "/images/chat.jpg",
    githubUrl: "https://github.com/jf8989/chat-app",
    liveUrl: null, // No direct live web link for mobile app
    videoUrl: "https://www.youtube.com/watch?v=VQeiYhRNnrI", // Link to YouTube demo
    tags: ["React Native", "Mobile", "Firebase", "Real-time", "Cross-platform"],
  },

  // Project 6: Pokedex App
  {
    id: 6,
    title: "Pokedex App",
    description:
      "Simple Pokedex using jQuery and Bootstrap to display Pokemon data fetched from PokeAPI. Features pagination and modals.",
    techStack: ["JavaScript", "jQuery", "Bootstrap", "HTML", "CSS", "PokeAPI"],
    imageUrl: "/images/pokedex.jpg",
    githubUrl: "https://github.com/jf8989/pokedex-app",
    liveUrl: "https://pokedex-app-seven-gamma.vercel.app/",
    videoUrl: null,
    tags: ["JavaScript", "jQuery", "Frontend", "API Client", "Simpler Project"],
  },
];
