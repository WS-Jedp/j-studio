import { useParallax } from "@/hooks/useParallax";
import { CoffiBanner } from "./coffi-banner";
import { CoffiTryTheApp } from "./coffi-try-the-app";
import { useTranslations } from "next-intl";

export default function CoffiProject() {
  const t = useTranslations("coffi-container");
  const { ref: sectionRef, scrollY } = useParallax();

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[150vh] flex flex-col items-center justify-center text-center md:max-w-7xl md:p-9 xl:max-w-[2080px] px-6 md:px-0 mb-[30vh]"
    >
      {/* Parallax effect */}
      <section className="w-full text-center flex flex-col items-center justify-center">
        <h2
          className="text-8xl font-bold ease-linear transition-transform duration-500 text-center text-transparent bg-clip-text bg-gradient-to-br from-coffi-blue to-coffi-purple z-10"
          style={{
            transform: `translateY(${Math.min(scrollY * 0.3, 150)}px) scale(${
              Math.min(1 + scrollY * 0.0003, 1.1)
            })`,
            opacity: `${Math.max(1 - scrollY * 0.001, 0)}`,
          }}
        >
          {t("coffiProject.title")}
        </h2>
        <p
          className="max-w-lg text-center ease-linear transition-transform duration-500 z-0"
          style={{
            transform: `translateY(${Math.min(scrollY * 0.1, 100)}px)`,
            opacity: `${Math.max(1 - scrollY * 0.001, 0)}`,
          }}
        >
          {t("coffiProject.description")}
        </p>
      </section>
      <div className="w-full h-[90%] md:h-[90vh] grid grid-cols-1 md:grid-cols-6 gap-6 mt-12 p-0 md:p-9">
        {/* What is the app and why I built it */}
        <CoffiBanner scrollY={scrollY} />

        {/* CTA to try the app */}
        <CoffiTryTheApp scrollY={scrollY} />
      </div>
    </section>
  );
}
