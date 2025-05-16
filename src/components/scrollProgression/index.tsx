import { motion, useTransform, MotionValue } from "framer-motion";

// Custom component for scroll-driven progress bars
export const ScrollProgressBar = ({ progress, color }: { progress: MotionValue<number>, color?: string }) => {
  const scaleX = useTransform(progress, [0, 1], [0, 1]);

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-0.5 ${color || 'bg-green-400/40'} z-50 origin-left`}
      style={{ scaleX }}
    />
  );
};