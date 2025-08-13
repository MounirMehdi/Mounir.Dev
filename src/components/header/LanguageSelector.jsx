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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      y: -10,
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
      y: -10,
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
            ? "bg-white/90" 
            : "bg-white/5"
        } dark:bg-slate-800/80 dark:hover:bg-slate-700/90 hover:bg-gray-100 ring-gray-200 dark:ring-gray-700`}
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
            className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 min-w-[120px] bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 overflow-hidden`}
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            dir="ltr" // Toujours en LTR pour le menu déroulant
          >
            <div className="py-1">
              {LANGUAGES.map((lang, index) => (
                <motion.button
                  key={lang.key}
                  onClick={() => handleChange(lang)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left ${
                    lang.key === i18n.language 
                      ? "bg-teal-50 dark:bg-teal-900/50 font-semibold text-teal-600 dark:text-teal-400" 
                      : "hover:bg-gray-50 dark:hover:bg-slate-700/70"
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
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
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