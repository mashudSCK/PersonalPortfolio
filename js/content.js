export const projects = [
  {
    title: "The Shelves of Mash",
    image: "images/shelves-home-1280.webp",
    srcset:
      "images/shelves-home-640.webp 640w, images/shelves-home-1280.webp 1280w",
    width: 1280,
    height: 800,
    alt: "The Shelves of Mash personal archive home page",
    repository: "https://github.com/mashudSCK/shelves-of-mash",
    demo: "https://shelves-of-mash.vercel.app",
    description:
      "A personal archive for long-form writing, built around shelves, search, bookmarks, and an interactive Atlas that connects ideas instead of flattening them into a feed.",
    technologies: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Supabase",
      "Playwright",
    ],
    role: "Creator / Full-Stack Developer",
    note: "This feels closest to me: organized enough to be useful, but still willing to wander between technology, culture, history, and whatever catches my attention next.",
    story: [
      "I built The Shelves of Mash as a quieter alternative to a content feed—a place where thoughts can belong to shelves, connect through tags, and be explored through an Atlas. It reflects how I actually learn: following links between ideas rather than treating every interest as a separate box.",
      "Behind the reader experience is a complete publishing system with Supabase authentication, reader and administrator roles, drafts, scheduled posts, cover storage, secure Markdown rendering, bookmarks, search, and protected previews. Row Level Security remains the data boundary, while responsive Playwright tests exercise the public experience across phones, tablets, and desktops.",
    ],
  },
  {
    title: "Sulyap",
    image: "images/sulyap.webp",
    srcset:
      "images/sulyap-480.webp 480w, images/sulyap-960.webp 960w, images/sulyap.webp 1021w",
    width: 1021,
    height: 681,
    alt: "Sulyap anonymous chat application",
    repository: "https://github.com/mashudSCK/sulyap",
    demo: "https://sulyap.onrender.com/",
    description:
      "An anonymous, real-time chat application designed for brief, meaningful conversations—without profiles, history, or digital footprints.",
    technologies: [
      "JavaScript",
      "CSS",
      "HTML",
      "Node.js",
      "Express",
      "Socket.io",
    ],
    role: "Full-Stack Developer",
    note: "This is where event-driven systems stopped being an abstract idea and started feeling useful.",
    story: [
      "Sulyap was born from my curiosity about real-time systems and my interest in privacy-first digital experiences. I wanted to explore how people connect when identity, history, and algorithms are removed from the equation.",
      "This project challenged me to work with WebSockets, real-time user matching, and event-driven architecture while keeping the interface simple and lightweight. Sulyap reflects my focus on building interactive web applications that prioritize both technical efficiency and human experience.",
    ],
  },
  {
    title: "Do Your Tasks Pls",
    visual: "tasks",
    alt: "Illustrated task list representing the Do Your Tasks Pls Flutter app",
    repository: "https://github.com/mashudSCK/To-Do-List-APP",
    description:
      "A Flutter task manager with categories, due dates, local reminders, search, and layouts that adapt from phones to desktop screens.",
    technologies: [
      "Flutter",
      "Dart",
      "Hive",
      "Provider",
      "Local Notifications",
    ],
    role: "Mobile App Developer",
    note: "My first serious step outside the browser taught me to think about local state, notifications, and several screen sizes at once.",
    story: [
      "I built this app to turn a familiar idea into a focused mobile-development exercise. Tasks can be grouped by School, Personal, or Work, searched, filtered, assigned due dates, and completed without depending on a remote service.",
      "Using Hive for local storage and Provider for state management helped me understand how a Flutter application keeps its interface and data in sync. Local notifications added a practical system-level feature beyond the app screen itself.",
    ],
  },
  {
    title: "NewsHub — Modern News Aggregator",
    image: "images/news.webp",
    srcset:
      "images/news-640.webp 640w, images/news-1280.webp 1280w, images/news.webp 1920w",
    width: 1920,
    height: 980,
    alt: "NewsHub news aggregator interface",
    repository: "https://github.com/mashudSCK/NewsHub",
    demo: "https://newshub-sigma-liard.vercel.app/",
    description:
      "A responsive news platform that delivers the latest headlines, unlimited searching, category-based browsing, and customizable bookmarks—all with smooth UX and mobile-friendly design.",
    technologies: ["Next.js", "React", "Tailwind CSS", "GNews API"],
    role: "Full Stack Developer",
    note: "Fetching headlines was the easy part; handling changing data, empty states, and slow responses was the real lesson.",
    story: [
      "I built NewsHub out of curiosity and a desire to better understand how APIs work in real-world applications. This project allowed me to explore fetching, handling, and displaying dynamic data from a third-party news API while focusing on performance, usability, and clean UI design.",
      "Through NewsHub, I deepened my understanding of API integration, asynchronous data handling, and modern front-end development using Next.js. It represents my hands-on approach to learning—building practical projects to turn concepts into working products.",
    ],
  },
  {
    title: "Online Voting System (SKSU)",
    image: "images/ov.webp",
    srcset:
      "images/ov-640.webp 640w, images/ov-1280.webp 1280w, images/ov.webp 1893w",
    width: 1893,
    height: 971,
    alt: "Online Voting System dashboard",
    repository: "https://github.com/mashudSCK/SKSUOnlineVoting",
    description:
      "A secure, role-based online voting platform built for student organization elections across multiple campuses at Sultan Kudarat State University, developed as a school project for Interactive Programming and Technologies.",
    technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    role: "Full-Stack Developer / Academic Project",
    note: "Role-based access looked simple on paper until every action had to respect organizations, departments, and election state.",
    story: [
      "I developed this system as part of my Interactive Programming and Technologies course to gain practical experience in full-stack web development and role-based application design. The newer version supports administrators, organization officers, and students, with department-based eligibility for organization elections.",
      "The project challenged me to combine prepared database queries, session-based access control, anonymous ballots, one-vote constraints, election scheduling, and results into one consistent workflow.",
    ],
  },
  {
    title: "PSITS Clearance Management System",
    image: "images/PSITS.webp",
    srcset:
      "images/PSITS-640.webp 640w, images/PSITS-1280.webp 1280w, images/PSITS.webp 1911w",
    width: 1911,
    height: 880,
    alt: "PSITS Clearance Management System interface",
    repository:
      "https://github.com/mashudSCK/PSITS-Clearance-Management-System",
    description:
      "A web-based clearance processing system designed to streamline student clearance workflows for the College of Information and Technology Studies.",
    technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    role: "Developer / Academic Project",
    note: "A routine campus process became a useful exercise in translating real steps and responsibilities into software.",
    story: [
      "I created the PSITS Clearance Management System as part of my academic coursework to apply core web development principles to a real-world administrative problem. This project gave me hands-on experience with server-side development using PHP, relational database design with MySQL, dynamic user interfaces, and structured form processing. It reflects my focus on building functional applications that support structured workflows and practical use cases within educational institutions.",
    ],
  },
];

