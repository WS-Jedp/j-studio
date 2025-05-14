import { Globe, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BsInstagram } from "react-icons/bs";
import { CoffiBanner } from "./coffi-banner";
import { CoffiTryTheApp } from "./coffi-try-the-app";

// Custom hook for parallax effect
function useParallax() {
  const [scrollY, setScrollY] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = element.getBoundingClientRect();
          setScrollY(-rect.top);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial calculation
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { ref, scrollY };
}

export default function CoffiProject() {
  const { ref: sectionRef, scrollY } = useParallax();

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[150vh] flex flex-col items-center justify-center text-center md:max-w-7xl md:p-9 xl:max-w-[2080px] px-6 md:px-0"
    >
      {/* Parallax effect */}
      <section className="w-full text-center flex flex-col items-center justify-center">
        <h2
          className="text-8xl font-bold ease-linear transition-transform duration-500 text-center text-transparent bg-clip-text bg-gradient-to-br from-coffi-blue to-coffi-purple z-10"
          style={{
            transform: `translateY(${scrollY * 0.3}px) scale(${
              1 + scrollY * 0.0003
            })`,
            opacity: `${1 - scrollY * 0.001}`,
          }}
        >
          Coffi Project
        </h2>
        <p
          className="max-w-lg text-center ease-linear transition-transform duration-500 z-0"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
            opacity: `${1 - scrollY * 0.001}`,
          }}
        >
          a platform built from the ground up to help digital nomads and remote
          workers find spaces where they can truly thrive. From idea to
          deployment, every line of code, design choice, and business decision
          was made by me — not just to solve a problem, but to craft an
          experience that moves with the way we live and work today.
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
