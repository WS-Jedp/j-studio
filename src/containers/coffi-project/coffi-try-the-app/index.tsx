import { useEffect, useState } from "react";
import { CoffiSimpleDarkButton } from "../coffi-buttons";
import Image from "next/image";
import { Clock, MapPin, Trophy } from "lucide-react";
import { useTranslations } from "next-intl";

export const CoffiTryTheApp = ({ scrollY }: { scrollY: number }) => {
  const t = useTranslations("coffi-container");

  return (
    <article
      className="relative flex flex-col items-center justify-between w-full md:w-auto row-span-2 md:row-auto h-full p-9 rounded-3xl col-span-1 md:col-span-2 ease-linear transition-all duration-500 bg-gradient-to-br from-coffi-blue/90 to-coffi-purple/90 shadow-lg hover:shadow-xl hover:-translate-y-1 backdrop-blur-sm overflow-hidden"
      style={{
        transform: `translateY(${scrollY * 0.05}px) scale(${
          1 + scrollY * 0.00003
        })`,
        opacity: `${1 - scrollY * 0.0005}`,
      }}
    >
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          {t("coffiTryTheApp.title")}
        </h2>
        <p className="text-md font-light mt-6 leading-relaxed opacity-90">
          {t("coffiTryTheApp.description")}
        </p>
      </div>

      <section className="w-full">
        <div className="relative w-full flex flex-col md:flex-row items-center justify-center gap-6 py-4">
          {/* Feature Highlights */}
          <div className="flex flex-col gap-3 text-white max-w-[300px]">
            <div className="flex items-center justify-start text-start gap-2">
              <div className="bg-white/20 p-2 rounded-full">
                <MapPin size={15} />
              </div>
              <span className="text-sm font-medium">
                {t("coffiTryTheApp.features.workspaces")}
              </span>
            </div>
            <div className="flex items-center justify-start text-start gap-2">
              <div className="bg-white/20 p-2 rounded-full">
                <Trophy size={15} />
              </div>
              <span className="text-sm font-medium">
                {t("coffiTryTheApp.features.rewards")}
              </span>
            </div>
            <div className="flex items-center justify-center text-start gap-2">
              <div className="bg-white/20 p-2 rounded-full">
                <Clock size={15} />
              </div>
              <span className="text-sm font-medium">
                {t("coffiTryTheApp.features.insights")}
              </span>
            </div>
          </div>
        </div>
      </section>

      <CoffiSimpleDarkButton
        text={t("coffiTryTheApp.cta")}
        action={() => window.open("https://coffi.com.co", "_blank")}
        full
        shimmer
        disabled={false}
      />
    </article>
  );
};
