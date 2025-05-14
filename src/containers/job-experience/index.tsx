"use client";
import { JobCard } from "@/components/cards/jobCard";
import { useRef, useEffect, useState } from "react";
import { JobsExperienceData } from "@/data/jobs";
import { useRouter } from "next/navigation";

export default function JobExperience({
  onScrollEnd,
}: {
  onScrollEnd: () => void;
}) {
  const navigation = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const [isHorizontalScrollEnd, setIsHorizontalScrollEnd] = useState(false);
  const [isHorizontalScrollStart, setIsHorizontalScrollStart] = useState(true);
  const [hoverCardIndex, setHoverCardIndex] = useState<number | null>(null);

  const handleHorizontalScroll = (e: WheelEvent) => {
    if (horizontalScrollRef.current) {
      const scrollLeft = horizontalScrollRef.current.scrollLeft;
      const scrollWidth = horizontalScrollRef.current.scrollWidth;
      const clientWidth = horizontalScrollRef.current.clientWidth;

      const tolerance = 2; // Tolerance for floating-point inaccuracies
      const isAtEnd = scrollLeft + clientWidth >= scrollWidth - tolerance;
      const isAtStart = scrollLeft <= tolerance;

      setIsHorizontalScrollEnd(isAtEnd);
      setIsHorizontalScrollStart(isAtStart);

      const isScrollingDown = e.deltaY >= 0;

      if (isScrollingDown && isAtEnd) {
        onScrollEnd();
      }

      if (!isScrollingDown && isAtStart) {
        onScrollEnd();
      }

      // Prevent default scrolling behavior
      if (
        (isScrollingDown && !isAtStart) ||
        !isAtEnd ||
        (!isAtStart && !isAtEnd)
      ) {
        e.preventDefault();
        horizontalScrollRef.current.scrollLeft += e.deltaY;
      }

      if (
        (!isScrollingDown && isAtEnd && !isAtStart) ||
        (!isAtEnd && !isAtStart)
      ) {
        e.preventDefault();
        horizontalScrollRef.current.scrollLeft += e.deltaY;
      }
    }
  };

  const detectContainerInView = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
    }
    return false;
  };

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const inView = detectContainerInView();
      if (inView) {
        const isScrollingDown = e.deltaY > 0;
        const isScrollingUp = e.deltaY < 0;

        if (
          (isScrollingDown && isHorizontalScrollEnd) ||
          (isScrollingUp && isHorizontalScrollStart)
        ) {
          // Allow normal window scrolling
          return;
        }

        handleHorizontalScroll(e);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("wheel", onWheel);
    };
  }, [isHorizontalScrollEnd, isHorizontalScrollStart]);

  return (
    <section
      className="relative md:absolute w-full h-[90vh] flex flex-col items-start justify-between"
      ref={containerRef}
    >
      <h2 className="absolute top-[-9%] left-6 md:left-[36%] text-6xl md:text-8xl z-0 font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-coffi-purple to-coffi-purple/40">
        Experience
      </h2>
      {/* Horizontal scrolling container */}
      <section
        ref={horizontalScrollRef}
        className="relative w-full h-auto flex flex-row space-x-6 py-12 z-50 items-end overflow-x-scroll"
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
            companyName={JobsExperienceData[1].companyName}
            role={JobsExperienceData[1].role}
            yearFrom={JobsExperienceData[1].yearFrom}
            yearTo={JobsExperienceData[1].yearTo}
            mission={JobsExperienceData[1].mission}
            keyAchievements={JobsExperienceData[1].keyAchievements}
            technologies={JobsExperienceData[1].technologies}
            projects={[]}
            accentColor="#ffcf01"
            backgroundColor="#ffcf01"
            companyLogo="/assets/jobs/beereaders-logo.svg"
            action={() => navigation.push("/jobs/beereaders")}
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
            companyName={JobsExperienceData[2].companyName}
            role={JobsExperienceData[2].role}
            yearFrom={JobsExperienceData[2].yearFrom}
            yearTo={JobsExperienceData[2].yearTo}
            mission={JobsExperienceData[2].mission}
            keyAchievements={JobsExperienceData[2].keyAchievements}
            technologies={JobsExperienceData[2].technologies}
            projects={[]}
            companyLogo="/assets/jobs/certiblock-logo.svg"
            accentColor="#00d40d"
            backgroundColor="#00d40d"
            action={() => navigation.push("/jobs/certiblock")}
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
            companyName={JobsExperienceData[3].companyName}
            role={JobsExperienceData[3].role}
            yearFrom={JobsExperienceData[3].yearFrom}
            yearTo={JobsExperienceData[3].yearTo}
            mission={JobsExperienceData[3].mission}
            keyAchievements={JobsExperienceData[3].keyAchievements}
            technologies={JobsExperienceData[3].technologies}
            projects={[]}
            companyLogo="/assets/jobs/worldskills-logo.svg"
            accentColor="#D51067"
            backgroundColor="#D51067"
            action={() => {}}
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
            companyName={JobsExperienceData[4].companyName}
            role={JobsExperienceData[4].role}
            yearFrom={JobsExperienceData[4].yearFrom}
            yearTo={JobsExperienceData[4].yearTo}
            mission={JobsExperienceData[4].mission}
            keyAchievements={JobsExperienceData[4].keyAchievements}
            technologies={JobsExperienceData[4].technologies}
            projects={[]}
            svgIcon="/assets/jobs/platzi-logo.svg"
            accentColor="#07e98a"
            backgroundColor="#07e98a"
            action={() => {}}
          />
        </article>
      </section>
    </section>
  );
}
