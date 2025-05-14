import { useEffect, useRef } from "react";
import {
  backend,
  cloud,
  database,
  design,
  devTools,
  frontend,
  languages,
  SkillGroup,
} from "@/data/skills";
import { motion } from "framer-motion";
import { SkillSection } from "../skillsSection";

interface SkillsGroupCardProps {
  onNewSkillGroup: (group: SkillGroup) => void;
}

export const SkillsCards: React.FC<SkillsGroupCardProps> = ({
  onNewSkillGroup,
}) => {
  return (
    <article className="w-full md:w-2/3 space-y-32 min-h-screen">
      <SkillSection
        title="Languages"
        skills={languages}
        onVisible={() => onNewSkillGroup(SkillGroup.LANGUAGE)}
      />

      <SkillSection
        title="Frontend"
        skills={frontend}
        onVisible={() => onNewSkillGroup(SkillGroup.FRONTEND)}
      />

      <SkillSection
        title="Backend"
        skills={backend}
        onVisible={() => onNewSkillGroup(SkillGroup.BACKEND)}
      />

      <SkillSection
        title="Database"
        skills={database}
        onVisible={() => onNewSkillGroup(SkillGroup.DATABASE)}
      />

      <SkillSection
        title="Cloud"
        skills={cloud}
        onVisible={() => onNewSkillGroup(SkillGroup.CLOUD)}
      />

      <SkillSection
        title="Dev Tools"
        skills={devTools}
        onVisible={() => onNewSkillGroup(SkillGroup.DEV_TOOLS)}
      />

      <SkillSection
        title="Design"
        skills={design}
        onVisible={() => onNewSkillGroup(SkillGroup.DESIGN)}
      />
    </article>
  );
};
