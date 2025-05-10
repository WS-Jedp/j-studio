import React from "react";

export const StudyPlatziMasterCard: React.FC = () => {
  return (
    <article className="min-w-[360px] h-[81vh] bg-gradient-to-t from-j-celestial-white/20 to-j-celestial-white/5 backdrop-blur-lg border border-j-celestial-white/10 rounded-3xl z-10 ml-6 md:ml-0 p-6 overflow-y-auto">
      <div className="flex flex-col space-y-5">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-j-celestial-white">
            Platzi Master
          </h2>
          <p className="text-j-celestial-white/90 font-light text-sm m-0 p-0">
            Frontend Track – First Generation
          </p>
          <small className="text-j-celestial-white/60 font-extralight text-xs m-0 p-0">2020</small>
        </div>

        {/* Summary */}
        <div>
          <p className="text-j-celestial-white/70 text-sm">
            Selected for Platzi Master’s first cohort — Latin America’s top
            software acceleration program. Trained in modern frontend
            engineering with mentorship from senior engineers and leading
            Spanish-speaking tech educators.
          </p>
        </div>

        {/* Highlights */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-j-celestial-white/90">
            Highlights
          </h3>
          <ul className="list-disc pl-5 text-j-celestial-white/70 text-sm space-y-1">
            <li>Modern React workflows (Hooks, Redux, SSR)</li>
            <li>Scalable component design & accessibility</li>
            <li>Agile teamwork with real-world project delivery</li>
            <li>Direct coaching from senior engineers & expert mentors</li>
          </ul>
        </div>

        {/* Quote */}
        <div className="mt-3 pt-3 border-t border-j-celestial-white/10">
          <p className="text-j-celestial-white/90 text-sm italic">
            “Senior-level, project-driven mentorship designed to build
            world-class engineers in Latin America.”
          </p>
        </div>
      </div>
    </article>
  );
};
