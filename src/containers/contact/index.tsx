import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

export const Contact = () => {
  const locale = useLocale();
  const t = useTranslations("contact");
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Create transform values for parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.9]);
  const scale1 = useTransform(scrollYProgress, [0, 0.5], [0.95, 1.05]);

  // Text animations variants
  const textRevealVariants = {
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

  return (
    <section
      ref={containerRef}
      className="w-full min-h-[100vh] flex flex-col items-center justify-center relative overflow-hidden z-10 mt-[30vh]"
    >
      {/* Refined editorial grid pattern - more subtle */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:30px_30px] pointer-events-none"></div>

      {/* Editorial grid-based content layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-0 grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-y-32 relative z-10">
        {/* Main heading with improved editorial spacing */}
        <motion.article
          style={{ y: y1, opacity: opacity1 }}
          className="md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight mb-16 mt-0 overflow-hidden max-w-[14ch] mx-auto">
            <motion.span
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
              className="block bg-gradient-to-r from-blue-200 to-purple-300 text-transparent bg-clip-text"
            >
              {t("title")}
            </motion.span>
          </h2>

          <div className="max-w-2xl mx-auto mb-20">
            <motion.p
              custom={0}
              initial="hidden"
              whileInView="visible"
              variants={textRevealVariants}
              className="text-lg leading-relaxed text-gray-200/90 mb-16"
            >
              {t("description")}
            </motion.p>
          </div>
        </motion.article>

        {/* Current status - editorial text grid layout */}
        <motion.article
          style={{ y: y2, scale: scale1 }}
          className="md:col-span-10  lg:col-span-8 lg:col-start-3 mb-28 grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-y-0 md:gap-x-6"
        >
          {/* Main text column */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="md:col-span-12 text-left flex flex-col items-start justify-start space-y-6"
          >
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-2xl font-light tracking-tight text-gray-100"
            >
              {t("currentStatus.heading.0")}{" "}
              <span className="font-medium">
                {t("currentStatus.heading.1")}
              </span>
            </motion.h3>

            <div className="space-y-4">
              <p className="text-base leading-relaxed text-gray-200/90">
                {t("currentStatus.details.0")}
              </p>

              <div className="flex items-center space-x-3 text-sm text-gray-400/90 italic leading-relaxed">
                <span className="inline-block w-12 h-px bg-gradient-to-r from-blue-500/40 to-transparent"></span>
                <p>{t("currentStatus.details.1")}</p>
              </div>

              <p className="text-sm text-gray-400/80">
                {t("currentStatus.details.2")}
              </p>
            </div>
          </motion.div>
        </motion.article>

        {/* Elegant editorial CTA - redesigned */}
        <motion.article
          className="md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex flex-col items-center justify-center space-y-6">
            {/* Elegant divider */}
            <motion.div
              initial={{ width: "0%" }}
              whileInView={{ width: "100px" }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
              className="h-px w-24 bg-gradient-to-r from-transparent via-gray-500/40 to-transparent mb-8"
            />

            {/* Email label */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xs tracking-wider text-gray-400 mb-4"
            >
              {t("cta.emailLabel")}
            </motion.p>

            {/* Refined elegant CTA */}
            <motion.div
              className="relative overflow-hidden group max-w-md mx-auto"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <motion.a
                href="mailto:jedp082@gmail.com"
                className="flex items-center justify-center gap-4 py-2 px-6 rounded-xl shadow-sm text-3xl font-bold tracking-wide transition-all duration-300"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-gray-100">jedp082@gmail.com</span>
                <ArrowRight className="absolute right-0  w-4 h-4 opacity-0 -translate-x-4 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-300 ease-out" />
              </motion.a>

              <motion.div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-700" />
            </motion.div>

            {/* Social media and CV download section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col items-center justify-center space-y-6"
            >
              {/* CV Download button */}
              <a
                href={
                  locale === "en"
                    ? "/cv/JuanEstebanDeossaPertuz_CV_V4.pdf"
                    : "/cv/JuanEstebanDeossaPertuz_CV_V4_es.pdf"
                }
                download
                className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300 text-white/90 border border-white/20 flex items-center space-x-2 group"
              >
                <span className="text-xs">{t("cta.downloadCV")}</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>

              {/* Social media links */}
              <motion.div className="flex items-center justify-center space-x-4">
                <div className="flex flex-row flex-nowrap items-center justify-center space-x-3">
                  {/* GitHub Icon */}
                  <motion.a
                    href="https://github.com/WS-Jedp" // Replace with actual GitHub profile URL
                    className="w-[30px] h-[30px] rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-white"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </motion.a>

                  {/* LinkedIn Icon */}
                  <motion.a
                    href="https://www.linkedin.com/in/juan-esteban-deossa-pertuz-6351261ba/" // Replace with actual LinkedIn profile URL
                    className="w-[30px] h-[30px] rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-white"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </motion.a>
                </div>
              </motion.div>

              {/* Light divider */}
              <motion.div
                initial={{ width: "0%" }}
                whileInView={{ width: "60px" }}
                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                className="h-px w-12 bg-gradient-to-r from-transparent via-gray-500/20 to-transparent"
              />
            </motion.div>

            {/* Refined closing text with editorial styling */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="mt-14 text-sm font-light italic text-gray-400/80 max-w-xs mx-auto leading-relaxed"
            >
              {t("cta.closingText")}
            </motion.p>
          </div>
        </motion.article>

        {/* Editorial footer element - negative space enhancement */}
        <motion.div
          className="md:col-span-12 flex flex-col justify-center items-center h-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Image
            src="/assets/icons/j-icon@2x.png"
            alt="J Studio Logo"
            width={42}
            height={42}
            className="object-cover mb-4"
          />
          <h3 className="font-light text-sm mb-1">J Studio</h3>
          <p className="font-extralight opacity-30 text-xs mb-3 max-w-sm">
            {t("jStudioLabel")}
          </p>
          <motion.div
            initial={{ width: "0%" }}
            whileInView={{ width: "50px" }}
            transition={{ duration: 1.2, delay: 1.1, ease: "easeOut" }}
            className="h-px w-12 bg-gradient-to-r from-blue-500/20 via-purple-500/30 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
};
