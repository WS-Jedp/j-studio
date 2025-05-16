import { JobCardProps } from "@/components/cards/jobCard";

export const JobsExperienceData: JobCardProps[] = [
  {
    id: "AESTUDIAR",
    companyName: "Aestudiar",
    role: "Full Stack Web Developer",
    yearFrom: 2020,
    yearTo: 2020,
    mission:
      "Improved team collaboration and accelerated web/mobile development to meet tight delivery timelines.",
    keyAchievements: [
      {
        title: "Frontend & Backend Integration",
        description:
          "Merged teams to streamline workflows and reduce time-to-market for product releases.",
      },
      {
        title: "Rapid App Development",
        description:
          "Decreased development time through focused full-stack practices.",
      },
      {
        title: "Team Efficiency",
        description:
          "Boosted productivity through optimized communication and handoff processes.",
      },
    ],
    technologies: [
      { name: "Next.js", iconUrl: "/assets/icons/next-js-icon.svg" },
      { name: "Redux", iconUrl: "/assets/icons/redux-icon.svg" },
      { name: "Express", iconUrl: "/assets/icons/express-icon.svg" },
      { name: "MongoDB", iconUrl: "/assets/icons/mongodb-icon.svg" },
    ],
    projects: [],
    accentColor: "#5A67D8",
    backgroundColor: "#5A67D8",
  },
  {
    id: "BEEREADERS",
    companyName: "BeeReaders",
    role: "Semi-Senior Software Engineer",
    yearFrom: "Nov 2021",
    yearTo: "Dec 2024",
    mission:
      "Owned frontend delivery and bridged backend/frontend workflows for an EdTech platform used across LATAM.",
    keyAchievements: [
      {
        title: "LATAM Payment System Integration",
        description:
          "Led multi-provider checkout development (Wompi, Mercado Pago) across multiple countries.",
      },
      {
        title: "Full Product Lifecycle",
        description:
          "Delivered mobile apps, internal tools, and infrastructure in sync with product and business goals.",
      },
      {
        title: "Cloud & Scalability",
        description:
          "Supported AWS + Terraform-based infrastructure to handle high traffic and concurrent users.",
      },
    ],
    technologies: [
      { name: "Vue.js" },
      { name: "Ionic" },
      { name: "Spring Boot" },
      { name: "AWS" },
    ],
    accentColor: "#FBBF24",
    backgroundColor: "#FBBF24",
    companyLogo: "/assets/jobs/beereaders-logo.svg",
    projects: [
      {
        title: "Reader Level Detection Algorithm",
        description:
          "Developed a custom algorithm to automatically detect reading proficiency and classify users based on their oral reading performance, using AI-generated transcriptions.",
        solution:
          "Designed a system that analyzes AI-transcribed audio to identify mispronunciations, skipped words, and fluency errors. The algorithm classifies users by reading level and error type, enabling automated assessments for schools across LATAM.",
        images: [
          /* image URLs here */
        ],
      },
      {
        title: "School Locator Tool for Non-Client Outreach",
        description:
          "Internal platform built to support the marketing team in identifying potential school leads based on geolocation.",
        solution:
          "Implemented a scraping and API integration system with government data sources, allowing users to filter schools by distance and region using latitude/longitude. Delivered a web tool to streamline lead generation based on proximity to target zones.",
        images: [
          /* image URLs here */
        ],
      },
      {
        title: "Multi-Region Payment Checkout Integration",
        description:
          "Unified payment flow for the web platform supporting different providers across Latin America.",
        solution:
          "Led the frontend/backend integration of Wompi (Colombia) and Mercado Pago (other countries). Built a dynamic, UX-optimized flow that routes users to the correct payment processor based on region and required data fields.",
        images: [
          /* image URLs here */
        ],
      },
      {
        title: "Frontend Engineering Leadership",
        description:
          "Led the development of all user-facing web projects across BeeReaders.",
        solution:
          "Responsible for major updates, architecture, and feature implementations on the main user platform, landing pages, data visualization dashboards, and marketing interfaces. Ensured consistency in design systems and scalability of frontend modules.",
        images: [
          /* image URLs here */
        ],
      },
      {
        title: "Book Reading Experience Upgrade",
        description:
          "Redesigned the core digital book reading feature to enhance user engagement and retention.",
        solution:
          "Implemented a new UI/UX that allowed users to track progress, take inline notes, and leave comments within books. Focused on accessibility, performance, and modular design to enable future feature expansions.",
        images: [
          /* image URLs here */
        ],
      },
    ],
  },
  {
    id: "CERTIBLOCK",
    companyName: "Certiblock",
    role: "Full Stack Developer & AWS Architect",
    yearFrom: "Aug 2023",
    yearTo: "Present",
    mission:
      "Architecting scalable infrastructure and leading frontend initiatives for high-growth blockchain and certification platforms.",
    keyAchievements: [
      {
        title: "Scalable System Refactor",
        description:
          "Redesigned the system's architecture (frontend, backend, DB) to improve performance and scalability.",
      },
      {
        title: "CI/CD & DevOps Integration",
        description:
          "Implemented GitHub-AWS pipelines for automated deployments and faster iterations.",
      },
      {
        title: "Frontend Leadership",
        description:
          "Led UI/UX development, aligning product features with business needs and tech scalability.",
      },
    ],
    technologies: [
      { name: "Next.js" },
      { name: "AWS" },
      { name: "Polygon Blockhain" },
    ],
    accentColor: "#00d40d",
    backgroundColor: "#00d40d",
    companyLogo: "/assets/jobs/certiblock-logo.svg",
    projects: [
      {
        title: "AWS Infrastructure Overhaul",
        description:
          "Led the implementation of a scalable, secure, and CI/CD-powered AWS infrastructure to support Certiblock's full-stack operations.",
        solution:
          "Provisioned and automated cloud infrastructure for backend services, databases, web hosting, and domain management using Elastic Beanstalk, Route 53, S3, and EC2. Integrated CI/CD pipelines with GitHub Actions to accelerate development and deployment speed. Leveraged AWS services for security, authentication, and transactional email delivery.",
        images: [
          /* image URLs here */
        ],
      },
      {
        title: "End-to-End Platform Refactor",
        description:
          "Co-led the strategic planning and execution of a complete system refactor to simplify complexity and improve maintainability across the entire product.",
        solution:
          "Re-architected the data model, backend services, and frontend architecture to align with a cleaner domain-driven design. The refactor reduced tech debt, improved scalability, and simplified onboarding for future developers.",
        images: [
          /* image URLs here */
        ],
      },
      {
        title: "UI/UX Design Leadership for Platform Redesign",
        description:
          "Directed the UI/UX vision and execution for the full platform redesign aligned with the new product strategy.",
        solution:
          "Led the design process for new product interfaces across all services. Created a design system, prototypes, and flows in Figma to ensure consistency, usability, and a seamless user experience. Collaborated with engineering to ensure pixel-perfect, component-driven implementation.",
        images: [
          /* image URLs here */
        ],
      },
    ],
  },
  {
    id: "WORLDSKILLS",
    companyName: "WorldSkills",
    role: "Web Development Competitor",
    yearFrom: 2019,
    yearTo: 2022,
    mission:
      "Trained to build user-focused web solutions under pressure, blending code, design, and performance to meet global standards.",
    keyAchievements: [
      {
        title:
          "🥇 1st – Web Dev Champion (City, Regional & National, Colombia)",
        description:
          "Crowned national champion in Web Development after winning a series of competitive rounds across city, regional, and national levels — demonstrating technical mastery, creativity, and performance under pressure.",
      },
      {
        title: "🥈 2nd – WorldSkills Americas 2021 (Guatemala)",
        description:
          "Earned second place among the top web developers in the Americas, showcasing excellence in real-world problem solving, user experience, and rapid delivery of high-quality code in a timed environment.",
      },
      {
        title: "🌍 14th – WorldSkills Global 2022 (South Korea)",
        description:
          "Represented Colombia at the global stage, ranking 14th worldwide in the Web Technologies category — competing under international standards and working closely with elite coaches from South Korea and Latin America.",
      },
    ],
    technologies: [
      { name: "React" },
      { name: "Laravel" },
      { name: "WordPress" },
      { name: "Figma" },
    ],
    accentColor: "#D51067",
    backgroundColor: "#D51067",
    companyLogo: "/assets/jobs/worldskills-logo.svg",
    projects: [
      {
        title: "South Korea & Colombia Knowledge Exchange Program",
        description:
          "Two-week international training initiative designed to foster collaboration between WorldSkills experts and competitors from South Korea and Colombia.",
        solution:
          "Participated in a cross-cultural learning environment focused on high-performance strategies for international competition. Shared techniques, refined technical skills, and absorbed global best practices in web development, teamwork, and time-constrained execution.",
        images: [
          /* image URLs here */
        ],
      },
    ],
  },
  {
    id: "PLATZIMASTER",
    companyName: "Platzi Master",
    role: "Frontend Track – First Generation",
    yearFrom: 2020,
    yearTo: 2021,
    mission:
      "Trained in modern frontend engineering with mentorship from senior engineers and leading Spanish-speaking tech educators.",
    keyAchievements: [
      {
        title: "Modern React workflows (Hooks, Redux, SSR)",
        description: "",
      },
      {
        title: "Scalable component design & accessibility",
        description: "",
      },
      {
        title: "Agile teamwork with real-world project delivery",
        description: "",
      },
      {
        title: "Direct coaching from senior engineers & expert mentors",
        description: "",
      },
    ],
    technologies: [
      { name: "React" },
      { name: "Express" },
      { name: "graphql" },
      { name: "MongoDB" },
    ],
    accentColor: "#FBBF24",
    backgroundColor: "#FBBF24",
    projects: [
      {
        title: "Advanced Frontend Architecture",
        description:
          "Trained to build scalable, high-performance frontend systems using React and modern tooling.",
        solution:
          "Learned to go beyond implementation — designing maintainable component systems, writing human-readable code, and optimizing performance at scale. Developed skills to bridge the gap between design systems and engineering with a product-focused mindset.",
        images: [
          /* image URLs here */
        ],
      },
      {
        title: "Remote Agile Collaboration",
        description:
          "Worked in high-pressure, international remote teams using modern product workflows.",
        solution:
          "Collaborated with developers across Latin America and Europe using agile methodologies, daily standups, and iterative delivery. Learned how to adapt quickly, plan effectively, and execute under real-world time constraints.",
        images: [
          /* image URLs here */
        ],
      },
      {
        title: "Learning Efficiency Systems",
        description:
          "Developed a system for mastering new technologies fast under high-intensity training.",
        solution:
          "Built personalized study workflows using meta-learning principles to absorb complex topics faster. Applied this to learn full-stack technologies in compressed timelines, resulting in faster delivery and deeper technical insight.",
        images: [
          /* image URLs here */
        ],
      },
    ],
  },
];
