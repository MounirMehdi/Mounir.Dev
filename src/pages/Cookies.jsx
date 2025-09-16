import React, { useEffect } from "react";
import { Info, Cookie, Shield, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from "react-i18next";

const Privacy = () => {
  const { t, i18n } = useTranslation('translation');
  
  // Gestion de la réouverture des préférences cookies
  const handleManagePreferences = () => {
    window.dispatchEvent(new Event('reopen-cookie-consent'));
  };

  // Animation des sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Effet pour le défilement fluide
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Déterminer la direction
  const isRTL = i18n.language === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';
  const textAlign = isRTL ? 'text-right' : 'text-left';
  const flexDirection = isRTL ? 'flex-row-reverse' : 'flex-row';

  return (
    <div
      className="bg-white text-[#031A3D] dark:bg-[#031A3D] dark:text-gray-100 min-h-screen"
      dir={direction}
    >
      {/* En-tête simplifié */}
      <header className="pt-16 pb-12 bg-gradient-to-r from-[#41ADE8]/20 to-[#055BA4]/20 dark:from-[#031A3D] dark:to-[#031A3D]/90">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold mb-4 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t('cookies.hero.title')}
          </motion.h1>
          <p className="text-lg md:text-xl font-light text-center max-w-3xl mx-auto text-[#055BA4] dark:text-gray-300">
            {t('cookies.hero.subtitle')}
          </p>
        </div>
      </header>

      {/* Contenu principal simplifié */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Section 1 - Introduction simplifiée */}
        <motion.section
          className="bg-white dark:bg-[#031A3D]/80 p-6 rounded-xl shadow-sm border border-[#41ADE8]/10"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className={`text-3xl font-bold mb-6 text-[#055BA4] dark:text-[#41ADE8] ${textAlign}`}>
            {t('cookies.commitment.title')}
          </h2>
          <p className={`text-lg text-[#055BA4] dark:text-gray-300 mb-4 ${textAlign}`}>
            {t('cookies.commitment.text1')}
          </p>
          <p className={`text-lg text-[#055BA4] dark:text-gray-300 ${textAlign}`}>
            {t('cookies.commitment.text2')}
          </p>
        </motion.section>

        {/* Section 2 - Cookies simplifiée */}
        <motion.section
          className="bg-white dark:bg-[#031A3D]/80 p-6 rounded-xl shadow-sm border border-[#41ADE8]/10"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className={`flex items-start gap-4 mb-6 ${flexDirection}`}>
            <Cookie className="text-[#055BA4] dark:text-[#41ADE8] mt-1 flex-shrink-0" size={28} />
            <div className={textAlign}>
              <h2 className="text-2xl font-bold text-[#031A3D] dark:text-white">{t('cookies.cookiesSection.title')}</h2>
              <p className="text-[#055BA4] dark:text-gray-400">
                {t('cookies.cookiesSection.subtitle')}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className={`text-xl font-semibold mb-3 flex items-center gap-2 ${flexDirection}`}>
                <Info className="text-[#055BA4] dark:text-[#41ADE8]" size={20} />
                {t('cookies.cookiesSection.whatAreCookies')}
              </h3>
              <p className={`text-[#055BA4] dark:text-gray-300 ${textAlign}`}>
                {t('cookies.cookiesSection.cookiesDefinition')}
              </p>
            </div>

            <div>
              <h3 className={`text-xl font-semibold mb-3 flex items-center gap-2 ${flexDirection}`}>
                <Shield className="text-[#055BA4] dark:text-[#41ADE8]" size={20} />
                {t('cookies.cookiesSection.management.title')}
              </h3>
              <p className={`text-[#055BA4] dark:text-gray-300 mb-4 ${textAlign}`}>
                {t('cookies.cookiesSection.management.text')}
              </p>
              <motion.button
                onClick={handleManagePreferences}
                className={`px-5 py-3 bg-[#055BA4] hover:bg-[#054A85] text-white font-medium rounded-lg transition flex items-center gap-2 ${flexDirection}`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('cookies.cookiesSection.management.button')}
              </motion.button>
            </div>
          </div>
        </motion.section>

        {/* Section 3 - Données personnelles simplifiée */}
        <motion.section
          className="bg-white dark:bg-[#031A3D]/80 p-6 rounded-xl shadow-sm border border-[#41ADE8]/10"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className={`flex items-start gap-4 mb-6 ${flexDirection}`}>
            <Info className="text-[#055BA4] dark:text-[#41ADE8] mt-1 flex-shrink-0" size={28} />
            <div className={textAlign}>
              <h2 className="text-2xl font-bold text-[#031A3D] dark:text-white">{t('cookies.dataSection.title')}</h2>
              <p className="text-[#055BA4] dark:text-gray-400">
                {t('cookies.dataSection.subtitle')}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className={`text-xl font-semibold mb-3 ${textAlign} text-[#031A3D] dark:text-white`}>
                {t('cookies.dataSection.collectedData')}
              </h3>
              <p className={`text-[#055BA4] dark:text-gray-300 ${textAlign}`}>
                {t('cookies.dataSection.simpleText')}
              </p>
            </div>

            <div>
              <h3 className={`text-xl font-semibold mb-3 ${textAlign} text-[#031A3D] dark:text-white`}>
                {t('cookies.dataSection.protectionTitle')}
              </h3>
              <p className={`text-[#055BA4] dark:text-gray-300 ${textAlign}`}>
                {t('cookies.dataSection.protectionSimpleText')}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Section 4 - Vos droits simplifiée */}
        <motion.section
          className="bg-white dark:bg-[#031A3D]/80 p-6 rounded-xl shadow-sm border border-[#41ADE8]/10"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className={`flex items-start gap-4 mb-6 ${flexDirection}`}>
            <Shield className="text-[#055BA4] dark:text-[#41ADE8] mt-1 flex-shrink-0" size={28} />
            <div className={textAlign}>
              <h2 className="text-2xl font-bold text-[#031A3D] dark:text-white">{t('cookies.rightsSection.title')}</h2>
              <p className="text-[#055BA4] dark:text-gray-400">
                {t('cookies.rightsSection.subtitle')}
              </p>
            </div>
          </div>

          <p className={`text-[#055BA4] dark:text-gray-300 mb-4 ${textAlign}`}>
            {t('cookies.rightsSection.simpleText')}
          </p>

          <div className="mt-6 p-4 bg-[#055BA4]/10 dark:bg-[#055BA4]/20 rounded-lg">
            <h3 className={`font-bold text-lg mb-2 text-[#031A3D] dark:text-white ${textAlign}`}>
              {t('cookies.rightsSection.howToExercise')}
            </h3>
            <p className={`text-[#055BA4] dark:text-gray-300 ${textAlign}`}>
              {t('cookies.rightsSection.exerciseSimpleText')}
            </p>
          </div>
        </motion.section>

        {/* Section 5 - Contact simplifiée */}
        <motion.section
          className="bg-white dark:bg-[#031A3D]/80 p-6 rounded-xl shadow-sm border border-[#41ADE8]/10"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className={`flex items-start gap-4 mb-6 ${flexDirection}`}>
            <Mail className="text-[#055BA4] dark:text-[#41ADE8] mt-1 flex-shrink-0" size={28} />
            <div className={textAlign}>
              <h2 className="text-2xl font-bold text-[#031A3D] dark:text-white">{t('cookies.contactSection.title')}</h2>
              <p className="text-[#055BA4] dark:text-gray-400">
                {t('cookies.contactSection.subtitle')}
              </p>
            </div>
          </div>

          <div className={`space-y-4 text-[#055BA4] dark:text-gray-300 ${textAlign}`}>
            <p>
              {t('cookies.contactSection.simpleText')}
            </p>
            
            <div className="bg-[#055BA4]/10 dark:bg-[#055BA4]/20 p-4 rounded-lg">
              <p className="font-medium text-[#031A3D] dark:text-white">{t('cookies.contactSection.name')}</p>
              <p className="mt-2">
                Email: <a href={`mailto:${t('cookies.contactSection.email')}`} className="text-[#055BA4] dark:text-[#41ADE8] hover:underline">
                  {t('cookies.contactSection.email')}
                </a>
              </p>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Pied de page simplifié */}
      <footer className="py-8 border-t border-[#41ADE8]/20 dark:border-[#055BA4]/30">
        <div className={`max-w-4xl mx-auto px-4 text-center text-[#055BA4] dark:text-gray-400 ${textAlign}`}>
          <p>{t('cookies.lastUpdated')} {new Date().toLocaleDateString(i18n.language)}</p>
        </div>
      </footer>
    </div>
  );
};

export default Privacy;