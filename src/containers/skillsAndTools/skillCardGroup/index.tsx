import { allSkilsByGroup, SkillGroup, skillGroupInfo } from "@/data/skills";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState, useEffect, useMemo } from "react";

interface SkillGroupInfo {
  selectedGroup: SkillGroup | null;
  setSelectedGroup: (group: SkillGroup) => void;
}

export const SkillCardGroup = ({
  selectedGroup,
  setSelectedGroup,
}: SkillGroupInfo) => {
  const [displayGroup, setDisplayGroup] = useState(selectedGroup);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (selectedGroup) {
      const timer = setTimeout(() => {
        setDisplayGroup(selectedGroup);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [selectedGroup]);

  const titleGradient = useMemo(() => {
    if (!displayGroup) return "from-blue-400 to-purple-500";

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

  const lightbeamGradient = useMemo(() => {
    if (!displayGroup) return "from-blue-500/5 via-blue-500/20 to-blue-500/5";

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
    <article className="relative w-full p-5 mb-6 min-h-[40vh] h-full rounded-lg overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={displayGroup || "empty"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="space-y-4 md:space-y-6 z-10 relative"
        >
          <motion.h2
            className={`text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${titleGradient}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {selectedGroup
              ? skillGroupInfo[selectedGroup].title
              : "My Language of Building"}
          </motion.h2>

          <motion.p
            className="text-base md:text-lg"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {selectedGroup
              ? skillGroupInfo[selectedGroup].description
              : "Every tool here is part of how I think — chosen not by trend, but by intent. This is the stack I use to imagine, shape, and scale meaningful digital experiences."}
          </motion.p>

          <div className="mt-4 relative z-20">
            {/* Enhanced dropdown for skill group selection */}
            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`w-full text-start flex items-center justify-between py-3 px-4 rounded-md 
                  bg-white/10 backdrop-blur-sm border border-white/10 transition-all duration-200 
                  hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/20
                  ${selectedGroup ? 'text-white font-medium' : 'text-white/80'}`}
                aria-haspopup="listbox"
                aria-expanded={dropdownOpen}
              >
                <span className="flex items-center gap-2">
                  {selectedGroup && (
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${titleGradient}`}></div>
                  )}
                  {selectedGroup 
                    ? skillGroupInfo[selectedGroup].title 
                    : "Select a skill group"}
                </span>
                <motion.div
                  animate={{ rotate: dropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={18} className="text-white/70" />
                </motion.div>
              </button>
              
              {/* Improved dropdown menu */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5, height: 0 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      height: 'auto',
                      transition: {
                        opacity: { duration: 0.2 },
                        y: { duration: 0.2 },
                        height: { duration: 0.25 }
                      }
                    }}
                    exit={{ 
                      opacity: 0, 
                      y: -5, 
                      height: 0,
                      transition: {
                        opacity: { duration: 0.15 },
                        y: { duration: 0.15 },
                        height: { duration: 0.2 }
                      }
                    }}
                    className="fixed w-full mt-1.5 bg-black/70 border border-white/10 
                      backdrop-blur-lg rounded-md overflow-hidden z-50 shadow-xl"
                    style={{
                      width: 'var(--dropdown-width)',
                      left: 'var(--dropdown-left)',
                      top: 'var(--dropdown-top)',
                    }}
                    ref={(node) => {
                      if (node && dropdownOpen) {
                        const button = node.previousElementSibling;
                        if (button) {
                          const rect = button.getBoundingClientRect();
                          const spaceBelow = window.innerHeight - rect.bottom;
                          const dropdownHeight = node.getBoundingClientRect().height;
                          
                          // Set custom properties for positioning
                          node.style.setProperty('--dropdown-width', `${rect.width}px`);
                          node.style.setProperty('--dropdown-left', `${rect.left}px`);
                          
                          // Position above or below based on available space
                          if (spaceBelow < dropdownHeight && rect.top > dropdownHeight) {
                            // Position above if not enough space below but enough space above
                            node.style.setProperty('--dropdown-top', `${rect.top - dropdownHeight - 6}px`);
                          } else {
                            // Position below (default)
                            node.style.setProperty('--dropdown-top', `${rect.bottom + 6}px`);
                          }
                        }
                      }
                    }}
                    role="listbox"
                  >
                    <div className="max-h-72 overflow-y-auto py-1.5 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                      {Object.values(SkillGroup).map((group) => (
                        <motion.button
                          key={group}
                          onClick={() => {
                            setSelectedGroup(group);
                            setDropdownOpen(false);
                          }}
                          className={`w-full text-start px-4 py-2.5 hover:bg-white/10 transition-colors 
                            group flex items-center justify-between ${
                            selectedGroup === group ? 'bg-white/15 font-medium' : ''
                          }`}
                          whileHover={{ x: 3 }}
                          transition={{ duration: 0.15 }}
                          role="option"
                          aria-selected={selectedGroup === group}
                        >
                          <span className="flex items-center gap-2">
                            <motion.div 
                              initial={selectedGroup !== group ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                              animate={selectedGroup === group ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                              className={`w-2 h-2 rounded-full bg-gradient-to-r ${
                                group === SkillGroup.LANGUAGE ? "from-indigo-400 to-blue-500" :
                                group === SkillGroup.FRONTEND ? "from-cyan-400 to-blue-500" :
                                group === SkillGroup.BACKEND ? "from-emerald-400 to-teal-500" :
                                group === SkillGroup.MOBILE ? "from-orange-400 to-amber-500" :
                                group === SkillGroup.DATABASE ? "from-red-400 to-rose-500" :
                                group === SkillGroup.CLOUD ? "from-sky-400 to-blue-500" :
                                group === SkillGroup.DESIGN ? "from-fuchsia-400 to-purple-500" :
                                group === SkillGroup.DEV_TOOLS ? "from-violet-400 to-purple-500" :
                                "from-blue-400 to-purple-500"
                              }`}
                            />
                            {skillGroupInfo[group].title}
                          </span>
                          <div className={`text-xs text-white/50 group-hover:text-white/70 transition-colors ${
                            selectedGroup === group ? 'text-white/70' : ''
                          }`}>
                            {allSkilsByGroup[group].length} skills
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Display skills for the selected group with improved animation */}
            <AnimatePresence>
              {selectedGroup && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-5"
                >
                  <h3 className="text-xs uppercase tracking-wider font-medium mb-2.5 flex items-center text-white/70">
                    <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${titleGradient} mr-1.5`}></div>
                    Skills ({allSkilsByGroup[selectedGroup].length})
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {allSkilsByGroup[selectedGroup].map((skill, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          duration: 0.1, 
                          delay: 0.01 * index,
                          ease: "easeOut"
                        }}
                        className="text-xs py-1 px-2 rounded-md bg-white/5 hover:bg-white/10 
                          border border-white/5 transition-all group inline-flex items-center"
                      >
                        {skill.name}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Modified the structure to keep main container stable while animating inner content */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`lightbeam-${displayGroup || "empty"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
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
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 bg-black/20 backdrop-blur-md rounded-lg z-[-1]" />
        </div>
      </AnimatePresence>
    </article>
  );
};
