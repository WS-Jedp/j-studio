import { useEffect, useRef, useState } from "react";

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
        <article
          className="w-full md:w-auto row-span-5 md:row-auto h-full text-j-celestial-white p-9 rounded-3xl col-span-1 md:col-span-4 ease-linear transition-all duration-500 bg-gradient-to-br from-coffi-purple to-coffi-purple/80 shadow-lg hover:shadow-xl hover:-translate-y-1 border border-white/10 backdrop-blur-sm"
          style={{
            transform: `translateY(${scrollY * 0.05}px) scale(${
              1 + scrollY * 0.00003
            })`,
            opacity: `${1 - scrollY * 0.0005}`,
          }}
        >
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight">Where the Idea <span className="text-coffi-blue font-extrabold">Became</span> the Product</h2>
          <p className="text-md md:text-lg font-light mt-6 leading-relaxed opacity-90">
            I built Coffi because I needed it. As a remote creator moving from
            place to place, I craved more than coffee and Wi-Fi — I wanted
            spaces where I could truly focus, connect, and create. Coffi became
            my response to that search — not just an app, but a reflection of
            how I believe modern work should feel: intentional, flexible, and
            human.
          </p>
          <button className="mt-8 px-6 py-3 bg-coffi-blue text-white rounded-full font-medium transition-all hover:bg-white hover:text-coffi-purple hover:shadow-md flex items-center gap-2 group">
            <span>Learn more about the thinking behind Coffi</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </article>

        {/* CTA to try the app */}
        <article
          className="w-full md:w-auto row-span-2 md:row-auto h-full border border-white/20 p-9 rounded-3xl col-span-1 md:col-span-2 ease-linear transition-all duration-500 bg-gradient-to-br from-coffi-blue/90 to-coffi-purple/90 shadow-lg hover:shadow-xl hover:-translate-y-1 backdrop-blur-sm"
          style={{
            transform: `translateY(${scrollY * 0.05}px) scale(${
              1 + scrollY * 0.00003
            })`,
            opacity: `${1 - scrollY * 0.0005}`,
          }}
        >
          <div className="flex flex-col h-full justify-between">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Try Coffi <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-coffi-blue/80">—</span> Work Where You Thrive</h2>
              <p className="text-md font-light mt-6 leading-relaxed opacity-90">
                Discover cafés, coworks, and hidden corners curated for deep work and real connection — powered by community insights and designed for modern nomads like you.
              </p>
            </div>
            <button className="mt-8 px-6 py-3 bg-white text-coffi-purple rounded-full font-medium transition-all hover:bg-transparent hover:text-white hover:border-white hover:border flex items-center justify-center gap-2 group">
              <span>Explore your next workspace</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
