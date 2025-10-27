/// Path: src/data/blog/posts/hello-world.ts
/// Role: Example post file with English and Spanish content in one object.

import type { BlogPostData } from "../types";

export const blogPost: BlogPostData = {
  meta: {
    slug: "hello-world",
    title: {
      en: "Hello World — Why I Am Building",
      es: "Hola Mundo — Por Qué Estoy Construyendo",
    },
    description: {
      en: "Kicking off the blog and setting expectations for what I will share.",
      es: "Arrancando el blog y fijando expectativas sobre lo que voy a compartir.",
    },
    publishedAt: "2025-10-27T00:00:00.000Z",
    tags: ["intro", "process"],
  },
  contentBlocks: [
    {
      type: "heading",
      level: 1,
      text: {
        en: "Welcome",
        es: "Bienvenida",
      },
    },
    {
      type: "paragraph",
      text: {
        en: "This space will hold real build notes, decisions, and the messy parts that make a product honest.",
        es: "Este espacio tendrá notas reales de construcción, decisiones y las partes desordenadas que hacen honesto a un producto.",
      },
    },
    {
      type: "heading",
      level: 2,
      text: {
        en: "What to expect",
        es: "Qué esperar",
      },
    },
    {
      type: "list",
      ordered: false,
      items: [
        {
          en: "Short, practical posts. No fluff.",
          es: "Publicaciones cortas y prácticas. Sin relleno.",
        },
        {
          en: "Architecture and UI choices explained in plain language.",
          es: "Decisiones de arquitectura y UI explicadas en lenguaje simple.",
        },
        {
          en: "Occasional code snippets when they clarify a concept.",
          es: "Fragmentos de código ocasionales cuando aclaran un concepto.",
        },
      ],
    },
    {
      type: "quote",
      text: {
        en: "Progress is made of many small, unglamorous steps.",
        es: "El progreso se hace de muchos pasos pequeños y poco glamorosos.",
      },
      attribution: {
        en: "A promise to myself",
        es: "Una promesa para mí mismo",
      },
    },
    {
      type: "code",
      code: `// New posts live in: src/data/blog/posts/<slug>.ts
// Export a \`blogPost\` that implements BlogPostData
export const blogPost = { /* ... */ }`,
    },
  ],
};

export default blogPost;
