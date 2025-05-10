"use client";
import { JobCard } from "@/components/cards/jobCard";
import { useRef, useEffect, useState } from "react";
import { JobsExperienceData } from '@/data/jobs';
import { StudyPlatziMasterCard } from '@/components/cards/platziMasterCard';
import { StudyWorldSkillsCard } from "@/components/cards/worldSkillsCard";

export default function JobExperience({onScrollEnd}: { onScrollEnd: () => void }) { 
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const [isHorizontalScrollEnd, setIsHorizontalScrollEnd] = useState(false);
  const [isHorizontalScrollStart, setIsHorizontalScrollStart] = useState(true);

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


      if(isScrollingDown && isAtEnd) {
        onScrollEnd();
      }

      if(!isScrollingDown && isAtStart) {
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
        <article className="z-10 ml-6 md:ml-0">
          <JobCard
            companyName={JobsExperienceData[0].companyName}
            role={JobsExperienceData[0].role}
            yearFrom={JobsExperienceData[0].yearFrom}
            yearTo={JobsExperienceData[0].yearTo} 
            mission={JobsExperienceData[0].mission}
            keyAchievements={JobsExperienceData[0].keyAchievements}
            technologies={JobsExperienceData[0].technologies}
          />
        </article>
        <article className="z-10">
        <JobCard
            companyName={JobsExperienceData[1].companyName}
            role={JobsExperienceData[1].role}
            yearFrom={JobsExperienceData[1].yearFrom}
            yearTo={JobsExperienceData[1].yearTo} 
            mission={JobsExperienceData[1].mission}
            keyAchievements={JobsExperienceData[1].keyAchievements}
            technologies={JobsExperienceData[1].technologies}
          />
        </article>
        <article className="z-10">
        <JobCard
            companyName={JobsExperienceData[2].companyName}
            role={JobsExperienceData[2].role}
            yearFrom={JobsExperienceData[2].yearFrom}
            yearTo={JobsExperienceData[2].yearTo} 
            mission={JobsExperienceData[2].mission}
            keyAchievements={JobsExperienceData[2].keyAchievements}
            technologies={JobsExperienceData[2].technologies}
          />
        </article>
        <article className="z-10">
          <StudyWorldSkillsCard />
        </article>
        <article className="z-10 mr-9">
          <StudyPlatziMasterCard />
        </article>
      </section>
    </section>
  );
}
