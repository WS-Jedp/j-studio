export enum SkillGroup {
  LANGUAGE = "language",
  FRONTEND = "frontend",
  BACKEND = "backend",
  MOBILE = "mobile",
  DESIGN = "design",
  DATABASE = "database",
  CLOUD = "cloud",
  DEV_TOOLS = "dev-tools",
}

export enum SkillType {
  CORE = "core",
  ADDITIONAL = "additional",
  TO_LEARN = "to-learn",
}

export type Skill = {
  name: string;
  icon?: string;
  description: string;
  groupType: SkillGroup;
  skillType: SkillType;
};

export type SkillGroupInfo = {
  title: string;
  description: string;
};

export const skillGroupInfo: Record<SkillGroup, SkillGroupInfo> = {
  [SkillGroup.LANGUAGE]: {
    title: "Programming Languages",
    description:
      "The foundation of everything I build. These are the languages I'm fluent in, from production-ready code to experimental projects.",
  },
  [SkillGroup.FRONTEND]: {
    title: "Frontend Development",
    description:
      "Creating intuitive, responsive and engaging user interfaces is where I shine. These are my tools of choice for building exceptional web experiences.",
  },
  [SkillGroup.BACKEND]: {
    title: "Backend Systems",
    description:
      "The backbone of any robust application. These technologies power my server-side logic, APIs, and data processing.",
  },
  [SkillGroup.MOBILE]: {
    title: "Mobile Development",
    description:
      "Building cross-platform mobile applications that feel native and deliver exceptional user experiences.",
  },
  [SkillGroup.DESIGN]: {
    title: "Design & UI/UX",
    description:
      "Blending aesthetics with functionality. These are the tools I use to create beautiful, intuitive interfaces and visual assets.",
  },
  [SkillGroup.DATABASE]: {
    title: "Database Solutions",
    description:
      "Reliable data storage and retrieval are critical. I leverage these technologies to build efficient, scalable database systems.",
  },
  [SkillGroup.CLOUD]: {
    title: "Cloud Infrastructure",
    description:
      "Scalable, reliable cloud solutions that power modern applications. These platforms and tools form the foundation of my deployments.",
  },
  [SkillGroup.DEV_TOOLS]: {
    title: "Development Tools",
    description:
      "My everyday toolkit that enhances productivity and helps me build better software faster and more efficiently.",
  },
};

export const languages: Skill[] = [
  {
    name: "Node",
    icon: "javascript",
    description:
      "The language of the web. I use JS for interactive web applications.",
    groupType: SkillGroup.LANGUAGE,
    skillType: SkillType.CORE,
  },
  {
    name: "TypeScript",
    icon: "typescript",
    description:
      "Type-safe or no deal. I use TS everywhere: small scripts or scalable platforms.",
    groupType: SkillGroup.LANGUAGE,
    skillType: SkillType.CORE,
  },
  {
    name: "Python",
    icon: "python",
    description:
      "I use Python for data science, machine learning, and web development.",
    groupType: SkillGroup.LANGUAGE,
    skillType: SkillType.ADDITIONAL,
  },
  {
    name: "Java",
    icon: "java",
    description: "",
    groupType: SkillGroup.LANGUAGE,
    skillType: SkillType.ADDITIONAL,
  },
  {
    name: "PHP",
    icon: "php",
    description: "I use PHP for server-side scripting and web development.",
    groupType: SkillGroup.LANGUAGE,
    skillType: SkillType.ADDITIONAL,
  },
  // {
  //   name: "Go",
  //   icon: "go",
  //   description: "I use Go for building scalable and efficient applications.",
  //   groupType: SkillGroup.LANGUAGE,
  //   skillType: SkillType.TO_LEARN,
  // },
  // {
  //   name: "C++",
  //   icon: "c++",
  //   description: "I use C++ for performance-critical applications.",
  //   groupType: SkillGroup.LANGUAGE,
  //   skillType: SkillType.TO_LEARN,
  // },
  // {
  //   name: "Rust",
  //   icon: "rust",
  //   description: "I use Rust for systems programming and performance.",
  //   groupType: SkillGroup.LANGUAGE,
  //   skillType: SkillType.TO_LEARN,
  // },
];

