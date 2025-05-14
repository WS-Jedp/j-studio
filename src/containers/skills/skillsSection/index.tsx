import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SkillCard } from "@/components/cards/skillsCard";


// Section component to avoid repetition
export const SkillSection = ({
    title,
    skills,
    onVisible,
  }: {
    title: string;
    skills: any[];
    onVisible?: () => void;
  }) => {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
  
    // Parallax effect for the title
    useEffect(() => {
      const handleScroll = () => {
        if (titleRef.current) {
          const scrollY = window.scrollY;
          const elementPosition = titleRef.current.offsetTop;
          const distance = scrollY - elementPosition;
  
          // Only apply parallax when the section is in view (with some buffer)
          if (distance > -500 && distance < 500) {
            titleRef.current.style.transform = `translateY(${distance * 0.2}px)`;
          }
        }
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    
    // Intersection observer to detect when section becomes visible
    useEffect(() => {
      if (!onVisible || !sectionRef.current) return;
      
      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            onVisible();
            // Disconnect after calling once
            observer.disconnect();
          }
        },
        { threshold: 0.3 } // Trigger when 30% of the section is visible
      );
      
      observer.observe(sectionRef.current);
      
      return () => {
        observer.disconnect();
      };
    }, [onVisible]);
    
    // Split skills into two arrays for the staggered columns
    const leftColumnSkills = skills.filter((_, i) => i % 2 === 0);
    const rightColumnSkills = skills.filter((_, i) => i % 2 !== 0);
  
    return (
      <section ref={sectionRef} className="relative w-full min-h-screen py-20">
        <motion.h2
          ref={titleRef}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-7xl font-bold sticky top-10 mb-16 z-0"
        >
          {title}
        </motion.h2>
  
        <article className="flex w-full gap-6 z-10">
          {/* Left column */}
          <div className="flex-1 flex flex-col gap-6">
            {leftColumnSkills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
          
          {/* Right column - with top margin to create staggered effect */}
          <div className="flex-1 flex flex-col gap-6 mt-24">
            {rightColumnSkills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </article>
      </section>
    );
  };