export const skillGroups = [
  {
    title: "Programming Languages",
    icon: "fa-code",
    items: ["JavaScript", "PHP", "Dart", "HTML", "CSS", "SQL (MySQL)"],
  },
  {
    title: "Frameworks & Libraries",
    icon: "fa-layer-group",
    items: [
      "React / Next.js",
      "Node.js / Express",
      "Socket.io (Real-time)",
      "CodeIgniter 4",
      "Flutter / Provider",
      "Tailwind CSS / Bootstrap",
    ],
  },
  {
    title: "Tools & Technologies",
    icon: "fa-toolbox",
    items: [
      "Git / GitHub",
      "MySQL",
      "Hive Local Storage",
      "REST APIs & Integration",
      "Deployment (Vercel / Render)",
      "Responsive UI Development",
    ],
  },
  {
    title: "Soft Skills",
    icon: "fa-people-group",
    items: [
      "Problem Solving",
      "Communication",
      "Collaboration",
      "Debugging",
      "Attention to Detail",
      "UI/UX Principles",
      "Continuous Learning",
    ],
  },
];

export const achievements = [
  {
    title: "BS Information Technology",
    description: "Sultan Kudarat State University",
    date: "2023-Present",
    image: "images/sksu-logo.webp",
    srcset: "images/sksu-logo-188.webp 188w, images/sksu-logo.webp 377w",
    imageAlt: "Sultan Kudarat State University logo",
    width: 377,
    height: 380,
  },
  {
    title: "PSITS Member",
    description: "Philippine Society of IT Students",
    date: "2023-Present",
    icon: "fa-solid fa-user-group",
  },
  {
    title: "Academic Excellence",
    description: "Dean's List Recognition",
    date: "3rd Year - 1st Semester",
    icon: "fa-solid fa-medal",
  },
  {
    title: "Full-Stack Projects",
    description: "6+ Web Applications Developed",
    date: "2023-Present",
    icon: "fa-solid fa-code-branch",
  },
  {
    title: "GitHub Portfolio",
    description: "Active Open Source Contributions",
    date: "2025-Present",
    icon: "fa-brands fa-github",
  },
  {
    title: "Live Production Apps",
    description: "Real-time & API-driven Systems",
    date: "2025-Present",
    icon: "fa-solid fa-globe",
  },
];
