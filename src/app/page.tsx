"use client";

import AboutJ from "@/containers/about-j";
import CoffiProject from "@/containers/coffi-project";
import { Contact } from "@/containers/contact";
import Introduction from "@/containers/introduction";
import { JPersonalInformation } from "@/containers/j-personal-information";
import JobExperience from "@/containers/job-experience";
import { SkillsAndTools } from "@/containers/skillsAndTools";
import { CosmicBackground } from "@/components/cosmic-background";
import { useRef, useEffect, useState } from "react";

export default function Home() {
  const jobExperienceRef = useRef<HTMLDivElement>(null);
  const [shouldEnableScroll, setShouldEnableScroll] = useState(true);
  const [activeSection, setActiveSection] = useState('intro');

  const handleJobExperienceScrollEnd = () => {
    setShouldEnableScroll(true);
  };

  useEffect(() => {
    // Update body overflow based on state
    document.body.style.overflow = shouldEnableScroll ? 'auto' : 'hidden';
    
    // Track section for different background effects
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition < 800) {
        setActiveSection('intro');
      } else if (scrollPosition < 1600) {
        setActiveSection('experience');
      } else if (scrollPosition < 2400) {
        setActiveSection('personal');
      } else if (scrollPosition < 3200) {
        setActiveSection('skills');
      } else {
        setActiveSection('contact');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      // Ensure scroll is enabled when component unmounts
      document.body.style.overflow = 'auto';
      window.removeEventListener('scroll', handleScroll);
    };
  }, [shouldEnableScroll]);

  // Select background theme based on active section
  const getBackgroundTheme = () => {
    switch(activeSection) {
      case 'experience':
        return {
          colorScheme: 'cyan-blue',
          intensity: 'medium'
        };
      case 'personal':
        return {
          colorScheme: 'purple-pink',
          intensity: 'low'
        };
      case 'skills':
        return {
          colorScheme: 'emerald-cyan',
          intensity: 'medium'
        };
      case 'contact':
        return {
          colorScheme: 'blue-purple',
          intensity: 'high'
        };
      default: // intro
        return {
          colorScheme: 'blue-purple',
          intensity: 'medium'
        };
    }
  };

  const bgTheme = getBackgroundTheme();

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
      {/* Dynamic Cosmic Background */}
      <CosmicBackground 
        colorScheme={bgTheme.colorScheme as any} 
        intensity={bgTheme.intensity as any} 
      />
      
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
              onScrollEnd={handleJobExperienceScrollEnd}
            />
          </section>
          <section className="hidden md:block w-full h-[90vh]" />

          <JPersonalInformation />
        </article>
      </section>

      <CoffiProject />
      <SkillsAndTools />
      <Contact />

    </main>
  );
}
