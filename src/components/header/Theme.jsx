import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    // Vérifier le thème système par défaut
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem("theme");
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return savedTheme || (systemDark ? "dark" : "light");
    }
    return "light";
  });

  const [isScrolled, setIsScrolled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === "dark") {
      root.classList.add("dark");
      root.style.setProperty('--theme-transition', 'all 0.5s ease');
    } else {
      root.classList.remove("dark");
      root.style.setProperty('--theme-transition', 'all 0.5s ease');
    }
    
    localStorage.setItem("theme", theme);
    
    // Ajouter une transition globale
    document.body.style.transition = 'background-color 0.5s ease, color 0.3s ease';
    
    return () => {
      document.body.style.transition = '';
    };
  }, [theme]);

  const toggleTheme = () => {
    setIsAnimating(true);
    setTheme(prev => (prev === "light" ? "dark" : "light"));
    
    // Réinitialiser l'état d'animation après la transition
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Variantes d'animation
  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -90 },
    visible: { opacity: 1, scale: 1, rotate: 0 },
    exit: { opacity: 0, scale: 0.5, rotate: 90 }
  };

  const containerVariants = {
    light: { backgroundColor: "#f0f9ff" },
    dark: { backgroundColor: "#0c4a6e" }
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative rounded-full p-1.5 m-0 overflow-hidden transition-all duration-300 cursor-pointer ${
        isScrolled 
          ? "bg-white/90 backdrop-blur-sm shadow-sm" 
          : "bg-white/5 backdrop-blur"
      } ring-1 ring-gray-200 dark:ring-gray-700`}
      title={theme === "light" ? "Activer le mode sombre" : "Activer le mode clair"}
      aria-label={theme === "light" ? "Passer au mode sombre" : "Passer au mode clair"}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      variants={containerVariants}
      animate={theme}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-5 h-5">
        <AnimatePresence mode="wait">
          {theme === "light" ? (
            <motion.div
              key="sun"
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "spring", damping: 10, stiffness: 200 }}
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
              transition={{ type: "spring", damping: 10, stiffness: 200 }}
            >
              <Moon className="text-indigo-300 w-full h-full" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Effet de transition */}
      {isAnimating && (
        <motion.div 
          className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-indigo-500 opacity-70"
          initial={{ scale: 0 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.button>
  );
};

export default ThemeToggle;