import Image from "next/image";
import { JobCardProps } from "../cards/jobCard";
import { motion, useTransform, useScroll, MotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { X, ChevronRight } from "lucide-react";

interface JobDetailProps {
  job: JobCardProps;
  onClose: () => void;
}

const JobDetail: React.FC<JobDetailProps> = ({ job, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    container: containerRef,
  });

  // Prevent main page scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Default styling colors if not provided
  const accentColor = job.accentColor || "#ffffff";
  const backgroundColor = job.backgroundColor || "#5A67D8";

  // Enhanced parallax effects for editorial design
  const titleOpacity = useTransform(scrollXProgress, [0, 0.05], [1, 0]);
  const titleScale = useTransform(scrollXProgress, [0, 0.05], [1, 0.9]);
  const titleX = useTransform(scrollXProgress, [0, 0.1], [0, -60]);

  // Create progressive reveal effects
  const createScrollBasedTransform = (
    startPoint: number,
    endPoint: number
  ): MotionValue<number> => {
    return useTransform(
      scrollXProgress,
      [startPoint, startPoint + 0.05, endPoint - 0.05, endPoint],
      [0, 1, 1, 0]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 top-0 left-0 w-full h-screen overflow-hidden backdrop-blur-md z-[999] bg-j-deep-black/95 text-j-celestial-white"
    >
      {/* Close button - elegant minimal style */}
      <button
        onClick={onClose}
        className="fixed top-8 right-8 flex items-center gap-1 px-3 py-1 rounded-full border border-j-celestial-white/10 hover:border-j-celestial-white/40 text-sm transition-all duration-500 z-50 backdrop-blur-md"
      >
        <span className="text-j-celestial-white/70 hover:text-j-celestial-white/100 transition-colors duration-300">
          Close
        </span>
        <X size={14} />
      </button>

      {/* Scroll instruction */}
      <motion.div
        className="fixed bottom-8 right-8 flex items-center gap-2 text-sm text-j-celestial-white/70 z-50"
        animate={{
          opacity: [0.5, 1, 0.5],
          x: [0, 10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
      >
        <span className="text-xs tracking-wider uppercase">Scroll</span>
        <ChevronRight size={15} />
      </motion.div>

      {/* Modern horizontal scroll container with full-height grid layout */}
      <div
        ref={containerRef}
        className="w-full h-screen flex snap-x snap-mandatory overflow-x-scroll overflow-y-hidden scroll-smooth"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* Hero section with modern grid */}
        <section className="flex-shrink-0 min-w-screen h-full flex snap-start snap-always">
          <div className="h-full w-full grid grid-cols-[1fr_minmax(0,2fr)_1fr] gap-8 px-12 md:px-16 lg:px-24">
            {/* Company logo with artistic placement */}
            <motion.div
              className="flex items-center justify-center relative self-center"
              style={{ opacity: titleOpacity }}
            >
              {job.companyLogo ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="relative"
                >
                  <Image
                    src={job.companyLogo}
                    alt={`${job.companyName} logo`}
                    width={150}
                    height={150}
                    className="object-contain mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                  />
                  <motion.div
                    className="absolute -inset-10 rounded-full opacity-20"
                    style={{
                      background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
                    }}
                    animate={{
                      opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-32 h-32 rounded-full flex items-center justify-center text-4xl font-light"
                  style={{ backgroundColor: `${accentColor}15` }}
                >
                  {job.companyName.charAt(0)}
                </motion.div>
              )}
            </motion.div>

            {/* Title and intro with elegant typography */}
            <motion.div
              className="flex flex-col justify-center"
              style={{
                x: titleX,
                opacity: titleOpacity,
                scale: titleScale,
              }}
            >
              <div className="space-y-6">
                <div>
                  <h2 className="text-base font-light tracking-widest uppercase mb-1 opacity-60">
                    {job.yearFrom} — {job.yearTo}
                  </h2>
                  <h1
                    className="text-5xl md:text-6xl font-bold tracking-tight leading-none mb-3"
                    style={{ color: accentColor }}
                  >
                    {job.companyName}
                  </h1>
                  <h3 className="text-xl md:text-2xl font-light tracking-wide opacity-80">
                    {job.role}
                  </h3>
                </div>

                <motion.div
                  className="flex items-center gap-2 mt-8 opacity-50"
                  animate={{
                    x: [0, 8, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                  }}
                >
                  <span className="text-xs tracking-wider uppercase">
                    Scroll to explore
                  </span>
                  <ChevronRight size={14} />
                </motion.div>
              </div>
            </motion.div>
            
            {/* Visual element in third column */}
            <div className="hidden lg:flex items-center justify-center">
              <motion.div 
                className="w-full h-1/2 relative" 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                transition={{ duration: 1.5 }}
              >
                <div 
                  className="absolute inset-0" 
                  style={{ 
                    background: `linear-gradient(135deg, transparent 0%, ${accentColor} 100%)`,
                    opacity: 0.2
                  }}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Combined section: Mission, Key Achievements, and Technologies with modern grid */}
        <section className="flex-shrink-0 min-w-screen h-full flex snap-start snap-always">
          <div className="h-full w-full grid grid-areas-main-section px-12 md:px-16 lg:px-24 py-8">
            {/* Mission Section */}
            <div className="grid-in-mission h-full flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="h-full flex flex-col"
              >
                <h2
                  className="text-2xl md:text-3xl font-extralight mb-4"
                  style={{ color: accentColor }}
                >
                  Mission
                </h2>
                <div className="pr-8 flex-1 flex items-center">
                  <p className="text-base md:text-lg font-light leading-relaxed tracking-wide opacity-90">
                    {job.mission}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Key Achievements Section */}
            {job.keyAchievements && job.keyAchievements.length > 0 && (
              <div className="grid-in-achievements h-full flex flex-col">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="h-full flex flex-col"
                >
                  <h2
                    className="text-2xl md:text-3xl font-extralight mb-6"
                    style={{ color: accentColor }}
                  >
                    Key Achievements
                  </h2>
                  <div className="overflow-y-auto flex-1 achievements-scroller pr-4">
                    <div className="space-y-8">
                      {job.keyAchievements.map((achievement, index) => (
                        <div key={index} className="relative pl-6 border-l border-j-celestial-white/10">
                          <h3 className="text-base font-medium mb-2">
                            {achievement.title}
                          </h3>
                          {achievement.description && (
                            <p className="font-light text-sm text-j-celestial-white/70 leading-relaxed">
                              {achievement.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Technologies Section */}
            {job.technologies && job.technologies.length > 0 && (
              <div className="grid-in-technologies h-full flex flex-col">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="h-full flex flex-col"
                >
                  <h2
                    className="text-2xl md:text-3xl font-extralight mb-6"
                    style={{ color: accentColor }}
                  >
                    Technologies
                  </h2>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex flex-wrap gap-x-3 gap-y-4">
                      {job.technologies.map((tech, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 border border-j-celestial-white/10 px-3 py-1.5 rounded-full"
                        >
                          {tech.iconUrl && (
                            <Image
                              src={tech.iconUrl}
                              alt={tech.name}
                              width={14}
                              height={14}
                              className="w-4 h-4 object-contain opacity-70"
                            />
                          )}
                          <span className="text-xs font-light">{tech.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </section>

        {/* Projects with modern grid layout */}
        {job.projects && job.projects.length > 0 && (
          <section className="flex-shrink-0 min-w-screen h-full flex snap-start snap-always">
            <div className="h-full w-full grid grid-rows-[auto_1fr] px-12 md:px-16 lg:px-24 py-8 overflow-hidden">
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-2xl md:text-3xl font-extralight mb-8"
                  style={{ color: accentColor }}
                >
                  Projects
                </motion.h2>
              </div>

              {/* Modern grid of projects using CSS Grid */}
              <div className="h-full overflow-y-auto projects-container pr-4">
                <div className="grid grid-cols-2 auto-rows-max gap-x-12 gap-y-12">
                  {job.projects.map((project, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="border-t border-j-celestial-white/10 pt-6"
                    >
                      <h3 className="text-xl font-medium mb-4">{project.title}</h3>
                      
                      <div className="grid grid-cols-[2fr_3fr] gap-6">
                        {/* Project content */}
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium uppercase tracking-wide mb-2 opacity-70">
                              Challenge
                            </h4>
                            <p className="font-light text-sm text-j-celestial-white/80 leading-relaxed">
                              {project.description}
                            </p>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium uppercase tracking-wide mb-2 opacity-70">
                              Solution
                            </h4>
                            <p className="font-light text-sm text-j-celestial-white/80 leading-relaxed">
                              {project.solution}
                            </p>
                          </div>
                        </div>

                        {/* Project Images - modern layout */}
                        {project.images && project.images.length > 0 && (
                          <div className="flex flex-col gap-3">
                            {project.images.slice(0, 2).map((image, imgIndex) => (
                              <div
                                key={imgIndex}
                                className="overflow-hidden rounded"
                                style={{ 
                                  height: imgIndex === 0 ? '60%' : '40%',
                                  marginLeft: imgIndex === 0 ? '0' : '20%' 
                                }}
                              >
                                <motion.div
                                  whileHover={{ scale: 1.05 }}
                                  transition={{ duration: 0.4 }}
                                  className="h-full"
                                >
                                  <Image
                                    src={image}
                                    alt={`${project.title} image ${imgIndex + 1}`}
                                    width={400}
                                    height={250}
                                    className="w-full h-full object-cover"
                                  />
                                </motion.div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </motion.div>
  );
};

export default JobDetail;
