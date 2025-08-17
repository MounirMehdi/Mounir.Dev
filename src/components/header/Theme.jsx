import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem("theme");
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return savedTheme || (systemDark ? "dark" : "light");
    }
    return "light";
  });

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setIsAnimating(true);
    setTheme(prev => prev === "light" ? "dark" : "light");
    setTimeout(() => setIsAnimating(false), 500);
  };

  const iconVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.5, 
      rotate: -90 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring", 
        damping: 10, 
        stiffness: 300 
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.5, 
      rotate: 90 
    }
  };

  return (
    <motion.button 
      onClick={toggleTheme}
      className="relative rounded-full p-2 overflow-hidden cursor-pointer bg-background ring-1 ring-border"
      title={theme === "light" ? "Activer le mode sombre" : "Activer le mode clair"}
      aria-label={theme === "light" ? "Passer au mode sombre" : "Passer au mode clair"}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {theme === "light" ? (
            <motion.div 
              key="sun"
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Sun className="text-amber-500 w-full h-full" />
            </motion.div>
          ) : (
            <motion.div 
              key="moon"
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Moon className="text-indigo-300 w-full h-full" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isAnimating && (
        <motion.div 
          className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-indigo-500"
          initial={{ scale: 0, opacity: 0.7 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.button>
  );
};

export default ThemeToggle;