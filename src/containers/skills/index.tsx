import { SkillGroup } from "@/data/skills";
import { SkillsGroupCard } from "./skillsGroupCard";
import { useState } from "react";
import { SkillsCards } from "./skillsCards";

export default function Skills() {
  const [currentSkillGroup, setCurrentSkillGroup] = useState<SkillGroup>(
    SkillGroup.LANGUAGE
  );
  return (
    <section className="relative w-full min-h-screen flex flex-col md:flex-row-reverse md:space-x-6 mx-auto md:p-9 md:max-w-7xl xl:max-w-[2080px] overflow-visible gap-6">
      {/* Right side header */}
      <SkillsGroupCard currentGroup={currentSkillGroup} />

      {/* Left side content */}
      <SkillsCards
        onNewSkillGroup={(group) => {
          setCurrentSkillGroup(group);
        }}
      />
    </section>
  );
}
