import { SkillGroup, skillGroupInfo } from "@/data/skills";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

interface SkillsGroupCardProps {
  currentGroup: SkillGroup;
}

export const SkillsGroupCard = ({ currentGroup }: SkillsGroupCardProps) => {
  const [displayGroup, setDisplayGroup] = useState(currentGroup);
  
  // Add a slight delay when changing groups to create a smooth transition
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayGroup(currentGroup);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [currentGroup]);
  
  const currentInfo = skillGroupInfo[displayGroup];
  
  // Get the appropriate gradient color for the title based on the current skill group
  const titleGradient = useMemo(() => {
    switch (displayGroup) {
      case SkillGroup.LANGUAGE:
        return "from-indigo-400 to-blue-500";
      case SkillGroup.FRONTEND:
        return "from-cyan-400 to-blue-500";
      case SkillGroup.BACKEND:
        return "from-emerald-400 to-teal-500";
      case SkillGroup.MOBILE:
        return "from-orange-400 to-amber-500";
      case SkillGroup.DATABASE:
        return "from-red-400 to-rose-500";
      case SkillGroup.CLOUD:
        return "from-sky-400 to-blue-500";
      case SkillGroup.DESIGN:
        return "from-fuchsia-400 to-purple-500";
      case SkillGroup.DEV_TOOLS:
        return "from-violet-400 to-purple-500";
      default:
        return "from-blue-400 to-purple-500";
    }
  }, [displayGroup]);

  // Get the appropriate lightbeam gradient color
  const lightbeamGradient = useMemo(() => {
    switch (displayGroup) {
      case SkillGroup.LANGUAGE:
        return "from-indigo-500/5 via-indigo-500/20 to-indigo-500/5";
      case SkillGroup.FRONTEND:
        return "from-cyan-500/5 via-cyan-500/20 to-cyan-500/5";
      case SkillGroup.BACKEND:
        return "from-emerald-500/5 via-emerald-500/20 to-emerald-500/5";
      case SkillGroup.MOBILE:
        return "from-orange-500/5 via-orange-500/20 to-orange-500/5";
      case SkillGroup.DATABASE:
        return "from-red-500/5 via-red-500/20 to-red-500/5";
      case SkillGroup.CLOUD:
        return "from-sky-500/5 via-sky-500/20 to-sky-500/5";
      case SkillGroup.DESIGN:
        return "from-fuchsia-500/5 via-fuchsia-500/20 to-fuchsia-500/5";
      case SkillGroup.DEV_TOOLS:
        return "from-violet-500/5 via-violet-500/20 to-violet-500/5";
      default:
        return "from-blue-500/5 via-blue-500/20 to-blue-500/5";
    }
  }, [displayGroup]);
  
  return (
    <section className="relative w-full md:w-1/3 md:sticky md:top-6 p-6 md:p-9 md:pb-6 mb-6 md:mb-0 h-[100vh] max-h-[100vh] md:h-[90vh] md:max-h-[90vh] space-y-6 rounded-lg overflow-hidden">
      
      <AnimatePresence mode="wait">
        <motion.div 
          key={displayGroup}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ 
            duration: 0.5, 
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="space-y-6 z-10"
        >
          <motion.h2 
            className={`text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${titleGradient}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {currentInfo.title}
          </motion.h2>
          <motion.p 
            className="text-lg"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {currentInfo.description}
          </motion.p>
        </motion.div>

        {/* Animated background lightbeam */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`lightbeam-${displayGroup}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          {/* Primary beam */}
          <motion.div
            className={`absolute left-1/2 top-0 h-full w-40 -translate-x-1/2 bg-gradient-to-b ${lightbeamGradient} blur-2xl opacity-70 z-0`}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [0.8, 1.2, 0.8],
              rotate: [0, 1, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.5, 1],
            }}
          />
          
          {/* Secondary beam - offset timing */}
          <motion.div
            className={`absolute left-1/2 top-0 h-full w-32 -translate-x-1/2 bg-gradient-to-b ${lightbeamGradient} blur-3xl opacity-50 z-0`}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [1.2, 0.9, 1.2],
              rotate: [1, 0, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.5, 1],
              delay: 2, // Offset for smooth overlap
            }}
          />
          
          {/* Third beam - different properties */}
          <motion.div
            className={`absolute left-1/2 top-0 h-full w-48 -translate-x-1/2 bg-gradient-to-b ${lightbeamGradient} blur-xl opacity-30 z-0`}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              scale: [0.9, 1.1, 0.9],
              x: [-5, 5, -5],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.5, 1],
              delay: 4, // Further offset
            }}
          />
          
          <div className="absolute inset-0 bg-black/20 backdrop-blur-md rounded-md z-[-1]" />
        </motion.div>
      </AnimatePresence>
      </AnimatePresence>
    </section>
  );
};