export const frontend: Skill[] = [
  {
    name: "React",
    icon: "react",
    description: "My go-to for MVPs and interfaces that feel alive.",
    groupType: SkillGroup.FRONTEND,
    skillType: SkillType.CORE,
  },
  {
    name: "Next.js",
    icon: "nextjs",
    description: "For SEO, performance, and easy deployment.",
    groupType: SkillGroup.FRONTEND,
    skillType: SkillType.CORE,
  },
  {
    name: "Redux Toolkit",
    icon: "redux",
    description: "Clear and modular state handling for growing apps.",
    groupType: SkillGroup.FRONTEND,
    skillType: SkillType.CORE,
  },
  {
    name: "TailwindCSS",
    icon: "tailwindcss",
    description: "Utility-first. Customizable. No more heavy UI libraries.",
    groupType: SkillGroup.FRONTEND,
    skillType: SkillType.CORE,
  },
  {
    name: "Framer Motion",
    icon: "framer-motion",
    description:
      "For animations and micro-interactions that make interfaces feel alive.",
    groupType: SkillGroup.FRONTEND,
    skillType: SkillType.ADDITIONAL,
  },
  {
    name: "Vue.js",
    icon: "vuejs",
    description: "Great for dashboards and structured apps like e-commerce.",
    groupType: SkillGroup.FRONTEND,
    skillType: SkillType.ADDITIONAL,
  },
  {
    name: "Angular",
    icon: "angular",
    description: "Ideal for large, component-heavy enterprise projects.",
    groupType: SkillGroup.FRONTEND,
    skillType: SkillType.ADDITIONAL,
  },
];

export const backend: Skill[] = [
  {
    name: "NestJS",
    icon: "nestjs",
    description: "Modular and scalable backend architecture.",
    groupType: SkillGroup.BACKEND,
    skillType: SkillType.CORE,
  },
  {
    name: "Prisma",
    icon: "prisma",
    description: "Intuitive ORM for small-to-medium projects.",
    groupType: SkillGroup.BACKEND,
    skillType: SkillType.CORE,
  },
  {
    name: "Express",
    icon: "express",
    description: "Fast API setup — great for MVPs and quick experiments.",
    groupType: SkillGroup.BACKEND,
    skillType: SkillType.CORE,
  },
  {
    name: "FastAPI",
    icon: "fastapi",
    description: "Python-based, lightweight and great for team collaboration.",
    groupType: SkillGroup.BACKEND,
    skillType: SkillType.ADDITIONAL,
  },
  {
    name: "Spring Boot",
    icon: "spring-boot",
    description: "Powerful backend choice for enterprise-grade applications.",
    groupType: SkillGroup.BACKEND,
    skillType: SkillType.ADDITIONAL,
  },
];

export const mobile: Skill[] = [
  {
    name: "Ionic",
    icon: "ionic",
    description: "Fast way to build hybrid mobile apps using web tech.",
    groupType: SkillGroup.MOBILE,
    skillType: SkillType.CORE,
  },
  {
    name: "React Native",
    icon: "react-native",
    description: "For more native-feeling mobile apps.",
    groupType: SkillGroup.MOBILE,
    skillType: SkillType.CORE,
  },
];

export const database: Skill[] = [
  {
    name: "PostgreSQL",
    description: "Reliable relational DB for structured data.",
    icon: "postgresql",
    groupType: SkillGroup.DATABASE,
    skillType: SkillType.CORE,
  },
  {
    name: "MongoDB",
    icon: "mongodb",
    description: "Flexible NoSQL database, great for dynamic schemas.",
    groupType: SkillGroup.DATABASE,
    skillType: SkillType.CORE,
  },
  {
    name: "Amazon RDS",
    icon: "aws",
    description: "Managed SQL service for scalability and reliability.",
    groupType: SkillGroup.DATABASE,
    skillType: SkillType.CORE,
  },
  {
    name: "DynamoDB",
    description: "AWS-native NoSQL DB, scalable and fast.",
    icon: "dynamodb",
    groupType: SkillGroup.DATABASE,
    skillType: SkillType.CORE,
  },
  {
    name: "Redis",
    description: "Go-to for caching and real-time performance boosts.",
    icon: "redis",
    groupType: SkillGroup.DATABASE,
    skillType: SkillType.CORE,
  },
];

export const cloud: Skill[] = [
  {
    name: "AWS (Elastic Beanstalk, Route 53, EC2, S3)",
    icon: "aws",
    description: "My infrastructure base for scaling production-ready apps.",
    groupType: SkillGroup.CLOUD,
    skillType: SkillType.CORE,
  },
  {
    name: "Google Cloud",
    icon: "google-cloud",
    description: "Clean and efficient for small-to-medium-sized apps.",
    groupType: SkillGroup.CLOUD,
    skillType: SkillType.ADDITIONAL,
  },
  {
    name: "Digital Ocean",
    icon: "digital-ocean",
    description:
      "Developer-friendly, quick deploys for personal or startup projects.",
    groupType: SkillGroup.CLOUD,
    skillType: SkillType.ADDITIONAL,
  },
  {
    name: "GitHub Actions",
    icon: "github-actions",
    description: "CI/CD pipelines that automate deployments and tests.",
    groupType: SkillGroup.CLOUD,
    skillType: SkillType.CORE,
  },
];

