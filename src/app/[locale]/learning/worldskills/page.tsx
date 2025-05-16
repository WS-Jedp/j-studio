"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { JobsExperienceData } from "@/data/jobs";
import {
  ArrowLeft,
  Calendar,
  Code,
  Clock,
  Award,
  Users,
  Lightbulb,
  GraduationCap,
} from "lucide-react";
import { ScrollProgressBar } from "@/components/scrollProgression";

export default function WorldSkills() {
  // Find the WorldSkills job data
  const jobData = JobsExperienceData[3];
  const [activeSection, setActiveSection] = useState("summary");

  // Main scroll container ref for animations
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Refs for each section
  const summaryRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  // More refined parallax effects with different speeds
  const headerParallax = useTransform(scrollYProgress, [0, 0.2], [0, -40]);
  const contentParallax = useTransform(scrollYProgress, [0, 0.3], [0, -30]);
  const projectsParallax = useTransform(scrollYProgress, [0.6, 0.9], [20, -20]);

  // Background elements parallax
  const bgElement1X = useTransform(scrollYProgress, [0, 1], [-20, 50]);
  const bgElement1Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const bgElement1Opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8],
    [0.1, 0.3, 0.2, 0]
  );

  const bgElement2X = useTransform(scrollYProgress, [0, 1], [30, -60]);
  const bgElement2Y = useTransform(scrollYProgress, [0, 1], [30, -80]);
  const bgElement2Opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 0.9],
    [0, 0.2, 0.3, 0.1]
  );

  // Rotation animation for decorative elements
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 180]);

  // Scale animations for sections
  const summaryScale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.3],
    [1, 1.02, 1]
  );
  const metricsScale = useTransform(
    scrollYProgress,
    [0.2, 0.4, 0.5],
    [0.98, 1.02, 1]
  );

  // Track which section is currently visible
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      if (
        summaryRef.current &&
        scrollPosition <
          summaryRef.current.offsetTop + summaryRef.current.offsetHeight
      ) {
        setActiveSection("summary");
      } else if (
        metricsRef.current &&
        scrollPosition <
          metricsRef.current.offsetTop + metricsRef.current.offsetHeight
      ) {
        setActiveSection("metrics");
      } else if (
        achievementsRef.current &&
        scrollPosition <
          achievementsRef.current.offsetTop +
            achievementsRef.current.offsetHeight
      ) {
        setActiveSection("achievements");
      } else if (projectsRef.current) {
        setActiveSection("projects");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Enhanced fade-in animations
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.7,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  };

  // Staggered item animations
  const staggerItems = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemFadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Early return if job data not found
  if (!jobData) {
    return (
      <section className="w-full h-auto min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl">Job data not found</h1>
        <Link href="/" className="mt-4 text-blue-500 hover:underline">
          Return home
        </Link>
      </section>
    );
  }

  return (
    <main
      ref={containerRef}
      className="w-full h-auto min-h-screen bg-j-deep-black text-j-celestial-white overflow-x-hidden"
    >
      {/* Progress Bar */}
      <ScrollProgressBar progress={scrollYProgress} />

      {/* Back button with hover effect */}
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:bg-pink-500/10 hover:border-pink-500/20 transition-all duration-300 group"
      >
        <motion.div
          whileHover={{ x: -3 }}
          className="text-white/70 group-hover:text-pink-400"
        >
          <ArrowLeft size={14} />
        </motion.div>
        <span className="text-xs group-hover:text-pink-400 transition-colors duration-300">
          Back
        </span>
      </Link>

      {/* Decorative background elements with parallax */}
      <motion.div
        className="fixed top-[20%] left-[10%] w-64 h-64 rounded-full bg-pink-500/5 blur-[100px] pointer-events-none"
        style={{
          x: bgElement1X,
          y: bgElement1Y,
          opacity: bgElement1Opacity,
        }}
      />

      <motion.div
        className="fixed bottom-[30%] right-[5%] w-80 h-80 rounded-full bg-pink-400/10 blur-[120px] pointer-events-none"
        style={{
          x: bgElement2X,
          y: bgElement2Y,
          opacity: bgElement2Opacity,
          rotate: rotation,
        }}
      />

      {/* Rotating grid pattern */}
      <motion.div
        className="fixed inset-0 bg-[linear-gradient(rgba(213,16,103,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(213,16,103,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"
        style={{
          rotate: useTransform(scrollYProgress, [0, 1], [0, 15]),
          scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]),
        }}
      />

      {/* CV Header with minimal design and enhanced parallax */}
      <motion.header
        style={{ y: headerParallax }}
        className="w-full pt-24 md:pt-32 pb-12 border-b border-white/10 relative"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-6">
            {/* Logo and Company */}
            <div className="md:col-span-3 flex flex-col items-center md:items-start">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative"
              >
                <motion.div
                  className="absolute inset-0 bg-pink-400/20 rounded-full blur-lg"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                <Image
                  src="/assets/jobs/worldskills-logo.svg"
                  alt="WorldSkills Logo"
                  width={120}
                  height={80}
                  className="w-auto h-24 relative z-10"
                />
              </motion.div>
            </div>

            {/* Title and Role */}
            <div className="md:col-span-6 flex flex-col items-center md:items-start text-center md:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-pink-200 to-pink-400 text-transparent bg-clip-text"
              >
                {jobData.companyName}
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                className="text-xl md:text-2xl font-light text-white/70 mt-2"
              >
                {jobData.role}
              </motion.h2>
            </div>

            {/* Timeline */}
            <div className="md:col-span-3 flex flex-col items-center md:items-end">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                className="flex items-center gap-2 text-pink-400/80 font-mono"
              >
                <Calendar size={14} />
                <span className="text-sm">
                  {jobData.yearFrom} — {jobData.yearTo}
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                className="flex items-center gap-2 text-white/40 mt-2 text-xs"
              >
                <Clock size={12} />
                <span>Regional to International Journey</span>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main CV content with editorial grid layout */}
      <section className="w-full">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-12 relative">
          {/* Summary Section */}
          <motion.div
            ref={summaryRef}
            style={{
              y: contentParallax,
              scale: summaryScale,
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="border-b border-white/10 pb-16 mb-16 pt-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-6">
              <motion.div
                className="md:col-span-3 relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              >
                <div className="sticky top-32">
                  <h3 className="text-xs font-mono tracking-widest text-pink-400 uppercase">
                    Competition Summary
                  </h3>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: 40 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="h-0.5 bg-pink-400/30 mt-4"
                  />
                </div>
              </motion.div>

              <div className="md:col-span-9">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.4,
                    ease: "easeOut",
                  }}
                  className="text-2xl md:text-3xl font-medium text-white/90 leading-relaxed mb-8"
                >
                  {jobData.mission}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.6,
                    ease: "easeOut",
                  }}
                  className="relative overflow-hidden rounded-xl"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-pink-700/5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                  />

                  <div className="p-6 border border-pink-500/20 backdrop-blur-sm relative z-10">
                    <h4 className="text-xl font-semibold text-pink-300 mb-3">
                      About WorldSkills
                    </h4>
                    <p className="text-white/70 leading-relaxed">
                      WorldSkills Competitions are the gold standard of skills
                      excellence. They inspire young competitors to reach new
                      heights, helping them turn their passion into a
                      profession. The competition journey spans from regional
                      qualifiers to national championships, culminating in
                      international competitions where the world's best young
                      professionals showcase their talents. Beyond competition,
                      WorldSkills develops skills through global training
                      standards and benchmarking systems, while influencing
                      industry, government, and educators through cooperation
                      and research — building a global platform of skills for
                      all.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Two-column layout for Key Metrics and Skills */}
          <motion.div
            ref={metricsRef}
            style={{ scale: metricsScale }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerItems}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24"
          >
            {/* Key Metrics / Stats */}
            <div className="md:col-span-5 border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0 md:pr-8">
              <motion.div
                variants={itemFadeIn}
                className="flex items-center gap-2 mb-6"
              >
                <h3 className="text-xs font-mono tracking-widest text-pink-400 uppercase">
                  Competition Metrics
                </h3>
                <motion.div
                  className="h-px flex-grow bg-pink-400/20"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </motion.div>

              <div className="grid grid-cols-2 gap-6">
                {[
                  {
                    icon: <Award size={16} className="text-pink-300" />,
                    label: "Competition Levels",
                    value: "4",
                    description: "Regional to Global",
                  },
                  {
                    icon: <Users size={16} className="text-pink-300" />,
                    label: "Global Competitors",
                    value: "63+",
                    description: "Web Technologies",
                  },
                  {
                    icon: <Code size={16} className="text-pink-300" />,
                    label: "Tech Stack",
                    value: jobData.technologies.length,
                    description: "Core technologies",
                  },
                  {
                    icon: <Lightbulb size={16} className="text-pink-300" />,
                    label: "Test Projects",
                    value: "12+",
                    description: "Competitive modules",
                  },
                ].map((metric, index) => (
                  <motion.div
                    key={index}
                    variants={itemFadeIn}
                    className="flex flex-col"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <motion.div
                        className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500/20 to-pink-600/30 flex items-center justify-center"
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "rgba(213, 16, 103, 0.3)",
                        }}
                      >
                        {metric.icon}
                      </motion.div>
                      <span className="text-white/60 text-xs">
                        {metric.label}
                      </span>
                    </div>
                    <motion.span
                      className="text-3xl font-semibold"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    >
                      {metric.value}
                    </motion.span>
                    <span className="text-white/40 text-xs mt-1">
                      {metric.description}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Skills Matrix / Tech Stack */}
            <div className="md:col-span-7 md:pl-8">
              <motion.div
                variants={itemFadeIn}
                className="flex items-center justify-between mb-6"
              >
                <h3 className="text-xs font-mono tracking-widest text-pink-400 uppercase">
                  Technology Stack
                </h3>
                <div className="flex items-center gap-1.5">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-pink-500/40"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                  <span className="text-xs text-white/50">
                    Competition technologies
                  </span>
                </div>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {jobData.technologies.map((tech, index) => (
                  <motion.div
                    key={index}
                    variants={itemFadeIn}
                    custom={index}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(213, 16, 103, 0.08)",
                      borderColor: "rgba(213, 16, 103, 0.4)",
                    }}
                    className="flex items-center gap-2 p-3 border border-white/10 rounded-lg bg-white/[0.03] transition-all duration-300 group"
                  >
                    <motion.div
                      className="w-6 h-6 rounded-md bg-gradient-to-br from-pink-500/20 to-pink-600/20 flex items-center justify-center"
                      whileHover={{
                        rotate: [0, 10, -10, 0],
                        transition: { duration: 0.5 },
                      }}
                    >
                      {tech.iconUrl ? (
                        <Image
                          src={tech.iconUrl}
                          alt={tech.name}
                          width={12}
                          height={12}
                        />
                      ) : (
                        <Code size={12} className="text-pink-400/80" />
                      )}
                    </motion.div>
                    <span className="text-white/80 text-xs group-hover:text-pink-300 transition-colors duration-300">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Key Achievements - CV-style with timeline */}
          <motion.div
            ref={achievementsRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerItems}
            className="mb-24 border-b border-white/10 pb-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-6">
              <motion.div variants={itemFadeIn} className="md:col-span-3">
                <div className="sticky top-32">
                  <h3 className="text-xs font-mono tracking-widest text-pink-400 uppercase mb-4">
                    WorldSkills Pillars
                  </h3>
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: 100 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="w-px h-24 bg-gradient-to-b from-pink-400/50 to-transparent ml-1"
                  />
                  <div className="flex items-center gap-2 text-xs text-white/50 mt-4">
                    <Award className="text-pink-400/80" size={14} />
                    <span>Foundation of excellence</span>
                  </div>
                </div>
              </motion.div>

              <div className="md:col-span-9">
                <div className="relative border-l border-white/10 pl-8 ml-2 space-y-12">
                  {[
                    {
                      title: "Inspire",
                      description:
                        "WorldSkills inspires young people to develop a passion for skills and pursue excellence through competitions and promotions. As a competitor, I was motivated to push my technical boundaries, mastering both creative and engineering aspects of web development while performing under pressure in front of audiences and judges.",
                    },
                    {
                      title: "Develop",
                      description:
                        "The competition develops skills through global training standards and benchmarking systems that enhance industry engagement. Training for WorldSkills improved my technical precision, time management, problem-solving abilities, and adaptability to work with varied technologies and requirements.",
                    },
                    {
                      title: "Influence",
                      description:
                        "WorldSkills influences industry, government, and educators through cooperation and research — building a global platform of skills for all. Participating in this global movement connected me with industry experts, educational leaders, and fellow competitors, creating a professional network spanning multiple countries.",
                    },
                    {
                      title: "Web Technologies Skill",
                      description:
                        "Web design and development is one of the most complex and diverse skills in the competition. It requires establishing professional relationships with clients, deep understanding of requirements, strong design and communication skills, and technical abilities to create databases, build programs, test and debug websites under tight deadlines.",
                    },
                  ].map((achievement, index) => (
                    <motion.div
                      key={index}
                      variants={itemFadeIn}
                      className="relative"
                    >
                      {/* Timeline connector */}
                      <motion.div
                        className="absolute left-[-41px] w-[40px] h-[1px] bg-white/20"
                        initial={{ width: 0 }}
                        whileInView={{ width: 40 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.2 }}
                      />

                      <div className="relative">
                        <motion.h4
                          className="text-xl font-semibold text-pink-300 mb-3"
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.7,
                            delay: 0.3 + index * 0.2,
                          }}
                        >
                          {achievement.title}
                        </motion.h4>
                        <motion.p
                          className="text-white/70 leading-relaxed"
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.7,
                            delay: 0.4 + index * 0.2,
                          }}
                        >
                          {achievement.description}
                        </motion.p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Projects - Compact editorial style */}
          <motion.div
            ref={projectsRef}
            style={{ y: projectsParallax }}
            className="mb-24"
          >
            <motion.div
              className="flex items-center gap-3 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-2xl font-semibold text-white">
                Competition Journey
              </h2>
              <motion.div
                className="h-px flex-grow bg-gradient-to-r from-pink-500/30 to-transparent"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
              />
            </motion.div>

            <div className="space-y-24">
              {[
                {
                  title: "Phase 1: Regional Competitions",
                  description:
                    "Started the WorldSkills journey at the local level, competing against skilled peers from my region.",
                  solution:
                    "Demonstrated proficiency in core web technologies through timed test projects that evaluated both technical skills and creativity. Successfully secured first place, earning advancement to the national level competition and establishing a foundation for progressive technical development.",
                },
                {
                  title: "Phase 2: National Championships",
                  description:
                    "Represented my region at Colombia's national WorldSkills competition, facing the country's most talented web developers.",
                  solution:
                    "Competed in multi-day challenges that tested full-stack abilities, design thinking, and performance under pressure. Won the gold medal in the Web Technologies skill, becoming the national champion and qualifying to represent Colombia at international competitions.",
                },
                {
                  title: "Phase 3: WorldSkills Americas",
                  description:
                    "Competed against champions from countries across the Americas region, raising the technical difficulty and performance standards.",
                  solution:
                    "Completed complex projects with stricter requirements and tighter time constraints than previous levels. Secured a silver medal (2nd place) at the continental level, demonstrating Colombia's competitive capabilities in web development on an international stage.",
                },
                {
                  title: "Phase 4: WorldSkills International",
                  description:
                    "Represented Colombia at the global skills Olympics in South Korea, competing against the world's elite young web developers.",
                  solution:
                    "Underwent intensive preparation with international experts, followed by four days of rigorous competition at the highest level. Achieved 14th place globally, gaining invaluable experience through cultural exchange and technical mastery while establishing connections with industry leaders and fellow competitors worldwide.",
                },
              ].map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.1 * index }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 relative"
                >
                  {/* Background accent */}
                  <motion.div
                    className="absolute top-[-20px] bottom-[-20px] inset-x-[-20px] bg-pink-500/[0.02] rounded-xl -z-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    style={{ rotateZ: index % 2 === 0 ? -1 : 1 }}
                  />

                  {/* Project number */}
                  <div className="md:col-span-1 flex md:justify-end items-start pt-1">
                    <motion.span
                      className="text-xs font-mono text-pink-400/80 bg-pink-500/10 py-1 px-2 rounded"
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "rgba(213, 16, 103, 0.2)",
                      }}
                    >
                      {(index + 1).toString().padStart(2, "0")}
                    </motion.span>
                  </div>

                  {/* Project details */}
                  <div className="md:col-span-11">
                    <motion.h3
                      className="text-2xl font-semibold text-pink-300 mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      {phase.title}
                    </motion.h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <h4 className="text-xs uppercase tracking-wider text-pink-400/60 mb-2">
                          Level
                        </h4>
                        <p className="text-white/70 leading-relaxed">
                          {phase.description}
                        </p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      >
                        <h4 className="text-xs uppercase tracking-wider text-pink-400/60 mb-2">
                          Achievement
                        </h4>
                        <p className="text-white/70 leading-relaxed">
                          {phase.solution}
                        </p>
                      </motion.div>
                    </div>

                    {/* Competition level indicator */}
                    <motion.div
                      className="flex items-center gap-2 mt-6 text-xs text-white/50"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      <div className="h-px w-8 bg-pink-500/30"></div>
                      <span>
                        {index === 0
                          ? "Local Level"
                          : index === 1
                          ? "National Level"
                          : index === 2
                          ? "Continental Level"
                          : "Global Level"}
                      </span>
                      <div className="ml-auto px-2 py-1 rounded bg-white/5 border border-white/10">
                        {index === 0
                          ? "Gold Medal"
                          : index === 1
                          ? "Gold Medal"
                          : index === 2
                          ? "Silver Medal"
                          : "14th Place"}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Key Projects Section */}
          <motion.div style={{ y: projectsParallax }} className="mb-24">
            <motion.div
              className="flex items-center gap-3 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-2xl font-semibold text-white">
                International Training
              </h2>
              <motion.div
                className="h-px flex-grow bg-gradient-to-r from-pink-500/30 to-transparent"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
              />
            </motion.div>

            <div className="space-y-24">
              {jobData.projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.1 * index }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 relative"
                >
                  {/* Background accent */}
                  <motion.div
                    className="absolute top-[-20px] bottom-[-20px] inset-x-[-20px] bg-pink-500/[0.02] rounded-xl -z-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    style={{ rotateZ: index % 2 === 0 ? -1 : 1 }}
                  />

                  {/* Project number */}
                  <div className="md:col-span-1 flex md:justify-end items-start pt-1">
                    <motion.span
                      className="text-xs font-mono text-pink-400/80 bg-pink-500/10 py-1 px-2 rounded"
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "rgba(213, 16, 103, 0.2)",
                      }}
                    >
                      {(index + 1).toString().padStart(2, "0")}
                    </motion.span>
                  </div>

                  {/* Project details */}
                  <div className="md:col-span-11">
                    <motion.h3
                      className="text-2xl font-semibold text-pink-300 mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      {project.title}
                    </motion.h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <h4 className="text-xs uppercase tracking-wider text-pink-400/60 mb-2">
                          Challenge
                        </h4>
                        <p className="text-white/70 leading-relaxed">
                          {project.description}
                        </p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      >
                        <h4 className="text-xs uppercase tracking-wider text-pink-400/60 mb-2">
                          Solution
                        </h4>
                        <p className="text-white/70 leading-relaxed">
                          {project.solution}
                        </p>
                      </motion.div>
                    </div>

                    {/* Project tags */}
                    <motion.div
                      className="flex items-center gap-2 mt-6 text-xs text-white/50"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      <div className="h-px w-8 bg-pink-500/30"></div>
                      <span>
                        {index === 0
                          ? "Frontend & Backend"
                          : index === 1
                          ? "Content Management"
                          : "User Experience & Data"}
                      </span>
                      <div className="ml-auto px-2 py-1 rounded bg-white/5 border border-white/10">
                        {index === 0
                          ? "Time-constrained Challenge"
                          : index === 1
                          ? "Modular Development"
                          : "Client Requirements"}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bottom navigation with enhanced animations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex justify-between items-center pt-8 border-t border-white/10"
          >
            <motion.div whileHover={{ x: -5 }} transition={{ duration: 0.3 }}>
              <Link
                href="/jobs/certiblock"
                className="flex items-center gap-2 text-xs text-white/60 hover:text-emerald-400 transition-colors duration-300"
              >
                <ArrowLeft size={12} />
                <span>Certiblock</span>
              </Link>
            </motion.div>

            <motion.div
              className="text-center"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-xs text-white/40">J Studio</span>
            </motion.div>

            <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.3 }}>
              <Link
                href="/learning/platzi-master"
                className="text-xs text-white/60 hover:text-[#07e98a] transition-colors duration-300"
              >
                Next: Platzi Master →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
