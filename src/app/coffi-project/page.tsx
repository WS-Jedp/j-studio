"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CoffiSimpleButton } from "@/containers/coffi-project/coffi-buttons";
import { Instagram, ArrowLeft } from "lucide-react";
import { useParallax } from "@/hooks/useParallax";
import { AnimatedSection } from "@/components/animations/section";

export default function CoffiProjectPage() {
  const { ref: sectionRef, scrollY } = useParallax();

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex flex-col justify-start bg-coffi-white min-h-screen"
    >
      {/* Navigation */}
      <Link
        href="/"
        className="fixed top-8 left-8 z-50 flex items-center gap-2 text-coffi-purple px-3 py-1 hover:bg-white/80 rounded-full transition-all duration-300 backdrop-blur-sm"
      >
        <ArrowLeft size={16} />
        <span className="font-medium">Back</span>
      </Link>

      {/* Hero Section */}
      <header className="w-full h-[90vh] flex flex-col items-center justify-center relative overflow-hidden">
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
                transform: `translate(${scrollY * 0.03}px, ${-scrollY * 0.01}px)`,
              }}
            />
            <div
              className="absolute top-2/3 right-1/3 w-1/3 h-1/3 rounded-full bg-coffi-blue/20 blur-[100px]"
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
              src="/assets/images/coffi/coffi-logo.png"
              alt="Coffi Logo"
              width={51}
              height={51}
              className="object-cover"
              priority
            />
            <div className="flex flex-col items-start justify-center ml-2">
              <h2 className="font-black text-3xl">Coffi</h2>
              <h3 className="font-extralight text-sm mt-[-2px]">
                Be Where You Thrive
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
            className="text-7xl md:text-9xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-br from-coffi-blue to-coffi-purple mb-12"
          >
            Coffi Project
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
            In a world where freedom to work from anywhere is becoming the norm,
            I built a platform that helps you find the perfect space to thrive.
          </motion.p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 md:px-12 pb-32 relative">
        {/* Tech line decorations */}
        <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-coffi-purple/10 to-transparent opacity-70"></div>
        <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-coffi-purple/10 to-transparent opacity-70"></div>

        {/* Content sections */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-24 mt-16">
          {/* Large Quote */}
          <AnimatedSection className="md:col-span-full" animation="fadeIn">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-coffi-purple/20 to-transparent mb-24"></div>
            <blockquote className="text-3xl md:text-5xl text-coffi-purple/80 font-light italic text-center max-w-4xl mx-auto">
              &ldquo;Not just an app, but a reflection of how modern work should
              feel:
              <span className="font-normal">
                {" "}
                intentional, flexible, and human.&rdquo;
              </span>
            </blockquote>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-coffi-purple/20 to-transparent mt-24"></div>
          </AnimatedSection>

          {/* Editorial Genesis Section - Text Only */}
          <AnimatedSection
            className="md:col-span-full flex flex-col mb-16"
            animation="fadeUp"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-8">
              {/* Section Header */}
              <div className="md:col-span-4 md:col-start-2">
                <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3 block">
                  The Genesis
                </span>
                <h2 className="text-4xl md:text-6xl font-bold text-j-deep-black">
                  From Simple Idea to
                  <br />
                  <span className="text-coffi-purple">Something Bigger</span>
                </h2>
              </div>

              {/* Main Content */}
              <div className="md:col-span-5 md:col-start-7">
                <div className="prose prose-lg max-w-none">
                  <p className="text-xl md:text-2xl font-light leading-relaxed">
                    What began as a simple idea—to help digital nomads find the
                    best cafés to work or study—evolved into something much
                    bigger: a real-time, purpose-driven social discovery
                    platform for digital explorers.
                  </p>
                </div>
              </div>

              {/* Secondary Content with Decorative Elements */}
              <div className="md:col-span-3 md:col-start-2 relative">
                <div className="h-full w-px bg-gradient-to-b from-transparent via-coffi-purple/30 to-transparent absolute right-0 top-0"></div>
                <div className="pr-8">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-6xl font-black text-coffi-purple/10 block mb-4"
                  >
                    01
                  </motion.span>
                  <h3 className="text-2xl font-medium mb-4">The Need</h3>
                  <p className="text-j-deep-black/80 leading-relaxed">
                    As a remote creator moving from place to place, I craved
                    more than coffee and Wi-Fi — I wanted spaces where I could
                    truly focus, connect, and create.
                  </p>
                </div>
              </div>

              <div className="md:col-span-3 relative">
                <div className="h-full w-px bg-gradient-to-b from-transparent via-coffi-purple/30 to-transparent absolute right-0 top-0"></div>
                <div className="pr-8">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-6xl font-black text-coffi-purple/10 block mb-4"
                  >
                    02
                  </motion.span>
                  <h3 className="text-2xl font-medium mb-4">The Response</h3>
                  <p className="text-j-deep-black/80 leading-relaxed">
                    Coffi became my answer — a platform that understands what
                    creators and nomads truly need in their environments.
                  </p>
                </div>
              </div>

              <div className="md:col-span-3 md:col-start-8 relative">
                <div className="pr-8">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-6xl font-black text-coffi-purple/10 block mb-4"
                  >
                    03
                  </motion.span>
                  <h3 className="text-2xl font-medium mb-4">The Evolution</h3>
                  <p className="text-j-deep-black/80 leading-relaxed">
                    From finding cafés to discovering purpose-aligned
                    environments of all kinds — the concept grew with each
                    iteration.
                  </p>
                </div>
              </div>

              {/* Pull Quote */}
              <div className="md:col-span-8 md:col-start-3 mt-12">
                <motion.blockquote 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="border-l-4 border-coffi-purple pl-6 py-2"
                >
                  <p className="text-2xl md:text-3xl font-light text-coffi-purple/90 italic">
                    "Coffi isn't just about places, it's about finding your
                    perfect moment in space."
                  </p>
                </motion.blockquote>
              </div>
            </div>
          </AnimatedSection>

          {/* The Vision - Full Width */}
          <AnimatedSection
            className="md:col-span-full grid grid-cols-1 md:grid-cols-12 gap-8"
            animation="fadeUp"
          >
            <motion.div 
              className="md:col-span-5 md:col-start-2"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3 block"
              >
                The Vision
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-4xl font-bold mb-6"
              >
                A Real-Time Guide for Purposeful Nomads
              </motion.h2>
            </motion.div>
            <motion.div 
              className="md:col-span-5 prose prose-lg max-w-none"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <p>
                Coffi is not just a workspace directory—it's a place-based
                social platform powered by community data and smart filtering.
                Whether you're trying to crush deep work, meet fellow nomads, or
                take a rejuvenating break, Coffi recommends the right
                environment in real-time.
              </p>
            </motion.div>
          </AnimatedSection>

          {/* Tech Stack Section - Editorial with side notes */}
          <AnimatedSection
            className="md:col-span-4 flex flex-col"
            animation="slideIn"
          >
            <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3">
              The Architecture
            </span>
            <h3 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-br from-coffi-blue to-coffi-purple">
              Tech Stack & Structure
            </h3>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <h4 className="text-xl font-semibold mb-2">Frontend</h4>
                <p className="text-j-deep-black/80 leading-relaxed">
                  React, TypeScript, TailwindCSS, Redux Toolkit
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <h4 className="text-xl font-semibold mb-2">Backend</h4>
                <p className="text-j-deep-black/80 leading-relaxed">
                  NestJS, WebSockets, MongoDB (GeoIndexed)
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <h4 className="text-xl font-semibold mb-2">Real-Time</h4>
                <p className="text-j-deep-black/80 leading-relaxed">
                  Redis Pub/Sub + Cache
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <h4 className="text-xl font-semibold mb-2">DevOps</h4>
                <p className="text-j-deep-black/80 leading-relaxed">
                  AWS Elastic Beanstalk, S3, CloudFront, CI/CD
                </p>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Editorial Middle - Product Differentiation */}
          <AnimatedSection
            className="md:col-span-4 flex flex-col"
            animation="fadeUp"
            delay={0.2}
          >
            <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3">
              The Difference
            </span>
            <h3 className="text-3xl font-bold mb-8">
              Product <span className="text-coffi-purple">Differentiation</span>
            </h3>

            <div className="prose prose-lg max-w-none">
              <p>
                Each place on Coffi has static information and is augmented by
                live community updates—what we call a <strong>Session</strong>.
                Sessions are real-time ambient stories tied to a place, not a
                person.
              </p>

              <p className="text-xl font-medium mt-6">
                Think Instagram stories + Google Maps + Reddit = Coffi.
              </p>
            </div>
          </AnimatedSection>

          {/* Editorial Right - Pivot */}
          <AnimatedSection
            className="md:col-span-4 flex flex-col"
            animation="slideIn"
            delay={0.4}
          >
            <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3">
              The Evolution
            </span>
            <h3 className="text-3xl font-bold mb-8">
              From Coffees to{" "}
              <span className="text-coffi-purple">Everywhere</span>
            </h3>

            <div className="prose prose-lg max-w-none">
              <p>
                Initially focused on cafés, we expanded to parks, nightclubs,
                hills, and more. Places are polymorphic, with unique attributes
                and filters depending on type.
              </p>

              <p>
                Sessions adapt too—vibes in a nightclub vs. quietness in a
                library. This flexibility makes Coffi valuable across different
                contexts.
              </p>
            </div>
          </AnimatedSection>

          {/* Community-Driven Design Section */}
          <AnimatedSection
            className="md:col-span-full mt-24 mb-32"
            animation="fadeIn"
          >
            {/* Top divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-coffi-purple/20 to-transparent mb-16"></div>

            {/* Section Title */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="md:col-span-4 md:col-start-2"
              >
                <span className="text-sm uppercase tracking-widest text-coffi-purple/60 block mb-3">
                  Philosophy
                </span>
                <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-coffi-blue to-coffi-purple">
                  Community-Driven Design
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="md:col-span-5 md:col-start-7 flex items-end"
              >
                <p className="text-xl md:text-2xl font-light text-j-deep-black/80 italic">
                  A space where moments and places converge to create something
                  greater
                </p>
              </motion.div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-12">
              <AnimatedSection
                className="md:col-span-6 md:col-start-2"
                animation="fadeUp"
              >
                <p className="text-lg md:text-xl leading-relaxed mb-8">
                  <span className="text-3xl text-coffi-purple font-light leading-tight block mb-4">
                    Coffi behaves like story-based social media, but for places.
                  </span>
                  People share moments anonymously by location. There's no feed
                  of people—only updates of vibes. This approach creates a
                  unique atmosphere where the focus is on the quality of the
                  space rather than who's posting.
                </p>

                <p className="text-lg leading-relaxed mb-6">
                  Each place becomes a canvas of real-time experiences, shaped
                  collectively and enriched with every new visitor. It's
                  inclusive, ambient, and purpose-driven.
                </p>
              </AnimatedSection>

              <AnimatedSection
                className="md:col-span-3 md:col-start-9 flex flex-col justify-start"
                animation="slideIn"
                delay={0.2}
              >
                <div className="border-l-2 border-coffi-purple/30 pl-6 mb-8">
                  <h4 className="text-xl font-medium mb-2">Place-First</h4>
                  <p className="text-j-deep-black/80">
                    Unlike person-centered networks, Coffi prioritizes space
                    over identity.
                  </p>
                </div>

                <div className="border-l-2 border-coffi-purple/30 pl-6 mb-8">
                  <h4 className="text-xl font-medium mb-2">Collective
                    Intelligence</h4>
                  <p className="text-j-deep-black/80">
                    Community insights create dynamic, real-time guides to each
                    location.
                  </p>
                </div>

                <div className="border-l-2 border-coffi-purple/30 pl-6">
                  <h4 className="text-xl font-medium mb-2">Ambient Awareness</h4>
                  <p className="text-j-deep-black/80">
                    Real-time "vibes" help users find the perfect match for
                    their current needs.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection
                className="md:col-span-8 md:col-start-3 text-2xl md:text-3xl font-light text-coffi-purple/80 italic text-center border-t border-b border-coffi-purple/10 py-12 my-8"
                animation="fadeIn"
                delay={0.3}
              >
                <blockquote>
                  "In a world of personality-driven platforms, Coffi chooses to
                  put the spotlight on places—letting the spaces speak for
                  themselves."
                </blockquote>
              </AnimatedSection>
            </div>

            {/* Bottom divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-coffi-purple/20 to-transparent mt-16"></div>
          </AnimatedSection>

          {/* Business Strategy Section */}
          <AnimatedSection className="md:col-span-6" animation="fadeUp">
            <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3 block">
              The Business
            </span>
            <h3 className="text-3xl font-bold mb-8">
              Monetization <span className="text-coffi-purple">Strategy</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="border-l-2 border-coffi-purple/30 pl-4"
              >
                <h4 className="font-semibold text-xl mb-2">Free Layer</h4>
                <p className="text-j-deep-black/80">
                  Full database access + reviews and basic filtering
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="border-l-2 border-coffi-purple/30 pl-4"
              >
                <h4 className="font-semibold text-xl mb-2">Premium Layer</h4>
                <p className="text-j-deep-black/80">
                  Real-time sessions, personalization, exclusive places
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="border-l-2 border-coffi-purple/30 pl-4"
              >
                <h4 className="font-semibold text-xl mb-2">Gamification</h4>
                <p className="text-j-deep-black/80">
                  Points for contributions, redeemable for benefits
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="border-l-2 border-coffi-purple/30 pl-4"
              >
                <h4 className="font-semibold text-xl mb-2">Venue Dashboard</h4>
                <p className="text-j-deep-black/80">
                  Insights for business owners (coming soon)
                </p>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Long-Term Vision */}
          <AnimatedSection
            className="md:col-span-6"
            animation="fadeUp"
            delay={0.2}
          >
            <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3 block">
              Looking Forward
            </span>
            <h3 className="text-3xl font-bold mb-8">
              Long-Term <span className="text-coffi-purple">Vision</span>
            </h3>

            <div className="space-y-6 prose prose-lg max-w-none">
              <p>
                Coffi is set to evolve beyond a simple discovery tool into an
                ecosystem that supports digital nomads throughout their journey:
              </p>

              <ul className="space-y-3 list-none pl-0">
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start"
                >
                  <span className="text-2xl text-coffi-purple mr-3">→</span>
                  <span>Smart recommendation engine powered by AI</span>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-start"
                >
                  <span className="text-2xl text-coffi-purple mr-3">→</span>
                  <span>Productivity tools integration</span>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="flex items-start"
                >
                  <span className="text-2xl text-coffi-purple mr-3">→</span>
                  <span>Web3 layer for reward trust and verification</span>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="flex items-start"
                >
                  <span className="text-2xl text-coffi-purple mr-3">→</span>
                  <span>Global nomad graph connecting people and places</span>
                </motion.li>
              </ul>
            </div>
          </AnimatedSection>

          {/* Concluding Section */}
          <AnimatedSection
            className="md:col-span-full text-center mt-24 relative"
            animation="fadeIn"
          >
            <div className="absolute -top-40 left-0 right-0 h-px bg-gradient-to-r from-transparent via-coffi-purple/20 to-transparent"></div>

            <h2 className="text-4xl md:text-6xl font-bold mb-8 max-w-4xl mx-auto">
              Where <span className="text-coffi-purple">Technology</span> Meets{" "}
              <span className="text-coffi-blue">Serendipity</span>
            </h2>

            <p className="text-xl max-w-3xl mx-auto mb-12 text-j-deep-black/80">
              I designed and built the entire platform—from frontend to backend,
              cloud infrastructure to real-time systems—because the world
              deserves better ways to connect with space and purpose.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-6 mt-8"
            >
              <CoffiSimpleButton
                text="Try Coffi Now"
                action={() => window.open("https://coffi.com.co", "_blank")}
              />

              <Link
                href="https://instagram.com/letscoffi"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-white/90 border border-coffi-purple/20 rounded-lg px-6 py-[7px] text-sm font-medium text-coffi-purple transition-all duration-300 ease-in-out"
              >
                <Instagram size={18} />
                Follow @letscoffi
              </Link>
            </motion.div>
          </AnimatedSection>
        </section>
      </main>
    </section>
  );
}
