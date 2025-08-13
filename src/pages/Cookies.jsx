import React, { useEffect } from "react";
import { Info, Cookie, Tag, Shield, Slash, Mail, Settings } from 'lucide-react';
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

  // Formater la date selon la locale
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(i18n.language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div
      className="bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 min-h-screen"
      dir={direction}
    >
      {/* En-tête amélioré */}
      <header className="pt-16 pb-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold mb-4 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t('cookies.hero.title')}
          </motion.h1>
          <p className="text-lg md:text-xl font-light text-center max-w-3xl mx-auto">
            {t('cookies.hero.subtitle')}
          </p>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Section 1 - Introduction */}
        <motion.section
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className={`text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400 ${textAlign}`}>
            {t('cookies.commitment.title')}
          </h2>
          <p className={`text-lg text-gray-600 dark:text-gray-300 mb-4 ${textAlign}`}>
            {t('cookies.commitment.text1')}
          </p>
          <p className={`text-lg text-gray-600 dark:text-gray-300 ${textAlign}`}>
            {t('cookies.commitment.text2')}
          </p>
        </motion.section>

        {/* Section 2 - Cookies */}
        <motion.section
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className={`flex items-start gap-4 mb-6 ${flexDirection}`}>
            <Cookie className="text-amber-500 mt-1 flex-shrink-0" size={28} />
            <div className={textAlign}>
              <h2 className="text-2xl font-bold">{t('cookies.cookiesSection.title')}</h2>
              <p className="text-gray-500 dark:text-gray-400">
                {t('cookies.cookiesSection.subtitle')}
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className={`text-xl font-semibold mb-3 flex items-center gap-2 ${flexDirection}`}>
                <Info className="text-blue-500" size={20} />
                {t('cookies.cookiesSection.whatAreCookies')}
              </h3>
              <p className={`text-gray-600 dark:text-gray-300 ${textAlign}`}>
                {t('cookies.cookiesSection.cookiesDefinition')}
              </p>
            </div>

            <div>
              <h3 className={`text-xl font-semibold mb-3 flex items-center gap-2 ${flexDirection}`}>
                <Tag className="text-purple-500" size={20} />
                {t('cookies.cookiesSection.typesTitle')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-700 dark:text-blue-300">
                    {t('cookies.cookiesSection.essential.title')}
                  </h4>
                  <p className={`text-sm text-gray-600 dark:text-gray-300 mt-2 ${textAlign}`}>
                    {t('cookies.cookiesSection.essential.description')}
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-bold text-green-700 dark:text-green-300">
                    {t('cookies.cookiesSection.performance.title')}
                  </h4>
                  <p className={`text-sm text-gray-600 dark:text-gray-300 mt-2 ${textAlign}`}>
                    {t('cookies.cookiesSection.performance.description')}
                  </p>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                  <h4 className="font-bold text-yellow-700 dark:text-yellow-300">
                    {t('cookies.cookiesSection.functional.title')}
                  </h4>
                  <p className={`text-sm text-gray-600 dark:text-gray-300 mt-2 ${textAlign}`}>
                    {t('cookies.cookiesSection.functional.description')}
                  </p>
                </div>
                <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg">
                  <h4 className="font-bold text-pink-700 dark:text-pink-300">
                    {t('cookies.cookiesSection.marketing.title')}
                  </h4>
                  <p className={`text-sm text-gray-600 dark:text-gray-300 mt-2 ${textAlign}`}>
                    {t('cookies.cookiesSection.marketing.description')}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className={`text-xl font-semibold mb-3 flex items-center gap-2 ${flexDirection}`}>
                <Shield className="text-green-500" size={20} />
                {t('cookies.cookiesSection.management.title')}
              </h3>
              <p className={`text-gray-600 dark:text-gray-300 mb-4 ${textAlign}`}>
                {t('cookies.cookiesSection.management.text')}
              </p>
              <motion.button
                onClick={handleManagePreferences}
                className={`px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition flex items-center gap-2 ${flexDirection}`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Settings size={18} />
                {t('cookies.cookiesSection.management.button')}
              </motion.button>
            </div>
          </div>
        </motion.section>

        {/* Section 3 - Données personnelles */}
        <motion.section
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className={`flex items-start gap-4 mb-6 ${flexDirection}`}>
            <Info className="text-indigo-500 mt-1 flex-shrink-0" size={28} />
            <div className={textAlign}>
              <h2 className="text-2xl font-bold">{t('cookies.dataSection.title')}</h2>
              <p className="text-gray-500 dark:text-gray-400">
                {t('cookies.dataSection.subtitle')}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className={`text-xl font-semibold mb-3 ${textAlign}`}>
                {t('cookies.dataSection.collectedData')}
              </h3>
              <ul className={`list-disc ${isRTL ? 'list-inside pr-5' : 'list-inside pl-5'} space-y-2 text-gray-600 dark:text-gray-300`}>
                {t('cookies.dataSection.dataList', { returnObjects: true }).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className={`text-xl font-semibold mb-3 ${textAlign}`}>
                {t('cookies.dataSection.purposesTitle')}
              </h3>
              <ul className={`list-disc ${isRTL ? 'list-inside pr-5' : 'list-inside pl-5'} space-y-2 text-gray-600 dark:text-gray-300`}>
                {t('cookies.dataSection.purposesList', { returnObjects: true }).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className={`text-xl font-semibold mb-3 ${textAlign}`}>
                {t('cookies.dataSection.protectionTitle')}
              </h3>
              <p className={`text-gray-600 dark:text-gray-300 ${textAlign}`}>
                {t('cookies.dataSection.protectionText')}
              </p>
              <ul className={`list-disc ${isRTL ? 'list-inside pr-5' : 'list-inside pl-5'} mt-2 text-gray-600 dark:text-gray-300`}>
                {t('cookies.dataSection.protectionList', { returnObjects: true }).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Section 4 - Vos droits */}
        <motion.section
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className={`flex items-start gap-4 mb-6 ${flexDirection}`}>
            <Shield className="text-green-500 mt-1 flex-shrink-0" size={28} />
            <div className={textAlign}>
              <h2 className="text-2xl font-bold">{t('cookies.rightsSection.title')}</h2>
              <p className="text-gray-500 dark:text-gray-400">
                {t('cookies.rightsSection.subtitle')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`border-l-4 border-green-500 ${isRTL ? 'border-r-4 border-l-0 pr-4' : 'pl-4'} py-2`}>
              <h3 className={`font-bold text-lg ${textAlign}`}>
                {t('cookies.rightsSection.access.title')}
              </h3>
              <p className={`text-gray-600 dark:text-gray-300 mt-1 ${textAlign}`}>
                {t('cookies.rightsSection.access.description')}
              </p>
            </div>
            <div className={`border-l-4 border-green-500 ${isRTL ? 'border-r-4 border-l-0 pr-4' : 'pl-4'} py-2`}>
              <h3 className={`font-bold text-lg ${textAlign}`}>
                {t('cookies.rightsSection.rectification.title')}
              </h3>
              <p className={`text-gray-600 dark:text-gray-300 mt-1 ${textAlign}`}>
                {t('cookies.rightsSection.rectification.description')}
              </p>
            </div>
            <div className={`border-l-4 border-green-500 ${isRTL ? 'border-r-4 border-l-0 pr-4' : 'pl-4'} py-2`}>
              <h3 className={`font-bold text-lg ${textAlign}`}>
                {t('cookies.rightsSection.erasure.title')}
              </h3>
              <p className={`text-gray-600 dark:text-gray-300 mt-1 ${textAlign}`}>
                {t('cookies.rightsSection.erasure.description')}
              </p>
            </div>
            <div className={`border-l-4 border-green-500 ${isRTL ? 'border-r-4 border-l-0 pr-4' : 'pl-4'} py-2`}>
              <h3 className={`font-bold text-lg ${textAlign}`}>
                {t('cookies.rightsSection.objection.title')}
              </h3>
              <p className={`text-gray-600 dark:text-gray-300 mt-1 ${textAlign}`}>
                {t('cookies.rightsSection.objection.description')}
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className={`font-bold text-lg mb-2 ${textAlign}`}>
              {t('cookies.rightsSection.howToExercise')}
            </h3>
            <p className={`text-gray-600 dark:text-gray-300 ${textAlign}`}>
              {t('cookies.rightsSection.exerciseText')}
            </p>
          </div>
        </motion.section>

        {/* Section 5 - Désactivation cookies */}
        <motion.section
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className={`flex items-start gap-4 mb-6 ${flexDirection}`}>
            <Slash className="text-red-500 mt-1 flex-shrink-0" size={28} />
            <div className={textAlign}>
              <h2 className="text-2xl font-bold">{t('cookies.disableSection.title')}</h2>
              <p className="text-gray-500 dark:text-gray-400">
                {t('cookies.disableSection.subtitle')}
              </p>
            </div>
          </div>

          <p className={`text-gray-600 dark:text-gray-300 mb-6 ${textAlign}`}>
            {t('cookies.disableSection.text')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="https://support.google.com/chrome/answer/95647"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
            >
              <div className={`font-medium flex items-center gap-2 ${flexDirection}`}>
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">G</div>
                {t('cookies.disableSection.browsers.chrome')}
              </div>
            </a>
            <a
              href="https://support.mozilla.org/fr/kb/activer-desactiver-cookies-preferences"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
            >
              <div className={`font-medium flex items-center gap-2 ${flexDirection}`}>
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white">M</div>
                {t('cookies.disableSection.browsers.firefox')}
              </div>
            </a>
            <a
              href="https://support.apple.com/fr-fr/HT201265"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
            >
              <div className={`font-medium flex items-center gap-2 ${flexDirection}`}>
                <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white">S</div>
                {t('cookies.disableSection.browsers.safari')}
              </div>
            </a>
            <a
              href="https://support.microsoft.com/fr-fr/help/17442"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
            >
              <div className={`font-medium flex items-center gap-2 ${flexDirection}`}>
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white">E</div>
                {t('cookies.disableSection.browsers.edge')}
              </div>
            </a>
          </div>
        </motion.section>

        {/* Section 6 - Contact */}
        <motion.section
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className={`flex items-start gap-4 mb-6 ${flexDirection}`}>
            <Mail className="text-blue-500 mt-1 flex-shrink-0" size={28} />
            <div className={textAlign}>
              <h2 className="text-2xl font-bold">{t('cookies.contactSection.title')}</h2>
              <p className="text-gray-500 dark:text-gray-400">
                {t('cookies.contactSection.subtitle')}
              </p>
            </div>
          </div>

          <div className={`space-y-4 text-gray-600 dark:text-gray-300 ${textAlign}`}>
            <p>
              {t('cookies.contactSection.text')}
            </p>
            
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <p className="font-medium">{t('cookies.contactSection.dpoName')}</p>
              <p>{t('cookies.contactSection.dpoRole')}</p>
              <p className="mt-2">
                Email: <a href={`mailto:${t('cookies.contactSection.email')}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                  {t('cookies.contactSection.email')}
                </a>
              </p>
              <p>
                {t('cookies.contactSection.phone')}: <a href={`tel:${t('cookies.contactSection.phone')}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                  {t('cookies.contactSection.phone')}
                </a>
              </p>
            </div>
            
            <p>
              {t('cookies.contactSection.mailingAddress')}
            </p>
            <address className="not-italic bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              {t('cookies.contactSection.address', { returnObjects: true }).map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < t('cookies.contactSection.address', { returnObjects: true }).length - 1 && <br />}
                </React.Fragment>
              ))}
            </address>
          </div>
        </motion.section>
      </main>

      {/* Pied de page */}
      <footer className="py-8 border-t border-gray-200 dark:border-gray-800">
        <div className={`max-w-4xl mx-auto px-4 text-center text-gray-500 dark:text-gray-400 ${textAlign}`}>
          <p>{t('cookies.lastUpdated')} {formatDate(new Date())}</p>
        </div>
      </footer>
    </div>
  );
};

export default Privacy;