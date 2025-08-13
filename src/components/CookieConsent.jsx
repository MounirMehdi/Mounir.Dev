// src/components/CookieConsent.jsx
import React, { useEffect, useState } from 'react';
import { Cookie, X, Settings, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const COOKIE_KEY = 'user_cookie_consent';
const COOKIES_CONFIG = {
  performance: ['perf_cookie1', 'perf_cookie2'],
  analytics: ['ga', '_gid', '_gat'],
  marketing: ['fb_pixel', 'ads_cookie']
};

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [hasConsent, setHasConsent] = useState(false);
  const [hasChoice, setHasChoice] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  
  const [selectedPreferences, setSelectedPreferences] = useState({
    necessary: true,
    performance: false,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY);
    
    if (stored) {
      try {
        const consent = JSON.parse(stored);
        setHasConsent(consent?.accepted ?? false);
        setHasChoice(true);
        setShowBanner(false);
        
        // Mettre à jour les préférences si elles existent
        if (consent.preferences) {
          setSelectedPreferences(consent.preferences);
        }
        
        // Déclencher l'événement de mise à jour
        const event = new CustomEvent('cookieConsentUpdate', { detail: consent });
        window.dispatchEvent(event);
      } catch (error) {
        localStorage.removeItem(COOKIE_KEY);
        setShowBanner(true);
      }
    } else {
      setShowBanner(true);
    }
  }, []);

  // Créer/supprimer les cookies selon les préférences
  const manageCookies = (preferences) => {
    // Supprimer tous les cookies non-nécessaires d'abord
    Object.keys(COOKIES_CONFIG).forEach(category => {
      if (category !== 'necessary') {
        COOKIES_CONFIG[category].forEach(cookieName => {
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        });
      }
    });

    // Créer les cookies pour les catégories activées
    Object.keys(preferences).forEach(category => {
      if (preferences[category] && category !== 'necessary' && COOKIES_CONFIG[category]) {
        COOKIES_CONFIG[category].forEach(cookieName => {
          const expiration = new Date();
          expiration.setFullYear(expiration.getFullYear() + 1);
          document.cookie = `${cookieName}=active; expires=${expiration.toUTCString()}; path=/;`;
        });
      }
    });
  };

  const handleConsent = (type) => {
    let consentData;
    
    switch(type) {
      case 'all':
        consentData = {
          accepted: true,
          date: new Date().toISOString(),
          preferences: {
            necessary: true,
            performance: true,
            analytics: true,
            marketing: true
          }
        };
        break;
        
      case 'reject':
        consentData = {
          accepted: false,
          date: new Date().toISOString(),
          preferences: {
            necessary: true,
            performance: false,
            analytics: false,
            marketing: false
          }
        };
        break;
        
      case 'custom':
        consentData = {
          accepted: Object.values(selectedPreferences).some(v => v),
          date: new Date().toISOString(),
          preferences: selectedPreferences
        };
        break;
        
      default: // 'necessary'
        consentData = {
          accepted: true,
          date: new Date().toISOString(),
          preferences: {
            necessary: true,
            performance: false,
            analytics: false,
            marketing: false
          }
        };
    }
    
    localStorage.setItem(COOKIE_KEY, JSON.stringify(consentData));
    setShowBanner(false);
    setHasConsent(consentData.accepted);
    setHasChoice(true);
    
    // Gestion des cookies
    manageCookies(consentData.preferences);
    
    // Informer les autres composants
    const event = new CustomEvent('cookieConsentUpdate', { detail: consentData });
    window.dispatchEvent(event);
  };

  const reopenConsent = () => {
    setShowBanner(true);
    setShowDetails(false);
  };

  const togglePreference = (pref) => {
    if (pref !== 'necessary') {
      setSelectedPreferences(prev => ({
        ...prev,
        [pref]: !prev[pref]
      }));
    }
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // Variantes d'animation
  const bannerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: 100, transition: { duration: 0.3 } }
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  const detailVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { 
      height: "auto", 
      opacity: 1,
      transition: { 
        duration: 0.4,
        ease: "easeInOut"
      } 
    }
  };

  // Résumé des préférences pour l'affichage mobile
  const getSummary = () => {
    const activeCategories = [];
    
    if (selectedPreferences.performance) activeCategories.push('Performance');
    if (selectedPreferences.analytics) activeCategories.push('Analytique');
    if (selectedPreferences.marketing) activeCategories.push('Marketing');
    
    if (activeCategories.length === 0) return 'Nécessaires seulement';
    
    return `Nécessaires + ${activeCategories.join(', ')}`;
  };

  return (
    <>
      {hasChoice && !showBanner && (
        <motion.button
          onClick={reopenConsent}
          className="fixed bottom-6 left-6 sm:left-6 z-[9998] bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-full shadow-md p-3 hover:bg-gray-100 dark:hover:bg-slate-700 transition flex items-center justify-center"
          title="Modifier mes préférences de cookies"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          aria-label="Paramètres des cookies"
        >
          <Cookie className="text-amber-500" size={20} />
        </motion.button>
      )}

      <AnimatePresence>
        {showBanner && (
          <motion.div
            className="fixed bottom-0 sm:bottom-6 left-1/2 transform -translate-x-1/2 sm:translate-x-0 sm:left-6 z-[9999] bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 shadow-xl w-full max-w-[95vw] sm:max-w-md sm:w-[480px] p-4 sm:p-5 rounded-t-xl sm:rounded-xl backdrop-blur-sm"
            variants={bannerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center">
                <Cookie className="text-amber-500 mr-3" size={24} />
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
                  Votre vie privée nous importe
                </h2>
              </div>
              <button 
                onClick={() => handleConsent('necessary')}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Fermer"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">
              Nous utilisons des cookies pour améliorer votre expérience. 
              {isMobile ? ' ' : ' Vous pouvez choisir vos préférences ci-dessous.'}
            </p>

            {isMobile && !showDetails && (
              <div className="mb-3 p-2 bg-gray-50 dark:bg-slate-700/50 rounded text-xs">
                <p className="font-medium">Préférences actuelles:</p>
                <p className="mt-1">{getSummary()}</p>
              </div>
            )}

            <div className="mb-3 sm:mb-4">
              <button 
                onClick={toggleDetails}
                className="flex items-center text-xs sm:text-sm font-medium text-teal-600 dark:text-teal-400"
              >
                {showDetails ? (
                  <>
                    <span>Masquer</span>
                    <ChevronUp className="ml-1" size={16} />
                  </>
                ) : (
                  <>
                    <span>Détails</span>
                    <ChevronDown className="ml-1" size={16} />
                  </>
                )}
              </button>

              <AnimatePresence>
                {showDetails && (
                  <motion.div 
                    className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-slate-700/50 rounded-lg p-2 sm:p-3 overflow-hidden"
                    variants={detailVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-1 sm:mb-2">
                        <span className="font-medium text-sm">Cookies nécessaires</span>
                        <div className="bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-200 text-xs px-2 py-0.5 rounded">
                          Toujours activés
                        </div>
                      </div>
                      <p className="text-xs opacity-80">
                        Essentiels au fonctionnement du site
                      </p>
                    </div>

                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-1 sm:mb-2">
                        <span className="font-medium text-sm">Performance</span>
                        <button 
                          onClick={() => togglePreference('performance')}
                          className={`w-8 h-4 sm:w-10 sm:h-5 rounded-full relative ${selectedPreferences.performance ? 'bg-teal-500' : 'bg-gray-300 dark:bg-slate-600'} transition-colors`}
                          aria-label={selectedPreferences.performance ? "Désactiver" : "Activer"}
                        >
                          <span className={`absolute top-0.5 left-0.5 w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full transition-transform ${selectedPreferences.performance ? 'translate-x-4 sm:translate-x-5' : ''}`}></span>
                        </button>
                      </div>
                      <p className="text-xs opacity-80">
                        Améliorent les performances du site
                      </p>
                    </div>

                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-1 sm:mb-2">
                        <span className="font-medium text-sm">Analytique</span>
                        <button 
                          onClick={() => togglePreference('analytics')}
                          className={`w-8 h-4 sm:w-10 sm:h-5 rounded-full relative ${selectedPreferences.analytics ? 'bg-teal-500' : 'bg-gray-300 dark:bg-slate-600'} transition-colors`}
                          aria-label={selectedPreferences.analytics ? "Désactiver" : "Activer"}
                        >
                          <span className={`absolute top-0.5 left-0.5 w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full transition-transform ${selectedPreferences.analytics ? 'translate-x-4 sm:translate-x-5' : ''}`}></span>
                        </button>
                      </div>
                      <p className="text-xs opacity-80">
                        Comprennent votre utilisation du site
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1 sm:mb-2">
                        <span className="font-medium text-sm">Marketing</span>
                        <button 
                          onClick={() => togglePreference('marketing')}
                          className={`w-8 h-4 sm:w-10 sm:h-5 rounded-full relative ${selectedPreferences.marketing ? 'bg-teal-500' : 'bg-gray-300 dark:bg-slate-600'} transition-colors`}
                          aria-label={selectedPreferences.marketing ? "Désactiver" : "Activer"}
                        >
                          <span className={`absolute top-0.5 left-0.5 w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full transition-transform ${selectedPreferences.marketing ? 'translate-x-4 sm:translate-x-5' : ''}`}></span>
                        </button>
                      </div>
                      <p className="text-xs opacity-80">
                        Publicités personnalisées
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className={`flex flex-wrap gap-2 ${isMobile ? 'mt-2' : 'mt-4'}`}>
              {/*{!isMobile && (
                <motion.button
                  onClick={() => handleConsent('custom')}
                  className="flex items-center bg-white dark:bg-slate-700 border border-teal-600 dark:border-teal-500 text-teal-600 dark:text-teal-400 text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg flex-1 min-w-[120px]"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Settings className="mr-1 sm:mr-2" size={14} />
                  Personnaliser
                </motion.button>
              )}*/}
              
              <motion.button
                onClick={() => handleConsent('reject')}
                className={`bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg ${isMobile ? 'flex-1' : 'flex-1 min-w-[120px]'}`}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Refuser tout
              </motion.button>
              
              <motion.button
                onClick={() => handleConsent('all')}
                className={`bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg flex items-center justify-center ${isMobile ? 'flex-1' : 'flex-1 min-w-[120px]'}`}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {/*{!isMobile && <Check className="mr-1 sm:mr-2" size={14} />}*/}
                Accepter tout
              </motion.button>
            </div>

            <div className="mt-3 sm:mt-4 text-center">
              <Link
                to="/privacy"
                className="text-xs text-gray-500 dark:text-gray-400 hover:underline"
                onClick={() => setShowBanner(false)}
              >
                Politique de confidentialité
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CookieConsent;