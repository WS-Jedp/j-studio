import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Globe, ChevronDown } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

export default function AboutJ() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [isVisible, setIsVisible] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const path = usePathname();
  const t = useTranslations("about-j");

  const dynamicContent = [
    {
      section: "introduction",
      title: t("introduction.title"),
      description: t("introduction.description"),
    },
    {
      section: "experience",
      title: t("experience.title"),
      description: t("experience.description"),
    },
    {
      section: "about-me",
      title: t("about-me.title"),
      description: t("about-me.description"),
    },
  ];

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition < 600) {
        setActiveSection("introduction");
      } else if (scrollPosition < 1200) {
        setActiveSection("experience");
      } else {
        setActiveSection("about-me");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".language-dropdown-container")) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currentContent =
    dynamicContent.find((item) => item.section === activeSection) ||
    dynamicContent[0];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const textRevealVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const languages = [
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
  ];

  const handleLanguageChange = (locale: string) => {
    const currentPath = path.replace(/\/(en|es)/, `/${locale}`);
    const pathSegments = currentPath.split("/").slice(2).join("/");
    router.push(`/${locale}/${pathSegments}`);
    setIsLanguageDropdownOpen(false);
  };

  return (
    <motion.article
      className="relative w-full md:w-1/3 md:sticky md:top-6 p-6 md:p-0 md:pb-6 mb-6 md:mb-0 h-[100vh] max-h-[100vh] md:h-[90vh] md:max-h-[90vh] space-y-6 z-[99]"
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="absolute top-[-50px] right-[10%] w-[100px] h-[100px] rounded-full bg-blue-500/10 blur-[40px] z-0"></div>
      <div className="absolute bottom-[5%] left-[5%] w-[80px] h-[80px] rounded-full bg-purple-500/10 blur-[30px] z-0"></div>
      <div className="absolute top-[15%] right-[15%] w-2 h-2 rounded-full bg-blue-400/70"></div>
      <div className="absolute bottom-[20%] left-[10%] w-1.5 h-1.5 rounded-full bg-purple-400/70"></div>

      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:20px_20px] pointer-events-none"></div>

      <motion.section
        className="w-full h-1/5 row-span-1 rounded-3xl border-white/10 border shadow-md shadow-j-celestial-white/10 backdrop-blur-lg px-6 py-4 mb-6 relative overflow-hidden group"
        variants={itemVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

        <motion.div
          key={currentContent.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="h-full flex flex-col justify-center"
        >
          <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-200 to-purple-300 text-transparent bg-clip-text">
            {currentContent.title}
          </h3>
          <p className="text-sm font-light text-white/80 mt-2">
            {currentContent.description}
          </p>
        </motion.div>

        <div className="absolute right-4 bottom-3 flex space-x-1.5">
          {dynamicContent.map((item, index) => (
            <div
              key={item.section}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 
                ${
                  activeSection === item.section
                    ? "bg-white scale-125"
                    : "bg-white/30"
                }`}
            ></div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="flex flex-col items-start justify-between w-full h-4/5 grow row-span-3 rounded-3xl border-white/10 backdrop-blur-lg border shadow-lg shadow-j-celestial-white/10 p-6 relative overflow-hidden group"
        variants={itemVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-white/[0.08]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

        <motion.article className="relative z-10" variants={textRevealVariants}>
          <div className="flex flex-row flex-nowrap items-center justify-between space-x-2 mb-3">
            <div className="flex flex-row flex-nowrap items-center space-x-2">
              <Image
                width={24}
                height={24}
                src="/assets/icons/j-icon.png"
                alt="J Studio Logo"
                className="object-cover"
                priority
              />
              <p className="text-j-celestial-white">J Studio</p>
            </div>

            <div className="relative language-dropdown-container z-[99999]">
              <button
                onClick={() =>
                  setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
                }
                className="p-2 rounded-full bg-white/0 hover:bg-white/10 transition-colors duration-300 text-j-celestial-white/90 flex items-center justify-center group"
                aria-haspopup="true"
                aria-expanded={isLanguageDropdownOpen}
              >
                <Globe
                  size={16}
                  className="group-hover:rotate-12 transition-transform duration-300"
                />
                <span className="text-xs mx-1">
                  {locale === "en" ? "En" : "Es"}
                </span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${
                    isLanguageDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isLanguageDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-2 w-32 rounded-md shadow-lg bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:20px_20px] backdrop-blur-lg border border-white/10 py-1"
                >
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language.code)}
                      className={`block w-full text-left px-4 py-2 text-xs ${
                        locale === language.code
                          ? "text-coffi-blue font-medium"
                          : "text-j-celestial-white/90"
                      } hover:bg-white/10 transition-colors`}
                    >
                      {language.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-200 to-blue-300 text-transparent bg-clip-text leading-tight">
            {t("main.heading")}
          </h2>
          <p className="font-light text-sm mt-3 text-white/80 leading-relaxed">
            {t("main.paragraph")}
          </p>
        </motion.article>

        <motion.article
          className="flex flex-row flex-nowrap relative z-10 space-x-2"
          variants={textRevealVariants}
        >
          <a
            href={locale === "en" ? "/cv/JuanEstebanDeossaPertuz_CV_V4.pdf" : "/cv/JuanEstebanDeossaPertuz_CV_V4_es.pdf"}
            download
            className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300 text-white/90 border border-white/20 flex items-center space-x-2 group"
          >
            <span className="text-xs">{t('actions.download')}</span>
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
        </motion.article>

        {/* Who is J-Studio */}
        <motion.article
          className="w-full flex flex-row flex-nowrap items-center justify-between border-t border-white/10 pt-4 mt-4 relative z-10"
          variants={textRevealVariants}
        >
          <div className="flex flex-col">
            <h2 className="font-medium text-white/90">{t("footer.name")}</h2>
            <p className="text-sm text-white/70">{t("footer.role")}</p>
          </div>

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
        </motion.article>
      </motion.section>
    </motion.article>
  );
}
