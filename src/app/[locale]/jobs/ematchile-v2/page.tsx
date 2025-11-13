"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ArrowLeft, Calendar, DollarSign, Clock, CheckCircle2, Zap, Globe, Shield, Target, Award } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParallax } from "@/hooks/useParallax";
import { AnimatedSection } from "@/components/animations/section";
import { ConfidentialMiddleware } from "@/containers/confidentialMiddleware";

export default function EmatChileV2Page() {
  const locale = useLocale();
  const t = useTranslations("emat-chile-v2");
  const tConfidential = useTranslations("confidential");
  const { ref: sectionRef, scrollY } = useParallax();

  // Get password from environment variable (using the same password as v1)
  const projectPassword = process.env.NEXT_PUBLIC_EMAT_CHILE_PASSWORD || "emat2025";

  // Phase data for easier management - updated with v2 specific icons and info
  const phases = [
    {
      id: "phase1",
      icon: <Target className="w-6 h-6" />,
      color: "from-j-celestial-blue to-j-celestial-cooper"
    },
    {
      id: "phase2", 
      icon: <Shield className="w-6 h-6" />,
      color: "from-j-celestial-cooper to-j-celestial-blue"
    },
    {
      id: "phase3",
      icon: <Globe className="w-6 h-6" />,
      color: "from-j-celestial-blue to-j-celestial-cooper"
    },
    {
      id: "phase4",
      icon: <Zap className="w-6 h-6" />,
      color: "from-j-celestial-cooper to-j-celestial-blue"
    },
    {
      id: "phase5",
      icon: <Target className="w-6 h-6" />,
      color: "from-j-celestial-blue to-j-celestial-cooper"
    },
    {
      id: "phase6",
      icon: <Globe className="w-6 h-6" />,
      color: "from-j-celestial-cooper to-j-celestial-blue"
    },
    {
      id: "phase7",
      icon: <CheckCircle2 className="w-6 h-6" />,
      color: "from-j-celestial-blue to-j-celestial-cooper"
    }
  ];

  // Updated tech categories for v2
  const techCategories = [
    { id: "cms", icon: <Globe className="w-5 h-5" /> },
    { id: "backend", icon: <Shield className="w-5 h-5" /> },
    { id: "frontend", icon: <Zap className="w-5 h-5" /> },
    { id: "design", icon: <Target className="w-5 h-5" /> },
    { id: "migration", icon: <Award className="w-5 h-5" /> },
    { id: "hosting", icon: <Globe className="w-5 h-5" /> },
    { id: "versioning", icon: <Shield className="w-5 h-5" /> },
    { id: "performance", icon: <CheckCircle2 className="w-5 h-5" /> }
  ];

  return (
    <ConfidentialMiddleware 
      projectPassword={projectPassword}
      projectName="EMAT Chile v2 Proposal"
      sessionTimeout={120} // 2 hours
    >
      <section
        ref={sectionRef}
        className="relative w-full flex flex-col justify-start bg-j-deep-black min-h-screen"
      >
        {/* Navigation */}
        <Link
          href={`/${locale}`}
          className="fixed top-8 left-8 z-50 flex items-center gap-2 text-j-celestial-white px-3 py-1 hover:bg-j-celestial-white/10 rounded-full transition-all duration-300 backdrop-blur-sm"
        >
          <ArrowLeft size={16} />
          <span className="font-medium">{t("navigation.back")}</span>
        </Link>

        {/* Hero Section */}
        <header className="w-full h-[90vh] flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <div
              className="absolute inset-0 bg-gradient-to-b from-j-deep-black/0 via-j-deep-black/60 to-j-deep-black"
              style={{
                opacity: `${0.3 + scrollY * 0.001}`,
              }}
            ></div>

            {/* Mesh gradient background */}
            <div className="absolute inset-0 opacity-20">
              <div
                className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-j-celestial-blue/30 blur-[100px]"
                style={{
                  transform: `translate(${scrollY * 0.03}px, ${-scrollY * 0.01}px)`,
                }}
              />
              <div
                className="absolute top-2/3 right-1/3 w-1/3 h-1/3 rounded-full bg-j-celestial-cooper/20 blur-[100px]"
                style={{
                  transform: `translate(${-scrollY * 0.02}px, ${scrollY * 0.02}px)`,
                }}
              />
            </div>
          </div>

          <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-row flex-nowrap items-center justify-start mb-6"
            >
              <Image
                src="/assets/icons/j-icon.png"
                alt="J-Studio Logo"
                width={51}
                height={51}
                className="object-cover"
                priority
              />
              <div className="flex flex-col items-start justify-center ml-2">
                <h2 className="font-black text-3xl text-j-celestial-white">J-Studio</h2>
                <h3 className="font-extralight text-sm mt-[-2px] text-j-celestial-white/70">
                  {t("hero.subtitle")}
                </h3>
              </div>
            </motion.article>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{
                transform: `translateY(${scrollY * 0.2}px) scale(${1 - scrollY * 0.0003})`,
                opacity: `${1 - scrollY * 0.2}`,
                letterSpacing: `${Math.min(scrollY * 0.03, 15)}px`,
              }}
              className="text-7xl md:text-9xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-br from-j-celestial-blue to-j-celestial-cooper mb-12"
            >
              {t("hero.title")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                transform: `translateY(${scrollY * 0.05}px)`,
                opacity: `${1 - scrollY * 0.0008}`,
              }}
              className="max-w-2xl text-center text-xl md:text-2xl font-light leading-relaxed text-j-celestial-white/90"
            >
              {t("hero.description")}
            </motion.p>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 md:px-12 pb-32 relative">
          {/* Tech line decorations */}
          <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-j-celestial-blue/10 to-transparent opacity-70"></div>
          <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-j-celestial-cooper/10 to-transparent opacity-70"></div>

          {/* Content sections */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-24 mt-16">
            {/* Large Quote */}
            <AnimatedSection className="md:col-span-full" animation="fadeIn">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-j-celestial-blue/20 to-transparent mb-24"></div>
              <blockquote className="text-3xl md:text-5xl text-j-celestial-white/80 font-light italic text-center max-w-4xl mx-auto">
                &ldquo;{t("mainContent.quote")}&rdquo;
              </blockquote>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-j-celestial-cooper/20 to-transparent mt-24"></div>
            </AnimatedSection>

            {/* Project Overview Section */}
            <AnimatedSection
              className="md:col-span-full flex flex-col mb-16"
              animation="fadeUp"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-8">
                
                <div className="md:col-span-4 md:col-start-2">
                  <span className="text-sm uppercase tracking-widest text-j-celestial-blue/60 mb-3 block">
                    {t("mainContent.overview.sectionTitle")}
                  </span>
                  <h2 className="text-4xl font-bold mb-6 text-j-celestial-white">
                    {t("mainContent.overview.title")}
                  </h2>
                </div>

                <div className="md:col-span-5 md:col-start-7">
                  <p className="text-j-celestial-white/80 leading-relaxed mb-6">
                    {t("mainContent.overview.description")}
                  </p>
                  <p className="text-j-celestial-white/70 leading-relaxed mb-4">
                    {t("mainContent.overview.focus")}
                  </p>
                  <div className="bg-j-celestial-blue/10 border border-j-celestial-blue/20 rounded-lg p-4">
                    <p className="text-j-celestial-blue text-sm font-medium">
                      {t("mainContent.overview.guarantee")}
                    </p>
                  </div>
                </div>

                {/* Objective */}
                <div className="md:col-span-3 md:col-start-2 relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-j-celestial-blue to-j-celestial-cooper rounded-full"></div>
                  <span className="text-sm uppercase tracking-widest text-j-celestial-cooper/60 mb-3 block">
                    {t("mainContent.objective.sectionTitle")}
                  </span>
                  <h3 className="text-2xl font-bold mb-4 text-j-celestial-white">
                    {t("mainContent.objective.title")}
                  </h3>
                  <p className="text-j-celestial-white/70 text-sm leading-relaxed">
                    {t("mainContent.objective.description")}
                  </p>
                </div>

                <div className="md:col-span-3 relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-j-celestial-cooper to-j-celestial-blue rounded-full"></div>
                  <span className="text-sm uppercase tracking-widest text-j-celestial-blue/60 mb-3 block">
                    {t("mainContent.scope.sectionTitle")}
                  </span>
                  <h3 className="text-2xl font-bold mb-4 text-j-celestial-white">
                    {t("mainContent.scope.title")}
                  </h3>
                  <ul className="text-j-celestial-white/70 text-sm space-y-2">
                    {t.raw("mainContent.scope.items").map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-j-celestial-cooper mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:col-span-3 md:col-start-8 relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-j-celestial-blue to-j-celestial-cooper rounded-full"></div>
                  <div className="bg-gradient-to-br from-j-celestial-blue/10 to-j-celestial-cooper/10 p-6 rounded-xl border border-j-celestial-white/10">
                    <Calendar className="w-8 h-8 text-j-celestial-blue mb-4" />
                    <h4 className="text-lg font-semibold text-j-celestial-white mb-2">
                      {t("mainContent.timeline.title")}
                    </h4>
                    <p className="text-j-celestial-white/70 text-sm mb-2">
                      {t("mainContent.timeline.description")}
                    </p>
                    <div className="mt-3 pt-3 border-t border-j-celestial-white/10">
                      <p className="text-j-celestial-blue text-xs font-semibold">
                        {t("mainContent.timeline.result")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-8 md:col-start-3 mt-12">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-j-celestial-blue to-j-celestial-cooper">
                      {t("mainContent.phases.title")}
                    </h3>
                    <p className="text-j-celestial-white/60 max-w-2xl mx-auto">
                      {t("mainContent.phases.sectionTitle")}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Project Phases - Full Width Grid */}
            <AnimatedSection
              className="md:col-span-full mt-24 mb-32"
              animation="fadeIn"
            >
              <div className="w-full h-px bg-gradient-to-r from-transparent via-j-celestial-blue/20 to-transparent mb-16"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {phases.map((phase, index) => (
                  <motion.div
                    key={phase.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="group bg-j-deep-black/50 border border-j-celestial-white/10 rounded-xl p-6 hover:border-j-celestial-blue/30 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${phase.color} flex items-center justify-center text-white`}>
                        {phase.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-j-celestial-white">
                          {t(`mainContent.phases.${phase.id}.title`)}
                        </h4>
                        <div className="flex items-center gap-4 text-sm text-j-celestial-white/60">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {t(`mainContent.phases.${phase.id}.duration`)}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            {t(`mainContent.phases.${phase.id}.value`)}
                          </span>
                        </div>
                        {t.has(`mainContent.phases.${phase.id}.dates`) && (
                          <div className="text-xs text-j-celestial-blue mt-1">
                            {t(`mainContent.phases.${phase.id}.dates`)}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-j-celestial-white/70 text-sm mb-4 leading-relaxed">
                      {t(`mainContent.phases.${phase.id}.description`)}
                    </p>
                    
                    <div className="space-y-3">
                      {/* Deliverables */}
                      <div>
                        <h5 className="text-xs uppercase tracking-wider text-j-celestial-blue font-semibold mb-2">
                          {tConfidential("form.deliverables")}
                        </h5>
                        <ul className="text-xs space-y-1 text-j-celestial-white/60">
                          {t.raw(`mainContent.phases.${phase.id}.deliverables`).map((deliverable: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3 h-3 text-j-celestial-cooper mt-0.5 flex-shrink-0" />
                              <span>{deliverable}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Includes (for phases that have them) */}
                      {t.has(`mainContent.phases.${phase.id}.includes`) && (
                        <div>
                          <h5 className="text-xs uppercase tracking-wider text-j-celestial-cooper font-semibold mb-2">
                            Incluye
                          </h5>
                          <ul className="text-xs space-y-1 text-j-celestial-white/60">
                            {t.raw(`mainContent.phases.${phase.id}.includes`).map((include: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-2">
                                <div className="w-1 h-1 bg-j-celestial-cooper rounded-full mt-2 flex-shrink-0"></div>
                                <span>{include}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="w-full h-px bg-gradient-to-r from-transparent via-j-celestial-cooper/20 to-transparent mt-16"></div>
            </AnimatedSection>

            {/* Technologies Section */}
            <AnimatedSection className="md:col-span-6" animation="fadeUp">
              <span className="text-sm uppercase tracking-widest text-j-celestial-blue/60 mb-3 block">
                {t("mainContent.technologies.sectionTitle")}
              </span>
              <h3 className="text-3xl font-bold mb-8 text-j-celestial-white">
                {t("mainContent.technologies.title")}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {techCategories.map((category) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="bg-j-deep-black/30 border border-j-celestial-white/10 rounded-lg p-4 hover:border-j-celestial-blue/30 transition-colors duration-300"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-j-celestial-blue">
                        {category.icon}
                      </div>
                      <h4 className="font-semibold text-j-celestial-white">
                        {t(`mainContent.technologies.${category.id}.title`)}
                      </h4>
                    </div>
                    <ul className="text-sm space-y-1 text-j-celestial-white/70">
                      {t.raw(`mainContent.technologies.${category.id}.items`).map((item: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-j-celestial-cooper rounded-full"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            {/* Budget Section */}
            <AnimatedSection
              className="md:col-span-6"
              animation="fadeUp"
              delay={0.2}
            >
              <span className="text-sm uppercase tracking-widest text-j-celestial-cooper/60 mb-3 block">
                {t("mainContent.budget.sectionTitle")}
              </span>
              <h3 className="text-3xl font-bold mb-8 text-j-celestial-white">
                {t("mainContent.budget.title")}
              </h3>

              <div className="bg-gradient-to-br from-j-celestial-blue/10 to-j-celestial-cooper/10 border border-j-celestial-white/20 rounded-xl p-6 mb-6">
                <div className="text-center mb-6">
                  <DollarSign className="w-12 h-12 text-j-celestial-blue mx-auto mb-4" />
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-j-celestial-blue to-j-celestial-cooper">
                    {t("mainContent.budget.total")}
                  </div>
                  
                  {/* Development Time */}
                  <div className="mt-4 pt-4 border-t border-j-celestial-white/10">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-j-celestial-cooper" />
                      <span className="text-lg font-semibold text-j-celestial-white">
                        {t("mainContent.budget.totalTime")}
                      </span>
                    </div>
                    <p className="text-sm text-j-celestial-white/70">
                      {t("mainContent.budget.timeDescription")}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-sm uppercase tracking-wider text-j-celestial-white/80 font-semibold mb-3">
                    {t("mainContent.budget.paymentConditions")}
                  </h4>
                  {t.raw("mainContent.budget.paymentTerms").map((term: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-j-celestial-white/70">
                      <CheckCircle2 className="w-4 h-4 text-j-celestial-cooper flex-shrink-0" />
                      <span>{term}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Final Notes Section */}
            <AnimatedSection
              className="md:col-span-full mt-24 relative"
              animation="fadeIn"
            >
              <div className="absolute -top-40 left-0 right-0 h-px bg-gradient-to-r from-transparent via-j-celestial-blue/20 to-transparent"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <span className="text-sm uppercase tracking-widest text-j-celestial-blue/60 mb-3 block">
                    {t("mainContent.finalNotes.sectionTitle")}
                  </span>
                  <h3 className="text-3xl font-bold mb-6 text-j-celestial-white">
                    {t("mainContent.finalNotes.title")}
                  </h3>
                  
                  <div className="space-y-4">
                    {t.raw("mainContent.finalNotes.notes").map((note: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-j-celestial-cooper mt-0.5 flex-shrink-0" />
                        <p className="text-j-celestial-white/80 leading-relaxed">{note}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <div className="bg-gradient-to-br from-j-celestial-blue/5 to-j-celestial-cooper/5 border border-j-celestial-white/10 rounded-xl p-8 text-center">
                    <section className="flex flex-row flex-nowrap items-center justify-center space-x-2 mb-3">
                      <Image
                        src="/assets/icons/j-icon.png"
                        alt="J-Studio"
                        width={30}
                        height={30}
                        className="filter brightness-0 invert"
                      />
                      <h4 className="text-sm font-medium text-j-celestial-white">
                        J-Studio – Digital Craftsmanship
                      </h4>
                    </section>
                    <p className="text-j-celestial-white/60 text-sm">
                      Medellín, Colombia 🇨🇴<br />
                      © 2025 Juan Esteban Deossa Pertuz
                    </p>
                    <span className="text-j-celestial-white/60 text-sm">
                      Senior Software Engineer
                    </span>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Concluding Section */}
            <AnimatedSection
              className="md:col-span-full text-center mt-24 relative"
              animation="fadeIn"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-8 max-w-4xl mx-auto text-j-celestial-white">
                {t("mainContent.conclusion.title")}
              </h2>

              <p className="text-xl max-w-3xl mx-auto mb-12 text-j-celestial-white/80">
                {t("mainContent.conclusion.description")}
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-6 mt-8"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-j-celestial-blue to-j-celestial-cooper text-white font-semibold rounded-full hover:shadow-lg hover:shadow-j-celestial-blue/25 transition-all duration-300"
                  onClick={() => window.open("mailto:juan@j-studio.co", "_blank")}
                >
                  {t("mainContent.conclusion.cta")}
                </motion.button>
              </motion.div>
            </AnimatedSection>
          </section>
        </main>
      </section>
    </ConfidentialMiddleware>
  );
}
