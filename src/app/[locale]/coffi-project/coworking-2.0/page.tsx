"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CoffiSimpleButton } from "@/containers/coffi-project/coffi-buttons";
import {
  Instagram,
  ArrowLeft,
  ChevronDown,
  ExternalLink,
  Users,
  Target,
  TrendingUp,
  Zap,
  Globe,
  Star,
  Shield,
  Rocket,
  Brain,
  Award,
  BarChart3,
  Code2,
  DollarSign,
  MapPin,
  Download,
} from "lucide-react";
import { useParallax } from "@/hooks/useParallax";
import { AnimatedSection } from "@/components/animations/section";
import { useLocale, useTranslations } from "next-intl";

export default function CoffiProjectDeckPage() {
  const locale = useLocale();
  const t = useTranslations("coffi-coworking");
  const { ref: sectionRef, scrollY } = useParallax();

  return (
      <section
        ref={sectionRef}
        className="relative w-full flex flex-col justify-start bg-coffi-white min-h-screen"
      >
        {/* Navigation */}
        <Link
          href={`/${locale}/coffi-project`}
          className="fixed top-8 left-8 z-50 flex items-center gap-2 text-coffi-purple px-3 py-1 hover:bg-white/80 rounded-full transition-all duration-300 backdrop-blur-sm"
        >
          <ArrowLeft size={16} />
          <span className="font-medium">{t("navigation.backToCoffi")}</span>
        </Link>

        {/* Hero Section */}
        <header className="w-full h-[100vh] flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <div
              className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/60 to-white"
              style={{
                opacity: `${0.3 + scrollY * 0.001}`,
              }}
            ></div>

            {/* Mesh gradient background */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-coffi-purple/30 blur-[100px]"
                style={{
                  transform: `translate(${scrollY * 0.03}px, ${
                    -scrollY * 0.01
                  }px)`,
                }}
              />
              <div
                className="absolute top-2/3 right-1/3 w-1/3 h-1/3 rounded-full bg-coffi-blue/20 blur-[100px]"
                style={{
                  transform: `translate(${-scrollY * 0.02}px, ${
                    scrollY * 0.02
                  }px)`,
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
                src="/assets/images/coffi/coffi-logo.png"
                alt={"Coffi Logo"}
                width={51}
                height={51}
                className="object-cover"
                priority
              />
              <div className="flex flex-col items-start justify-center ml-2">
                <h2 className="font-black text-3xl">Coffi</h2>
                <h3 className="font-extralight text-sm mt-[-2px]">{t("hero.brandTagline")}</h3>
              </div>
            </motion.article>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{
                transform: `translateY(${scrollY * 0.2}px) scale(${
                  1 - scrollY * 0.0003
                })`,
                opacity: `${1 - scrollY * 0.2}`,
                letterSpacing: `${Math.min(scrollY * 0.03, 15)}px`,
              }}
              className="text-7xl md:text-9xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-br from-coffi-blue to-coffi-purple mb-12"
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
              className="max-w-2xl text-center text-xl md:text-2xl font-light leading-relaxed text-j-deep-black/90"
            >
              {t("hero.subtitle")}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="absolute bottom-8 animate-bounce"
          >
            <ChevronDown size={32} className="text-coffi-purple/60" />
          </motion.div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 md:px-12 pb-32 relative">
          {/* Tech line decorations */}
          <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-coffi-purple/10 to-transparent opacity-70"></div>
          <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-coffi-purple/10 to-transparent opacity-70"></div>

          {/* Section 1: Evolution */}
          <AnimatedSection
            className="min-h-screen flex items-center justify-center"
            animation="fadeIn"
          >
            <div className="w-full">
              <div className="text-center mb-16">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-6xl font-black text-coffi-purple/10 block mb-4"
                >
                  {t("sections.evolution.number")}
                </motion.span>
                <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3 block">
                  {t("sections.evolution.category")}
                </span>
                <h2 className="text-4xl md:text-6xl font-bold mb-8">
                  {t("sections.evolution.title").split(" ")[0]} <span className="text-coffi-purple">{t("sections.evolution.title").split(" ")[1]}</span> {t("sections.evolution.title").split(" ").slice(2).join(" ")}
                </h2>
                <p className="max-w-3xl mx-auto text-lg md:text-xl leading-relaxed text-j-deep-black/80 mb-8">
                  {t("sections.evolution.subtitle")}
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto text-center p-8 bg-gradient-to-br from-coffi-purple/5 to-coffi-blue/5 rounded-2xl"
              >
                <p className="text-lg leading-relaxed">
                  {t("sections.evolution.description")}
                </p>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Section 2: Comparison 1.0 vs 2.0 */}
          <AnimatedSection
            className="min-h-screen flex items-center justify-center"
            animation="fadeUp"
          >
            <div className="w-full">
              <div className="text-center mb-16">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-6xl font-black text-coffi-purple/10 block mb-4"
                >
                  {t("sections.comparison.number")}
                </motion.span>
                <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3 block">
                  {t("sections.comparison.category")}
                </span>
                <h2 className="text-4xl md:text-6xl font-bold mb-8">
                  Coworking <span className="text-coffi-purple">1.0 vs 2.0</span>
                </h2>
                <p className="max-w-2xl mx-auto text-lg md:text-xl leading-relaxed text-j-deep-black/80 mb-8">
                  {t("sections.comparison.subtitle")}
                </p>
              </div>

              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Headers */}
                  <div className="hidden md:block"></div>
                  <div className="text-center p-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl">
                    <h3 className="text-xl font-bold text-gray-700">Coworking 1.0</h3>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-coffi-purple/10 to-coffi-blue/10 rounded-xl">
                    <h3 className="text-xl font-bold text-coffi-purple">Coworking 2.0</h3>
                  </div>

                  {/* Location Row */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="p-4 bg-coffi-purple/5 rounded-xl"
                  >
                    <h4 className="font-bold text-coffi-purple mb-2">{t("sections.comparison.comparison_table.location.title")}</h4>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="p-4 border border-gray-200 rounded-xl"
                  >
                    <p className="text-sm">{t("sections.comparison.comparison_table.location.coworking_1")}</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="p-4 bg-gradient-to-br from-coffi-purple/5 to-coffi-blue/5 border border-coffi-purple/20 rounded-xl"
                  >
                    <p className="text-sm font-medium">{t("sections.comparison.comparison_table.location.coworking_2")}</p>
                  </motion.div>

                  {/* Community Row */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="p-4 bg-coffi-purple/5 rounded-xl"
                  >
                    <h4 className="font-bold text-coffi-purple mb-2">{t("sections.comparison.comparison_table.community.title")}</h4>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="p-4 border border-gray-200 rounded-xl"
                  >
                    <p className="text-sm">{t("sections.comparison.comparison_table.community.coworking_1")}</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="p-4 bg-gradient-to-br from-coffi-purple/5 to-coffi-blue/5 border border-coffi-purple/20 rounded-xl"
                  >
                    <p className="text-sm font-medium">{t("sections.comparison.comparison_table.community.coworking_2")}</p>
                  </motion.div>

                  {/* Technology Row */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="p-4 bg-coffi-purple/5 rounded-xl"
                  >
                    <h4 className="font-bold text-coffi-purple mb-2">{t("sections.comparison.comparison_table.technology.title")}</h4>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="p-4 border border-gray-200 rounded-xl"
                  >
                    <p className="text-sm">{t("sections.comparison.comparison_table.technology.coworking_1")}</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="p-4 bg-gradient-to-br from-coffi-purple/5 to-coffi-blue/5 border border-coffi-purple/20 rounded-xl"
                  >
                    <p className="text-sm font-medium">{t("sections.comparison.comparison_table.technology.coworking_2")}</p>
                  </motion.div>

                  {/* environment Row */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="p-4 bg-coffi-purple/5 rounded-xl"
                  >
                    <h4 className="font-bold text-coffi-purple mb-2">{t("sections.comparison.comparison_table.environment.title")}</h4>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="p-4 border border-gray-200 rounded-xl"
                  >
                    <p className="text-sm">{t("sections.comparison.comparison_table.environment.coworking_1")}</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="p-4 bg-gradient-to-br from-coffi-purple/5 to-coffi-blue/5 border border-coffi-purple/20 rounded-xl"
                  >
                    <p className="text-sm font-medium">{t("sections.comparison.comparison_table.environment.coworking_2")}</p>
                  </motion.div>
                  
                  {/* value_measurement Row */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="p-4 bg-coffi-purple/5 rounded-xl"
                  >
                    <h4 className="font-bold text-coffi-purple mb-2">{t("sections.comparison.comparison_table.value_measurement.title")}</h4>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="p-4 border border-gray-200 rounded-xl"
                  >
                    <p className="text-sm">{t("sections.comparison.comparison_table.value_measurement.coworking_1")}</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="p-4 bg-gradient-to-br from-coffi-purple/5 to-coffi-blue/5 border border-coffi-purple/20 rounded-xl"
                  >
                    <p className="text-sm font-medium">{t("sections.comparison.comparison_table.value_measurement.coworking_2")}</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Section 3: Key Elements */}
          <AnimatedSection
            className="min-h-screen flex items-center justify-center"
            animation="slideIn"
          >
            <div className="w-full">
              <div className="text-center mb-16">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-6xl font-black text-coffi-purple/10 block mb-4"
                >
                  {t("sections.key_elements.number")}
                </motion.span>
                <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3 block">
                  {t("sections.key_elements.category")}
                </span>
                <h2 className="text-4xl md:text-6xl font-bold mb-8">
                  {t("sections.key_elements.title").split(" ")[0]} <span className="text-coffi-purple">{t("sections.key_elements.title").split(" ")[1]}</span> {t("sections.key_elements.title").split(" ").slice(2).join(" ")}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                  className="p-8 border border-coffi-purple/20 rounded-2xl hover:border-coffi-purple/40 transition-all duration-300 bg-gradient-to-br from-coffi-purple/5 to-transparent"
                >
                  <div className="w-16 h-16 bg-coffi-purple/10 rounded-full flex items-center justify-center mb-6">
                    <Globe className="text-coffi-purple" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-coffi-purple">
                    {t("sections.key_elements.decentralization.title")}
                  </h3>
                  <p className="text-sm leading-relaxed text-j-deep-black/80">
                    {t("sections.key_elements.decentralization.description")}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 border border-coffi-blue/20 rounded-2xl hover:border-coffi-blue/40 transition-all duration-300 bg-gradient-to-br from-coffi-blue/5 to-transparent"
                >
                  <div className="w-16 h-16 bg-coffi-blue/10 rounded-full flex items-center justify-center mb-6">
                    <Target className="text-coffi-blue" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-coffi-blue">
                    {t("sections.key_elements.context.title")}
                  </h3>
                  <p className="text-sm leading-relaxed text-j-deep-black/80">
                    {t("sections.key_elements.context.description")}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="p-8 border border-coffi-purple/20 rounded-2xl hover:border-coffi-purple/40 transition-all duration-300 bg-gradient-to-br from-coffi-purple/5 to-transparent"
                >
                  <div className="w-16 h-16 bg-coffi-purple/10 rounded-full flex items-center justify-center mb-6">
                    <BarChart3 className="text-coffi-purple" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-coffi-purple">
                    {t("sections.key_elements.real_time_data.title")}
                  </h3>
                  <p className="text-sm leading-relaxed text-j-deep-black/80">
                    {t("sections.key_elements.real_time_data.description")}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="p-8 border border-coffi-blue/20 rounded-2xl hover:border-coffi-blue/40 transition-all duration-300 bg-gradient-to-br from-coffi-blue/5 to-transparent"
                >
                  <div className="w-16 h-16 bg-coffi-blue/10 rounded-full flex items-center justify-center mb-6">
                    <Award className="text-coffi-blue" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-coffi-blue">
                    {t("sections.key_elements.gamification.title")}
                  </h3>
                  <p className="text-sm leading-relaxed text-j-deep-black/80">
                    {t("sections.key_elements.gamification.description")}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="p-8 border border-coffi-purple/20 rounded-2xl hover:border-coffi-purple/40 transition-all duration-300 bg-gradient-to-br from-coffi-purple/5 to-transparent md:col-span-2 lg:col-span-1"
                >
                  <div className="w-16 h-16 bg-coffi-purple/10 rounded-full flex items-center justify-center mb-6">
                    <Rocket className="text-coffi-purple" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-coffi-purple">
                    {t("sections.key_elements.scalability.title")}
                  </h3>
                  <p className="text-sm leading-relaxed text-j-deep-black/80">
                    {t("sections.key_elements.scalability.description")}
                  </p>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>

          {/* Section 4: Relevance */}
          <AnimatedSection
            className="min-h-screen flex items-center justify-center"
            animation="fadeUp"
          >
            <div className="w-full max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-6xl font-black text-coffi-purple/10 block mb-4"
                >
                  {t("sections.relevance.number")}
                </motion.span>
                <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3 block">
                  {t("sections.relevance.category")}
                </span>
                <h2 className="text-4xl md:text-6xl font-bold mb-8">
                  {t("sections.relevance.title").split(" ")[0]} <span className="text-coffi-purple">{t("sections.relevance.title").split(" ")[1]}</span> {t("sections.relevance.title").split(" ").slice(2).join(" ")}
                </h2>
                <p className="max-w-2xl mx-auto text-lg md:text-xl leading-relaxed text-j-deep-black/80 mb-8">
                  {t("sections.relevance.subtitle")}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                  className="text-center p-8 bg-gradient-to-br from-coffi-purple/5 to-coffi-blue/5 rounded-2xl"
                >
                  <div className="w-20 h-20 bg-coffi-purple/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="text-coffi-purple" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-coffi-purple">
                    {t("sections.relevance.workforce_growth.title")}
                  </h3>
                  <p className="text-lg leading-relaxed">
                    {t("sections.relevance.workforce_growth.description")}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-center p-8 bg-gradient-to-br from-coffi-blue/5 to-coffi-purple/5 rounded-2xl"
                >
                  <div className="w-20 h-20 bg-coffi-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Star className="text-coffi-blue" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-coffi-blue">
                    {t("sections.relevance.experience_demand.title")}
                  </h3>
                  <p className="text-lg leading-relaxed">
                    {t("sections.relevance.experience_demand.description")}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-center p-8 bg-gradient-to-br from-coffi-purple/5 to-coffi-blue/5 rounded-2xl"
                >
                  <div className="w-20 h-20 bg-coffi-purple/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Zap className="text-coffi-purple" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-coffi-purple">
                    {t("sections.relevance.traditional_shortfall.title")}
                  </h3>
                  <p className="text-lg leading-relaxed">
                    {t("sections.relevance.traditional_shortfall.description")}
                  </p>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>

          {/* Section 5: Coffi Leadership */}
          <AnimatedSection
            className="min-h-screen flex items-center justify-center"
            animation="fadeIn"
          >
            <div className="w-full">
              <div className="text-center mb-16">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-6xl font-black text-coffi-purple/10 block mb-4"
                >
                  {t("sections.coffi_leadership.number")}
                </motion.span>
                <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3 block">
                  {t("sections.coffi_leadership.category")}
                </span>
                <h2 className="text-4xl md:text-6xl font-bold mb-8">
                  <span className="text-coffi-purple">Coffi</span> {t("sections.coffi_leadership.title").split(" ").slice(1).join(" ")}
                </h2>
                <p className="max-w-3xl mx-auto text-lg md:text-xl leading-relaxed text-j-deep-black/80 mb-8">
                  {t("sections.coffi_leadership.subtitle")}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  <div className="p-6 border-l-4 border-coffi-purple pl-8">
                    <h3 className="text-2xl font-bold mb-4 text-coffi-purple">
                      {t("sections.coffi_leadership.vision.title")}
                    </h3>
                    <p className="text-lg leading-relaxed">
                      {t("sections.coffi_leadership.vision.description")}
                    </p>
                  </div>

                  <div className="p-6 border-l-4 border-coffi-blue pl-8">
                    <h3 className="text-2xl font-bold mb-4 text-coffi-blue">
                      {t("sections.coffi_leadership.technology.title")}
                    </h3>
                    <p className="text-lg leading-relaxed">
                      {t("sections.coffi_leadership.technology.description")}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  <div className="p-6 border-l-4 border-coffi-purple pl-8">
                    <h3 className="text-2xl font-bold mb-4 text-coffi-purple">
                      {t("sections.coffi_leadership.community.title")}
                    </h3>
                    <p className="text-lg leading-relaxed">
                      {t("sections.coffi_leadership.community.description")}
                    </p>
                  </div>

                  <div className="p-6 border-l-4 border-coffi-blue pl-8">
                    <h3 className="text-2xl font-bold mb-4 text-coffi-blue">
                      {t("sections.coffi_leadership.partnerships.title")}
                    </h3>
                    <p className="text-lg leading-relaxed">
                      {t("sections.coffi_leadership.partnerships.description")}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>

          {/* Section 6: Implementation - The Coffi Advantage */}
          <AnimatedSection
            className="min-h-screen flex items-center justify-center"
            animation="slideIn"
          >
            <div className="w-full max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-6xl font-black text-coffi-purple/10 block mb-4"
                >
                  {t("sections.implementation.number")}
                </motion.span>
                <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3 block">
                  {t("sections.implementation.category")}
                </span>
                <h2 className="text-4xl md:text-6xl font-bold mb-8">
                  {t("sections.implementation.title").split(" ")[0]} <span className="text-coffi-purple">{t("sections.implementation.title").split(" ")[1]}</span> {t("sections.implementation.title").split(" ").slice(2).join(" ")}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                  className="text-center p-8 bg-gradient-to-br from-coffi-purple/5 to-coffi-blue/5 rounded-2xl border border-coffi-purple/20"
                >
                  <div className="w-20 h-20 bg-coffi-purple/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Brain className="text-coffi-purple" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-coffi-purple">
                    {t("sections.implementation.data_driven.title")}
                  </h3>
                  <p className="text-lg leading-relaxed">
                    {t("sections.implementation.data_driven.description")}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-center p-8 bg-gradient-to-br from-coffi-blue/5 to-coffi-purple/5 rounded-2xl border border-coffi-blue/20"
                >
                  <div className="w-20 h-20 bg-coffi-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Star className="text-coffi-blue" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-coffi-blue">
                    {t("sections.implementation.emotional_intelligence.title")}
                  </h3>
                  <p className="text-lg leading-relaxed">
                    {t("sections.implementation.emotional_intelligence.description")}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-center p-8 bg-gradient-to-br from-coffi-purple/5 to-coffi-blue/5 rounded-2xl border border-coffi-purple/20"
                >
                  <div className="w-20 h-20 bg-coffi-purple/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield className="text-coffi-purple" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-coffi-purple">
                    {t("sections.implementation.contextual_awareness.title")}
                  </h3>
                  <p className="text-lg leading-relaxed">
                    {t("sections.implementation.contextual_awareness.description")}
                  </p>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>

          {/* Final CTA Section */}
          <AnimatedSection
            className="min-h-screen flex items-center justify-center"
            animation="fadeIn"
          >
            <div className="text-center max-w-4xl mx-auto">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-5xl md:text-7xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-br from-coffi-blue to-coffi-purple"
              >
                The Future is <span className="text-coffi-purple">Now</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-6 mb-12"
              >
                <p className="text-xl leading-relaxed text-j-deep-black/80">
                  Join the Coworking 2.0 revolution with Coffi
                </p>
                <p className="text-2xl font-light text-coffi-purple/90 italic">
                  "Be where you thrive, work how you feel"
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-6"
              >
                <CoffiSimpleButton
                  text={t("cta.explore_coffi")}
                  action={() => window.open("https://coffi.com.co", "_blank")}
                />

                <Link
                  href={`/${locale}/coffi-project/deck`}
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-white/90 border border-coffi-purple/20 rounded-lg px-6 py-[7px] text-sm font-medium text-coffi-purple transition-all duration-300 ease-in-out"
                >
                  <ExternalLink size={18} />
                  {t("cta.view_full_deck")}
                </Link>

                <Link
                  href="https://instagram.com/letscoffi"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-white/90 border border-coffi-purple/20 rounded-lg px-6 py-[7px] text-sm font-medium text-coffi-purple transition-all duration-300 ease-in-out"
                >
                  <Instagram size={18} />
                  {t("cta.instagram")}
                </Link>
              </motion.div>
            </div>
          </AnimatedSection>
        </main>
      </section>
  );
}
