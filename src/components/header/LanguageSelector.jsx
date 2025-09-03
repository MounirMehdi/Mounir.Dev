import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import 'flag-icons/css/flag-icons.min.css';
import { motion, AnimatePresence } from "framer-motion";

const LANGUAGES = [
  { key: 'en', label: 'EN', name: 'English', flag: 'gb' },
  { key: 'fr', label: 'FR', name: 'Français', flag: 'fr' },
  { key: 'ar', label: 'AR', name: 'العربية', flag: 'dz' },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeLang, setActiveLang] = useState(
    LANGUAGES.find((l) => l.key === i18n.language) || LANGUAGES[0]
  );
  const isRTL = i18n.language === 'ar';

  const handleChange = (lang) => {
    i18n.changeLanguage(lang.key);
    setIsOpen(false);
    setActiveLang(lang);
    //window.location.reload();
  };

  // Détection du défilement
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Détection des clics extérieurs
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Détection de la taille d'écran pour mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640); // 640px = breakpoint 'sm' de Tailwind
    };

    // Vérification initiale
    checkIfMobile();
    
    // Écouteur de redimensionnement
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Variantes d'animation
  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      y: isMobile ? 10 : -10,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: "spring", 
        damping: 20, 
        stiffness: 300 
      }
    },
    exit: { 
      opacity: 0, 
      y: isMobile ? 10 : -10,
      scale: 0.95,
      transition: { duration: 0.15 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.2
      }
    })
  };

  return (
    <div ref={dropdownRef} className="relative z-50">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center px-3 py-1.5 rounded-full cursor-pointer transition-all duration-300 ${
          isScrolled 
            ? "bg-white/90 text-[#031A3D]" 
            : "bg-[#055BA4]/10 text-[#055BA4] dark:text-white"
        } dark:bg-[#031A3D]/80 dark:hover:bg-[#055BA4] hover:bg-[#055BA4] hover:text-white ring-gray-200 dark:ring-[#055BA4]`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span 
          className={`fi fi-${activeLang.flag} rounded-full`} 
          style={{ transform: 'scale(1.2)' }}
        />
        <motion.span
          animate={{ display: isScrolled ? 'block' : 'none', width: isScrolled ? 'auto' : 0 }}
          className={`overflow-hidden ${isRTL ? 'pr-2' : 'pl-2'}`}
        >
          {activeLang.label}
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`absolute ${isRTL ? 'left-0' : 'right-0'} ${
              isMobile 
                ? 'bottom-full mb-2'
                : 'top-full mt-2'
            } min-w-[120px] bg-white dark:bg-[#031A3D] rounded-xl shadow-lg border border-[#41ADE8] dark:border-[#055BA4] overflow-hidden`}
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            dir="ltr"
          >
            <div className="py-1">
              {LANGUAGES.map((lang, index) => (
                <motion.button
                  key={lang.key}
                  onClick={() => handleChange(lang)}
                  className={`cursor-pointer w-full flex items-center gap-3 px-4 py-2.5 text-left ${
                    lang.key === i18n.language 
                      ? "bg-[#055BA4]/20 dark:bg-[#055BA4]/40 font-semibold text-[#055BA4] dark:text-[#41ADE8]" 
                      : "hover:bg-[#41ADE8]/10 dark:hover:bg-[#055BA4]/30 text-[#031A3D] dark:text-white"
                  }`}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span 
                    className={`fi fi-${lang.flag} rounded-full ${lang.key === i18n.language ? 'scale-110' : ''}`}
                    style={{ transform: 'scale(1.2)' }}
                  />
                  <div className="flex flex-col">
                    <span>{lang.label}</span>
                    <span className="text-xs text-[#055BA4] dark:text-[#41ADE8] mt-0.5">
                      {lang.name}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;