export const devTools: Skill[] = [
  {
    name: "Copilot Premium",
    description: "AI-powered code suggestions that speed up development.",
    icon: "copilot",
    groupType: SkillGroup.DEV_TOOLS,
    skillType: SkillType.CORE,
  },
  {
    name: "VS Code",
    icon: "vscode",
    description: "My IDE of choice for everything I build.",
    groupType: SkillGroup.DEV_TOOLS,
    skillType: SkillType.CORE,
  },
];

export const design: Skill[] = [
  {
    name: "Figma",
    description: "Fast and collaborative prototyping for UI/UX workflows.",
    icon: "figma",
    groupType: SkillGroup.DESIGN,
    skillType: SkillType.CORE,
  },
  {
    name: "Adobe XD",
    description: "Alternative design tool — great for quick UI flows.",
    icon: "adobe-xd",
    groupType: SkillGroup.DESIGN,
    skillType: SkillType.CORE,
  },
  {
    name: "Illustrator",
    description: "Used for branding, icon systems, and design assets.",
    icon: "illustrator",
    groupType: SkillGroup.DESIGN,
    skillType: SkillType.CORE,
  },
];

export const allSkilsByGroup: Record<SkillGroup, Skill[]> = {
  [SkillGroup.LANGUAGE]: languages,
  [SkillGroup.FRONTEND]: frontend,
  [SkillGroup.BACKEND]: backend,
  [SkillGroup.MOBILE]: mobile,
  [SkillGroup.DATABASE]: database,
  [SkillGroup.CLOUD]: cloud,
  [SkillGroup.DESIGN]: design,
  [SkillGroup.DEV_TOOLS]: devTools,
};

