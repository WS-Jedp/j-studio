"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ArrowLeft, Users, Globe, Briefcase } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AnimatedSection } from "@/components/animations/section";
import { useParallax } from "@/hooks/useParallax";
import { CoffiSimpleButton } from "@/containers/coffi-project/coffi-buttons";

interface TeamMember {
  name: string;
  role: string;
  description: string;
}

interface BusinessModel {
  type: string;
  description: string;
  features?: string[];
}

interface Competitor {
  name: string;
  focus: string;
  differentiator: string;
}

interface SolutionFeature {
  title: string;
  description: string;
}

export default function CoffiOnePagerPage() {
  const locale = useLocale();
  const t = useTranslations("coffi-one-pager");
  const { ref: sectionRef, scrollY } = useParallax();

  // Translation arrays helpers
  const problemPoints = [
    t("sections.problem.points.0"),
    t("sections.problem.points.1"),
    t("sections.problem.points.2"),
    t("sections.problem.points.3"),
  ];

  const solutionFeatures: SolutionFeature[] = [
    {
      title: t("sections.solution.features.0.title"),
      description: t("sections.solution.features.0.description"),
    },
    {
      title: t("sections.solution.features.1.title"),
      description: t("sections.solution.features.1.description"),
    },
    {
      title: t("sections.solution.features.2.title"),
      description: t("sections.solution.features.2.description"),
    },
    {
      title: t("sections.solution.features.3.title"),
      description: t("sections.solution.features.3.description"),
    },
  ];

  const businessModels: BusinessModel[] = [
    {
      type: t("sections.businessModel.models.0.type"),
      description: t("sections.businessModel.models.0.description"),
    },
    {
      type: t("sections.businessModel.models.1.type"),
      description: t("sections.businessModel.models.1.description"),
    },
    {
      type: t("sections.businessModel.models.2.type"),
      description: t("sections.businessModel.models.2.description"),
      features: [
        t("sections.businessModel.models.2.features.0"),
        t("sections.businessModel.models.2.features.1"),
        t("sections.businessModel.models.2.features.2"),
      ],
    },
  ];

  const competitors: Competitor[] = [
    {
      name: t("sections.competition.competitors.0.name"),
      focus: t("sections.competition.competitors.0.focus"),
      differentiator: t("sections.competition.competitors.0.differentiator"),
    },
    {
      name: t("sections.competition.competitors.1.name"),
      focus: t("sections.competition.competitors.1.focus"),
      differentiator: t("sections.competition.competitors.1.differentiator"),
    },
    {
      name: t("sections.competition.competitors.2.name"),
      focus: t("sections.competition.competitors.2.focus"),
      differentiator: t("sections.competition.competitors.2.differentiator"),
    },
    {
      name: t("sections.competition.competitors.3.name"),
      focus: t("sections.competition.competitors.3.focus"),
      differentiator: t("sections.competition.competitors.3.differentiator"),
    },
    {
      name: t("sections.competition.competitors.4.name"),
      focus: t("sections.competition.competitors.4.focus"),
      differentiator: t("sections.competition.competitors.4.differentiator"),
    },
  ];

  const teamMembers: TeamMember[] = [
    {
      name: t("sections.team.members.0.name"),
      role: t("sections.team.members.0.role"),
      description: t("sections.team.members.0.description"),
    },
    {
      name: t("sections.team.members.1.name"),
      role: t("sections.team.members.1.role"),
      description: t("sections.team.members.1.description"),
    },
    {
      name: t("sections.team.members.2.name"),
      role: t("sections.team.members.2.role"),
      description: t("sections.team.members.2.description"),
    },
  ];

  const marketingStrategies = [
    t("sections.marketing.strategies.0"),
    t("sections.marketing.strategies.1"),
    t("sections.marketing.strategies.2"),
    t("sections.marketing.strategies.3"),
  ];

  const financingAreas = [
    t("sections.financing.keyAreas.areas.0"),
    t("sections.financing.keyAreas.areas.1"),
    t("sections.financing.keyAreas.areas.2"),
    t("sections.financing.keyAreas.areas.3"),
  ];

  const financingSeeking = [
    t("sections.financing.seeking.0"),
    t("sections.financing.seeking.1"),
    t("sections.financing.seeking.2"),
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex flex-col justify-start bg-coffi-white min-h-screen"
    >
      {/* Navigation */}
      <div>
        <Link
          href={`/${locale}/coffi-project`}
          className="fixed top-8 left-8 z-50 flex items-center gap-2 text-coffi-purple px-3 py-1 hover:bg-white/80 rounded-full transition-all duration-300 backdrop-blur-sm"
        >
          <ArrowLeft size={16} />
          <span className="font-medium">{t("navigation.back")}</span>
        </Link>
      </div>

      {/* Content */}
      <div className="w-full">
        {/* Hero Section */}
        <header className="w-full h-screen flex flex-col items-center justify-center relative overflow-hidden">
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
              className="flex flex-row flex-nowrap items-center justify-center mb-8"
            >
              <Image
                src="/assets/images/coffi/coffi-logo.png"
                alt="Coffi Logo"
                width={80}
                height={80}
                className="object-cover"
                priority
              />
              <div className="flex flex-col items-start justify-center ml-4">
                <h2 className="font-black text-5xl text-transparent bg-clip-text bg-gradient-to-br from-coffi-blue to-coffi-purple">Coffi</h2>
                <h3 className="font-light text-lg mt-[-4px] text-gray-600">
                  {t("hero.subtitle")}
                </h3>
              </div>
            </motion.article>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{
                transform: `translateY(${scrollY * 0.05}px)`,
                opacity: `${1 - scrollY * 0.0008}`,
              }}
              className="max-w-4xl text-center text-xl md:text-2xl font-light leading-relaxed text-j-deep-black/90 mb-8"
            >
              {t("hero.description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center"
            >
              <div className="text-sm text-gray-500 uppercase tracking-wider mb-4">
                One Pager — OnGoing
              </div>
            </motion.div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 md:px-12 pb-32 relative">
          {/* Decorative lines */}
          <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-coffi-purple/10 to-transparent opacity-70"></div>
          <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-coffi-purple/10 to-transparent opacity-70"></div>

          {/* Value Proposition Section */}
          <AnimatedSection className="mb-24" animation="fadeIn">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-coffi-purple/20 to-transparent mb-16"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-coffi-blue to-coffi-purple rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">01</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-coffi-blue to-coffi-purple">
                    {t("sections.valueProposition.title")}
                  </h2>
                </div>
                
                <div className="prose prose-xl max-w-none mb-8">
                  <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">
                    {t("sections.valueProposition.content")}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-4">
                <blockquote className="relative">
                  <div className="absolute -top-4 -left-4 text-6xl text-coffi-purple/20 font-bold">&ldquo;</div>
                  <p className="text-2xl font-light italic text-coffi-purple/90 pl-8 pr-4">
                    {t("sections.valueProposition.quote")}
                  </p>
                </blockquote>
              </div>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-coffi-purple/20 to-transparent mt-16"></div>
          </AnimatedSection>

          {/* Problem & Solution - Two Column Layout */}
          <AnimatedSection className="mb-24" animation="fadeUp">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Problem */}
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">02</span>
                  </div>
                  <h3 className="text-3xl font-bold text-red-600">
                    {t("sections.problem.title")}
                  </h3>
                </div>
                
                <p className="text-lg font-medium text-gray-700 mb-6">
                  {t("sections.problem.subtitle")}
                </p>

                <ul className="space-y-4">
                  {problemPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <p className="font-medium text-red-800">
                    {t("sections.problem.conclusion")}
                  </p>
                </div>
              </div>

              {/* Solution */}
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-coffi-blue to-coffi-purple rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">03</span>
                  </div>
                  <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-coffi-blue to-coffi-purple">
                    {t("sections.solution.title")}
                  </h3>
                </div>

                <p className="text-lg font-medium text-gray-700 mb-6">
                  {t("sections.solution.subtitle")}
                </p>

                <div className="space-y-6">
                  {solutionFeatures.map((feature, index) => (
                    <div key={index} className="bg-gradient-to-r from-coffi-blue/5 to-coffi-purple/5 p-4 rounded-lg border-l-4 border-coffi-purple">
                      <h4 className="font-bold text-coffi-purple mb-2">
                        {feature.title}:
                      </h4>
                      <p className="text-gray-700">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Target Market */}
          <AnimatedSection className="mb-24" animation="slideIn">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 bg-gradient-to-br from-coffi-blue to-coffi-purple rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">04</span>
              </div>
              <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-coffi-blue to-coffi-purple">
                {t("sections.targetMarket.title")}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-800 mb-2">Users</h4>
                <p className="text-sm text-gray-600">{t("sections.targetMarket.users")}</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Briefcase className="w-4 h-4 text-green-600" />
                </div>
                <h4 className="font-bold text-gray-800 mb-2">Spaces</h4>
                <p className="text-sm text-gray-600">{t("sections.targetMarket.spaces")}</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-4 h-4 text-purple-600" />
                </div>
                <h4 className="font-bold text-gray-800 mb-2">Companies</h4>
                <p className="text-sm text-gray-600">{t("sections.targetMarket.companies")}</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-4 h-4 text-orange-600" />
                </div>
                <h4 className="font-bold text-gray-800 mb-2">Region</h4>
                <p className="text-sm text-gray-600">{t("sections.targetMarket.region")}</p>
              </div>
            </div>

            {/* Market Size */}
            <div className="bg-gradient-to-r from-coffi-blue/10 to-coffi-purple/10 p-8 rounded-xl">
              <h4 className="text-2xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-br from-coffi-blue to-coffi-purple">
                {t("sections.targetMarket.marketSize.title")}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-coffi-purple">+40M</div>
                  <p className="text-gray-700">{t("sections.targetMarket.marketSize.nomads")}</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-coffi-blue">$40B</div>
                  <p className="text-gray-700">{t("sections.targetMarket.marketSize.coworking")}</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-coffi-purple">LATAM</div>
                  <p className="text-gray-700">{t("sections.targetMarket.marketSize.latam")}</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Business Model */}
          <AnimatedSection className="mb-24" animation="fadeUp">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 bg-gradient-to-br from-coffi-blue to-coffi-purple rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">05</span>
              </div>
              <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-coffi-blue to-coffi-purple">
                {t("sections.businessModel.title")}
              </h3>
            </div>

            <div className="space-y-8">
              {businessModels.map((model, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                  <h4 className="text-xl font-bold text-coffi-purple mb-4">
                    {model.type}
                  </h4>
                  <p className="text-gray-700 mb-4">{model.description}</p>
                  
                  {model.features && (
                    <ul className="space-y-2">
                      {model.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-coffi-purple rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Competition Table */}
          <AnimatedSection className="mb-24" animation="fadeIn">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 bg-gradient-to-br from-coffi-blue to-coffi-purple rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">06</span>
              </div>
              <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-coffi-blue to-coffi-purple">
                {t("sections.competition.title")}
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-coffi-blue to-coffi-purple text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold">Competitor</th>
                    <th className="px-6 py-4 text-left font-bold">Focus</th>
                    <th className="px-6 py-4 text-left font-bold">Coffi Differentiator</th>
                  </tr>
                </thead>
                <tbody>
                  {competitors.map((competitor, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="px-6 py-4 font-semibold text-gray-800">{competitor.name}</td>
                      <td className="px-6 py-4 text-gray-600">{competitor.focus}</td>
                      <td className="px-6 py-4 text-coffi-purple font-medium">{competitor.differentiator}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>

          {/* Team Section */}
          <AnimatedSection className="mb-24" animation="slideIn">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 bg-gradient-to-br from-coffi-blue to-coffi-purple rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">07</span>
              </div>
              <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-coffi-blue to-coffi-purple">
                {t("sections.team.title")}
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                  <h4 className="text-xl font-bold text-gray-800 mb-2">
                    {member.name}
                  </h4>
                  <p className="text-coffi-purple font-semibold mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Marketing Strategy */}
          <AnimatedSection className="mb-24" animation="fadeUp">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 bg-gradient-to-br from-coffi-blue to-coffi-purple rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">08</span>
              </div>
              <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-coffi-blue to-coffi-purple">
                {t("sections.marketing.title")}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {marketingStrategies.map((strategy, index) => (
                <div key={index} className="bg-gradient-to-r from-coffi-blue/5 to-coffi-purple/5 p-6 rounded-lg border-l-4 border-coffi-purple">
                  <p className="text-gray-700">{strategy}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Impact Section */}
          <AnimatedSection className="mb-24" animation="fadeIn">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">09</span>
              </div>
              <h3 className="text-4xl font-bold text-green-600">
                {t("sections.impact.title")}
              </h3>
            </div>

            <div className="bg-green-50 p-8 rounded-xl border-l-4 border-green-500">
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {t("sections.impact.description")}
              </p>
            </div>
          </AnimatedSection>

          {/* Financing Section */}
          <AnimatedSection className="mb-24" animation="fadeUp">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 bg-gradient-to-br from-coffi-blue to-coffi-purple rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">10</span>
              </div>
              <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-coffi-blue to-coffi-purple">
                {t("sections.financing.title")}
              </h3>
            </div>

            <div className="space-y-8">
              <div className="bg-gradient-to-r from-coffi-blue/10 to-coffi-purple/10 p-8 rounded-xl">
                <p className="text-lg font-medium text-gray-800 mb-6">
                  {t("sections.financing.amount")}
                </p>

                <div className="mb-6">
                  <h4 className="text-xl font-bold text-coffi-purple mb-4">
                    {t("sections.financing.keyAreas.title")}
                  </h4>
                  <ul className="space-y-3">
                    {financingAreas.map((area, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-coffi-purple rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-lg font-medium text-gray-800 mb-4">
                  {t("sections.financing.beyond")}
                </p>

                <ul className="space-y-3 mb-6">
                  {financingSeeking.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-coffi-blue rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>

                <blockquote className="border-l-4 border-coffi-purple pl-6 py-2">
                  <p className="text-xl font-light text-coffi-purple/90 italic">
                    {t("sections.financing.philosophy")}
                  </p>
                </blockquote>
              </div>
            </div>
          </AnimatedSection>

          {/* Concluding Section */}
          <AnimatedSection className="text-center" animation="fadeIn">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-coffi-purple/20 to-transparent mb-16"></div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-br from-coffi-blue to-coffi-purple">
              {t("sections.conclusion.title")}
            </h2>

            <p className="text-xl max-w-3xl mx-auto mb-12 text-j-deep-black/80">
              {t("sections.conclusion.description")}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-6 mt-8"
            >
              <CoffiSimpleButton
                text={t("sections.conclusion.cta")}
                action={() => window.open("https://coffi.com.co", "_blank")}
              />
            </motion.div>
          </AnimatedSection>
        </main>
      </div>
    </section>
  );
}
