"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CoffiSimpleButton } from "@/containers/coffi-project/coffi-buttons";
import { ArrowLeft, QrCode, Users, TrendingUp, BarChart3, Shield, Zap } from "lucide-react";
import { useParallax } from "@/hooks/useParallax";
import { AnimatedSection } from "@/components/animations/section";
import { useLocale, useTranslations } from "next-intl";

export default function CoffiForBusinessPage() {
  const locale = useLocale();
  const t = useTranslations("coffi-for-business");
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
        <span className="font-medium">{t("navigation.back")}</span>
      </Link>

      {/* Hero Section */}
      <header className="w-full h-[95vh] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <div
            className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/40 to-white"
            style={{
              opacity: `${0.4 + scrollY * 0.0008}`,
            }}
          ></div>

          {/* Enhanced mesh gradient background */}
          <div className="absolute inset-0 opacity-15">
            <div
              className="absolute top-1/5 left-1/5 w-3/5 h-3/5 rounded-full bg-gradient-to-br from-coffi-purple/40 to-coffi-blue/30 blur-[120px]"
              style={{
                transform: `translate(${scrollY * 0.02}px, ${-scrollY * 0.015}px) scale(${1 + scrollY * 0.0002})`,
              }}
            />
            <div
              className="absolute top-3/5 right-1/4 w-2/5 h-2/5 rounded-full bg-gradient-to-tl from-coffi-blue/25 to-coffi-purple/20 blur-[100px]"
              style={{
                transform: `translate(${-scrollY * 0.025}px, ${scrollY * 0.02}px)`,
              }}
            />
            <div
              className="absolute top-1/2 left-1/2 w-1/3 h-1/3 rounded-full bg-coffi-purple/15 blur-[80px]"
              style={{
                transform: `translate(-50%, -50%) translate(${scrollY * 0.01}px, ${scrollY * 0.008}px)`,
              }}
            />
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-row flex-nowrap items-center justify-start mb-8"
          >
            <Image
              src="/assets/images/coffi/coffi-logo.png"
              alt="Coffi Logo"
              width={51}
              height={51}
              className="object-cover"
              priority
            />
            <div className="flex flex-col items-start justify-center ml-2">
              <h2 className="font-black text-3xl text-coffi-purple">Coffi</h2>
              <h3 className="font-extralight text-sm mt-[-2px] text-coffi-purple/70">
                {t("hero.title")}
              </h3>
            </div>
          </motion.article>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-8"
          >
            <h1
              style={{
                transform: `translateY(${scrollY * 0.15}px) scale(${1 - scrollY * 0.0002})`,
                opacity: `${1 - scrollY * 0.0012}`,
                letterSpacing: `${Math.min(scrollY * 0.02, 8)}px`,
              }}
              className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-br from-coffi-purple via-coffi-blue to-coffi-purple"
            >
              {t("hero.subtitle")}
            </h1>
            <h2
              style={{
                transform: `translateY(${scrollY * 0.08}px)`,
                opacity: `${1 - scrollY * 0.001}`,
              }}
              className="text-2xl md:text-3xl font-light text-coffi-purple/90"
            >
              {t("hero.description")}
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              transform: `translateY(${scrollY * 0.05}px)`,
              opacity: `${1 - scrollY * 0.0008}`,
            }}
            className="max-w-4xl text-center text-lg md:text-xl font-light leading-relaxed text-j-deep-black/80"
          >
            {t("introduction.text")}
          </motion.p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 md:px-12 pb-32 relative">
        {/* Decorative lines */}
        <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-coffi-purple/10 to-transparent opacity-70"></div>
        <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-coffi-purple/10 to-transparent opacity-70"></div>

        {/* Introduction Quote */}
        <AnimatedSection className="md:col-span-full text-center mt-16 mb-32" animation="fadeIn">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-coffi-purple/20 to-transparent mb-16"></div>
          <blockquote className="text-2xl md:text-4xl text-coffi-purple font-medium italic max-w-5xl mx-auto mb-8">
            &ldquo;{t("introduction.highlight")}&rdquo;
          </blockquote>
          <p className="text-xl text-j-deep-black/70 max-w-3xl mx-auto">
            {t("introduction.description")}
          </p>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-coffi-purple/20 to-transparent mt-16"></div>
        </AnimatedSection>

        {/* The Problem Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-24 mt-32">
          <AnimatedSection className="md:col-span-full" animation="fadeUp">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-12">
              {/* Problem Title */}
              <div className="md:col-span-12 text-center mb-12">
                <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3 block">
                  Current Reality
                </span>
                <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-coffi-purple to-coffi-blue">
                  {t("problem.title")}
                </h2>
              </div>

              {/* Space Challenges */}
              <div className="md:col-span-6">
                <h3 className="text-2xl font-bold mb-6 text-coffi-purple">
                  {t("problem.description")}
                </h3>
                <div className="space-y-4">
                  {Object.values(t.raw("problem.challenges") as Record<string, string>).map((challenge: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 p-4 rounded-lg bg-coffi-purple/5 border-l-4 border-coffi-purple/20"
                    >
                      <div className="w-2 h-2 rounded-full bg-coffi-purple mt-2 flex-shrink-0"></div>
                      <p className="text-lg text-j-deep-black/80">{challenge}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* User Challenges */}
              <div className="md:col-span-6">
                <h3 className="text-2xl font-bold mb-6 text-coffi-blue">
                  {t("problem.userChallenges")}
                </h3>
                <div className="space-y-4">
                  {Object.values(t.raw("problem.userPoints") as Record<string, string>).map((point: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 p-4 rounded-lg bg-coffi-blue/5 border-l-4 border-coffi-blue/20"
                    >
                      <div className="w-2 h-2 rounded-full bg-coffi-blue mt-2 flex-shrink-0"></div>
                      <p className="text-lg text-j-deep-black/80">{point}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* The Gap */}
              <div className="md:col-span-12 text-center mt-16">
                <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-gradient-to-br from-coffi-purple/10 to-coffi-blue/10 border border-coffi-purple/20">
                  <div className="space-y-4">
                    <p className="text-xl font-medium text-coffi-purple">{t("problem.conclusion.users")}</p>
                    <p className="text-xl font-medium text-coffi-blue">{t("problem.conclusion.spaces")}</p>
                    <p className="text-2xl font-bold text-j-deep-black mt-6">{t("problem.conclusion.bridge")}</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* The Solution Section */}
          <AnimatedSection className="md:col-span-full mt-32" animation="fadeIn">
            <div className="text-center mb-20">
              <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3 block">
                Our Innovation
              </span>
              <h2 className="text-5xl md:text-7xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-br from-coffi-blue to-coffi-purple">
                {t("solution.title")}
              </h2>
              <p className="text-2xl font-light text-j-deep-black/70 max-w-3xl mx-auto mb-6">
                {t("solution.description")}
              </p>
              <p className="text-xl text-j-deep-black/60 max-w-4xl mx-auto">
                {t("solution.explanation")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              {/* For Users */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-gradient-to-br from-coffi-blue/10 to-coffi-blue/5 border border-coffi-blue/20"
              >
                <div className="flex items-center gap-4 mb-6">
                  <Users className="w-8 h-8 text-coffi-blue" />
                  <h3 className="text-2xl font-bold text-coffi-blue">
                    {t("solution.forUsers.title")}
                  </h3>
                </div>
                <p className="text-lg text-j-deep-black/80">
                  {t("solution.forUsers.description")}
                </p>
              </motion.div>

              {/* For Spaces */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-gradient-to-br from-coffi-purple/10 to-coffi-purple/5 border border-coffi-purple/20"
              >
                <div className="flex items-center gap-4 mb-6">
                  <TrendingUp className="w-8 h-8 text-coffi-purple" />
                  <h3 className="text-2xl font-bold text-coffi-purple">
                    {t("solution.forSpaces.title")}
                  </h3>
                </div>
                <p className="text-lg text-j-deep-black/80 mb-6">
                  {t("solution.forSpaces.description")}
                </p>
                <ul className="space-y-3">
                  {(t.raw("solution.forSpaces.benefits") as string[]).map((benefit: string, index: number) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-coffi-purple"></div>
                      <span className="text-j-deep-black/80">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Ecosystem Quote */}
            <div className="text-center">
              <blockquote className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-coffi-purple via-coffi-blue to-coffi-purple">
                &ldquo;{t("solution.ecosystem")}&rdquo;
              </blockquote>
            </div>
          </AnimatedSection>

          {/* How It Works Section */}
          <AnimatedSection className="md:col-span-full mt-32" animation="fadeUp">
            <div className="text-center mb-20">
              <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3 block">
                The Process
              </span>
              <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-coffi-purple to-coffi-blue">
                {t("howItWorks.title")}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {/* Step 1: QR Code */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-gradient-to-br from-coffi-purple/10 to-white border border-coffi-purple/20"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-coffi-purple flex items-center justify-center text-white font-bold text-xl">1</div>
                  <QrCode className="w-8 h-8 text-coffi-purple" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-coffi-purple">
                  {t("howItWorks.steps.qr.title")}
                </h3>
                <p className="text-j-deep-black/80">
                  {t("howItWorks.steps.qr.description")}
                </p>
              </motion.div>

              {/* Step 2: Choice */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-gradient-to-br from-coffi-blue/10 to-white border border-coffi-blue/20"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-coffi-blue flex items-center justify-center text-white font-bold text-xl">2</div>
                  <BarChart3 className="w-8 h-8 text-coffi-blue" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-coffi-blue">
                  {t("howItWorks.steps.choice.title")}
                </h3>
                <p className="text-j-deep-black/80 mb-4">
                  {t("howItWorks.steps.choice.description")}
                </p>
                <div className="space-y-2">
                  {(t.raw("howItWorks.steps.choice.examples") as string[]).map((example: string, index: number) => (
                    <div key={index} className="text-sm bg-coffi-blue/5 p-2 rounded font-mono">
                      {example}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-j-deep-black/60 mt-4">
                  {t("howItWorks.steps.choice.note")}
                </p>
              </motion.div>

              {/* Step 3: Transfer */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-gradient-to-br from-coffi-purple/10 to-white border border-coffi-purple/20"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-coffi-purple flex items-center justify-center text-white font-bold text-xl">3</div>
                  <Zap className="w-8 h-8 text-coffi-purple" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-coffi-purple">
                  {t("howItWorks.steps.transfer.title")}
                </h3>
                <p className="text-j-deep-black/80 mb-4">
                  {t("howItWorks.steps.transfer.description")}
                </p>
                <ul className="space-y-2">
                  {(t.raw("howItWorks.steps.transfer.process") as string[]).map((step: string, index: number) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-coffi-purple"></div>
                      <span className="text-sm text-j-deep-black/80">{step}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Step 4: Cycle */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-gradient-to-br from-coffi-blue/10 to-white border border-coffi-blue/20"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-coffi-blue flex items-center justify-center text-white font-bold text-xl">4</div>
                  <Shield className="w-8 h-8 text-coffi-blue" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-coffi-blue">
                  {t("howItWorks.steps.cycle.title")}
                </h3>
                <p className="text-j-deep-black/80">
                  {t("howItWorks.steps.cycle.description")}
                </p>
              </motion.div>
            </div>

            {/* User Flow */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-r from-coffi-purple/10 to-coffi-blue/10 border border-coffi-purple/20">
              <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-coffi-purple to-coffi-blue">
                {t("userFlow.title")}
              </h3>
              <p className="text-lg text-j-deep-black/80 mb-4">
                {t("userFlow.description")}
              </p>
              <p className="text-xl font-medium text-coffi-purple">
                {t("userFlow.qualities")}
              </p>
            </div>
          </AnimatedSection>

          {/* Benefits Section */}
          <AnimatedSection className="md:col-span-full mt-32" animation="fadeIn">
            <div className="text-center mb-20">
              <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3 block">
                Value Proposition
              </span>
              <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-coffi-blue to-coffi-purple">
                {t("spacesBenefits.title")}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Loyalty */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-gradient-to-br from-coffi-purple/10 to-white border border-coffi-purple/20 hover:border-coffi-purple/40 transition-all duration-300"
              >
                <h3 className="text-xl font-bold mb-4 text-coffi-purple">
                  {t("spacesBenefits.benefits.loyalty.title")}
                </h3>
                <p className="text-j-deep-black/80">
                  {t("spacesBenefits.benefits.loyalty.description")}
                </p>
              </motion.div>

              {/* Visibility */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-gradient-to-br from-coffi-blue/10 to-white border border-coffi-blue/20 hover:border-coffi-blue/40 transition-all duration-300"
              >
                <h3 className="text-xl font-bold mb-4 text-coffi-blue">
                  {t("spacesBenefits.benefits.visibility.title")}
                </h3>
                <p className="text-j-deep-black/80">
                  {t("spacesBenefits.benefits.visibility.description")}
                </p>
              </motion.div>

              {/* Community */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-gradient-to-br from-coffi-purple/10 to-white border border-coffi-purple/20 hover:border-coffi-purple/40 transition-all duration-300"
              >
                <h3 className="text-xl font-bold mb-4 text-coffi-purple">
                  {t("spacesBenefits.benefits.community.title")}
                </h3>
                <p className="text-j-deep-black/80">
                  {t("spacesBenefits.benefits.community.description")}
                </p>
              </motion.div>
            </div>

            {/* Understanding Section - Full Width */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-coffi-blue/10 to-coffi-purple/5 border border-coffi-blue/20"
            >
              <h3 className="text-2xl font-bold mb-6 text-coffi-blue">
                {t("spacesBenefits.benefits.understanding.title")}
              </h3>
              <p className="text-lg text-j-deep-black/80 mb-6">
                {t("spacesBenefits.benefits.understanding.description")}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {(t.raw("spacesBenefits.benefits.understanding.items") as string[]).map((item: string, index: number) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded bg-white/50">
                    <div className="w-2 h-2 rounded-full bg-coffi-blue"></div>
                    <span className="text-sm text-j-deep-black/80">{item}</span>
                  </div>
                ))}
              </div>
              
              <p className="text-lg font-medium text-coffi-blue">
                {t("spacesBenefits.benefits.understanding.conclusion")}
              </p>
            </motion.div>

            {/* Future Tools */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-coffi-purple/10 to-coffi-blue/5 border border-coffi-purple/20"
            >
              <h3 className="text-2xl font-bold mb-6 text-coffi-purple">
                {t("spacesBenefits.benefits.future.title")}
              </h3>
              <p className="text-lg text-j-deep-black/80 mb-6">
                {t("spacesBenefits.benefits.future.description")}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(t.raw("spacesBenefits.benefits.future.tools") as string[]).map((tool: string, index: number) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded bg-white/50">
                    <div className="w-2 h-2 rounded-full bg-coffi-purple"></div>
                    <span className="text-sm text-j-deep-black/80">{tool}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatedSection>

          {/* Impact Section */}
          <AnimatedSection className="md:col-span-full mt-32" animation="fadeUp">
            <div className="text-center mb-16">
              <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3 block">
                Transformation
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-coffi-purple to-coffi-blue mb-8">
                {t("impact.title")}
              </h2>
            </div>

            <div className="max-w-4xl mx-auto text-center space-y-8">
              <p className="text-xl text-j-deep-black/80">
                {t("impact.description")}
              </p>
              
              <div className="p-6 rounded-xl bg-gradient-to-br from-coffi-purple/10 to-coffi-blue/10 border border-coffi-purple/20">
                <p className="text-2xl font-bold text-coffi-purple mb-4">
                  {t("impact.definition")}
                </p>
                <p className="text-xl text-j-deep-black/80">
                  {t("impact.explanation")}
                </p>
              </div>

              <p className="text-lg text-j-deep-black/70">
                {t("impact.pioneer")}
              </p>
              
              <div className="p-8 rounded-2xl bg-gradient-to-r from-coffi-purple/20 to-coffi-blue/20 border border-coffi-purple/30">
                <p className="text-lg text-j-deep-black/80 mb-4">
                  {t("impact.feeling")}
                </p>
                <blockquote className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-coffi-purple to-coffi-blue italic">
                  &ldquo;{t("impact.quote")}&rdquo;
                </blockquote>
              </div>
            </div>
          </AnimatedSection>

          {/* Join Ecosystem Section */}
          <AnimatedSection className="md:col-span-full mt-32" animation="fadeIn">
            <div className="text-center mb-16">
              <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3 block">
                Get Started
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-coffi-blue to-coffi-purple">
                {t("joinEcosystem.title")}
              </h2>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {(t.raw("joinEcosystem.steps") as string[]).map((step: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 p-6 rounded-xl bg-gradient-to-br from-coffi-purple/10 to-white border border-coffi-purple/20"
                  >
                    <div className="w-10 h-10 rounded-full bg-coffi-purple flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <span className="text-lg text-j-deep-black/80">{step}</span>
                  </motion.div>
                ))}
              </div>

              <div className="text-center p-6 rounded-xl bg-gradient-to-r from-coffi-blue/10 to-coffi-purple/10 border border-coffi-blue/20">
                <p className="text-xl font-medium text-coffi-purple mb-8">
                  {t("joinEcosystem.offer")}
                </p>
                
                <div className="w-full flex items-center justify-center mb-6">
                    <CoffiSimpleButton
                    text={t("joinEcosystem.cta")}
                    action={() => window.open("https://coffi.com.co", "_blank")}
                    />
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Footer */}
          <AnimatedSection className="md:col-span-full mt-32 text-center" animation="fadeIn">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-coffi-purple/20 to-transparent mb-16"></div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-coffi-purple to-coffi-blue">
              {t("footer.tagline")}
            </h2>
            
            <p className="text-xl font-light text-coffi-purple/70">
              {t("footer.motto")}
            </p>
          </AnimatedSection>
        </section>
      </main>
    </section>
  );
}