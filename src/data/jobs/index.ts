import { JobCardProps } from "@/components/cards/jobCard";

export const JobsExperienceData: JobCardProps[] = [
  {
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
      { name: "Next.js" },
      { name: "Redux" },
      { name: "Express" },
      { name: "MongoDB" },
    ],
  },
  {
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
  },
  {
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
  },
];
