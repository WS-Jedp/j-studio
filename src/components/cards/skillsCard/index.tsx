import { motion } from "framer-motion";
import { Skill, SkillGroup } from "@/data/skills";
import Image from "next/image";
import { useMemo } from "react";

type SkillCardProps = {
  skill: Skill & { index: number };
  selectedGroup: SkillGroup | null;
  index: number;
};

export const SkillCard = ({ skill, selectedGroup, index }: SkillCardProps) => {
  // Check if this skill should be highlighted
  const isHighlighted = useMemo(() => {
    // If no group is selected, or this skill belongs to the selected group
    return !selectedGroup || skill.groupType === selectedGroup;
  }, [selectedGroup, skill.groupType]);

  // Memoize colors to prevent recalculation
  const colors = useMemo(() => {
    switch (skill.groupType) {
      case SkillGroup.LANGUAGE:
        return {
          gradient: "from-indigo-500/40 to-indigo-900/30",
          border: "border-indigo-500/20",
          title: "from-indigo-400 to-blue-500",
          glow: "rgba(99, 102, 241, 0.15)",
          icon: "bg-indigo-500/10",
          iconBorder: "border-indigo-500/20",
          badge: "bg-indigo-500/10",
          badgeText: "text-indigo-300",
          reflectionColor: "bg-indigo-300/5",
          circuitLine: "from-indigo-400/20 to-blue-500/20",
        };

      case SkillGroup.FRONTEND:
        return {
          gradient: "from-cyan-500/40 to-blue-900/30",
          border: "border-cyan-500/20",
          title: "from-cyan-400 to-blue-500",
          glow: "rgba(6, 182, 212, 0.15)",
          icon: "bg-cyan-500/10",
          iconBorder: "border-cyan-500/20",
          badge: "bg-cyan-500/10",
          badgeText: "text-cyan-300",
          reflectionColor: "bg-cyan-300/5",
          circuitLine: "from-cyan-400/20 to-blue-500/20",
        };

      case SkillGroup.BACKEND:
        return {
          gradient: "from-emerald-500/40 to-emerald-900/30",
          border: "border-emerald-500/20",
          title: "from-emerald-400 to-teal-500",
          glow: "rgba(16, 185, 129, 0.15)",
          icon: "bg-emerald-500/10",
          iconBorder: "border-emerald-500/20",
          badge: "bg-emerald-500/10",
          badgeText: "text-emerald-300",
          reflectionColor: "bg-emerald-300/5",
          circuitLine: "from-emerald-400/20 to-teal-500/20",
        };

      case SkillGroup.MOBILE:
        return {
          gradient: "from-orange-500/40 to-orange-900/30",
          border: "border-orange-500/20",
          title: "from-orange-400 to-amber-500",
          glow: "rgba(249, 115, 22, 0.15)",
          icon: "bg-orange-500/10",
          iconBorder: "border-orange-500/20",
          badge: "bg-orange-500/10",
          badgeText: "text-orange-300",
          reflectionColor: "bg-orange-300/5",
          circuitLine: "from-orange-400/20 to-amber-500/20",
        };

      case SkillGroup.DATABASE:
        return {
          gradient: "from-red-500/40 to-red-900/30",
          border: "border-red-500/20",
          title: "from-red-400 to-rose-500",
          glow: "rgba(239, 68, 68, 0.15)",
          icon: "bg-red-500/10",
          iconBorder: "border-red-500/20",
          badge: "bg-red-500/10",
          badgeText: "text-red-300",
          reflectionColor: "bg-red-300/5",
          circuitLine: "from-red-400/20 to-rose-500/20",
        };

      case SkillGroup.CLOUD:
        return {
          gradient: "from-sky-500/40 to-sky-900/30",
          border: "border-sky-500/20",
          title: "from-sky-400 to-blue-500",
          glow: "rgba(14, 165, 233, 0.15)",
          icon: "bg-sky-500/10",
          iconBorder: "border-sky-500/20",
          badge: "bg-sky-500/10",
          badgeText: "text-sky-300",
          reflectionColor: "bg-sky-300/5",
          circuitLine: "from-sky-400/20 to-blue-500/20",
        };

      case SkillGroup.DESIGN:
        return {
          gradient: "from-fuchsia-500/40 to-fuchsia-900/30",
          border: "border-fuchsia-500/20",
          title: "from-fuchsia-400 to-purple-500",
          glow: "rgba(217, 70, 239, 0.15)",
          icon: "bg-fuchsia-500/10",
          iconBorder: "border-fuchsia-500/20",
          badge: "bg-fuchsia-500/10",
          badgeText: "text-fuchsia-300",
          reflectionColor: "bg-fuchsia-300/5",
          circuitLine: "from-fuchsia-400/20 to-purple-500/20",
        };

      case SkillGroup.DEV_TOOLS:
        return {
          gradient: "from-violet-500/40 to-violet-900/30",
          border: "border-violet-500/20",
          title: "from-violet-400 to-purple-500",
          glow: "rgba(139, 92, 246, 0.15)",
          icon: "bg-violet-500/10",
          iconBorder: "border-violet-500/20",
          badge: "bg-violet-500/10",
          badgeText: "text-violet-300",
          reflectionColor: "bg-violet-300/5",
          circuitLine: "from-violet-400/20 to-purple-500/20",
        };

      default: // Default colors
        return {
          gradient: "from-j-celestial-black/40 to-j-celestial-black/30",
          border: "border-j-celestial-white/20",
          title: "from-blue-400 to-purple-500",
          glow: "rgba(0, 100, 255, 0.15)",
          icon: "bg-j-celestial-white/10",
          iconBorder: "border-white/10",
          badge: "bg-j-celestial-white/10",
          badgeText: "text-j-celestial-white/80",
          reflectionColor: "bg-blue-300/5",
          circuitLine: "from-blue-400/20 to-purple-500/20",
        };
    }
  }, [skill.groupType]);

  // Simplified animation settings
  const cardAnimation = {
    initial: { opacity: 0.7, y: 10 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
  };

  return (
    <motion.div
      {...cardAnimation}
      className={`relative w-full h-[180px] p-4 bg-gradient-to-br ${colors.gradient} 
                border ${colors.border} rounded-xl backdrop-blur-md 
                flex flex-col justify-between overflow-hidden group
                ${!isHighlighted ? 'grayscale brightness-50 opacity-50' : ''}`}
      style={{
        contain: "content",
        willChange: "transform",
        transform: "translateZ(0)",
        transition: "filter 0.3s ease, opacity 0.3s ease",
      }}
    >
      {/* Header with icon and name */}
      <div className="relative z-10 mb-1.5 flex flex-row items-center justify-between">
        <div className="flex flex-row flex-nowrap items-center">
          {false ? (
            <div className={`w-4 h-4 mr-1 flex-shrink-0 ${colors.icon} rounded-lg flex items-center justify-center overflow-hidden backdrop-blur-sm border ${colors.iconBorder}`}>
              <Image
                src={`/icons/${skill.icon}.svg`}
                alt={skill.name}
                width={15}
                height={15}
                className="object-contain"
                onError={(e) => {
                  // Fallback if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = "/icons/default.svg";
                }}
              />
            </div>
          ) : (
            <div className={`w-5 h-5 mr-1 flex-shrink-0 ${colors.icon} rounded-sm flex items-center justify-center backdrop-blur-sm border ${colors.iconBorder}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className={colors.badgeText}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v6.5M12 22v-6.5M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M2 12h6.5M22 12h-6.5M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24" />
              </svg>
            </div>
          )}
          <h3 className={`text-md font-bold text-transparent bg-clip-text bg-gradient-to-r ${colors.title}`}>
            {skill.name}
          </h3>
        </div>

        <span
          className={`inline-block px-2 py-0.5 text-xs rounded-md ${colors.badge} ${colors.badgeText} 
                      border ${colors.iconBorder} backdrop-blur-md font-mono`}
        >
          <span className={colors.badgeText}>#</span>
          {skill.skillType}
        </span>
      </div>

      {/* Description with better readability */}
      <p className="text-j-celestial-white/80 text-sm font-bold mb-2.5 group-hover:text-j-celestial-white/95 transition-colors relative z-10">
        {skill.description}
      </p>

    </motion.div>
  );
};
