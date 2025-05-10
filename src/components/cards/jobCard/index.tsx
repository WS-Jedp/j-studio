import { Check, CircleCheckBigIcon, CircleCheckIcon } from "lucide-react";
import React from "react";

// Define types for our props
interface KeyAchievement {
  title: string;
  description: string;
}

interface Technology {
  name: string;
  iconUrl?: string; // Can be an imported icon component
}

export interface JobCardProps {
  companyName: string;
  companyLogo?: string; // Optional logo URL
  role: string;
  yearFrom: string | number;
  yearTo: string | number | "Present";
  mission: string;
  keyAchievements: KeyAchievement[];
  technologies: Technology[];
}

export const JobCard: React.FC<JobCardProps> = ({
  companyName,
  role,
  yearFrom,
  yearTo,
  mission,
  keyAchievements,
  technologies,
}) => {
  return (
    <article className="
            relative flex flex-col items-start justify-start
            min-w-[360px] h-[81vh]
            bg-gradient-to-t from-j-celestial-white/20 to-j-celestial-white/10 border border-j-celestial-white/5
            backdrop-blur-lg rounded-3xl 
            z-10 ml-6 md:ml-0 p-6 overflow-hidden
        ">
      {/* Company and Role Section */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-j-celestial-white">
          {companyName}
        </h2>
        <p className="text-j-celestial-white/90 font-light text-sm m-0 p-0">
          {role}
        </p>
        <small className="text-j-celestial-white/60 font-extralight text-xs m-0 p-0">
          {yearFrom} - {yearTo}
        </small>
      </div>

      {/* Mission Section */}
      <div className="mb-4">
        <h3 className="text-md font-semibold text-j-celestial-white mb-1">
          Mission
        </h3>
        <p className="text-sm font-light text-j-celestial-white/70">
          {mission}
        </p>
      </div>

      {/* Key Achievements Section */}
      <div className="mb-4">
        <h3 className="text-md font-semibold text-j-celestial-white mb-3">
          Key Achievements
        </h3>
        <ul className="space-y-4 w-full">
          {keyAchievements.map((achievement, index) => (
            <li
              key={index}
              className="flex flex-row flex-nowrap w-full justify-start items-start"
            >
              <Check
                size={24}
                className="inline-block text-j-celestial-cooper mr-2"
              />
              <p className="text-sm font-extralight text-j-celestial-white/70">
                {achievement.description}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Technologies Section */}
      <div>
        <h3 className="text-md font-semibold text-j-celestial-white mb-3">
          Technologies
        </h3>
        <div className="flex flex-wrap gap-3">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-j-celestial-white/10 px-3 py-2 rounded-full"
            >
              {/* {tech.icon} */}
              <span className="text-xs text-j-celestial-white">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};
