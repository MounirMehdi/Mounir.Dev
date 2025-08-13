import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Github, Linkedin, Mail, Phone, MapPin, Send, ChevronUp, 
  MessageCircle, Briefcase, Globe, Facebook, Instagram, Video
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  // Déterminer la direction du texte en fonction de la langue
  const isRTL = i18n.language === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';
  const textAlign = isRTL ? 'text-right' : 'text-left';

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Plateformes de freelance
  const freelancePlatforms = [
    { 
      name: t('footer.freelancePlatforms.fiverr'),
      icon: <Globe size={18} className="text-green-500" />,
      href: "https://fiverr.com/yourprofile",
      color: "hover:text-green-400"
    },
    { 
      name: t('footer.freelancePlatforms.upwork'),
      icon: <Briefcase size={18} className="text-emerald-500" />,
      href: "https://upwork.com/yourprofile",
      color: "hover:text-emerald-400"
    },
    { 
      name: t('footer.freelancePlatforms.freelance'),
      icon: <Briefcase size={18} className="text-blue-500" />,
      href: "https://freelance.com/yourprofile",
      color: "hover:text-blue-400"
    }
  ];

  // Réseaux sociaux
  const socialNetworks = [
    { 
      name: t('footer.socialNetworks.email'),
      icon: <Mail size={18} className="text-red-500" />,
      href: "mailto:mounir8mehdi@gmail.com",
      color: "hover:text-red-400"
    },
    { 
      name: t('footer.socialNetworks.linkedin'),
      icon: <Linkedin size={18} className="text-blue-400" />,
      href: "https://linkedin.com/in/mounir-mehdi",
      color: "hover:text-blue-300"
    },
    { 
      name: t('footer.socialNetworks.facebook'),
      icon: <Facebook size={18} className="text-blue-600" />,
      href: "https://facebook.com/yourpage",
      color: "hover:text-blue-400"
    },
    { 
      name: t('footer.socialNetworks.tiktok'),
      icon: <Video size={18} className="text-black dark:text-white" />,
      href: "https://tiktok.com/@yourprofile",
      color: "hover:text-gray-400 dark:hover:text-gray-300"
    },
    { 
      name: t('footer.socialNetworks.instagram'),
      icon: <Instagram size={18} className="text-pink-500" />,
      href: "https://instagram.com/yourprofile",
      color: "hover:text-pink-400"
    }
  ];

  return (
    <footer 
      className="bg-gradient-to-b from-slate-900 to-slate-950 text-white pt-16 pb-2"
      dir={direction}
    >
      <div className="container mx-auto px-4">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 ${textAlign}`}>
          {/* Brand & Description */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center text-2xl font-bold"
                dir="ltr"
              >
                <span className="text-teal-400 font-bold">&lt;</span>
                <span className="text-white">MM.Dev</span>
                <span className="text-teal-400 font-bold">/&gt;</span>
              </motion.div>
            </Link>
            
            <p className="text-slate-300 mb-6 leading-relaxed max-w-md">
              {t('footer.description')}
            </p>
            
            {/* Newsletter */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4">{t('footer.newsletterTitle')}</h4>
              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.emailPlaceholder')}
                  className="w-full py-3 px-4 bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 pr-12"
                  required
                />
                <motion.button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-teal-600 p-2 rounded-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={20} />
                </motion.button>
              </form>
              
              <AnimatePresence>
                {isSubscribed && (
                  <motion.p 
                    className="mt-2 text-teal-400 text-sm"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {t('footer.subscriptionSuccess')}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-4 pb-2 border-b border-slate-700">
              {t('footer.navigationTitle')}
            </h4>
            <ul className="space-y-3">
              {t('footer.navigationItems', { returnObjects: true }).map((item, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: isRTL ? -5 : 5 }}
                >
                  <Link 
                    to={item.path} 
                    className="text-slate-300 hover:text-teal-400 transition-colors flex items-center group"
                  >
                    <span className={`w-2 h-2 bg-teal-500 rounded-full ${isRTL ? 'ml-3' : 'mr-3'} opacity-0 group-hover:opacity-100 transition-opacity`}></span>
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4 pb-2 border-b border-slate-700">
              {t('footer.legalTitle')}
            </h4>
            <ul className="space-y-3">
              {t('footer.legalItems', { returnObjects: true }).map((item, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: isRTL ? -5 : 5 }}
                >
                  <Link 
                    to={item.path} 
                    className="text-slate-300 hover:text-teal-400 transition-colors flex items-center group"
                  >
                    <span className={`w-2 h-2 bg-teal-500 rounded-full ${isRTL ? 'ml-3' : 'mr-3'} opacity-0 group-hover:opacity-100 transition-opacity`}></span>
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 pb-2 border-b border-slate-700">
              {t('footer.contactTitle')}
            </h4>
            
            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              {[
                { 
                  name: t('footer.socialNetworks.whatsapp'),
                  icon: <MessageCircle size={18} className="text-green-500" />,
                  href: "https://wa.me/yournumber",
                  color: "hover:text-green-400"
                },
                ...socialNetworks
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800 p-3 rounded-full text-slate-300 transition-colors"
                  whileHover={{ 
                    y: -5, 
                    backgroundColor: "#0e7490",
                    scale: 1.1
                  }}
                  aria-label={social.label || social.name}
                >
                  <div className="flex items-center">
                    {social.icon}
                  </div>
                </motion.a>
              ))}
            </div>

            <h4 className="text-lg font-semibold mt-8 mb-4 pb-2 border-b border-slate-700">
              {t('footer.platformsTitle')}
            </h4>
            <ul className="space-y-3">
              {freelancePlatforms.map((platform, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: isRTL ? -5 : 5 }}
                >
                  <a 
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-teal-400 transition-colors flex items-center group"
                  >
                    <span className={`w-2 h-2 bg-teal-500 rounded-full ${isRTL ? 'ml-3' : 'mr-3'} opacity-0 group-hover:opacity-100 transition-opacity`}></span>
                    <span className="flex items-center">
                      {platform.icon}
                      <span className={isRTL ? 'mr-2' : 'ml-2'}>{platform.name}</span>
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 mt-8 pt-2 text-center">
          <p className="text-slate-400">
            © {new Date().getFullYear()} <Link to="/">MM.Dev</Link> | {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;