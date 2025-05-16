"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { JobsExperienceData } from "@/data/jobs";
import Link from "next/link";
import { ArrowLeft, Calendar, Code, Clock, Award, BriefcaseBusiness, BookOpenCheck, BarChart3, ChevronDown } from "lucide-react";
import { ScrollProgressBar } from "@/components/scrollProgression";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

export default function Beereaders() {
  const t = useTranslations("beereaders");
  const locale = useLocale();


  const jobData = {
    ...JobsExperienceData[1],
    companyName: t("companyName"),
    role: t("role"),
    mission: t("mission"),
    keyAchievements: t.raw("keyAchievements"),
    projects: t.raw("projects"),
  };

  const [activeSection, setActiveSection] = useState("summary");
  
  // Main scroll container ref for animations
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
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
  const bgElement1Opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8], [0.1, 0.3, 0.2, 0]);
  
  const bgElement2X = useTransform(scrollYProgress, [0, 1], [30, -60]);
  const bgElement2Y = useTransform(scrollYProgress, [0, 1], [30, -80]);
  const bgElement2Opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.9], [0, 0.2, 0.3, 0.1]);

  // Rotation animation for decorative elements
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 180]);
  
  // Scale animations for sections
  const summaryScale = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1.02, 1]);
  const metricsScale = useTransform(scrollYProgress, [0.2, 0.4, 0.5], [0.98, 1.02, 1]);
  
  // Track which section is currently visible
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      if (summaryRef.current && scrollPosition < summaryRef.current.offsetTop + summaryRef.current.offsetHeight) {
        setActiveSection("summary");
      } else if (metricsRef.current && scrollPosition < metricsRef.current.offsetTop + metricsRef.current.offsetHeight) {
        setActiveSection("metrics");
      } else if (achievementsRef.current && scrollPosition < achievementsRef.current.offsetTop + achievementsRef.current.offsetHeight) {
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
        ease: [0.215, 0.61, 0.355, 1]
      }
    })
  };

  // Staggered item animations
  const staggerItems = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemFadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Early return if job data not found
  if (!jobData) {
    return (
      <section className="w-full h-auto min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl">{t("jobDataNotFound")}</h1>
        <Link href="/" className="mt-4 text-blue-500 hover:underline">{t("returnHome")}</Link>
      </section>
    );
  }

  return (
    <main ref={containerRef} className="w-full h-auto min-h-screen bg-j-deep-black text-j-celestial-white overflow-x-hidden">
      {/* Progress Bar */}
      <ScrollProgressBar color="bg-[#ffcf01]/30" progress={scrollYProgress} />

      {/* Back button with hover effect */}
      <Link 
        href={`/${locale}`} 
        className="fixed top-6 left-6 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:bg-yellow-500/10 hover:border-yellow-500/20 transition-all duration-300 group"
      >
        <motion.div
          whileHover={{ x: -3 }}
          className="text-white/70 group-hover:text-yellow-400"
        >
          <ArrowLeft size={14} />
        </motion.div>
        <span className="text-xs group-hover:text-yellow-400 transition-colors duration-300">{t("backToPortfolio")}</span>
      </Link>

      {/* Decorative background elements with parallax */}
      <motion.div 
        className="fixed top-[20%] left-[10%] w-64 h-64 rounded-full bg-yellow-500/5 blur-[100px] pointer-events-none"
        style={{ 
          x: bgElement1X,
          y: bgElement1Y,
          opacity: bgElement1Opacity
        }}
      />
      
      <motion.div 
        className="fixed bottom-[30%] right-[5%] w-80 h-80 rounded-full bg-yellow-400/10 blur-[120px] pointer-events-none"
        style={{ 
          x: bgElement2X,
          y: bgElement2Y,
          opacity: bgElement2Opacity,
          rotate: rotation
        }}
      />
      
      {/* Rotating grid pattern */}
      <motion.div 
        className="fixed inset-0 bg-[linear-gradient(rgba(255,207,1,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,207,1,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"
        style={{ 
          rotate: useTransform(scrollYProgress, [0, 1], [0, 15]),
          scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1])
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
                  className="absolute inset-0 bg-yellow-400/20 rounded-full blur-lg"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                <Image 
                  src="/assets/jobs/beereaders-logo.svg"
                  alt="BeeReaders Logo"
                  width={130}
                  height={90}
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
                className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-yellow-200 to-yellow-400 text-transparent bg-clip-text"
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
                className="flex items-center gap-2 text-yellow-400/80 font-mono"
              >
                <Calendar size={14} />
                <span className="text-sm">{jobData.yearFrom} — {jobData.yearTo}</span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                className="flex items-center gap-2 text-white/40 mt-2 text-xs"
              >
                <Clock size={12} />
                <span>3 {t('experienceYears')}</span>
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              ease: "easeOut"
            }}
            style={{ 
              y: contentParallax,
              scale: summaryScale
            }}
            className="border-b border-white/10 pb-16 mb-16 pt-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-6">
              <motion.div 
                className="md:col-span-3 relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.7,
                  delay: 0.3,
                  ease: "easeOut"
                }}
              >
                <div className="sticky top-32">
                  <h3 className="text-xs font-mono tracking-widest text-yellow-400 uppercase">{t("summaryTitle")}</h3>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: 40 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="h-0.5 bg-yellow-400/30 mt-4"
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
                    ease: "easeOut"
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
                    ease: "easeOut"
                  }}
                  className="relative overflow-hidden rounded-xl"
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-yellow-700/5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                  />
                  
                  <div className="p-6 border border-yellow-500/20 backdrop-blur-sm relative z-10">
                    <h4 className="text-xl font-semibold text-yellow-300 mb-3">{t("aboutTitle")}</h4>
                    <p className="text-white/70 leading-relaxed">
                      {t("aboutDescription")}
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
                <h3 className="text-xs font-mono tracking-widest text-yellow-400 uppercase">{t("keyMetricsTitle")}</h3>
                <motion.div 
                  className="h-px flex-grow bg-yellow-400/20"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </motion.div>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { 
                    icon: <BarChart3 size={16} className="text-yellow-300" />,
                    label: t("schoolsLabel"),
                    value: t("schoolsValue"),
                    description: t("schoolsDescription")
                  },
                  { 
                    icon: <BriefcaseBusiness size={16} className="text-yellow-300" />,
                    label: t("projectsLabel"),
                    value: t("projectsValue"),
                    description: t("projectsDescription")
                  },
                  { 
                    icon: <Code size={16} className="text-yellow-300" />,
                    label: t("techStackLabel"),
                    value: jobData.technologies.length,
                    description: t("techStackDescription")
                  },
                  { 
                    icon: <BookOpenCheck size={16} className="text-yellow-300" />,
                    label: t("impactLabel"),
                    value: t("impactValue"),
                    description: t("impactDescription")
                  }
                ].map((metric, index) => (
                  <motion.div 
                    key={index}
                    variants={itemFadeIn}
                    className="flex flex-col"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <motion.div 
                        className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500/20 to-yellow-600/30 flex items-center justify-center"
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(250, 204, 21, 0.3)" }}
                      >
                        {metric.icon}
                      </motion.div>
                      <span className="text-white/60 text-xs">{metric.label}</span>
                    </div>
                    <motion.span 
                      className="text-3xl font-semibold"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                    >
                      {metric.value}
                    </motion.span>
                    <span className="text-white/40 text-xs mt-1">{metric.description}</span>
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
                <h3 className="text-xs font-mono tracking-widest text-yellow-400 uppercase">{t("techStackTitle")}</h3>
                <div className="flex items-center gap-1.5">
                  <motion.div 
                    className="w-2 h-2 rounded-full bg-yellow-500/40"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.4, 0.8, 0.4]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity
                    }}
                  />
                  <span className="text-xs text-white/50">{t("coreCompetencies")}</span>
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
                      backgroundColor: "rgba(250, 204, 21, 0.08)",
                      borderColor: "rgba(250, 204, 21, 0.4)"
                    }}
                    className="flex items-center gap-2 p-3 border border-white/10 rounded-lg bg-white/[0.03] transition-all duration-300 group"
                  >
                    <motion.div 
                      className="w-6 h-6 rounded-md bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 flex items-center justify-center"
                      whileHover={{ 
                        rotate: [0, 10, -10, 0],
                        transition: { duration: 0.5 }
                      }}
                    >
                      {tech.iconUrl ? (
                        <Image src={tech.iconUrl} alt={tech.name} width={12} height={12} />
                      ) : (
                        <Code size={12} className="text-yellow-400/80" />
                      )}
                    </motion.div>
                    <span className="text-white/80 text-xs group-hover:text-yellow-300 transition-colors duration-300">
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
              <motion.div 
                variants={itemFadeIn}
                className="md:col-span-3"
              >
                <div className="sticky top-32">
                  <h3 className="text-xs font-mono tracking-widest text-yellow-400 uppercase mb-4">{t("keyAchievementsTitle")}</h3>
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: 100 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="w-px h-24 bg-gradient-to-b from-yellow-400/50 to-transparent ml-1"
                  />
                  <div className="flex items-center gap-2 text-xs text-white/50 mt-4">
                    <Award className="text-yellow-400/80" size={14} />
                    <span>{t("notableContributions")}</span>
                  </div>
                </div>
              </motion.div>
              
              <div className="md:col-span-9">
                <div className="relative border-l border-white/10 pl-8 ml-2 space-y-12">
                  {jobData.keyAchievements.map((achievement: {title: string, description: string}, index: number) => (
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
                        transition={{ duration: 0.5, delay: 0.2 + (index * 0.2) }}
                      />
                      
                      <div className="relative">
                        <motion.h4 
                          className="text-xl font-semibold text-yellow-300 mb-3"
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, delay: 0.3 + (index * 0.2) }}
                        >
                          {achievement.title}
                        </motion.h4>
                        <motion.p 
                          className="text-white/70 leading-relaxed"
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, delay: 0.4 + (index * 0.2) }}
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
              <h2 className="text-2xl font-semibold text-white">{t("keyProjectsTitle")}</h2>
              <motion.div 
                className="h-px flex-grow bg-gradient-to-r from-yellow-500/30 to-transparent"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
              />
            </motion.div>
            
            <div className="space-y-24">
              {jobData.projects.map((project: {title: string, description: string, solution: string}, index: number) => (
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
                    className="absolute top-[-20px] bottom-[-20px] inset-x-[-20px] bg-yellow-500/[0.02] rounded-xl -z-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    style={{ rotateZ: index % 2 === 0 ? -1 : 1 }}
                  />
                  
                  {/* Project number */}
                  <div className="md:col-span-1 flex md:justify-end items-start pt-1">
                    <motion.span 
                      className="text-xs font-mono text-yellow-400/80 bg-yellow-500/10 py-1 px-2 rounded"
                      whileHover={{ 
                        scale: 1.1, 
                        backgroundColor: "rgba(250, 204, 21, 0.2)" 
                      }}
                    >
                      {(index + 1).toString().padStart(2, '0')}
                    </motion.span>
                  </div>
                  
                  {/* Project details */}
                  <div className="md:col-span-11">
                    <motion.h3 
                      className="text-2xl font-semibold text-yellow-300 mb-4"
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
                        <h4 className="text-xs uppercase tracking-wider text-yellow-400/60 mb-2">{t("challengeTitle")}</h4>
                        <p className="text-white/70 leading-relaxed">{project.description}</p>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      >
                        <h4 className="text-xs uppercase tracking-wider text-yellow-400/60 mb-2">{t("solutionTitle")}</h4>
                        <p className="text-white/70 leading-relaxed">{project.solution}</p>
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
                      <div className="h-px w-8 bg-yellow-500/30"></div>
                      <span>{index % 2 === 0 ? t("developmentProject") : t("productInitiative")}</span>
                      <div className="ml-auto px-2 py-1 rounded bg-white/5 border border-white/10">
                        {index % 3 === 0 ? t("timelineQ4") : index % 3 === 1 ? t("timelineQ2") : t("timelineQ1")}
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
                href={`/${locale}`}
                className="flex items-center gap-2 text-xs text-white/60 hover:text-yellow-400 transition-colors duration-300"
              >
                <ArrowLeft size={12} />
                <span>{t("portfolio")}</span>
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
              <Link href={`/${locale}/jobs/certiblock`} className="text-xs text-white/60 hover:text-green-400 transition-colors duration-300">
                {t("certiblock")} →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}