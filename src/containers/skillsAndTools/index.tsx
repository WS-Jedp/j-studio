import { useState, useMemo, useCallback, useEffect } from "react";
import { SkillCard } from "@/components/cards/skillsCard";
import { SkillGroup, Skill, threeColumnSkills } from "@/data/skills";
import { SkillCardGroup } from "./skillCardGroup";

export const SkillsAndTools = () => {
  const [selectedGroup, setSelectedGroup] = useState<SkillGroup | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const handleGroupSelect = useCallback(
    (group: SkillGroup) => {
      if (group === selectedGroup) {
        setSelectedGroup(null);
        return;
      }

      setSelectedGroup(group);
    },
    [selectedGroup]
  );

  const renderSkills = useCallback(
    (skills: Skill[], columnIndex: number) => {
      // Different animation directions based on device and column
      let direction;
      if (isMobile) {
        direction = columnIndex % 2 === 0 ? "seamless-left" : "seamless-right";
      } else {
        direction = columnIndex % 2 === 0 ? "seamless-up" : "seamless-down";
      }

      // For a seamless loop, we need to duplicate the skills
      const repeatedSkills = [...skills, ...skills];

      // Each card should be visible for at least 3 seconds
      const secondsPerCard = 3;
      const animationDuration = Math.max(60, skills.length * secondsPerCard);

      return (
        <div className="h-full overflow-hidden relative">
          <div
            className={`animation-container flex ${
              isMobile ? "flex-row" : "flex-col"
            } gap-4 absolute w-full`}
            style={{
              height: isMobile ? "100%" : "200%",
              width: isMobile ? "200%" : "100%", // Double the width for horizontal scrolling on mobile
              animationDuration: `${animationDuration}s`,
              animationName: direction,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              transform: isMobile
                ? direction === "seamless-right"
                  ? "translateX(-50%)"
                  : "translateX(0)"
                : direction === "seamless-down"
                ? "translateY(-50%)"
                : "translateY(0)",
              willChange: "transform",
              padding: isMobile ? "0 1rem" : "1rem 0",
            }}
          >
            {repeatedSkills.map((skill, index) => (
              <div
                key={`skill-${index}`}
                className="transform-gpu mb-4 h-auto"
                data-skill-name={skill.name} // For debugging purposes
              >
                <SkillCard
                  key={`${skill.name}-${index}`}
                  skill={{ ...skill, index }}
                  index={index}
                  selectedGroup={selectedGroup}
                />
              </div>
            ))}
          </div>
        </div>
      );
    },
    [selectedGroup, isMobile]
  );

  // Memoize columns rendering to prevent unnecessary re-renders
  const columnElements = useMemo(() => {
    return threeColumnSkills.map((columnSkills, columnIndex) => (
      <div
        key={`column-${columnIndex}`}
        className="h-[180px] md:h-auto overflow-hidden pause-on-hover"
      >
        {renderSkills(columnSkills, columnIndex)}
      </div>
    ));
  }, [renderSkills]);

  return (
    <div className="flex flex-col-reverse items-start justify-start md:grid md:grid-cols-3 h-full overflow-hidden">
      {/* Left side: Skills grid - using optimized columns with pause on hover */}
      <div
        className={`w-full md:col-span-2 grid ${
          isMobile ? "grid-rows-3" : "grid-cols-3"
        } gap-4 h-auto md:h-screen md:px-9 overflow-hidden section-gradient`}
      >
        {columnElements}
      </div>

      {/* Right side: Text content */}
      <div className="p-8 h-full">
        <SkillCardGroup
          selectedGroup={selectedGroup}
          setSelectedGroup={handleGroupSelect}
        />
      </div>
    </div>
  );
};
