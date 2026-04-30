import type { PortfolioData } from "@/lib/types";

export const fallbackData: PortfolioData = {
  profile: {
    name: "Ahmad Alvin Griffin",
    eyebrow: "Jakarta based builder / Computer Vision / Fullstack",
    headline:
      "I build production-ready web systems and AI-powered products with clean architecture, fast APIs, and reliable cloud delivery.",
    summary:
      "Computer Science graduate from Universitas Diponegoro focused on Machine Learning, Computer Vision, Full-Stack Web Development, and cloud deployment.",
    email: "ahmadalvin92@gmail.com",
    github: "https://github.com/ahmadalvin92",
    linkedin: "https://linkedin.com/in/ahmad-alvin-griffin",
    location: "Jakarta, Indonesia",
  },
  experiences: [
    {
      id: "radio-elshinta",
      period: "Dec 2025 - Present",
      role: "Fullstack Web Developer | IT Support Experience",
      company: "PT Radio Elshinta - Jakarta, Indonesia",
      description:
        "Developed an internal IT support ticketing system with React, Node.js, Express, PostgreSQL, Prisma, JWT authentication, and role based workflows.",
      sort_order: 1,
    },
    {
      id: "angkasa-pura",
      period: "Jan 2024 - Feb 2024",
      role: "Software Engineer Intern",
      company: "PT Angkasa Pura II - Tangerang, Indonesia",
      description:
        "Built preventive maintenance and IT device monitoring platforms with Laravel, MySQL, LDAP, PDF exports, digital signatures, and structured reporting.",
      sort_order: 2,
    },
    {
      id: "bangkit",
      period: "Feb 2024 - Jul 2024",
      role: "Cloud Computing Cohort",
      company: "Bangkit Academy 2024 - Remote",
      description:
        "Shipped a cloud ML inference API using Google Cloud Run, Cloud Storage, API Gateway, Docker, monitoring, and collaborative ML/mobile delivery.",
      sort_order: 3,
    },
  ],
  projects: [
    {
      id: "face-gender-detection",
      title: "Real-time Face Gender Detection",
      category: "Computer Vision",
      description:
        "End-to-end CNN system using InceptionV3, MediaPipe, OpenCV, and ONNX Runtime for efficient real-time inference.",
      href: "https://github.com/ahmadalvin92/real-time-face-gender-detection-cnn-inceptionv3",
      tech: ["TensorFlow", "ONNX", "OpenCV", "MediaPipe"],
      featured: true,
      sort_order: 1,
    },
    {
      id: "it-ticket-system",
      title: "IT Support Ticket System",
      category: "Fullstack",
      description:
        "Centralized ticket workflow with dashboards, activity tracking, JWT auth, Admin/User roles, and structured issue resolution.",
      href: "https://github.com/ahmadalvin92/IT-Support-Ticket-System-Radio-Elshinta",
      tech: ["React", "Express", "PostgreSQL"],
      featured: false,
      sort_order: 2,
    },
    {
      id: "radio-elshinta-jobdesk",
      title: "Radio Elshinta Jobdesk",
      category: "Laravel",
      description:
        "Operational web application for internal jobdesk tracking, built to support office workflows and clearer accountability.",
      href: "https://github.com/ahmadalvin92/radio-elshinta-jobdesk",
      tech: ["PHP", "Laravel", "MySQL"],
      featured: false,
      sort_order: 3,
    },
    {
      id: "stunting-api",
      title: "Stunting ML Inference API",
      category: "Cloud API",
      description:
        "Containerized API for ML inference, deployed through the Bangkit capstone workflow with cloud storage and API delivery.",
      href: "https://github.com/ahmadalvin92/API-Stunting-Express-JS",
      tech: ["Node.js", "Docker", "Cloud Run"],
      featured: false,
      sort_order: 4,
    },
  ],
  stack: [
    {
      title: "Frontend",
      description:
        "React.js, HTML, CSS, Tailwind, responsive dashboards, reusable interface patterns.",
    },
    {
      title: "Backend",
      description:
        "Node.js, Express.js, PHP, Laravel, REST APIs, Prisma, authentication, reporting flows.",
    },
    {
      title: "Data & Cloud",
      description:
        "PostgreSQL, MySQL, Google Cloud Run, Cloud Storage, Docker, Firebase, Git workflows.",
    },
    {
      title: "AI & Vision",
      description:
        "Python, TensorFlow, InceptionV3, OpenCV, MediaPipe, ONNX Runtime, real-time inference.",
    },
  ],
};
