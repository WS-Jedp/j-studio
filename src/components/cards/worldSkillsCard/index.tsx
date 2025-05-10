import React from "react";

export const StudyWorldSkillsCard: React.FC = () => {
  return (
    <article className="min-w-[360px] h-[81vh] bg-gradient-to-t from-j-celestial-white/20 to-j-celestial-white/5 backdrop-blur-lg border border-j-celestial-white/10 rounded-3xl z-10 ml-6 md:ml-0 p-6 overflow-y-auto">
      <div className="space-y-5">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-j-celestial-white">
            WorldSkills Competitions
          </h2>
          <p className="text-j-celestial-white/90 font-light text-sm m-0 p-0">
            Web Development Competitor
          </p>
          <small className="text-j-celestial-white/60 font-extralight text-xs m-0 p-0">2020 – 2022</small>
        </div>

        {/* Summary */}
        <div>
          <p className="text-j-celestial-white/70 text-sm">
            Trained to build user-focused web solutions under pressure, blending
            code, design, and performance to meet global standards.
          </p>
        </div>

        {/* Achievements */}
        <div>
          <h3 className="text-lg font-semibold text-j-celestial-white/90">
            Highlights
          </h3>
          <ul className=" text-j-celestial-white/70 text-sm space-y-1 list-none">
            <li>
              🥇 1st – Web Dev Champion (City, Regional & National, Colombia)
            </li>
            <li>🥈 2nd – WorldSkills Americas 2021 (Guatemala)</li>
            <li>🌍 14th – WorldSkills Global 2022 (South Korea)</li>
          </ul>
        </div>

        {/* Technical Skills */}
        <div>
          <h3 className="text-lg font-semibold text-j-celestial-white/90 mb-1">
            Tech & Tools
          </h3>
          <article className="flex flex-wrap  space-x-1 text-j-celestial-white/70 text-sm">
            <div className="flex items-center gap-2 bg-j-celestial-white/10 px-3 py-2 rounded-full">
              <span className="text-xs text-j-celestial-white">React</span>
            </div>
            <div className="flex items-center gap-2 bg-j-celestial-white/10 px-3 py-2 rounded-full">
              <span className="text-xs text-j-celestial-white">Laravel</span>
            </div>
            <div className="flex items-center gap-2 bg-j-celestial-white/10 px-3 py-2 rounded-full">
              <span className="text-xs text-j-celestial-white">WordPress</span>
            </div>
            <div className="flex items-center gap-2 bg-j-celestial-white/10 px-3 py-2 rounded-full">
              <span className="text-xs text-j-celestial-white">Adobe XD</span>
            </div>
          </article>
        </div>

        {/* Recognition */}
        <div className="mt-3 pt-3 border-t border-j-celestial-white/10">
          <p className="text-j-celestial-white/90 text-sm italic">
            “Trained to deliver user-focused web solutions under extreme
            pressure — where code, design, and performance meet international
            gold standards.”
          </p>
        </div>
      </div>
    </article>
  );
};
