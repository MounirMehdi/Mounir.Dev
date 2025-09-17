import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Github, Linkedin, Mail, Phone, MapPin, Send, ChevronUp,
  MessageCircle, Briefcase, Globe, Facebook, Instagram, Video
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import logo from '@/assets/logo/MMD_business_card.png';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const isRTL = i18n.language === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';
  const textAlign = isRTL ? 'text-right' : 'text-left';

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => setIsSubscribed(false), 3000);
  }, []);

  const copyToClipboard = useCallback((text) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }, []);

  const freelancePlatforms = [
    {
      name: t('footer.freelancePlatforms.fiverr'),
      icon: <Globe size={18} className="text-[#41ADE8]" />,
      href: "https://fiverr.com/yourprofile",
      color: "hover:text-[#41ADE8]"
    },
    {
      name: t('footer.freelancePlatforms.upwork'),
      icon: <Briefcase size={18} className="text-[#41ADE8]" />,
      href: "https://upwork.com/yourprofile",
      color: "hover:text-[#41ADE8]"
    },
    {
      name: t('footer.freelancePlatforms.freelance'),
      icon: <Briefcase size={18} className="text-[#41ADE8]" />,
      href: "https://freelance.com/yourprofile",
      color: "hover:text-[#41ADE8]"
    }
  ];

  const socialNetworks = [
    {
      name: t('footer.socialNetworks.email'),
      icon: <Mail size={18} className="text-[#41ADE8]" />,
      href: "mailto:mounir.mehdi.dev@gmail.com",
      color: "hover:text-[#41ADE8]"
    },
    {
      name: t('footer.socialNetworks.linkedin'),
      icon: <Linkedin size={18} className="text-[#41ADE8]" />,
      href: "https://linkedin.com/in/mounir-mehdi",
      color: "hover:text-[#41ADE8]"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <footer
      className="relative bg-gradient-to-b from-[#031A3D] via-[#031A3Dff] to-[#055BA4ff] text-white pt-24 pb-2 overflow-hidden"
      dir={direction}
    >
      {/* Wave divider */}
      <div className="absolute top-0 left-0 w-full h-24 -translate-y-1/2">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,74.7C1120,75,1280,53,1360,42.7L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            className="text-[#031A3D]"
          ></path>
        </svg>
      </div>

      {/* Neon glow effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-[#055BA4]/20 to-[#41ADE8]/20"></div>
        <div className="absolute top-0 left-1/4 w-1/3 h-1/3 bg-[#41ADE8]/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 ${textAlign}`}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Brand & Description */}
          <motion.div className="lg:col-span-2" variants={item}>
            <Link to="/" className="inline-block mb-6" aria-label="Home">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3"
              >
                <img
                  src={logo}
                  alt="MM.Dev Logo"
                  className="h-10 w-auto"
                />
                <span className="font-bold text-xl text-white">MM.dev</span>
              </motion.div>
            </Link>

            <p className="text-slate-100 mb-6 leading-relaxed max-w-md">
              {t('footer.description')}
            </p>

            {/* Newsletter */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-white">
                {t('footer.newsletterTitle')}
              </h4>
              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.emailPlaceholder')}
                  className="w-full py-3 px-4 bg-white/10 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-[#41ADE8] pr-12 border border-white/20 shadow-lg"
                  required
                  aria-label={t('footer.emailPlaceholder')}
                />
                <motion.button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#055BA4] p-2 rounded-lg shadow-lg"
                  whileHover={{ scale: 1.1, backgroundColor: "#054A85" }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={t('footer.subscribeButton')}
                >
                  <Send size={20} className="text-white" />
                </motion.button>
              </form>

              <AnimatePresence>
                {isSubscribed && (
                  <motion.p
                    className="mt-2 text-[#41ADE8] text-sm"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {t('footer.subscriptionSuccess')}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={item}>
            <h4 className="text-lg font-semibold mb-4 pb-2 border-b border-white/20 text-white">
              {t('footer.navigationTitle')}
            </h4>
            <ul className="space-y-3">
              {t('footer.navigationItems', { returnObjects: true }).map((item, index) => (
                <motion.li
                  key={index}
                  variants={item}
                  whileHover={{ x: isRTL ? -5 : 5 }}
                >
                  <Link
                    to={item.path}
                    className="text-slate-100 hover:text-[#41ADE8] transition-colors flex items-center group"
                    aria-label={item.name}
                  >
                    <span className={`w-2 h-2 bg-[#41ADE8] rounded-full ${isRTL ? 'ml-3' : 'mr-3'} opacity-0 group-hover:opacity-100 transition-opacity`}></span>
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div variants={item}>
            <h4 className="text-lg font-semibold mb-4 pb-2 border-b border-white/20 text-white">
              {t('footer.legalTitle')}
            </h4>
            <ul className="space-y-3">
              {t('footer.legalItems', { returnObjects: true }).map((item, index) => (
                <motion.li
                  key={index}
                  variants={item}
                  whileHover={{ x: isRTL ? -5 : 5 }}
                >
                  <Link
                    to={item.path}
                    className="text-slate-100 hover:text-[#41ADE8] transition-colors flex items-center group"
                    aria-label={item.name}
                  >
                    <span className={`w-2 h-2 bg-[#41ADE8] rounded-full ${isRTL ? 'ml-3' : 'mr-3'} opacity-0 group-hover:opacity-100 transition-opacity`}></span>
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={item}>
            <h4 className="text-lg font-semibold mb-4 pb-2 border-b border-white/20 text-white">
              {t('footer.contactTitle')}
            </h4>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3 mb-6">
              {[
                {
                  name: t('footer.socialNetworks.whatsapp'),
                  icon: <MessageCircle size={18} className="text-[#41ADE8]" />,
                  href: "https://wa.me/0021366090610",
                  color: "hover:text-[#41ADE8]",
                  label: t('footer.socialNetworks.whatsappLabel')
                },
                ...socialNetworks
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="bg-white/10 backdrop-blur-sm p-3 rounded-full text-slate-100 transition-all shadow-md hover:shadow-[#41ADE8]/20"
                  whileHover={{
                    y: -5,
                    scale: 1.1,
                    backgroundColor: "rgba(65, 173, 232, 0.3)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label || social.name}
                >
                  <div className="flex items-center">
                    {social.icon}
                  </div>
                </motion.a>
              ))}
            </div>

            {/* <h4 className="text-lg font-semibold mt-8 mb-4 pb-2 border-b border-white/20 text-white">
              {t('footer.platformsTitle')}
            </h4>
            <ul className="space-y-3">
              {freelancePlatforms.map((platform, index) => (
                <motion.li 
                  key={index}
                  variants={item}
                  whileHover={{ x: isRTL ? -5 : 5 }}
                >
                  <a 
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-slate-100 hover:text-[#41ADE8] transition-colors flex items-center group"
                    aria-label={platform.name}
                  >
                    <span className={`w-2 h-2 bg-[#41ADE8] rounded-full ${isRTL ? 'ml-3' : 'mr-3'} opacity-0 group-hover:opacity-100 transition-opacity`}></span>
                    <span className="flex items-center">
                      {platform.icon}
                      <span className={isRTL ? 'mr-2' : 'ml-2'}>{platform.name}</span>
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>*/}
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-6 pb-2 text-center">
          <p className="text-slate-100 text-sm">
            © {new Date().getFullYear()} <Link to="/" className="hover:text-[#41ADE8] transition-colors">MM.Dev</Link> | {t('footer.copyright')}
          </p>
        </div>
      </div>

      {/* Copied notification */}
      <AnimatePresence>
        {isCopied && (
          <motion.div
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-[#055BA4] text-white px-4 py-2 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {t('footer.copiedMessage')}
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default React.memo(Footer);