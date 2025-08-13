import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSelector from './LanguageSelector';
import ThemeToggle from "./Theme";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);

  // Déterminer la direction
  const isRTL = i18n.language === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';
  const textAlign = isRTL ? 'text-right' : 'text-left';

  // Navigation items traduits
  const navItems = [
    { name: t('header.home'), path: "/" },
    { name: t('header.services'), path: "/services" },
    { name: t('header.projects'), path: "/projects" },
    { name: t('header.blog'), path: "/blog" },
    { name: t('header.contact'), path: "/contact" },
  ];

  // Fermer le menu en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Gestion du scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Variantes d'animation
  const menuVariants = {
    open: { 
      opacity: 1,
      height: "auto",
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    closed: { 
      opacity: 0,
      height: 0,
      transition: { 
        staggerChildren: 0.1,
        staggerDirection: -1
      } 
    }
  };

  const itemVariants = {
    open: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", damping: 15, stiffness: 100 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
      dir={direction}
      style={{
        background: isScrolled 
          ? 'rgba(255, 255, 255, 0.95)' 
          : 'rgba(255, 255, 255, 0.65)',
        backdropFilter: isScrolled ? 'blur(10px)' : 'blur(8px)',
        boxShadow: isScrolled 
          ? '0 4px 6px rgba(0, 0, 0, 0.1)' 
          : '0 2px 4px rgba(0, 0, 0, 0.05)',
      }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Link
            to="/"
            className="text-2xl font-bold hover:text-teal-600 transition-colors"
            aria-label={t('header.home')}
          >
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1"
              dir="ltr"
            >
              <span className="text-teal-600 font-bold">&lt;</span>
              <span className="text-slate-800">MM.Dev</span>
              <span className="text-teal-600 font-bold">/&gt;</span>
            </motion.span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.div
                key={item.path}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.path}
                  className={`relative py-1 font-medium transition-colors text-slate-700 hover:text-teal-600 ${
                    location.pathname === item.path 
                      ? "text-teal-600" 
                      : ""
                  }`}
                  aria-current={location.pathname === item.path ? "page" : undefined}
                >
                  {item.name}
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className={`hidden md:flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <ThemeToggle />
            <LanguageSelector />
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                className={`bg-gradient-to-r hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/20 ${
                  isScrolled 
                    ? "from-orange-500 to-orange-600" 
                    : "from-orange-500/50 to-orange-600/70"
                }`}
              >
                <Link to="/devis">{t('header.quoteButton')}</Link>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? t('header.closeMenu') : t('header.openMenu')}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation animée */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            ref={menuRef}
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden overflow-hidden bg-white border-t border-slate-200"
            dir={direction}
          >
            <motion.div 
              className={`container mx-auto px-4 py-4 space-y-6 ${textAlign}`}
              variants={menuVariants}
            >
              {navItems.map((item) => (
                <motion.div 
                  key={item.path} 
                  variants={itemVariants}
                >
                  <Link
                    to={item.path}
                    className={`block py-2 text-lg font-medium ${
                      location.pathname === item.path
                        ? "text-teal-600"
                        : "text-slate-700"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={location.pathname === item.path ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div 
                className={`flex flex-wrap items-center gap-4 pt-4 border-t border-slate-100 ${isRTL ? 'flex-row-reverse' : ''}`}
                variants={itemVariants}
              >
                <ThemeToggle />
                <LanguageSelector />
                <Button
                  asChild
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                >
                  <Link to="/devis" onClick={() => setIsMenuOpen(false)}>
                    {t('header.quoteButton')}
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;