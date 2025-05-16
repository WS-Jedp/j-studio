"use client";
import { JobCard } from "@/components/cards/jobCard";
import { useRef, useEffect, useState } from "react";
import { JobsExperienceData } from "@/data/jobs";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

export default function JobExperience({
  onScrollEnd,
}: {
  onScrollEnd: () => void;
}) {
  const t = useTranslations("experience");
  const locale = useLocale();
  const navigation = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const [isHorizontalScrollEnd, setIsHorizontalScrollEnd] = useState(false);
  const [isHorizontalScrollStart, setIsHorizontalScrollStart] = useState(true);
  const [hoverCardIndex, setHoverCardIndex] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(false);

  // Check if component is in view
  const checkIfInView = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const threshold = 1; // 80% visibility threshold

      const visibleHeight =
        Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
      const isVisible = visibleHeight >= rect.height * threshold;

      setIsInView(isVisible);

      // If component is in view, disable body scroll
      if (isVisible && !isHorizontalScrollEnd && !isHorizontalScrollStart) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }
  };

  // Check horizontal scroll position
  const checkScrollPosition = () => {
    if (horizontalScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = horizontalScrollRef.current;
      const tolerance = 2; // Tolerance for floating-point inaccuracies

      const isAtEnd = scrollLeft + clientWidth >= scrollWidth - tolerance;
      const isAtStart = scrollLeft <= tolerance;

      setIsHorizontalScrollEnd(isAtEnd);
      setIsHorizontalScrollStart(isAtStart);

      // Re-enable vertical scrolling if at the edges
      if ((isAtEnd || isAtStart) && isInView) {
        onScrollEnd();
      }
    }
  };

  // Handle wheel events
  const handleWheel = (e: WheelEvent) => {
    if (!isInView || !horizontalScrollRef.current) return;

    const isScrollingDown = e.deltaY > 0;

    // If at the end and scrolling down or at the start and scrolling up, let default scroll happen
    if (
      (isHorizontalScrollEnd && isScrollingDown) ||
      (isHorizontalScrollStart && !isScrollingDown)
    ) {
      return;
    }

    // Otherwise, prevent default scroll and handle horizontal scrolling
    e.preventDefault();
    horizontalScrollRef.current.scrollLeft += e.deltaY;

    // Check scroll position after scrolling
    checkScrollPosition();
  };

  useEffect(() => {
    window.addEventListener("scroll", checkIfInView, { passive: true });
    window.addEventListener("resize", checkIfInView, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: false });

    // Initial check
    checkIfInView();

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("scroll", checkIfInView);
      window.removeEventListener("resize", checkIfInView);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [isInView, isHorizontalScrollEnd, isHorizontalScrollStart]);

  // Add scroll event listener to the horizontal scroll container
  useEffect(() => {
    const scrollContainer = horizontalScrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollPosition, {
        passive: true,
      });

      // Initial check
      checkScrollPosition();

      return () => {
        scrollContainer.removeEventListener("scroll", checkScrollPosition);
      };
    }
  }, []);

  return (
    <section
      className="relative md:absolute w-full h-[90vh] flex flex-col items-start justify-between"
      ref={containerRef}
    >
      <h2 className="absolute top-[-9%] left-6 md:left-[36%] text-6xl md:text-8xl z-0 font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-coffi-purple to-coffi-purple/40">
        { t('title') }
      </h2>
      {/* Horizontal scrolling container */}
      <section
        ref={horizontalScrollRef}
        className="relative w-full h-auto flex flex-row space-x-6 py-12 z-50 items-end overflow-x-scroll scrollbar-hide"
      >
        {/* Job card */}
        <article className="hidden md:block min-w-[36%] h-[81vh]"></article>
        <article
          className={`relative z-10 transition-[filter] duration-300 ease-linear ${
            hoverCardIndex && hoverCardIndex !== 1 ? "grayscale-100" : ""
          }`}
          onMouseEnter={() => setHoverCardIndex(1)}
          onMouseLeave={() => setHoverCardIndex(null)}
        >
          <JobCard
            id="BEEREADERS"
            companyName={t("jobs.beereaders.companyName")}
            role={t('jobs.beereaders.role')}
            yearFrom={JobsExperienceData[1].yearFrom}
            yearTo={JobsExperienceData[1].yearTo}
            mission={t('jobs.beereaders.mission')}
            keyAchievements={JobsExperienceData[1].keyAchievements}
            technologies={JobsExperienceData[1].technologies}
            projects={[]}
            accentColor="#ffcf01"
            backgroundColor="#ffcf01"
            companyLogo="/assets/jobs/beereaders-logo.svg"
            action={() => navigation.push(`/${locale}/jobs/beereaders`)}
          />
        </article>
        <article
          className={`z-10 transition-[filter] duration-300 ease-linear ${
            hoverCardIndex && hoverCardIndex !== 2 ? "grayscale-100" : ""
          }`}
          onMouseEnter={() => setHoverCardIndex(2)}
          onMouseLeave={() => setHoverCardIndex(null)}
        >
          <JobCard
            id="CERTIBLOCK"
            companyName={t('jobs.certiblock.companyName')}
            role={t('jobs.certiblock.role')}
            yearFrom={JobsExperienceData[2].yearFrom}
            yearTo={JobsExperienceData[2].yearTo}
            mission={t('jobs.certiblock.mission')}
            keyAchievements={JobsExperienceData[2].keyAchievements}
            technologies={JobsExperienceData[2].technologies}
            projects={[]}
            companyLogo="/assets/jobs/certiblock-logo.svg"
            accentColor="#00d40d"
            backgroundColor="#00d40d"
            action={() => navigation.push(`${locale}/jobs/certiblock`)}
          />
        </article>
        <article
          onMouseEnter={() => setHoverCardIndex(3)}
          onMouseLeave={() => setHoverCardIndex(null)}
          className={`z-10 transition-[filter] duration-300 ease-linear ${
            hoverCardIndex && hoverCardIndex !== 3 ? "grayscale-100" : ""
          }`}
        >
          <JobCard
            id="WORLDSKILLS"
            companyName={t('jobs.worldskills.companyName')}
            role={t('jobs.worldskills.role')}
            yearFrom={JobsExperienceData[3].yearFrom}
            yearTo={JobsExperienceData[3].yearTo}
            mission={t('jobs.worldskills.mission')}
            keyAchievements={JobsExperienceData[3].keyAchievements}
            technologies={JobsExperienceData[3].technologies}
            projects={[]}
            companyLogo="/assets/jobs/worldskills-logo.svg"
            accentColor="#D51067"
            backgroundColor="#D51067"
            action={() => navigation.push(`${locale}/learning/worldskills`)}
          />
        </article>
        <article
          className={`z-10 mr-12 transition-[filter] duration-300 ease-linear ${
            hoverCardIndex && hoverCardIndex !== 4 ? "grayscale-100" : ""
          }`}
          onMouseEnter={() => setHoverCardIndex(4)}
          onMouseLeave={() => setHoverCardIndex(null)}
        >
          <JobCard
            id="PLATZIMASTER"
            companyName={t('jobs.platzimaster.companyName')}
            role={t('jobs.platzimaster.role')}
            yearFrom={JobsExperienceData[4].yearFrom}
            yearTo={JobsExperienceData[4].yearTo}
            mission={t('jobs.platzimaster.mission')}
            keyAchievements={JobsExperienceData[4].keyAchievements}
            technologies={JobsExperienceData[4].technologies}
            projects={[]}
            svgIcon="/assets/jobs/platzi-logo.svg"
            accentColor="#07e98a"
            backgroundColor="#07e98a"
            action={() => navigation.push(`${locale}/learning/platzi-master`)}
          />
        </article>
      </section>
    </section>
  );
}
