"use client";

import AboutJ from "@/containers/about-j";
import CoffiProject from "@/containers/coffi-project";
import Introduction from "@/containers/introduction";
import { JPersonalInformation } from "@/containers/j-personal-information";
import JobExperience from "@/containers/job-experience";
import Skills from "@/containers/skills";
import { useRef, useEffect, useState } from "react";

export default function Home() {
  const jobExperienceRef = useRef<HTMLDivElement>(null);
  const [jobExperienceScrollEnds, setJobExperienceScrollEnds] =
    useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Disable scrolling
          document.body.style.overflow = "hidden";
          setJobExperienceScrollEnds(false);
        }
      },
      { threshold: 1.0 }
    );

    if (jobExperienceRef.current) {
      observer.observe(jobExperienceRef.current);
    }

    return () => {
      if (jobExperienceRef.current) {
        observer.unobserve(jobExperienceRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (jobExperienceScrollEnds) {
      // Enable scrolling
      document.body.style.overflow = "auto";
    }
  }, [jobExperienceScrollEnds]);

  return (
    <main
      className="
      relative
      flex flex-col items-center justify-center md:justify-start
      w-full min-h-screen mx-auto
      md:px-3 lg:px-0 
      bg-j-celestial-black text-j-celestial-white
      "
    >
      <section className="relative w-full min-h-screen flex flex-col md:flex-row md:space-x-6 mx-auto md:p-9 md:max-w-7xl xl:max-w-[2080px] overflow-visible">
        {/* Left side header */}
        <AboutJ />

        {/* Right side content */}
        <article className="w-full md:w-2/3 space-y-24">
          <Introduction />

          <section
            className="relative md:absolute left-0 w-full h-[90vh] flex flex-col items-start justify-between overflow-visible"
            ref={jobExperienceRef}
          >
            {/* Horizontal scroll */}
            <JobExperience
              onScrollEnd={() => setJobExperienceScrollEnds(true)}
            />
          </section>
          <section className="hidden md:block w-full h-[90vh]" />

          <JPersonalInformation />
        </article>
      </section>

      <CoffiProject />
      <Skills />

      <section className="w-full h-[100vh] flex flex-col items-center justify-center text-center md:max-w-7xl"></section>
    </main>
  );
}
