import type { PortfolioData } from "@/lib/types";

export const fallbackData: PortfolioData = {
  profile: {
    name: "Ahmad Alvin Griffin",
    eyebrow: "Jakarta, Indonesia • ODP IT @ Bank Mandiri • Fullstack & AI Builder",
    headline:
      "Crafting mission-critical enterprise systems, resilient cloud microservices, and real-time AI solutions with precision.",
    summary:
      "Computer Science graduate from Universitas Diponegoro (GPA 3.57/4.00) and Officer Development Program (ODP) IT at PT Bank Mandiri (Persero) Tbk. Proven experience architecting fullstack platforms at PT Radio Elshinta, enterprise monitoring at PT Angkasa Pura II, and cloud ML serving at Bangkit Academy (Google, GoTo, Traveloka).",
    email: "ahmadalvin92@gmail.com",
    github: "https://github.com/ahmadalvin92",
    linkedin: "https://linkedin.com/in/ahmad-alvin-griffin",
    location: "Jakarta, Indonesia",
  },
  experiences: [
    {
      id: "bank-mandiri",
      period: "Jul 2026 - Present",
      role: "Officer Development Program (ODP) IT",
      company: "PT Bank Mandiri (Persero) Tbk - Jakarta, Indonesia",
      description:
        "Engaging in intensive IT leadership training (Class 348), core banking architecture, and data center surveys for SAN switch additions at DC Wisma Danantara and DC Rempoa. Formulated IT procurement proposals for IBM Power11 & storage migration.",
      sort_order: 1,
    },
    {
      id: "radio-elshinta",
      period: "Dec 2025 - Jun 2026",
      role: "Fullstack Web Developer | IT Support Experience",
      company: "PT Radio Elshinta - Jakarta, Indonesia",
      description:
        "Developed and maintained internal systems: IT Support Ticketing System, Jobdesk Management System, and Real-time Internal Chat using React, Node.js, Spring Boot, MySQL, PostgreSQL, and Prisma with JWT RBAC security.",
      sort_order: 2,
    },
    {
      id: "angkasa-pura",
      period: "Jan 2024 - Feb 2024",
      role: "Software Engineer Intern",
      company: "PT Angkasa Pura II - Tangerang, Indonesia",
      description:
        "Built preventive maintenance web platform and dynamic IT checklist monitoring using Laravel & MySQL, featuring digital signatures, automated DomPDF exports, and LDAP authentication.",
      sort_order: 3,
    },
    {
      id: "bangkit",
      period: "Feb 2024 - Jul 2024",
      role: "Cloud Computing Cohort",
      company: "Bangkit Academy (Google, GoTo, Traveloka) - Remote",
      description:
        "Containerized and deployed machine learning inference APIs using Google Cloud Run, Cloud Storage, Docker, IAM, and automated CI/CD workflows for an end-to-end stunting detection ecosystem.",
      sort_order: 4,
    },
  ],
  projects: [
    {
      id: "alvin-rbac-dashboard",
      title: "Prodana RBAC Dashboard",
      category: "Fullstack & Security",
      description:
        "Production-grade enterprise admin dashboard with JWT authentication, role-based access control (Admin & User), protected routes, and interactive metric analytics.",
      href: "https://github.com/ahmadalvin92/Prodana-RBAC-Dashboard-By-Alvin",
      demoUrl: "https://github.com/ahmadalvin92/Prodana-RBAC-Dashboard-By-Alvin",
      image: "/projects/rbac-dashboard.png",
      role: "Fullstack Architect",
      tech: ["React 19", "Node.js", "Express", "PostgreSQL", "JWT RBAC", "Docker"],
      featured: true,
      sort_order: 1,
      highlights: [
        "Granular Role-Based Access Control (Admin & User permissions)",
        "Stateless JWT auth with secure token management & auto-refresh",
        "Responsive analytics KPI dashboard with real-time statistics",
        "Clean architecture ready for containerized Docker deployments",
      ],
    },
    {
      id: "face-gender-detection",
      title: "Real-time Face Gender Detection",
      category: "Computer Vision & AI",
      description:
        "Bachelor thesis research developing an end-to-end CNN deep learning model for real-time gender classification, achieving 96.4% validation accuracy.",
      href: "https://github.com/ahmadalvin92/real-time-face-gender-detection-cnn-inceptionv3",
      demoUrl: "https://github.com/ahmadalvin92/real-time-face-gender-detection-cnn-inceptionv3",
      image: "/projects/face-gender.png",
      role: "Lead ML Researcher",
      tech: ["TensorFlow", "InceptionV3", "MediaPipe", "OpenCV", "ONNX Runtime", "Python"],
      featured: true,
      sort_order: 2,
      highlights: [
        "96.4% validation accuracy using fine-tuned InceptionV3 architecture",
        "Real-time 60fps facial landmark tracking powered by MediaPipe",
        "Exported to ONNX runtime for ultra-low latency edge inference",
        "Validated under varying lighting, occlusions, and camera angles",
      ],
    },
    {
      id: "elshinta-chat",
      title: "Elshinta Real-Time WebSocket Chat",
      category: "Realtime Systems",
      description:
        "Enterprise dual-component real-time communication platform built with Java Spring Boot 3 WebSocket backend and modern React 19 web client.",
      href: "https://github.com/ahmadalvin92/elshinta-chat-springboot",
      demoUrl: "https://github.com/ahmadalvin92/elshinta-chat-internal",
      image: "/projects/elshinta-chat.png",
      role: "Systems & Backend Engineer",
      tech: ["Java 21", "Spring Boot 3", "WebSocket STOMP", "SockJS", "React 19", "Tailwind"],
      featured: true,
      sort_order: 3,
      highlights: [
        "Bi-directional real-time messaging with STOMP protocol & SockJS fallback",
        "Admin control panel for room management and broadcast notifications",
        "Full conversation persistence backed by MySQL relational storage",
        "Sleek responsive web client built with React 19 & Lucide icons",
      ],
    },
    {
      id: "ap2-monitoring",
      title: "Airport IT Preventive Maintenance (AP2)",
      category: "Enterprise Monitoring",
      description:
        "Comprehensive web platform for PT Angkasa Pura II featuring dynamic checklist building, inspection photo verification, and automated DomPDF report generation.",
      href: "https://github.com/ahmadalvin92/Dynamic-Form-Laporan-Monitoring-AP2",
      demoUrl: "https://github.com/ahmadalvin92/Dynamic-Form-Laporan-Monitoring-AP2",
      image: "/projects/ap2-monitoring.png",
      role: "Software Engineer Intern",
      tech: ["Laravel 10", "MySQL", "AdminLTE 3", "DomPDF", "Chart.js", "LDAP"],
      featured: true,
      sort_order: 4,
      highlights: [
        "Dynamic Checklist Builder allowing runtime parameter modification",
        "Dual digital signature capture for technicians and unit supervisors",
        "Realistic airport IT hardware catalog (Cisco, Dell PowerEdge, Hikvision PTZ)",
        "Audit-ready automated PDF export with photographic evidence",
      ],
    },
    {
      id: "it-ticket-system",
      title: "IT Support Ticketing System",
      category: "Fullstack Platform",
      description:
        "Centralized IT support ticket management and issue tracking system designed to simulate live broadcasting IT operations at PT Radio Elshinta.",
      href: "https://github.com/ahmadalvin92/IT-Support-Ticket-System-Radio-Elshinta",
      demoUrl: "https://github.com/ahmadalvin92/IT-Support-Ticket-System-Radio-Elshinta",
      image: "/projects/itsupport-ticket.png",
      role: "Fullstack Developer",
      tech: ["React.js", "Node.js", "Express", "PostgreSQL", "Prisma ORM", "JWT"],
      featured: false,
      sort_order: 5,
      highlights: [
        "Structured ticket workflow across Open, In Progress, and Resolved states",
        "Role-based authorization separating staff submitters and IT engineers",
        "Real-time ticket metrics, activity history logs, and priority tags",
        "RESTful API backend integrated with PostgreSQL and Prisma ORM",
      ],
    },
    {
      id: "radio-elshinta-jobdesk",
      title: "Radio Elshinta Jobdesk Management",
      category: "Operations",
      description:
        "Operational task delegation and daily jobdesk tracking portal ensuring seamless collaboration and clear accountability across radio broadcasting divisions.",
      href: "https://github.com/ahmadalvin92/radio-elshinta-jobdesk",
      demoUrl: "https://github.com/ahmadalvin92/radio-elshinta-jobdesk",
      image: "/projects/elshinta-jobdesk.png",
      role: "Fullstack Developer",
      tech: ["React.js", "Express.js", "MySQL", "Bootstrap 5", "JWT"],
      featured: false,
      sort_order: 6,
      highlights: [
        "Daily employee task distribution and deadline tracking",
        "Automated monthly rekapitulasi and PDF performance exports",
        "Multi-division job categorization (Studio, News, IT Support, Broadcast)",
        "Secure JWT authentication and administrative user management",
      ],
    },
    {
      id: "desa-gemantar",
      title: "Website Resmi & SI Desa Gemantar",
      category: "Web Portal & Spatial",
      description:
        "Official village information portal and public administration system developed during KKN TIM II UNDIP 2024 for Desa Gemantar, Mondokan, Sragen.",
      href: "https://github.com/ahmadalvin92/Desa-Gemantar-Website",
      demoUrl: "https://github.com/ahmadalvin92/Desa-Gemantar-Website",
      image: "/projects/desa-gemantar.png",
      role: "Lead Web Developer",
      tech: ["Laravel 11", "Bootstrap 5", "AdminLTE 3", "MySQL", "Google Maps"],
      featured: false,
      sort_order: 7,
      highlights: [
        "Monografi sejarah Punden Pucanganom and interactive spatial map (773 Ha)",
        "Digital marketplace for local Gemantar UMKM (Anyaman Bambu, Jamu, Keripik)",
        "Citizen certificate request management (SKU, SKTM, Pengantar SKCK)",
        "Mobile-first responsive layout with news editorial publishing",
      ],
    },
    {
      id: "stunting-api",
      title: "Stunting Cloud ML Inference API",
      category: "Cloud & Microservices",
      description:
        "Containerized cloud-native machine learning API deployed on Google Cloud Run to power automated early childhood stunting detection.",
      href: "https://github.com/ahmadalvin92/API-Stunting-Express-JS",
      demoUrl: "https://github.com/ahmadalvin92/API-Stunting-Express-JS",
      image: "/projects/stunting-api.png",
      role: "Cloud Engineer (Bangkit 2024)",
      tech: ["Node.js", "Docker", "Google Cloud Run", "Cloud Storage", "Swagger"],
      featured: false,
      sort_order: 8,
      highlights: [
        "Serverless auto-scaling ML inference container deployed on Cloud Run",
        "Interactive Swagger OpenAPI documentation for mobile developer integration",
        "Optimized Dockerfile container footprint for rapid cold-start times",
        "Secure Cloud Storage buckets for machine learning model weights",
      ],
    },
    {
      id: "ruang-siar",
      title: "Ruang Siar Broadcasting Rundown",
      category: "Media & Broadcasting",
      description:
        "Broadcasting schedule manager and station rundown tool designed for radio announcers, live program timing, and public broadcast logs.",
      href: "https://github.com/ahmadalvin92/Ruang-Siar",
      demoUrl: "https://github.com/ahmadalvin92/Ruang-Siar",
      image: "/projects/ruang-siar.png",
      role: "Fullstack Developer",
      tech: ["Laravel", "Tailwind CSS", "Alpine.js", "MySQL"],
      featured: false,
      sort_order: 9,
      highlights: [
        "Live radio broadcast rundown scheduler with collapsible program details",
        "Public siaran archive and news editorial warta portal",
        "Commercial spot logging and live on-air announcer timetable",
        "Fast reactive UI powered by Alpine.js and Tailwind CSS",
      ],
    },
    {
      id: "cross-platform-todo",
      title: "Reactive Task Suite (React & Flutter)",
      category: "Cross-Platform",
      description:
        "Synchronized multi-platform task assessment suite engineered simultaneously for web (React 18) and mobile (Flutter & Dart) with unified REST APIs.",
      href: "https://github.com/ahmadalvin92/react-todo-api-crud-assessment-by-alvin",
      demoUrl: "https://github.com/ahmadalvin92/flutter-todo-api-crud-assessment-by-alvin",
      image: "/projects/react-todo.png",
      role: "Cross-Platform Developer",
      tech: ["Flutter", "Dart", "React 18", "REST API", "Tailwind"],
      featured: false,
      sort_order: 10,
      highlights: [
        "Synchronous full CRUD execution across mobile and desktop browser clients",
        "Optimistic state updates with smooth offline storage resilience",
        "Adaptive dark/light theme switching with instant filter & search",
        "Strict API contract compliance and clean architectural separation",
      ],
    },
  ],
  stack: [
    {
      title: "Enterprise & Banking IT",
      description:
        "Core banking systems, SAN switch topology, data center surveys, IBM Power11, IT procurement proposals, and high-availability operations.",
    },
    {
      title: "Frontend Engineering",
      description:
        "React.js, Next.js 15, TypeScript, Tailwind CSS, AdminLTE, Bootstrap 5, responsive dashboards, and interactive user experiences.",
    },
    {
      title: "Backend & Systems",
      description:
        "Node.js, Express.js, Java Spring Boot 3, PHP Laravel 10/11, RESTful APIs, WebSocket STOMP, Prisma ORM, and JWT RBAC authentication.",
    },
    {
      title: "Databases & Cloud",
      description:
        "PostgreSQL, MySQL, Google Cloud Run, Cloud Storage, Docker containers, Supabase, Linux administration, and CI/CD automation.",
    },
    {
      title: "AI, ML & Vision",
      description:
        "Python, TensorFlow, InceptionV3 (96.4% Accuracy), OpenCV, MediaPipe, ONNX Runtime, and edge ML inference optimization.",
    },
    {
      title: "Mobile & Broadcast",
      description:
        "Flutter, Dart, radio broadcast automation, live streaming infrastructure, studio audio networking, and IT technical support.",
    },
  ],
};
