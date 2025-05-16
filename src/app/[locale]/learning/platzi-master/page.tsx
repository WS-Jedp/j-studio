"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  GraduationCap,
  Users,
  Code,
  Lightbulb,
  Award,
} from "lucide-react";
import { ScrollProgressBar } from "@/components/scrollProgression";
import { useLocale, useTranslations } from "next-intl";
import { JobsExperienceData } from "@/data/jobs";

export default function PlatziMaster() {
  const locale = useLocale();
  const beereadersData = JobsExperienceData[3];
  const t = useTranslations("platzi-master");
  const jobData = {
    ...beereadersData,
    ...t.raw("data"),
  } as any; // Cast to any to avoid type errors for now
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
        <h1 className="text-4xl">{t("notFound.title")}</h1>
        <Link href="/" className="mt-4 text-blue-500 hover:underline">
          {t("notFound.returnHome")}
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
      <ScrollProgressBar progress={scrollYProgress} color="bg-[#07e98a]/40" />

      {/* Back button with hover effect */}
      <Link
        href={`/${locale}`}
        className="fixed top-6 left-6 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:bg-teal-500/10 hover:border-teal-500/20 transition-all duration-300 group"
      >
        <motion.div
          whileHover={{ x: -3 }}
          className="text-white/70 group-hover:text-teal-400"
        >
          <ArrowLeft size={14} />
        </motion.div>
        <span className="text-xs group-hover:text-teal-400 transition-colors duration-300">
          {t("pageText.backButton")}
        </span>
      </Link>

      {/* Decorative background elements with parallax */}
      <motion.div
        className="fixed top-[20%] left-[10%] w-64 h-64 rounded-full bg-teal-500/5 blur-[100px] pointer-events-none"
        style={{
          x: bgElement1X,
          y: bgElement1Y,
          opacity: bgElement1Opacity,
        }}
      />

      <motion.div
        className="fixed bottom-[30%] right-[5%] w-80 h-80 rounded-full bg-teal-400/10 blur-[120px] pointer-events-none"
        style={{
          x: bgElement2X,
          y: bgElement2Y,
          opacity: bgElement2Opacity,
          rotate: rotation,
        }}
      />

      {/* Rotating grid pattern */}
      <motion.div
        className="fixed inset-0 bg-[linear-gradient(rgba(20,184,166,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"
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
                  className="absolute inset-0 bg-teal-400/20 rounded-full blur-lg"
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
                <svg
                  width="210px"
                  height="120px"
                  fill="none"
                  viewBox="0 0 142 32"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    color: "#07e98a",
                  }}
                >
                  <g fill="#0AE98A">
                    <path d="M25.334 25.135V6.106h8.77c1.897 0 3.355.555 4.386 1.663s1.546 2.606 1.546 4.473-.515 3.364-1.546 4.473c-1.03 1.108-2.499 1.662-4.385 1.662H28.63v6.748h-3.306zm3.306-9.675h5.26c.837 0 1.488-.214 1.965-.651q.7-.657.7-1.867v-1.39c0-.807-.234-1.44-.7-1.867-.467-.438-1.119-.652-1.965-.652h-5.26v6.437zm32.797 9.675c-.836 0-1.478-.243-1.935-.72-.447-.476-.72-1.088-.816-1.827h-.146c-.292.953-.827 1.682-1.604 2.168q-1.165.73-2.84.73-2.362-.001-3.646-1.226c-.856-.817-1.274-1.925-1.274-3.306 0-1.517.554-2.664 1.653-3.423q1.648-1.137 4.842-1.137h2.752V15.11q0-1.398-.758-2.168c-.506-.506-1.294-.759-2.373-.759q-1.34 0-2.197.584a5.2 5.2 0 0 0-1.43 1.488l-1.906-1.721c.506-.856 1.216-1.566 2.14-2.12.914-.554 2.12-.836 3.597-.836 1.974 0 3.481.457 4.531 1.37 1.05.915 1.576 2.237 1.576 3.948v7.633h1.604v2.606h-1.789zM55 23.055c.992 0 1.819-.224 2.46-.662.642-.437.963-1.03.963-1.77v-2.197H55.73c-2.207 0-3.306.68-3.306 2.052v.525c0 .68.233 1.196.69 1.536s1.09.515 1.887.515m18.689 2.08v-2.577l8.158-10.034h-7.895V9.879l11.668.039v2.46l-8.275 10.151h8.479v2.606zm-29.841.01a1.89 1.89 0 0 1-1.896-1.896V6.126h3.189v16.413h2.11v2.606zM89.11 8.022a1.896 1.896 0 1 0 0-3.792 1.896 1.896 0 0 0 0 3.792M63.499 9.889h-.282v2.645h2.44v9.305c0 1.05.282 1.867.846 2.44.564.574 1.4.866 2.519.866h2.78v-2.606h-2.955V12.534h3.189V9.889h-3.19V6.106h-2.868v1.887c0 1.04-.846 1.886-1.886 1.886h-.593zm24.017.039h3.19v15.207h-3.19z"></path>
                    <path
                      fillRule="evenodd"
                      d="m9.65 4.803-8.07 8.07a3.81 3.81 0 0 0 0 5.388l8.08 8.08a3.81 3.81 0 0 0 5.387 0l2.693-2.694-2.693-2.693-2.694 2.693-8.08-8.08 8.07-8.07 5.387 5.387-5.387 5.386 2.694 2.694 5.387-5.387a3.81 3.81 0 0 0 0-5.387l-5.387-5.387a3.81 3.81 0 0 0-5.387 0"
                      clipRule="evenodd"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="platzi-logo-new_svg__a">
                      <path fill="#fff" d="M.461 0h91.077v32H.461z"></path>
                    </clipPath>
                  </defs>
                </svg>
              </motion.div>
            </div>

            {/* Title and Role */}
            <div className="md:col-span-6 flex flex-col items-center md:items-start text-center md:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-teal-200 to-teal-400 text-transparent bg-clip-text"
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
                className="flex items-center gap-2 text-teal-400/80 font-mono"
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
                className="gap-2 w-auto text-white/40 mt-2 text-xs text-right"
              >
                <Clock size={12} className="inline-flex mr-2" />
                <span>{t("pageText.headerTimeline")}</span>
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
                  <h3 className="text-xs font-mono tracking-widest text-teal-400 uppercase">
                    {t("pageText.summarySection.title")}
                  </h3>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: 40 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="h-0.5 bg-teal-400/30 mt-4"
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
                    className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-teal-700/5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                  />

                  <div className="p-6 border border-teal-500/20 backdrop-blur-sm relative z-10">
                    <h4 className="text-xl font-semibold text-teal-300 mb-3">
                      {t("pageText.summarySection.aboutTitle")}
                    </h4>
                    <p className="text-white/70 leading-relaxed">
                      {t("pageText.summarySection.aboutDescription")}
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
                <h3 className="text-xs font-mono tracking-widest text-teal-400 uppercase">
                  {t("pageText.metricsSection.title")}
                </h3>
                <motion.div
                  className="h-px flex-grow bg-teal-400/20"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </motion.div>

              <div className="grid grid-cols-2 gap-6">
                {[
                  {
                    icon: <GraduationCap size={16} className="text-teal-300" />,
                    label: t("pageText.metricsSection.durationLabel"),
                    value: t("pageText.metricsSection.durationValue"),
                    description: t(
                      "pageText.metricsSection.durationDescription"
                    ),
                  },
                  {
                    icon: <Users size={16} className="text-teal-300" />,
                    label: t("pageText.metricsSection.participantsLabel"),
                    value: t("pageText.metricsSection.participantsValue"),
                    description: t(
                      "pageText.metricsSection.participantsDescription"
                    ),
                  },
                  {
                    icon: <Code size={16} className="text-teal-300" />,
                    label: t("pageText.metricsSection.techStackLabel"),
                    value: jobData.technologies.length,
                    description: t(
                      "pageText.metricsSection.techStackDescription"
                    ),
                  },
                  {
                    icon: <Lightbulb size={16} className="text-teal-300" />,
                    label: t("pageText.metricsSection.projectsLabel"),
                    value: t("pageText.metricsSection.projectsValue"),
                    description: t(
                      "pageText.metricsSection.projectsDescription"
                    ),
                  },
                ].map((metric, index) => (
                  <motion.div
                    key={index}
                    variants={itemFadeIn}
                    className="flex flex-col"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <motion.div
                        className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500/20 to-teal-600/30 flex items-center justify-center"
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "rgba(20, 184, 166, 0.3)",
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
                <h3 className="text-xs font-mono tracking-widest text-teal-400 uppercase">
                  {t("pageText.techStackSection.title")}
                </h3>
                <div className="flex items-center gap-1.5">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-teal-500/40"
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
                    {t("pageText.techStackSection.coreCompetencies")}
                  </span>
                </div>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {jobData.technologies.map((tech: any, index: number) => (
                  <motion.div
                    key={index}
                    variants={itemFadeIn}
                    custom={index}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(20, 184, 166, 0.08)",
                      borderColor: "rgba(20, 184, 166, 0.4)",
                    }}
                    className="flex items-center gap-2 p-3 border border-white/10 rounded-lg bg-white/[0.03] transition-all duration-300 group"
                  >
                    <motion.div
                      className="w-6 h-6 rounded-md bg-gradient-to-br from-teal-500/20 to-teal-600/20 flex items-center justify-center"
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
                        <Code size={12} className="text-teal-400/80" />
                      )}
                    </motion.div>
                    <span className="text-white/80 text-xs group-hover:text-teal-300 transition-colors duration-300">
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
                  <h3 className="text-xs font-mono tracking-widest text-teal-400 uppercase mb-4">
                    {t("pageText.programComponentsSection.title")}
                  </h3>
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: 100 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="w-px h-24 bg-gradient-to-b from-teal-400/50 to-transparent ml-1"
                  />
                  <div className="flex items-center gap-2 text-xs text-white/50 mt-4">
                    <Award className="text-teal-400/80" size={14} />
                    <span>
                      {t("pageText.programComponentsSection.coreCurriculum")}
                    </span>
                  </div>
                </div>
              </motion.div>

              <div className="md:col-span-9">
                <div className="relative border-l border-white/10 pl-8 ml-2 space-y-12">
                  {(
                    t.raw(
                      "pageText.programComponentsSection.components"
                    ) as any[]
                  ).map((achievement, index) => (
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
                          className="text-xl font-semibold text-teal-300 mb-3"
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
                {t("pageText.programPhasesSection.title")}
              </h2>
              <motion.div
                className="h-px flex-grow bg-gradient-to-r from-teal-500/30 to-transparent"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
              />
            </motion.div>

            <div className="space-y-24">
              {(t.raw("pageText.programPhasesSection.phases") as any[]).map(
                (phase, index) => (
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
                      className="absolute top-[-20px] bottom-[-20px] inset-x-[-20px] bg-teal-500/[0.02] rounded-xl -z-10"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      style={{ rotateZ: index % 2 === 0 ? -1 : 1 }}
                    />

                    {/* Project number */}
                    <div className="md:col-span-1 flex md:justify-end items-start pt-1">
                      <motion.span
                        className="text-xs font-mono text-teal-400/80 bg-teal-500/10 py-1 px-2 rounded"
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "rgba(20, 184, 166, 0.2)",
                        }}
                      >
                        {(index + 1).toString().padStart(2, "0")}
                      </motion.span>
                    </div>

                    {/* Project details */}
                    <div className="md:col-span-11">
                      <motion.h3
                        className="text-2xl font-semibold text-teal-300 mb-4"
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
                          <h4 className="text-xs uppercase tracking-wider text-teal-400/60 mb-2">
                            {phase.purposeLabel}
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
                          <h4 className="text-xs uppercase tracking-wider text-teal-400/60 mb-2">
                            {phase.processLabel}
                          </h4>
                          <p className="text-white/70 leading-relaxed">
                            {phase.solution}
                          </p>
                        </motion.div>
                      </div>

                      {/* Project timeline/type indicator */}
                      <motion.div
                        className="flex items-center gap-2 mt-6 text-xs text-white/50"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                      >
                        <div className="h-px w-8 bg-teal-500/30"></div>
                        <span>{phase.timelineLabel}</span>
                        <div className="ml-auto px-2 py-1 rounded bg-white/5 border border-white/10">
                          {phase.timelineDetail}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                )
              )}
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
                {t("pageText.keyProjectsSection.title")}
              </h2>
              <motion.div
                className="h-px flex-grow bg-gradient-to-r from-teal-500/30 to-transparent"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
              />
            </motion.div>

            <div className="space-y-24">
              {t.raw("data.projects").map((project: any, index: number) => (
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
                    className="absolute top-[-20px] bottom-[-20px] inset-x-[-20px] bg-teal-500/[0.02] rounded-xl -z-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    style={{ rotateZ: index % 2 === 0 ? -1 : 1 }}
                  />

                  {/* Project number */}
                  <div className="md:col-span-1 flex md:justify-end items-start pt-1">
                    <motion.span
                      className="text-xs font-mono text-teal-400/80 bg-teal-500/10 py-1 px-2 rounded"
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "rgba(20, 184, 166, 0.2)",
                      }}
                    >
                      {(index + 1).toString().padStart(2, "0")}
                    </motion.span>
                  </div>

                  {/* Project details */}
                  <div className="md:col-span-11">
                    <motion.h3
                      className="text-2xl font-semibold text-teal-300 mb-4"
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
                        <h4 className="text-xs uppercase tracking-wider text-teal-400/60 mb-2">
                          {t("pageText.keyProjectsSection.challengeLabel")}
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
                        <h4 className="text-xs uppercase tracking-wider text-teal-400/60 mb-2">
                          {t("pageText.keyProjectsSection.outcomeLabel")}
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
                      <div className="h-px w-8 bg-teal-500/30"></div>
                      <span>
                        {(
                          t.raw(
                            "pageText.keyProjectsSection.projectTags"
                          ) as any[]
                        )[index]?.tagLine || ""}
                      </span>
                      <div className="ml-auto px-2 py-1 rounded bg-white/5 border border-white/10">
                        {(
                          t.raw(
                            "pageText.keyProjectsSection.projectTags"
                          ) as any[]
                        )[index]?.tagDetail || ""}
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
                href={`/${locale}/learning/worldskills`}
                className="flex items-center gap-2 text-xs text-white/60 hover:text-pink-400 transition-colors duration-300"
              >
                <ArrowLeft size={12} />
                <span>{t("pageText.navigation.prevPageName")}</span>
              </Link>
            </motion.div>

            <motion.div
              className="flex flex-col items-center text-center"
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/assets/icons/j-icon.png"
                alt="J Studio Logo"
                width={42}
                height={42}
                className="w-10 h-10   mb-1"
              />
              <span className="text-xs text-white/40">
                {t("pageText.navigation.jStudio")}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
