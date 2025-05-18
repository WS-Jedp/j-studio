import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowBigDown, Eye } from "lucide-react";
import { useTranslations } from "next-intl";

export const JPersonalInformation = () => {
  const t = useTranslations("personal-information");
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Create different transform values for staggered parallax effect
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const scale1 = useTransform(scrollYProgress, [0, 0.5], [0.95, 1.05]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.3, 1], [0.6, 1, 0.8]);

  // Enhanced text animations
  const textColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    ["#000000", "#4a1a5d", "#5a3d7a", "#000000"]
  );

  // Text reveal animation variants
  const textRevealVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  };

  // Staggered letter animation for headings
  const letterAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.03,
        duration: 0.5,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      className="w-full min-h-[180vh] pt-[12vh] md:pt-[60vh] relative overflow-hidden z-50"
    >
      {/* Background decorative elements with parallax */}

      {/* Circle from top - Related to Software Engineering */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
        className="absolute flex items-center justify-center top-1/6 md:top-1/4 right-0 w-32 h-32 rounded-full border-2 border-gray-200 overflow-hidden -z-10 opacity-10 md:opacity-90"
      >
        <ArrowBigDown size={42} />
      </motion.div>

      {/* Circle from bottom - Related to Design and UX */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -120]) }}
        className="absolute flex items-center justify-center bottom-1/3 right-0 md:right-[auto] md:left-0 w-48 h-48 rounded-full border-2 border-gray-200 overflow-hidden -z-10 opacity-10 md:opacity-90"
      >
        <Eye size={60} />
      </motion.div>

      {/* Editorial style grid container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-24 md:gap-y-40 relative z-10">
        {/* Why I Started - with parallax */}
        <motion.article
          style={{ y: y1, opacity: opacity1 }}
          className="md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 relative"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="block text-sm font-mono tracking-widest text-gray-500 mb-4"
          >
            {t("beginnings.title")}
          </motion.span>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute top-8 left-0 h-1 bg-gray-800"
          ></motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-12 mt-6 overflow-hidden">
            <motion.span
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
              className="block"
            >
              {t.raw("beginnings.heading")[0]}
            </motion.span>
            <motion.span
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              className="block mt-2"
            >
              {t.raw("beginnings.heading")[1]}
            </motion.span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-lg">
            <motion.p
              custom={0}
              initial="hidden"
              whileInView="visible"
              variants={textRevealVariants}
            >
              {t.raw("beginnings.content")[0]}
            </motion.p>
            <motion.p
              custom={1}
              initial="hidden"
              whileInView="visible"
              variants={textRevealVariants}
            >
              {t.raw("beginnings.content")[1]}
            </motion.p>
            <motion.p
              custom={2}
              initial="hidden"
              whileInView="visible"
              variants={textRevealVariants}
              className="md:col-span-2 italic text-xs mt-4 border-l-4 border-gray-300 pl-6 py-2"
            >
              {t.raw("beginnings.content")[2]}
            </motion.p>
          </div>
        </motion.article>

        {/* How I did it - with different parallax speed */}
        <motion.article
          style={{ y: y2, scale: scale1 }}
          className="md:col-span-8 md:col-start-1 lg:col-span-7 lg:col-start-1 relative"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="block text-sm font-mono tracking-widest text-gray-500 mb-4"
          >
            {t("process.title")}
          </motion.span>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            transition={{ duration: 1.5, delay: 0.9 }}
            className="absolute top-8 right-0 h-1 bg-gray-800"
          ></motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-12 mt-6 overflow-hidden">
            <motion.div>
              {t("process.heading")
                .split(" ")
                .map((char, index) => (
                  <motion.span
                    key={index}
                    custom={index}
                    variants={letterAnimation}
                    initial="hidden"
                    whileInView="visible"
                    style={{
                      display: "inline-block",
                      whiteSpace: "pre",
                    }}
                  >
                    {char + " "}
                  </motion.span>
                ))}
            </motion.div>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-lg">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="md:col-span-2 border-l-4 border-gray-300 pl-4 text-sm"
            >
              {t.raw("process.content")[0]}
            </motion.p>
            <p>{t.raw("process.content")[1]}</p>
            <p>{t.raw("process.content")[2]}</p>
          </div>
        </motion.article>

        {/* Competence Experience - with parallax */}
        <motion.article
          style={{ y: y3 }}
          className="md:col-span-10 md:col-start-3 lg:col-span-8 lg:col-start-5 relative"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="block text-sm font-mono tracking-widest text-gray-500 mb-4"
          >
            {t("competition.title")}
          </motion.span>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute top-8 left-0 h-1 bg-gray-800"
          ></motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-12 mt-6">
            <motion.div
              style={{
                opacity: useTransform(
                  scrollYProgress,
                  [0.4, 0.5, 0.6],
                  [0.6, 1, 1]
                ),
              }}
            >
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                className="block"
              >
                {t.raw("competition.heading")[0]}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                className="block"
              >
                {t.raw("competition.heading")[1]}
              </motion.span>
            </motion.div>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-lg">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="md:col-span-2"
            >
              {t.raw("competition.content")[0]}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="md:col-span-2 text-sm font-light italic border-t border-gray-300 pt-6 mt-4"
            >
              <motion.span
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="block h-px w-full bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-transparent mb-6"
              />
              {t.raw("competition.content")[1]}
            </motion.p>
          </div>
        </motion.article>

        {/* Design And Art Passion - with enhanced effects */}
        <motion.article
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, -120]),
            scale: useTransform(scrollYProgress, [0, 0.5], [0.98, 1.02]),
          }}
          className="md:col-span-8 md:col-start-2 lg:col-span-6 lg:col-start-4 relative"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="block text-sm font-mono tracking-widest text-gray-500 mb-4"
          >
            {t("design.title")}
          </motion.span>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute top-8 right-0 h-1 bg-gray-800"
          ></motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-12 mt-6">
            <motion.div
              style={{
                filter: useTransform(
                  scrollYProgress,
                  [0.3, 0.4, 0.5],
                  ["blur(4px)", "blur(0px)", "blur(0px)"]
                ),
                opacity: useTransform(
                  scrollYProgress,
                  [0.3, 0.4, 0.6],
                  [0.5, 1, 1]
                ),
              }}
            >
              <motion.span
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="block"
              >
                {t.raw("design.heading")[0]}
              </motion.span>
              <motion.span
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                className="block"
              >
                {t.raw("design.heading")[1]}
              </motion.span>
            </motion.div>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-lg">
            <motion.div
              whileInView={{ scale: [0.96, 1], opacity: [0.8, 1] }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 via-purple-800/10 to-pink-600/10 opacity-70"></div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-bl-3xl"></div>
              <div className="absolute bottom-4 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-400/30 to-transparent"></div>

              {/* Code-like decorative elements */}
              <div className="absolute top-4 right-4 font-mono text-xs text-gray-400 opacity-60">
                {"<design>"}
              </div>
              <div className="absolute bottom-4 right-4 font-mono text-xs text-gray-400 opacity-60">
                {"</design>"}
              </div>

              <p className="backdrop-blur-sm p-8 border border-gray-200/20 rounded-md shadow-sm transition-all duration-300 group-hover:shadow-md relative z-10">
                {t.raw("design.content")[0]}
              </p>
            </motion.div>

            <motion.div
              whileInView={{ scale: [0.96, 1], opacity: [0.8, 1] }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-bl from-cyan-900/10 via-blue-800/10 to-indigo-600/10 opacity-70"></div>
              <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-br-3xl"></div>
              <div className="absolute bottom-4 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-400/30 to-transparent"></div>

              {/* Tech grid pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_14px]"></div>

              <p className="backdrop-blur-sm p-8 border border-gray-200/20 rounded-md shadow-sm transition-all duration-300 group-hover:shadow-md relative z-10">
                {t.raw("design.content")[1]}
              </p>
            </motion.div>
          </div>

          {/* Additional tech design element - with enhanced typing animation effect */}
          <motion.div
            whileInView={{
              backdropFilter: ["blur(0px)", "blur(4px)"],
              boxShadow: [
                "0 0 0px rgba(0,0,0,0)",
                "0 10px 30px rgba(0,0,0,0.1)",
              ],
            }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mt-12 relative overflow-hidden rounded-md"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/5 to-gray-800/5"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            <motion.div
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            ></motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                duration: 1.8,
                ease: "easeOut",
                staggerChildren: 0.1,
              }}
              className="text-sm font-mono p-4 text-gray-500 tracking-wider"
            >
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-blue-500"
              >
                function
              </motion.span>{" "}
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-purple-500"
              >
                design
              </motion.span>
              () {"{"} <br />
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="inline-flex text-gray-400 ml-4"
              >
                return
              </motion.span>{" "}
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-green-500"
              >
                'aesthetic'
              </motion.span>{" "}
              +{" "}
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-green-500"
              >
                'functional'
              </motion.span>
              ; <br />
              {"}"}
            </motion.p>
          </motion.div>
        </motion.article>

        {/* Nomadic Life By Choice */}
        <motion.article
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, -60]),
          }}
          className="md:col-span-9 md:col-start-1 lg:col-span-7 lg:col-start-2 relative"
        >
          <span className="block text-sm font-mono tracking-widest text-gray-500 mb-4">
            {t("lifestyle.title")}
          </span>
          <div className="absolute top-8 left-0 w-16 h-1 bg-gray-800"></div>
          <motion.h2
            style={{
              rotateX: useTransform(scrollYProgress, [0.6, 0.8], [10, 0]),
              perspective: "1000px",
              transformStyle: "preserve-3d",
            }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-12 mt-6"
          >
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
             {t("lifestyle.heading")}
            </motion.span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6 text-lg">
            {t.raw("lifestyle.content").map((text: string, index: number) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="border-t pt-4"
              >
                {text}
              </motion.p>
            ))}
          </div>
        </motion.article>

        {/* Keep Moving Forward */}
        <motion.article
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, -40]),
          }}
          className="md:col-span-8 md:col-start-5 lg:col-span-6 lg:col-start-7 relative z-[99]"
        >
          <span className="block text-sm font-mono tracking-widest text-gray-500 mb-4">
          {t("future.title")}
          </span>
          <div className="absolute top-8 right-0 w-16 h-1 bg-gray-800"></div>
          <motion.h2
            style={{
              x: useTransform(scrollYProgress, [0.7, 0.9], [50, 0]),
              opacity: useTransform(scrollYProgress, [0.7, 0.8], [0.5, 1]),
            }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-12 mt-6"
          >
            {t("future.heading")}
          </motion.h2>
          <div className="text-sm italic font-light border-l-4 border-gray-300 pl-6 py-2">
            <p>
            {t.raw("future.content")[0]}
            </p>
          </div>
        </motion.article>
      </div>
    </section>
  );
};
