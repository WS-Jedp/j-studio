import { useParallax } from "@/hooks/useParallax";
import { CTXFrameBanner } from "./ctx-frame-banner";
import { CTXFrameConcept } from "./ctx-frame-concept";
import { useTranslations } from "next-intl";

export default function CTXFrame() {
  const t = useTranslations("ctx-container");
  const { ref: sectionRef, scrollY } = useParallax();

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[210vh] md:min-h-auto md:h-[90vh] flex flex-col items-center justify-center text-center md:max-w-7xl md:p-9 xl:max-w-[2080px] px-6 md:px-0 mb-[30vh]"
    >
      <section className="w-full text-center flex flex-col items-center justify-center">
        <h2
          className="text-8xl font-bold ease-linear transition-transform duration-500 text-center text-transparent bg-clip-text z-10"
          style={{
            backgroundImage: "linear-gradient(135deg, #0B5FDE 0%, #3D82F5 50%, #7AACF8 100%)",
            transform: `translateY(${Math.min(scrollY * 0.3, 150)}px) scale(${
              Math.min(1 + scrollY * 0.0003, 1.1)
            })`,
            opacity: `${Math.max(1 - scrollY * 0.001, 0)}`,
          }}
        >
          {t("ctxFrame.title")}
        </h2>
        <p
          className="max-w-lg text-center ease-linear transition-transform duration-500 z-0 text-j-celestial-white/60"
          style={{
            transform: `translateY(${Math.min(scrollY * 0.1, 100)}px)`,
            opacity: `${Math.max(1 - scrollY * 0.001, 0)}`,
          }}
        >
          {t("ctxFrame.description")}
        </p>
      </section>

      <div className="w-full h-[90%] md:h-[90vh] grid grid-cols-1 md:grid-cols-6 gap-6 mt-12 p-0 md:p-9">
        <CTXFrameBanner scrollY={scrollY} />
        <CTXFrameConcept scrollY={scrollY} />
      </div>
    </section>
  );
}
