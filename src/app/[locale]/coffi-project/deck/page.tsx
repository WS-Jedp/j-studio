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
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function CoffiProjectDeckPage() {
  const locale = useLocale();
  const t = useTranslations("coffi-project-deck");
  const { ref: sectionRef, scrollY } = useParallax();
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Coffi-Project-Deck-${new Date().toISOString().split('T')[0]}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 15mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          color-adjust: exact;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }
        .no-print {
          display: none !important;
        }
        .print-page-break {
          page-break-before: always;
        }
        .print-content {
          font-size: 11px;
          line-height: 1.5;
          color: #1f2937;
        }
        .print-title {
          font-size: 28px;
          font-weight: 800;
          margin-bottom: 20px;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .print-section {
          margin-bottom: 40px;
        }
        .print-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        .print-card {
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 16px;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        .print-card-purple {
          border-color: #c4b5fd;
          background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
        }
        .print-card-blue {
          border-color: #a5b4fc;
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
        }
        .print-hero {
          text-align: center;
          padding: 40px 0;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-radius: 16px;
          margin-bottom: 30px;
        }
        .print-hero-title {
          font-size: 36px;
          font-weight: 900;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 12px;
        }
        .print-logo {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 18px;
          margin-right: 12px;
        }
        .print-subtitle {
          font-size: 14px;
          color: #64748b;
          margin-bottom: 20px;
        }
        .print-section-number {
          font-size: 48px;
          font-weight: 900;
          color: #e2e8f0;
          margin-bottom: 8px;
          display: block;
        }
        .print-section-category {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #8b5cf6;
          margin-bottom: 8px;
          font-weight: 600;
        }
        .print-card-title {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 12px;
        }
        .print-card-title-purple {
          color: #8b5cf6;
        }
        .print-card-title-blue {
          color: #3b82f6;
        }
        .print-list {
          list-style: none;
          padding: 0;
        }
        .print-list li {
          position: relative;
          padding-left: 16px;
          margin-bottom: 6px;
          font-size: 11px;
          line-height: 1.4;
        }
        .print-list li:before {
          content: "•";
          color: #8b5cf6;
          font-weight: bold;
          position: absolute;
          left: 0;
        }
        .print-highlight {
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          padding: 16px;
          border-radius: 8px;
          border-left: 4px solid #f59e0b;
          margin: 16px 0;
        }
        .print-quote {
          font-style: italic;
          font-size: 14px;
          color: #8b5cf6;
          text-align: center;
          font-weight: 500;
          margin: 20px 0;
          padding: 16px;
          background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
          border-radius: 8px;
        }
        .print-tech-stack {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-top: 20px;
        }
        .print-tech-item {
          padding: 12px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: #f8fafc;
        }
        .print-tech-title {
          font-weight: 600;
          font-size: 12px;
          margin-bottom: 4px;
        }
        .print-tech-name {
          font-weight: 700;
          font-size: 11px;
          color: #8b5cf6;
          margin-bottom: 4px;
        }
        .print-cities {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
          margin: 20px 0;
        }
        .print-city {
          text-align: center;
          padding: 12px 8px;
          background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
          border-radius: 8px;
          border: 1px solid #c4b5fd;
        }
        .print-city-name {
          font-weight: 600;
          font-size: 10px;
          color: #1f2937;
        }
      }
    `,
  });

  return (
    <>
      {/* PDF Download Button */}
      <button
        onClick={handlePrint}
        className="no-print fixed bottom-8 right-8 z-50 flex items-center gap-2 bg-coffi-purple hover:bg-coffi-purple/90 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300 backdrop-blur-sm"
        title={t("download.tooltip")}
      >
        <Download size={20} />
        <span className="hidden sm:inline font-medium">PDF</span>
      </button>

      {/* Hidden PDF Content */}
      <div ref={printRef} className="hidden print:block print-content">
        {/* Hero Section */}
        <div className="print-hero">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
            <div className="print-logo">C</div>
            <div style={{ textAlign: 'left' }}>
              <h1 style={{ fontSize: '24px', fontWeight: '900', margin: '0', lineHeight: '1' }}>Coffi</h1>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '0' }}>{t("hero.brandTagline")}</p>
            </div>
          </div>
          <h1 className="print-hero-title">{t("hero.title")}</h1>
          <p className="print-subtitle">{t("hero.subtitle")}</p>
        </div>

        <div className="print-page-break"></div>

        {/* Slide 1: Founder */}
        <div className="print-section">
          <span className="print-section-number">{t("slides.slide01.number")}</span>
          <div className="print-section-category">{t("slides.slide01.category")}</div>
          <h2 className="print-title">{t("slides.slide01.title")}</h2>
          <div className="print-card print-card-purple">
            <h3 className="print-card-title print-card-title-purple">{t("slides.slide01.founder.name")}</h3>
            <p style={{ marginBottom: '12px', lineHeight: '1.5' }}>{t("slides.slide01.founder.description")}</p>
            <p style={{ fontSize: '10px', color: '#64748b', fontWeight: '600' }}>{t("slides.slide01.founder.role")}</p>
          </div>
        </div>

        {/* Slide 2: What is Coffi */}
        <div className="print-section">
          <span className="print-section-number">{t("slides.slide02.number")}</span>
          <div className="print-section-category">{t("slides.slide02.category")}</div>
          <h2 className="print-title">{t("slides.slide02.title")}</h2>
          <p style={{ marginBottom: '20px', fontSize: '12px', lineHeight: '1.5' }}>{t("slides.slide02.subtitle")}</p>
          <div className="print-grid">
            <div className="print-card print-card-purple">
              <h3 className="print-card-title">{t("slides.slide02.coworking.title")}</h3>
              <p>{t("slides.slide02.coworking.description")}</p>
            </div>
            <div className="print-card print-card-blue">
              <h3 className="print-card-title">{t("slides.slide02.infrastructure.title")}</h3>
              <p>{t("slides.slide02.infrastructure.description")}</p>
            </div>
          </div>
        </div>

        {/* Slide 3: Target Market */}
        <div className="print-section">
          <span className="print-section-number">{t("slides.slide03.number")}</span>
          <div className="print-section-category">{t("slides.slide03.category")}</div>
          <h2 className="print-title">{t("slides.slide03.title")}</h2>
          <div className="print-grid">
            <div className="print-card print-card-purple">
              <h3 className="print-card-title print-card-title-purple">{t("slides.slide03.b2c.title")}</h3>
              <ul className="print-list">
                {t.raw("slides.slide03.b2c.points").map((point: string, index: number) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
            <div className="print-card print-card-blue">
              <h3 className="print-card-title print-card-title-blue">{t("slides.slide03.b2b_spaces.title")}</h3>
              <ul className="print-list">
                {t.raw("slides.slide03.b2b_spaces.points").map((point: string, index: number) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
            <div className="print-card print-card-purple">
              <h3 className="print-card-title print-card-title-purple">{t("slides.slide03.b2b_companies.title")}</h3>
              <ul className="print-list">
                {t.raw("slides.slide03.b2b_companies.points").map((point: string, index: number) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="print-page-break"></div>

        {/* Slide 4: Problem */}
        <div className="print-section">
          <span className="print-section-number">{t("slides.slide04.number")}</span>
          <div className="print-section-category">{t("slides.slide04.category")}</div>
          <h2 className="print-title">{t("slides.slide04.title")}</h2>
          <div className="print-grid">
            <div className="print-card print-card-purple">
              <h3 className="print-card-title print-card-title-purple">{t("slides.slide04.b2c_problem.title")}</h3>
              <p style={{ marginBottom: '12px' }}>{t("slides.slide04.b2c_problem.description")}</p>
              <div className="print-highlight">
                <strong>Solución:</strong> {t("slides.slide04.b2c_problem.solution")}
              </div>
            </div>
            <div className="print-card print-card-blue">
              <h3 className="print-card-title print-card-title-blue">{t("slides.slide04.b2b_problem.title")}</h3>
              <p style={{ marginBottom: '12px' }}>{t("slides.slide04.b2b_problem.description")}</p>
              <div className="print-highlight">
                <strong>Solución:</strong> {t("slides.slide04.b2b_problem.solution")}
              </div>
            </div>
          </div>
        </div>

        {/* Slide 5: Business Model */}
        <div className="print-section">
          <span className="print-section-number">{t("slides.slide05.number")}</span>
          <div className="print-section-category">{t("slides.slide05.category")}</div>
          <h2 className="print-title">{t("slides.slide05.title")}</h2>
          <div className="print-grid">
            <div className="print-card print-card-purple">
              <h3 className="print-card-title print-card-title-purple">{t("slides.slide05.b2c_freemium.title")}</h3>
              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ fontWeight: '600', fontSize: '12px', marginBottom: '8px' }}>{t("slides.slide05.b2c_freemium.explorer.title")}</h4>
                <ul className="print-list">
                  {t.raw("slides.slide05.b2c_freemium.explorer.features").map((feature: string, index: number) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 style={{ fontWeight: '600', fontSize: '12px', marginBottom: '8px' }}>{t("slides.slide05.b2c_freemium.nomad.title")}</h4>
                <ul className="print-list">
                  {t.raw("slides.slide05.b2c_freemium.nomad.features").map((feature: string, index: number) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="print-card print-card-blue">
              <h3 className="print-card-title print-card-title-blue">{t("slides.slide05.b2b_saas.title")}</h3>
              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ fontWeight: '600', fontSize: '12px', marginBottom: '8px' }}>{t("slides.slide05.b2b_saas.free_tier.title")}</h4>
                <ul className="print-list">
                  {t.raw("slides.slide05.b2b_saas.free_tier.features").map((feature: string, index: number) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 style={{ fontWeight: '600', fontSize: '12px', marginBottom: '8px' }}>{t("slides.slide05.b2b_saas.premium_tier.title")}</h4>
                <ul className="print-list">
                  {t.raw("slides.slide05.b2b_saas.premium_tier.features").map((feature: string, index: number) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="print-page-break"></div>

        {/* Slide 6: Competitive Advantage */}
        <div className="print-section">
          <span className="print-section-number">{t("slides.slide06.number")}</span>
          <div className="print-section-category">{t("slides.slide06.category")}</div>
          <h2 className="print-title">{t("slides.slide06.title")}</h2>
          <div className="print-grid">
            <div className="print-card print-card-purple">
              <h3 className="print-card-title print-card-title-purple">{t("slides.slide06.living_nodes.title")}</h3>
              <p>{t("slides.slide06.living_nodes.description")}</p>
            </div>
            <div className="print-card print-card-blue">
              <h3 className="print-card-title print-card-title-blue">{t("slides.slide06.engagement_cycle.title")}</h3>
              <p>{t("slides.slide06.engagement_cycle.description")}</p>
            </div>
          </div>
        </div>

        {/* Slide 7: Current State & Roadmap */}
        <div className="print-section">
          <span className="print-section-number">{t("slides.slide07.number")}</span>
          <div className="print-section-category">{t("slides.slide07.category")}</div>
          <h2 className="print-title">{t("slides.slide07.title")}</h2>
          <div className="print-grid">
            <div className="print-card print-card-purple">
              <h3 className="print-card-title">{t("slides.slide07.current_state.title")}</h3>
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{ width: '8px', height: '8px', backgroundColor: '#8b5cf6', borderRadius: '50%', marginRight: '12px', marginTop: '4px', flexShrink: 0 }}></div>
                <div>
                  <h4 style={{ fontWeight: '600', fontSize: '12px', marginBottom: '4px' }}>{t("slides.slide07.current_state.mvp_ready.title")}</h4>
                  <p style={{ fontSize: '10px', color: '#64748b' }}>{t("slides.slide07.current_state.mvp_ready.description")}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div style={{ width: '8px', height: '8px', backgroundColor: '#8b5cf6', borderRadius: '50%', marginRight: '12px', marginTop: '4px', flexShrink: 0 }}></div>
                <div>
                  <h4 style={{ fontWeight: '600', fontSize: '12px', marginBottom: '4px' }}>{t("slides.slide07.current_state.growth_strategy.title")}</h4>
                  <p style={{ fontSize: '10px', color: '#64748b' }}>{t("slides.slide07.current_state.growth_strategy.description")}</p>
                </div>
              </div>
            </div>

            <div className="print-card print-card-blue">
              <h3 className="print-card-title">{t("slides.slide07.next_4_months.title")}</h3>
              {t.raw("slides.slide07.next_4_months.roadmap_items").map((item: any, index: number) => (
                <div key={index} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#3b82f6', marginRight: '12px', flexShrink: 0 }}>{index + 1}</span>
                  <div>
                    <span style={{ fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '2px' }}>{item.title}</span>
                    <span style={{ fontSize: '10px', color: '#64748b' }}>{item.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="print-page-break"></div>

        {/* Slide 8: Funding Objective */}
        <div className="print-section">
          <span className="print-section-number">{t("slides.slide08.number")}</span>
          <div className="print-section-category">{t("slides.slide08.category")}</div>
          <h2 className="print-title">{t("slides.slide08.title")}</h2>
          <p style={{ marginBottom: '20px', fontSize: '13px', lineHeight: '1.6' }}>{t("slides.slide08.main_text")}</p>
          
          <div className="print-cities">
            {t.raw("slides.slide08.cities").map((city: string, index: number) => (
              <div key={city} className="print-city">
                <div className="print-city-name">{city}</div>
              </div>
            ))}
          </div>

          <div className="print-highlight">
            <p style={{ fontWeight: '600', marginBottom: '8px' }}>{t("slides.slide08.strategy_text")}</p>
            <p>{t("slides.slide08.execution_text")}</p>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="print-section">
          <span className="print-section-number">{t("slides.slide13.number")}</span>
          <div className="print-section-category">{t("slides.slide13.category")}</div>
          <h2 className="print-title">{t("slides.slide13.title")}</h2>
          <p style={{ marginBottom: '20px', textAlign: 'center', fontSize: '12px' }}>{t("slides.slide13.developed_by")}</p>
          
          <div className="print-tech-stack">
            <div className="print-tech-item">
              <div className="print-tech-title">{t("slides.slide13.tech_stack.frontend.title")}</div>
              <div className="print-tech-name">{t("slides.slide13.tech_stack.frontend.tech")}</div>
              <p style={{ fontSize: '10px', lineHeight: '1.3' }}>{t("slides.slide13.tech_stack.frontend.description")}</p>
            </div>
            <div className="print-tech-item">
              <div className="print-tech-title">{t("slides.slide13.tech_stack.backend.title")}</div>
              <div className="print-tech-name">{t("slides.slide13.tech_stack.backend.tech")}</div>
              <p style={{ fontSize: '10px', lineHeight: '1.3' }}>{t("slides.slide13.tech_stack.backend.description")}</p>
            </div>
            <div className="print-tech-item">
              <div className="print-tech-title">{t("slides.slide13.tech_stack.infrastructure.title")}</div>
              <div className="print-tech-name">{t("slides.slide13.tech_stack.infrastructure.tech")}</div>
              <p style={{ fontSize: '10px', lineHeight: '1.3' }}>{t("slides.slide13.tech_stack.infrastructure.description")}</p>
            </div>
            <div className="print-tech-item">
              <div className="print-tech-title">{t("slides.slide13.tech_stack.landing.title")}</div>
              <div className="print-tech-name">{t("slides.slide13.tech_stack.landing.tech")}</div>
              <p style={{ fontSize: '10px', lineHeight: '1.3' }}>{t("slides.slide13.tech_stack.landing.description")}</p>
            </div>
          </div>
        </div>

        {/* Final section */}
        <div className="print-section">
          <span className="print-section-number">{t("slides.slide14.number")}</span>
          <div className="print-section-category">{t("slides.slide14.category")}</div>
          <h2 className="print-title">{t("slides.slide14.title")}</h2>
          <p style={{ marginBottom: '20px', fontSize: '12px', lineHeight: '1.6' }}>{t("slides.slide14.vision_text")}</p>
          <div className="print-quote">{t("slides.slide14.quote")}</div>
        </div>
      </div>

      {/* Existing web content */}
      <section
        ref={sectionRef}
        className="no-print relative w-full flex flex-col justify-start bg-coffi-white min-h-screen"
      >
        {/* Navigation */}
        <Link
          href={`/${locale}/coffi-project`}
          className="fixed top-8 left-8 z-50 flex items-center gap-2 text-coffi-purple px-3 py-1 hover:bg-white/80 rounded-full transition-all duration-300 backdrop-blur-sm"
        >
          <ArrowLeft size={16} />
          <span className="font-medium">{t("navigation.backToPortfolio")}</span>
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
                alt={t("hero.logoAlt")}
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

          {/* Slide 1: Founder Introduction */}
          <AnimatedSection
            className="min-h-screen flex items-center justify-center"
            animation="fadeIn"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full">
              <div className="md:col-span-6 md:col-start-2">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-6xl font-black text-coffi-purple/10 block mb-4"
                >
                  {t("slides.slide01.number")}
                </motion.span>
                <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3 block">
                  {t("slides.slide01.category")}
                </span>
                <h2 className="text-4xl md:text-6xl font-bold mb-8">
                  {t("slides.slide01.title").split(" ")[0]}  {t("slides.slide01.title").split(" ")[1]} <span className="text-coffi-purple">{t("slides.slide01.title").split(" ")[2]}</span>
                </h2>
              </div>

              <div className="md:col-span-4 md:col-start-8 flex flex-col justify-center">
                <div className="border-l-4 border-coffi-purple pl-6">
                  <h3 className="text-2xl font-bold mb-4 text-coffi-purple">
                    {t("slides.slide01.founder.name")}
                  </h3>
                  <p className="text-lg leading-relaxed mb-6">
                    {t("slides.slide01.founder.description")}
                  </p>
                  <div className="flex items-center gap-2 text-coffi-purple">
                    <Star size={16} />
                    <span className="text-sm font-medium">{t("slides.slide01.founder.role")}</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Slide 2: What is Coffi */}
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
                  {t("slides.slide02.number")}
                </motion.span>
                <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3 block">
                  {t("slides.slide02.category")}
                </span>
                <h2 className="text-4xl md:text-6xl font-bold mb-2">
                  {t("slides.slide02.title").replace("Coffi", "")} <span className="text-coffi-purple">Coffi</span>
                </h2>
                <p className="max-w-2xl mx-auto text-lg md:text-xl leading-relaxed text-j-deep-black/80 mb-8">
                  {t("slides.slide02.subtitle")}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                  className="text-center p-8 bg-gradient-to-br from-coffi-purple/5 to-coffi-blue/5 rounded-2xl"
                >
                  <div className="w-16 h-16 bg-coffi-purple/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Zap className="text-coffi-purple" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{t("slides.slide02.coworking.title")}</h3>
                  <p className="text-lg leading-relaxed">
                    {t("slides.slide02.coworking.description")}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-center p-8 bg-gradient-to-br from-coffi-blue/5 to-coffi-purple/5 rounded-2xl"
                >
                  <div className="w-16 h-16 bg-coffi-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Globe className="text-coffi-blue" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    {t("slides.slide02.infrastructure.title")}
                  </h3>
                  <p className="text-lg leading-relaxed">
                    {t("slides.slide02.infrastructure.description")}
                  </p>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>

          {/* Slide 3: Target Market */}
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
                  {t("slides.slide03.number")}
                </motion.span>
                <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3 block">
                  {t("slides.slide03.category")}
                </span>
                <h2 className="text-4xl md:text-6xl font-bold mb-8">
                  {t("slides.slide03.title").split(" ")[0]} <span className="text-coffi-purple">{t("slides.slide03.title").split(" ")[1]}</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                  className="p-8 border border-coffi-purple/20 rounded-2xl hover:border-coffi-purple/40 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-coffi-purple/10 rounded-full flex items-center justify-center mb-6">
                    <Users className="text-coffi-purple" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-coffi-purple">
                    {t("slides.slide03.b2c.title")}
                  </h3>
                  <ul className="text-sm space-y-2 text-j-deep-black/80">
                    {t.raw("slides.slide03.b2c.points").map((point: string, index: number) => (
                      <li key={index}>• {point}</li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 border border-coffi-blue/20 rounded-2xl hover:border-coffi-blue/40 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-coffi-blue/10 rounded-full flex items-center justify-center mb-6">
                    <Target className="text-coffi-blue" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-coffi-blue">
                    {t("slides.slide03.b2b_spaces.title")}
                  </h3>
                  <ul className="text-sm space-y-2 text-j-deep-black/80">
                    {t.raw("slides.slide03.b2b_spaces.points").map((point: string, index: number) => (
                      <li key={index}>• {point}</li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="p-8 border border-coffi-purple/20 rounded-2xl hover:border-coffi-purple/40 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-coffi-purple/10 to-coffi-blue/10 rounded-full flex items-center justify-center mb-6">
                    <TrendingUp className="text-coffi-purple" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-coffi-purple">
                    {t("slides.slide03.b2b_companies.title")}
                  </h3>
                  <ul className="text-sm space-y-2 text-j-deep-black/80">
                    {t.raw("slides.slide03.b2b_companies.points").map((point: string, index: number) => (
                      <li key={index}>• {point}</li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>

          {/* Problem Section */}
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
                  {t("slides.slide04.number")}
                </motion.span>
                <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3 block">
                  {t("slides.slide04.category")}
                </span>
                <h2 className="text-4xl md:text-6xl font-bold mb-8">
                  {t("slides.slide04.title").split(" ")[0]} <span className="text-coffi-purple">{t("slides.slide04.title").split(" ")[1]}</span> {t("slides.slide04.title").split(" ")[2]}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                  className="border-l-4 border-coffi-purple pl-8"
                >
                  <h3 className="text-2xl font-bold mb-6 text-coffi-purple">
                    {t("slides.slide04.b2c_problem.title")}
                  </h3>
                  <p className="text-lg leading-relaxed mb-4">
                    {t("slides.slide04.b2c_problem.description")}
                  </p>
                  <p className="text-j-deep-black/80">
                    {t("slides.slide04.b2c_problem.solution")}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="border-l-4 border-coffi-blue pl-8"
                >
                  <h3 className="text-2xl font-bold mb-6 text-coffi-blue">
                    {t("slides.slide04.b2b_problem.title")}
                  </h3>
                  <p className="text-lg leading-relaxed mb-4">
                    {t("slides.slide04.b2b_problem.description")}
                  </p>
                  <p className="text-j-deep-black/80">
                    {t("slides.slide04.b2b_problem.solution")}
                  </p>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>

          {/* Business Model */}
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
                  {t("slides.slide05.number")}
                </motion.span>
                <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3 block">
                  {t("slides.slide05.category")}
                </span>
                <h2 className="text-4xl md:text-6xl font-bold mb-8">
                  {t("slides.slide05.title").split(" ")[0]} <span className="text-coffi-purple">{t("slides.slide05.title").split(" ")[1]}</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                <div className="space-y-8">
                  <h3 className="text-3xl font-bold text-coffi-purple mb-6">
                    {t("slides.slide05.b2c_freemium.title")}
                  </h3>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="p-6 bg-coffi-purple/5 rounded-xl"
                  >
                    <h4 className="font-bold text-lg mb-3">
                      {t("slides.slide05.b2c_freemium.explorer.title")}
                    </h4>
                    <ul className="text-sm space-y-1 text-j-deep-black/80">
                      {t.raw("slides.slide05.b2c_freemium.explorer.features").map((benefit: string, index: number) => (
                        <li key={index}>• {benefit}</li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="p-6 bg-coffi-purple/10 rounded-xl"
                  >
                    <h4 className="font-bold text-lg mb-3">{t("slides.slide05.b2c_freemium.nomad.title")}</h4>
                    <ul className="text-sm space-y-1 text-j-deep-black/80">
                      {t.raw("slides.slide05.b2c_freemium.nomad.features").map((benefit: string, index: number) => (
                        <li key={index}>• {benefit}</li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                <div className="space-y-8">
                  <h3 className="text-3xl font-bold text-coffi-blue mb-6">
                    {t("slides.slide05.b2b_saas.title")}
                  </h3>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="p-6 bg-coffi-blue/5 rounded-xl"
                  >
                    <h4 className="font-bold text-lg mb-3">{t("slides.slide05.b2b_saas.free_tier.title")}</h4>
                    <ul className="text-sm space-y-1 text-j-deep-black/80">
                      {t.raw("slides.slide05.b2b_saas.free_tier.features").map((benefit: string, index: number) => (
                        <li key={index}>• {benefit}</li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="p-6 bg-coffi-blue/10 rounded-xl"
                  >
                    <h4 className="font-bold text-lg mb-3">{t("slides.slide05.b2b_saas.premium_tier.title")}</h4>
                    <ul className="text-sm space-y-1 text-j-deep-black/80">
                      {t.raw("slides.slide05.b2b_saas.premium_tier.features").map((benefit: string, index: number) => (
                        <li key={index}>• {benefit}</li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Slide 6: Competitive Advantage */}
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
                  {t("slides.slide06.number")}
                </motion.span>
                <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3 block">
                  {t("slides.slide06.category")}
                </span>
                <h2 className="text-4xl md:text-6xl font-bold mb-8">
                  {t("slides.slide06.title").split(" ")[0]} <span className="text-coffi-purple">{t("slides.slide06.title").split(" ")[1]}</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                  className="text-center p-8 bg-gradient-to-br from-coffi-purple/5 to-coffi-blue/5 rounded-2xl"
                >
                  <div className="w-20 h-20 bg-coffi-purple/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Brain className="text-coffi-purple" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-coffi-purple">
                    {t("slides.slide06.living_nodes.title")}
                  </h3>
                  <p className="text-lg leading-relaxed">
                    {t("slides.slide06.living_nodes.description")}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-center p-8 bg-gradient-to-br from-coffi-blue/5 to-coffi-purple/5 rounded-2xl"
                >
                  <div className="w-20 h-20 bg-coffi-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Rocket className="text-coffi-blue" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-coffi-blue">
                    {t("slides.slide06.engagement_cycle.title")}
                  </h3>
                  <p className="text-lg leading-relaxed">
                    {t("slides.slide06.engagement_cycle.description")}
                  </p>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>

          {/* Slide 7: Current State & Roadmap */}
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
                  {t("slides.slide07.number")}
                </motion.span>
                <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3 block">
                  {t("slides.slide07.category")}
                </span>
                <h2 className="text-4xl md:text-6xl font-bold mb-8">
                  {t("slides.slide07.title").split(" ")[0]} <span className="text-coffi-purple">{t("slides.slide07.title").split(" ")[1]}</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                <div className="space-y-8">
                  <h3 className="text-3xl font-bold text-coffi-purple mb-6">
                    {t("slides.slide07.current_state.title")}
                  </h3>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4 p-6 bg-coffi-purple/5 rounded-xl"
                  >
                    <div className="w-8 h-8 bg-coffi-purple/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-3 h-3 bg-coffi-purple rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">{t("slides.slide07.current_state.mvp_ready.title")}</h4>
                      <p className="text-j-deep-black/80">
                        {t("slides.slide07.current_state.mvp_ready.description")}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4 p-6 bg-coffi-purple/5 rounded-xl"
                  >
                    <div className="w-8 h-8 bg-coffi-purple/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-3 h-3 bg-coffi-purple rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">
                        {t("slides.slide07.current_state.growth_strategy.title")}
                      </h4>
                      <p className="text-j-deep-black/80">
                        {t("slides.slide07.current_state.growth_strategy.description")}
                      </p>
                    </div>
                  </motion.div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-coffi-blue mb-6">
                    {t("slides.slide07.next_4_months.title")}
                  </h3>

                  {t.raw("slides.slide07.next_4_months.roadmap_items").map((item: any, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-3 p-4 border border-coffi-blue/20 rounded-lg hover:border-coffi-blue/40 transition-all duration-300"
                    >
                      <span className="text-2xl font-bold text-coffi-blue">
                        {index + 1}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xl font-bold text-j-deep-black">
                          {item.title}
                        </span>
                        <span className="text-j-deep-black/60 text-sm">
                          {item.description}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Slide 8: Funding Objective */}
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
                  {t("slides.slide08.number")}
                </motion.span>
                <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3 block">
                  {t("slides.slide08.category")}
                </span>
                <h2 className="text-4xl md:text-6xl font-bold mb-8">
                  {t("slides.slide08.title").replace("Financiación", "")} <span className="text-coffi-purple">
                    {locale === "es" ? "Financiación" : "Funding"}
                  </span>
                </h2>
              </div>

              <div className="space-y-12">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                  className="text-center max-w-4xl mx-auto"
                >
                  <p className="text-xl md:text-2xl leading-relaxed mb-8">
                    {t("slides.slide08.main_text")}
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-12">
                  {t.raw("slides.slide08.cities").map((city: string, index: number) => (
                    <motion.div
                      key={city}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center p-6 bg-gradient-to-br from-coffi-purple/5 to-coffi-blue/5 rounded-xl"
                    >
                      <MapPin
                        className="mx-auto mb-3 text-coffi-purple"
                        size={24}
                      />
                      <h4 className="font-bold text-lg">{city}</h4>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="border-l-4 border-coffi-purple pl-8 bg-coffi-purple/5 p-8 rounded-r-xl"
                >
                  <p className="text-lg leading-relaxed mb-4">
                    <strong>
                      {t("slides.slide08.strategy_text")}
                    </strong>
                  </p>
                  <p className="text-lg leading-relaxed">
                    {t("slides.slide08.execution_text")}
                  </p>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>

          {/* Slide 9: Commercial Strategy */}
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
                  {t("slides.slide09.number")}
                </motion.span>
                <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3 block">
                  {t("slides.slide09.category")}
                </span>
                <h2 className="text-4xl md:text-6xl font-bold mb-8">
                  {t("slides.slide09.title").split(" ")[0]} <span className="text-coffi-purple">{t("slides.slide09.title").split(" ")[1]}</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                  className="p-8 border border-coffi-purple/20 rounded-2xl hover:border-coffi-purple/40 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-coffi-purple/10 rounded-full flex items-center justify-center mb-6">
                    <Users className="text-coffi-purple" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-coffi-purple">
                    {t("slides.slide09.b2c_strategy.title")}
                  </h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-coffi-purple/30 pl-4">
                      <h4 className="font-bold text-lg mb-2">
                        {t("slides.slide09.b2c_strategy.campaign.title")}
                      </h4>
                      <p className="text-j-deep-black/80">
                        {t("slides.slide09.b2c_strategy.campaign.description")}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="p-8 border border-coffi-blue/20 rounded-2xl hover:border-coffi-blue/40 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-coffi-blue/10 rounded-full flex items-center justify-center mb-6">
                    <Target className="text-coffi-blue" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-coffi-blue">
                    {t("slides.slide09.b2b_strategy.title")}
                  </h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-coffi-blue/30 pl-4">
                      <h4 className="font-bold text-lg mb-2">
                        {t("slides.slide09.b2b_strategy.campaign.title")}
                      </h4>
                      <p className="text-j-deep-black/80 mb-1">
                        {t("slides.slide09.b2b_strategy.campaign.description1")}
                      </p>
                      <p className="text-j-deep-black/80">
                        {t("slides.slide09.b2b_strategy.campaign.description2")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>

          {/* Slide 10: North Star Metrics */}
          <AnimatedSection
            className="min-h-screen flex items-center justify-center"
            animation="fadeIn"
          >
            <div className="w-full max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-6xl font-black text-coffi-purple/10 block mb-4"
                >
                  {t("slides.slide10.number")}
                </motion.span>
                <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3 block">
                  {t("slides.slide10.category")}
                </span>
                <h2 className="text-4xl md:text-6xl font-bold mb-8">
                  North Star <span className="text-coffi-purple">Metrics</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                  className="text-center p-8 bg-gradient-to-br from-coffi-purple/5 to-coffi-blue/5 rounded-2xl"
                >
                  <div className="w-20 h-20 bg-coffi-purple/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <BarChart3 className="text-coffi-purple" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-coffi-purple">
                    {t("slides.slide10.b2c_metric.title")}
                  </h3>
                  <p className="text-lg leading-relaxed">
                    <strong>{t("slides.slide10.b2c_metric.description")}</strong>
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
                    <TrendingUp className="text-coffi-blue" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-coffi-blue">
                    {t("slides.slide10.b2b_metric.title")}
                  </h3>
                  <p className="text-lg leading-relaxed">
                    <strong>{t("slides.slide10.b2b_metric.description")}</strong>
                  </p>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>

          {/* Slide 11: Competition */}
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
                  {t("slides.slide11.number")}
                </motion.span>
                <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3 block">
                  {t("slides.slide11.category")}
                </span>
                <h2 className="text-4xl md:text-6xl font-bold mb-8">
                  {t("slides.slide11.title").split(" ")[0]} <span className="text-coffi-purple">{t("slides.slide11.title").split(" ")[1]}</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                  className="p-6 border border-coffi-purple/20 rounded-xl"
                >
                  <h3 className="text-xl font-bold mb-4 text-coffi-purple">
                    {t("slides.slide11.direct_competition.title")}
                  </h3>
                  <ul className="space-y-2 text-j-deep-black/80">
                    {t.raw("slides.slide11.direct_competition.competitors").map((competidor: string, index: number) => (
                      <li key={index}>• {competidor}</li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 border border-coffi-blue/20 rounded-xl"
                >
                  <h3 className="text-xl font-bold mb-4 text-coffi-blue">
                    {t("slides.slide11.indirect_competition.title")}
                  </h3>
                  <ul className="space-y-2 text-j-deep-black/80">
                    {t.raw("slides.slide11.indirect_competition.competitors").map((competidor: string, index: number) => (
                      <li key={index}>• {competidor}</li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="p-6 bg-gradient-to-br from-coffi-purple/5 to-coffi-blue/5 rounded-xl"
                >
                  <div className="w-12 h-12 bg-coffi-purple/10 rounded-full flex items-center justify-center mb-4">
                    <Shield className="text-coffi-purple" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-coffi-purple">
                    {t("slides.slide11.our_differential.title")}
                  </h3>
                  <p className="text-j-deep-black/80">
                    {t("slides.slide11.our_differential.description")}
                  </p>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>

          {/* Slide 12: Product Expansion */}
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
                  className="text-6xl font-black text-coffi-purple/10 block"
                >
                  {t("slides.slide12.number")}
                </motion.span>
                <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3 block">
                  {t("slides.slide12.category")}
                </span>
                <h2 className="text-4xl md:text-6xl font-bold">
                  {t("slides.slide12.title").split(" ")[0]}{" "}
                  <span className="text-coffi-purple">{t("slides.slide12.title").split(" ")[1]}</span>
                </h2>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="text-center max-w-4xl mx-auto mb-8"
              >
                <p className="text-xl md:text-2xl leading-relaxed mb-8">
                  {t("slides.slide12.intro_text")}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                  className="text-center p-8 bg-gradient-to-br from-coffi-purple/5 to-coffi-blue/5 rounded-2xl"
                >
                  <div className="w-20 h-20 bg-coffi-purple/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Zap className="text-coffi-purple" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    {t("slides.slide12.espresso.title")}
                  </h3>
                  <p className="text-lg leading-relaxed">
                    {t("slides.slide12.espresso.description")}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-center p-8 bg-gradient-to-br from-coffi-blue/5 to-coffi-purple/5 rounded-2xl"
                >
                  <div className="w-20 h-20 bg-coffi-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Globe className="text-coffi-blue" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    {t("slides.slide12.affogato.title")}
                  </h3>
                  <p className="text-lg leading-relaxed">
                    {t("slides.slide12.affogato.description")}
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-center mt-12 p-6 border border-coffi-purple/20 rounded-xl max-w-4xl mx-auto"
              >
                <p className="text-lg">
                  {t("slides.slide12.core_tech")}
                </p>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Slide 13: Technology */}
          <AnimatedSection
            className="min-h-screen flex items-center justify-center"
            animation="fadeIn"
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
                  {t("slides.slide13.number")}
                </motion.span>
                <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3 block">
                  {t("slides.slide13.category")}
                </span>
                <h2 className="text-4xl md:text-6xl font-bold mb-8">
                  {t("slides.slide13.title").split(" ")[0]}{" "}
                  <span className="text-coffi-purple">{t("slides.slide13.title").split(" ")[1]}</span>
                </h2>
              </div>

              <div className="text-center mb-12">
                <p className="text-xl text-j-deep-black/80 mb-8">
                  {t("slides.slide13.developed_by")}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: t("slides.slide13.tech_stack.frontend.title"),
                    tech: t("slides.slide13.tech_stack.frontend.tech"),
                    desc: t("slides.slide13.tech_stack.frontend.description"),
                    icon: Code2,
                    color: "purple",
                  },
                  {
                    title: t("slides.slide13.tech_stack.backend.title"),
                    tech: t("slides.slide13.tech_stack.backend.tech"),
                    desc: t("slides.slide13.tech_stack.backend.description"),
                    icon: Code2,
                    color: "blue",
                  },
                  {
                    title: t("slides.slide13.tech_stack.infrastructure.title"),
                    tech: t("slides.slide13.tech_stack.infrastructure.tech"),
                    desc: t("slides.slide13.tech_stack.infrastructure.description"),
                    icon: Globe,
                    color: "purple",
                  },
                  {
                    title: t("slides.slide13.tech_stack.landing.title"),
                    tech: t("slides.slide13.tech_stack.landing.tech"),
                    desc: t("slides.slide13.tech_stack.landing.description"),
                    icon: Zap,
                    color: "blue",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`p-6 border ${
                      item.color === "purple"
                        ? "border-coffi-purple/20 hover:border-coffi-purple/40"
                        : "border-coffi-blue/20 hover:border-coffi-blue/40"
                    } rounded-xl transition-all duration-300`}
                  >
                    <div
                      className={`w-12 h-12 ${
                        item.color === "purple"
                          ? "bg-coffi-purple/10"
                          : "bg-coffi-blue/10"
                      } rounded-full flex items-center justify-center mb-4`}
                    >
                      <item.icon
                        className={
                          item.color === "purple"
                            ? "text-coffi-purple"
                            : "text-coffi-blue"
                        }
                        size={24}
                      />
                    </div>
                    <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                    <p
                      className={`font-semibold mb-1 ${
                        item.color === "purple"
                          ? "text-coffi-purple"
                          : "text-coffi-blue"
                      }`}
                    >
                      {item.tech}
                    </p>
                    <p className="text-sm text-j-deep-black/80">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Final CTA Section */}
          <AnimatedSection
            className="min-h-screen flex items-center justify-center"
            animation="fadeIn"
          >
            <div className="text-center max-w-4xl mx-auto">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-6xl font-black text-coffi-purple/10 block mb-4"
              >
                {t("slides.slide14.number")}
              </motion.span>
              <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-8 block">
                {t("slides.slide14.category")}
              </span>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-5xl md:text-7xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-br from-coffi-blue to-coffi-purple"
              >
                {t("slides.slide14.title")}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <p className="text-xl leading-relaxed text-j-deep-black/80">
                  {t("slides.slide14.vision_text")}
                </p>

                <p className="text-2xl font-light text-coffi-purple/90 italic mb-8">
                  {t("slides.slide14.quote")}
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
                  {t("cta.follow_instagram")}
                </Link>
              </motion.div>
            </div>
          </AnimatedSection>
        </main>
      </section>
    </>
  );
}
