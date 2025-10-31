"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock, Eye, EyeOff, ShieldCheck, AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface ConfidentialMiddlewareProps {
  children: React.ReactNode;
  projectPassword: string;
  projectName?: string;
  sessionTimeout?: number; // in minutes, default 60 minutes
}

export const ConfidentialMiddleware = ({ 
  children, 
  projectPassword,
  projectName = "Project",
  sessionTimeout = 60
}: ConfidentialMiddlewareProps) => {
  const t = useTranslations("confidential");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check for existing session
  useEffect(() => {
    const sessionKey = `confidential_access_${projectName.toLowerCase().replace(/\s+/g, '_')}`;
    const sessionData = localStorage.getItem(sessionKey);
    
    if (sessionData) {
      try {
        const { timestamp, unlocked } = JSON.parse(sessionData);
        const now = Date.now();
        const sessionAge = (now - timestamp) / (1000 * 60); // in minutes
        
        if (unlocked && sessionAge < sessionTimeout) {
          setIsUnlocked(true);
        } else {
          localStorage.removeItem(sessionKey);
        }
      } catch {
        localStorage.removeItem(sessionKey);
      }
    }
  }, [projectName, sessionTimeout]);

  // Block scroll when locked
  useEffect(() => {
    if (!isUnlocked) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.height = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.height = 'unset';
    };
  }, [isUnlocked]);

  // Focus input when modal opens
  useEffect(() => {
    if (!isUnlocked && !isBlocked) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 500);
    }
  }, [isUnlocked, isBlocked]);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isBlocked) return;
    
    setIsLoading(true);
    setError("");

    // Simulate network delay for security
    await new Promise(resolve => setTimeout(resolve, 800));

    if (password === projectPassword) {
      // Success - store session
      const sessionKey = `confidential_access_${projectName.toLowerCase().replace(/\s+/g, '_')}`;
      const sessionData = {
        timestamp: Date.now(),
        unlocked: true
      };
      localStorage.setItem(sessionKey, JSON.stringify(sessionData));
      
      setIsUnlocked(true);
      setError("");
      setAttempts(0);
    } else {
      // Failed attempt
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= 3) {
        setIsBlocked(true);
        setError(t("errors.tooManyAttempts"));
        
        // Block for 5 minutes
        setTimeout(() => {
          setIsBlocked(false);
          setAttempts(0);
          setError("");
        }, 5 * 60 * 1000);
      } else {
        const remaining = 3 - newAttempts;
        setError(t("errors.incorrectPassword", { remaining }));
      }
    }
    
    setPassword("");
    setIsLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <div className="relative w-full min-h-screen">
      {/* Blurred Background Content */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="filter blur-md scale-110 pointer-events-none select-none">
          {children}
        </div>
        <div className="absolute inset-0 bg-j-deep-black/60 backdrop-blur-sm" />
      </div>

      {/* Password Modal */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md bg-j-deep-black/95 backdrop-blur-xl border border-j-celestial-white/20 rounded-2xl p-8 shadow-2xl"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="w-16 h-16 bg-gradient-to-r from-j-celestial-blue to-j-celestial-cooper rounded-full mx-auto mb-4 flex items-center justify-center"
              >
                <Lock className="w-8 h-8 text-white" />
              </motion.div>

              <div className="flex items-center justify-center gap-2 mb-2">
                <Image
                  src="/assets/icons/j-icon.png"
                  alt="J-Studio"
                  width={24}
                  height={24}
                  className="filter brightness-0 invert opacity-80"
                />
                <h1 className="text-xl font-bold text-j-celestial-white">
                  J-Studio
                </h1>
              </div>

              <h2 className="text-2xl font-bold text-j-celestial-white mb-2">
                {t("header.title")}
              </h2>
              <p className="text-j-celestial-white/70 text-sm">
                {t("header.description", { projectName })}
              </p>
            </div>

            {/* Password Form */}
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div className="relative">
                <label className="block text-sm font-medium text-j-celestial-white/80 mb-2">
                  {t("form.label")}
                </label>
                <div className="relative">
                  <input
                    ref={inputRef}
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isBlocked || isLoading}
                    placeholder={t("form.placeholder")}
                    className="w-full px-4 py-3 pr-12 bg-j-deep-black/50 border border-j-celestial-white/20 rounded-lg text-j-celestial-white placeholder-j-celestial-white/40 focus:outline-none focus:border-j-celestial-blue/50 focus:ring-2 focus:ring-j-celestial-blue/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    disabled={isBlocked || isLoading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-j-celestial-white/60 hover:text-j-celestial-white transition-colors disabled:cursor-not-allowed"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
                  >
                    <AlertTriangle size={16} />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={!password.trim() || isBlocked || isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 bg-gradient-to-r from-j-celestial-blue to-j-celestial-cooper text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-j-celestial-blue/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>{t("buttons.verifying")}</span>
                  </>
                ) : isBlocked ? (
                  <>
                    <AlertTriangle size={20} />
                    <span>{t("buttons.accessBlocked")}</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck size={20} />
                    <span>{t("buttons.accessContent")}</span>
                  </>
                )}
              </motion.button>
            </form>

            {/* Attempts Counter */}
            {attempts > 0 && !isBlocked && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-center text-j-celestial-white/60 text-sm"
              >
                {t("status.failedAttempts", { current: attempts })}
              </motion.div>
            )}

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-j-celestial-white/10 text-center">
              <p className="text-j-celestial-white/50 text-xs">
                {t("footer.poweredBy")}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};