export const threeColumnSkills: Skill[][] = [
  [
    {
      name: "VS Code",
      icon: "vscode",
      description: "My IDE of choice for everything I build.",
      groupType: SkillGroup.DEV_TOOLS,
      skillType: SkillType.CORE,
    },
    {
      name: "Spring Boot",
      icon: "spring-boot",
      description: "Powerful backend choice for enterprise-grade applications.",
      groupType: SkillGroup.BACKEND,
      skillType: SkillType.ADDITIONAL,
    },
    {
      name: "Ionic",
      icon: "ionic",
      description: "Fast way to build hybrid mobile apps using web tech.",
      groupType: SkillGroup.MOBILE,
      skillType: SkillType.CORE,
    },
    {
      name: "TypeScript",
      icon: "typescript",
      description:
        "Type-safe or no deal. I use TS everywhere: small scripts or scalable platforms.",
      groupType: SkillGroup.LANGUAGE,
      skillType: SkillType.CORE,
    },
    {
      name: "TailwindCSS",
      icon: "tailwindcss",
      description: "Utility-first. Customizable. No more heavy UI libraries.",
      groupType: SkillGroup.FRONTEND,
      skillType: SkillType.CORE,
    },
    {
      name: "AWS",
      icon: "aws",
      description: "My infrastructure base for scaling production-ready apps.",
      groupType: SkillGroup.CLOUD,
      skillType: SkillType.CORE,
    },
    {
      name: "Vue.js",
      icon: "vuejs",
      description: "Great for dashboards and structured apps like e-commerce.",
      groupType: SkillGroup.FRONTEND,
      skillType: SkillType.ADDITIONAL,
    },
    {
      name: "PHP",
      icon: "php",
      description: "I use PHP for server-side scripting and web development.",
      groupType: SkillGroup.LANGUAGE,
      skillType: SkillType.ADDITIONAL,
    },
    {
      name: "GitHub Actions",
      icon: "github-actions",
      description: "CI/CD pipelines that automate deployments and tests.",
      groupType: SkillGroup.CLOUD,
      skillType: SkillType.CORE,
    },
    {
      name: "Adobe XD",
      icon: "adobe-xd",
      description: "Alternative design tool — great for quick UI flows.",
      groupType: SkillGroup.DESIGN,
      skillType: SkillType.CORE,
    },
    {
      name: "Illustrator",
      icon: "illustrator",
      description: "Used for branding, icon systems, and design assets.",
      groupType: SkillGroup.DESIGN,
      skillType: SkillType.CORE,
    },
    {
      name: "Redis",
      icon: "redis",
      description: "Go-to for caching and real-time performance boosts.",
      groupType: SkillGroup.DATABASE,
      skillType: SkillType.CORE,
    },
  ],
  [
    {
      name: "FastAPI",
      icon: "fastapi",
      description:
        "Python-based, lightweight and great for team collaboration.",
      groupType: SkillGroup.BACKEND,
      skillType: SkillType.ADDITIONAL,
    },
    {
      name: "Copilot Premium",
      description: "AI-powered code suggestions that speed up development.",
      icon: "copilot",
      groupType: SkillGroup.DEV_TOOLS,
      skillType: SkillType.CORE,
    },
    {
      name: "NestJS",
      icon: "nestjs",
      description: "Modular and scalable backend architecture.",
      groupType: SkillGroup.BACKEND,
      skillType: SkillType.CORE,
    },
    {
      name: "React",
      icon: "react",
      description: "My go-to for MVPs and interfaces that feel alive.",
      groupType: SkillGroup.FRONTEND,
      skillType: SkillType.CORE,
    },
    {
      name: "Figma",
      icon: "figma",
      description: "Fast and collaborative prototyping for UI/UX workflows.",
      groupType: SkillGroup.DESIGN,
      skillType: SkillType.CORE,
    },
    {
      name: "Python",
      icon: "python",
      description:
        "I use Python for data science, machine learning, and web development.",
      groupType: SkillGroup.LANGUAGE,
      skillType: SkillType.ADDITIONAL,
    },
    {
      name: "Express",
      icon: "express",
      description: "Fast API setup — great for MVPs and quick experiments.",
      groupType: SkillGroup.BACKEND,
      skillType: SkillType.CORE,
    },
    {
      name: "PostgreSQL",
      icon: "postgresql",
      description: "Reliable relational DB for structured data.",
      groupType: SkillGroup.DATABASE,
      skillType: SkillType.CORE,
    },
    {
      name: "Angular",
      icon: "angular",
      description: "Ideal for large, component-heavy enterprise projects.",
      groupType: SkillGroup.FRONTEND,
      skillType: SkillType.ADDITIONAL,
    },
    {
      name: "Framer Motion",
      icon: "framer-motion",
      description:
        "For animations and micro-interactions that make interfaces feel alive.",
      groupType: SkillGroup.FRONTEND,
      skillType: SkillType.ADDITIONAL,
    },
    {
      name: "Next.js",
      icon: "nextjs",
      description: "For SEO, performance, and easy deployment.",
      groupType: SkillGroup.FRONTEND,
      skillType: SkillType.CORE,
    },
  ],
  [
    {
      name: "Digital Ocean",
      icon: "digital-ocean",
      description:
        "Developer-friendly, quick deploys for personal or startup projects.",
      groupType: SkillGroup.CLOUD,
      skillType: SkillType.ADDITIONAL,
    },
    {
      name: "React Native",
      icon: "react-native",
      description: "For more native-feeling mobile apps.",
      groupType: SkillGroup.MOBILE,
      skillType: SkillType.CORE,
    },
    {
      name: "Node",
      icon: "javascript",
      description:
        "The language of the web. I use JS for interactive web applications.",
      groupType: SkillGroup.LANGUAGE,
      skillType: SkillType.CORE,
    },
    {
      name: "Prisma",
      icon: "prisma",
      description: "Intuitive ORM for small-to-medium projects.",
      groupType: SkillGroup.BACKEND,
      skillType: SkillType.CORE,
    },
    {
      name: "DynamoDB",
      icon: "dynamodb",
      description: "AWS-native NoSQL DB, scalable and fast.",
      groupType: SkillGroup.DATABASE,
      skillType: SkillType.CORE,
    },
    {
      name: "Java",
      icon: "java",
      description: "",
      groupType: SkillGroup.LANGUAGE,
      skillType: SkillType.ADDITIONAL,
    },
    {
      name: "MongoDB",
      icon: "mongodb",
      description: "Flexible NoSQL database, great for dynamic schemas.",
      groupType: SkillGroup.DATABASE,
      skillType: SkillType.CORE,
    },
    {
      name: "Redux Toolkit",
      icon: "redux",
      description: "Clear and modular state handling for growing apps.",
      groupType: SkillGroup.FRONTEND,
      skillType: SkillType.CORE,
    },
    {
      name: "Amazon RDS",
      icon: "aws",
      description: "Managed SQL service for scalability and reliability.",
      groupType: SkillGroup.DATABASE,
      skillType: SkillType.CORE,
    },
    {
      name: "Google Cloud",
      icon: "google-cloud",
      description: "Clean and efficient for small-to-medium-sized apps.",
      groupType: SkillGroup.CLOUD,
      skillType: SkillType.ADDITIONAL,
    },
  ],
];
