import type { Blog } from "../../models/blog";

export const mockBlogPosts: Blog[] = [
  {
    id: 1,
    slug: "building-spring-boot-blog-api",
    title: "Building My First Spring Boot Blog API",
    summary:
      "Notes from setting up authentication, JWT, controllers, and clean backend structure.",
    content: "",
    tag: "Spring Boot",
    createdAt: "May 2026",
  },
  {
    id: 2,
    slug: "taking-java-seriously",
    title: "Why I’m Taking Java Seriously",
    summary:
      "A personal reflection on moving deeper into Java, OOP, and enterprise backend development.",
    content: "",
    tag: "Java",
    createdAt: "May 2026",
  },
  {
    id: 3,
    slug: "react-typescript-ui-lessons",
    title: "React + TypeScript UI Lessons",
    summary:
      "Small frontend patterns I’m learning while building cleaner and more professional interfaces.",
    content: "",
    tag: "React",
    createdAt: "May 2026",
  },
];
