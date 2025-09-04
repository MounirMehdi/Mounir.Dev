import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Code,
  Smartphone,
  Palette,
  Search,
  Server,
  GraduationCap,
  ChevronRight,
  ChevronDown,
  FolderIcon,
  ArrowRight,
  User,
  Clock,
  MessageSquare,
  Globe,
  BarChart,
  Users,
  Shield,
  Rocket,
  Star,
  Calendar
} from "lucide-react";
import {
  FiCode,
  FiSmartphone,
  FiSearch,
  FiBarChart2,
  FiServer,
  FiLayers,
  FiCheckCircle,
  FiLayout,
  FiGrid,
  FiBarChart,
  FiArrowRight
} from 'react-icons/fi';
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import ProjectPopup from '../components/projects/ProjectPopup';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import BlogDetail from '../components/blogs/BlogDetail';

const FlipWords = ({ words, className, duration = 3000 }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words.length, duration]);

  return (
    <motion.span
      className={`inline-block ${className}`}
      key={currentIndex}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {words[currentIndex]}
    </motion.span>
  );
};

const AnimatedSection = ({ children, className = "", delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Accueil = () => {
  const { t, i18n } = useTranslation('translation');
  const [activeService, setActiveService] = useState(null);

  const isRTL = i18n.language === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';
  const textAlign = isRTL ? 'text-right' : 'text-left';
  const [selectedPost, setSelectedPost] = useState(null);

  // Fonction pour ouvrir le détail d'un article
  const openPostDetail = (post) => {
    setSelectedPost(post);
    document.body.style.overflow = 'hidden';
  };

  // Fonction pour fermer le détail
  const closePostDetail = () => {
    setSelectedPost(null);
    document.body.style.overflow = 'auto';
  };

  // Fonction de formatage de date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(i18n.language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Récupérer les catégories
  const blogData = t('blog', { returnObjects: true });
  const { categories } = blogData;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPosts, setCurrentPosts] = useState([]);

  // Fonction pour obtenir 3 articles aléatoires
  const getRandomPosts = () => {
    const shuffled = [...blogPosts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  // Initialisation des articles aléatoires
  useEffect(() => {
    setCurrentPosts(getRandomPosts());
  }, []);

  // Rotation automatique toutes les 10 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => prev + 1);
      setCurrentPosts(getRandomPosts());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const skills = [
    {
      icon: Code,
      name: t('home.skills.frontend.name'),
      tech: t('home.skills.frontend.tech')
    },
    {
      icon: Server,
      name: t('home.skills.backend.name'),
      tech: t('home.skills.backend.tech')
    },
    {
      icon: Palette,
      name: t('home.skills.design.name'),
      tech: t('home.skills.design.tech')
    },
    {
      icon: Search,
      name: t('home.skills.seo.name'),
      tech: t('home.skills.seo.tech')
    },
    {
      icon: Smartphone,
      name: t('home.skills.mobile.name'),
      tech: t('home.skills.mobile.tech')
    },
    {
      icon: GraduationCap,
      name: t('home.skills.methodology.name'),
      tech: t('home.skills.methodology.tech')
    },
  ];

  const blogPosts = t('blogPosts', { returnObjects: true });

  const slides = [
    {
      id: 1,
      title: t('home.slides.slide1.title'),
      description: t('home.slides.slide1.description'),
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&w=800&auto=format&fit=crop",
      alt: t('home.slides.slide1.alt')
    },
    {
      id: 2,
      title: t('home.slides.slide2.title'),
      description: t('home.slides.slide2.description'),
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&w=800&auto=format&fit=crop",
      alt: t('home.slides.slide2.alt')
    },
    {
      id: 3,
      title: t('home.slides.slide3.title'),
      description: t('home.slides.slide3.description'),
      image: "https://images.pexels.com/photos-267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=1400",
      alt: t('home.slides.slide3.alt')
    },
    {
      id: 4,
      title: t('home.slides.slide4.title'),
      description: t('home.slides.slide4.description'),
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600",
      alt: t('home.slides.slide4.alt')
    },
    {
      id: 5,
      title: t('home.slides.slide5.title'),
      description: t('home.slides.slide5.description'),
      image: "https://images.pexels.com/photos-1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1400",
      alt: t('home.slides.slide5.alt')
    },
    {
      id: 6,
      title: t('home.slides.slide6.title'),
      description: t('home.slides.slide6.description'),
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1600",
      alt: t('home.slides.slide6.alt')
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  // Services data
  const services = [
    {
      icon: FiLayout,
      title: t('home.services.website.title'),
      description: t('home.services.website.description')
    },
    {
      icon: FiGrid,
      title: t('home.services.webapp.title'),
      description: t('home.services.webapp.description')
    },
    {
      icon: FiSmartphone,
      title: t('home.services.mobile.title'),
      description: t('home.services.mobile.description')
    },
    {
      icon: FiBarChart,
      title: t('home.services.marketing.title'),
      description: t('home.services.marketing.description')
    }
  ];

  // Configuration du slider avec autoplay et loop
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000 }) // 4 secondes
  ]);

  return (
    <div
      className="bg-gradient-to-b from-slate-50 to-slate-100 dark:from-[#031A3D] dark:to-[#031A3D]/90"
      dir={direction}
    >
      {/* Section Hero - Arrière-plan avec dégradé Oxford Blue */}
      <section className="pt-30 lg:pt-30 pb-16 lg:pb-20 min-h-[650px] md:max-h-[1200px] max-h-[990px] lg:max-h-[690px] flex items-center overflow-hidden relative">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-cover bg-center" style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')",
            backgroundPosition: "center center",
            backgroundAttachment: 'fixed'
          }}>
            <div className="absolute inset-0 bg-gradient-to-r from-[#031A3D]/90 to-[#055BA4]/80"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              className="space-y-6 md:space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-4 md:space-y-6">
                <motion.div
                  className="inline-block px-4 py-1 bg-gradient-to-r from-[#055BA4] to-[#41ADE8] text-white rounded-full text-sm font-medium backdrop-blur-sm shadow-[#055BA4]/20 shadow-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {t('home.hero.welcome')}
                </motion.div>

                <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight ${textAlign}`}>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {t('home.hero.title1')}
                  </motion.span>
                  <br />
                  <FlipWords
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#41ADE8] block mt-2"
                    words={t('home.hero.flipWords', { returnObjects: true })}
                    duration={3000}
                  />
                </h1>

                <motion.p
                  className={`text-base md:text-lg text-slate-200 leading-relaxed max-w-2xl ${isRTL ? 'text-right' : 'text-left'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {t('home.hero.description')}
                </motion.p>
              </div>

              {/* Boutons en colonne sur mobile, centrés */}
              <motion.div
                className={`flex flex-col sm:flex-row gap-3 sm:gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''} justify-center sm:justify-start items-center`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-[#055BA4] to-[#41ADE8] hover:from-[#054A85] hover:to-[#2E8BC0] text-white shadow-lg shadow-[#055BA4]/30 backdrop-blur-sm w-full sm:w-auto"
                >
                  <Link to="/projects">
                    {t('home.hero.button1')}
                    <ArrowRight className={`ml-2 ${isRTL ? 'transform rotate-180' : ''}`} size={20} />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm w-full sm:w-auto"
                >
                  <Link to="/devis">{t('home.hero.button2')}</Link>
                </Button>
              </motion.div>

              <motion.div
                className="grid grid-cols-3 gap-3 md:gap-4 mt-6 md:mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {t('home.hero.stats', { returnObjects: true }).map((stat, index) => (
                  <motion.div
                    key={index}
                    className="p-3 md:p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 text-center"
                    whileHover={{ y: -5 }}
                  >
                    <div className="text-xl md:text-2xl font-bold text-[#41ADE8]">{stat.value}</div>
                    <div className="text-xs md:text-sm text-slate-200 mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <motion.div
              className="relative mt-10 lg:mt-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              dir="ltr"
            >
              <div className="relative z-10 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-3 md:p-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#055BA4]/5 to-[#41ADE8]/5 dark:from-[#055BA4]/10 dark:to-[#41ADE8]/10 z-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#031A3D]/80 to-[#055BA4]/60"></div>
                </div>

                <div className="relative z-10 rounded-xl overflow-hidden">
                  {/* Slider responsive avec hauteur variable */}
                  <div className="embla overflow-hidden h-[300px] sm:h-[350px] md:h-96" ref={emblaRef}>
                    <div className="embla__container flex h-full">
                      {slides.map((slide) => (
                        <div className="embla__slide flex-[0_0_100%] min-w-0 relative" key={slide.id}>
                          <img
                            src={slide.image}
                            alt={slide.alt}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-[#031A3D]/30 to-[#055BA4]/40"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#055BA4] rounded-full blur-2xl opacity-30 dark:opacity-20"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#41ADE8] rounded-full blur-2xl opacity-30 dark:opacity-20"></div>
              </div>

              <div className="absolute -top-4 -right-4 w-full h-full bg-[#055BA4]/10 dark:bg-[#055BA4]/20 rounded-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Compétences - Arrière-plan avec dégradé Oxford Blue */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-slate-50 via-[#031A3D]/10 to-slate-100 dark:from-[#031A3D] dark:via-[#031A3D]/80 dark:to-[#031A3D]/90">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-12">
            <motion.h2
              className={`text-3xl font-bold text-slate-800 dark:text-white mb-4`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {t('home.skills.title')} <span className="text-[#055BA4] dark:text-[#41ADE8]">{t('home.skills.titleHighlight')}</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%" }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex justify-center mb-6"
            >
              <div className="h-1 bg-gradient-to-r from-transparent via-[#055BA4] to-transparent w-48"></div>
            </motion.div>
            <motion.p
              className={`text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {t('home.skills.subtitle')}
            </motion.p>
          </div>

          {/* Cartes responsives avec hauteur fixe */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="h-full"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1
                }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="group h-full border border-slate-200 dark:border-gray-800 hover:border-[#055BA4] dark:hover:border-[#41ADE8] transition-all duration-300 bg-white/80 dark:bg-[#031A3D]/50 backdrop-blur-lg rounded-xl overflow-hidden p-5 hover:shadow-lg hover:-translate-y-1.5 hover:shadow-[#055BA4]/20 dark:hover:shadow-[#41ADE8]/30">
                  <motion.div
                    className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#055BA4]/10 to-[#41ADE8]/10 dark:from-[#055BA4]/30 dark:to-[#41ADE8]/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gradient-to-br group-hover:from-[#055BA4] group-hover:to-[#41ADE8] transition-all duration-300"
                    whileHover={{ rotate: 5, scale: 1.05 }}
                  >
                    <skill.icon
                      className="text-[#055BA4] dark:text-[#41ADE8] group-hover:text-white transition-colors duration-300"
                      size={24}
                    />
                  </motion.div>

                  <h3 className={`text-lg md:text-xl font-semibold text-slate-800 dark:text-white mb-2 text-center`}>
                    {skill.name}
                  </h3>

                  <div className="flex flex-wrap justify-center gap-2 mt-3">
                    {skill.tech.split(',').map((tech, i) => (
                      <motion.span
                        key={i}
                        className="px-2 py-1 text-xs font-medium bg-slate-100 dark:bg-[#055BA4]/20 text-slate-700 dark:text-slate-300 rounded-full"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: 0.3 + (i * 0.05),
                          duration: 0.3
                        }}
                      >
                        {tech.trim()}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Services - Arrière-plan avec dégradé Oxford Blue */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-slate-50 via-[#055BA4]/10 to-slate-100 dark:from-[#031A3D] dark:via-[#031A3D]/80 dark:to-[#031A3D]/90">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <motion.h2
              className={`text-3xl font-bold text-slate-800 dark:text-white mb-4`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {t('home.services.title')} <span className="text-[#055BA4] dark:text-[#41ADE8]">{t('home.services.titleHighlight')}</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%" }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex justify-center mb-6"
            >
              <div className="h-1 bg-gradient-to-r from-transparent via-[#055BA4] to-transparent w-48"></div>
            </motion.div>

            <motion.p
              className={`text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {t('home.services.subtitle')}
            </motion.p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="h-full"
                whileHover="hover"
              >
                <div className="group h-full bg-white dark:bg-[#031A3D]/30 backdrop-blur-sm border border-slate-200 dark:border-slate-700/60 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-[#055BA4]/50 dark:hover:border-[#41ADE8]/50 relative">
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#055BA4]/5 to-[#41ADE8]/5 dark:from-[#055BA4]/10 dark:to-[#41ADE8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 border border-slate-200 dark:border-slate-700/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <div className="relative z-10 p-5 md:p-6 h-full flex flex-col">
                    <div className="text-center mb-4">
                      <motion.div
                        className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#055BA4] to-[#41ADE8] rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:rotate-6 transition-transform duration-300"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                      >
                        <service.icon className="text-white text-xl md:text-2xl" />
                      </motion.div>
                      <motion.h3
                        className="text-lg md:text-xl font-bold text-slate-800 dark:text-white"
                        whileHover={{ color: "#055BA4" }}
                        transition={{ duration: 0.2 }}
                      >
                        {service.title}
                      </motion.h3>
                    </div>

                    <p className={`text-sm md:text-base text-slate-600 dark:text-slate-400 mb-4 text-center`}>
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-12 md:mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-[#055BA4] text-[#055BA4] dark:text-[#41ADE8] dark:border-[#41ADE8] hover:bg-[#055BA4]/10 dark:hover:bg-[#41ADE8]/20 font-medium group"
            >
              <Link to="/services">
                <span className="group-hover:translate-x-1 transition-transform">
                  {t('home.services.button')}
                </span>
                <FiArrowRight className={`ml-2 inline-block group-hover:translate-x-1 transition-transform ${isRTL ? 'transform rotate-180' : ''}`} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Section Projets - Arrière-plan avec dégradé Oxford Blue */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-slate-50 via-[#031A3D]/10 to-slate-100 dark:from-[#031A3D] dark:via-[#031A3D]/80 dark:to-[#031A3D]/90">
        <div className="container mx-auto px-4">
          <div className="text-center mb-5 md:mb-6">
            <motion.h2
              className={`text-3xl font-bold text-slate-800 dark:text-white mb-4`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {t('home.projects.title')} <span className="text-[#055BA4] dark:text-[#41ADE8]">{t('home.projects.titleHighlight')}</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%" }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex justify-center mb-6"
            >
              <div className="h-1 bg-gradient-to-r from-transparent via-[#055BA4] to-transparent w-48"></div>
            </motion.div>
            <motion.p
              className={`text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              {t('home.projects.subtitle')}
            </motion.p>
          </div>

          <ProjectPopup />

          <div className="text-center mt-3 md:mt-5">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-[#055BA4] text-[#055BA4] dark:text-[#41ADE8] dark:border-[#41ADE8] hover:bg-[#055BA4]/10 dark:hover:bg-[#41ADE8]/20 font-medium"
            >
              <Link to="/projects">
                {t('home.projects.button')}
                <ArrowRight className={`ml-2 ${isRTL ? 'transform rotate-180' : ''}`} size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Section Blog - Arrière-plan avec dégradé Oxford Blue */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-slate-50 via-[#055BA4]/10 to-slate-100 dark:from-[#031A3D] dark:via-[#031A3D]/80 dark:to-[#031A3D]/90">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-12">
            <motion.h2
              className={`text-3xl font-bold text-slate-800 dark:text-white mb-4`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {t('home.blog.title')} <span className="text-[#055BA4] dark:text-[#41ADE8]">{t('home.blog.titleHighlight')}</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%" }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex justify-center mb-6"
            >
              <div className="h-1 bg-gradient-to-r from-transparent via-[#055BA4] to-transparent w-48"></div>
            </motion.div>
            <motion.p
              className={`text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {t('home.blog.subtitle')}
            </motion.p>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.7 }}
              >
                {currentPosts.map((post, index) => (
                  <motion.div
                    key={`${currentIndex}-${post.id}`}
                    className="h-full cursor-pointer"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    onClick={() => openPostDetail(post)}
                  >
                    <div className="group h-full flex flex-col bg-white dark:bg-[#031A3D]/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-xl transition-all hover:shadow-[#055BA4]/20 dark:hover:shadow-[#41ADE8]/30">
                      <div className="p-5 md:p-6 flex-grow">
                        <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#055BA4]/10 to-[#41ADE8]/10 dark:from-[#055BA4] dark:to-[#41ADE8] text-[#055BA4] dark:text-[#41ADE8] rounded-full text-xs font-medium mb-3 md:mb-4">
                          {post.category}
                        </span>

                        <h3 className={`text-lg md:text-xl font-bold text-slate-800 dark:text-white mb-2 md:mb-3 group-hover:text-[#055BA4] dark:group-hover:text-[#41ADE8] transition-colors ${textAlign}`}>
                          {post.title}
                        </h3>

                        <p className={`text-sm md:text-base text-slate-600 dark:text-slate-400 mb-3 md:mb-4 ${textAlign}`}>
                          {post.excerpt}
                        </p>

                        <div className={`flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {post.readTime}
                          </span>
                        </div>
                      </div>

                      <div className="px-5 pb-5 md:px-6 md:pb-6 pt-0 mt-auto">
                        <Button
                          variant="link"
                          className={`w-full justify-center ${isRTL ? 'pr-0' : 'pl-0'} text-[#055BA4] dark:text-[#41ADE8] hover:no-underline group`}
                        >
                          <span className="group-hover:underline">{t('home.blog.readButton')}</span>
                          {isRTL ? (
                            <ArrowRight className="mr-1 transform rotate-180 group-hover:translate-x-1 transition-transform" size={16} />
                          ) : (
                            <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" size={16} />
                          )}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="text-center mt-10 md:mt-12">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-[#055BA4] text-[#055BA4] dark:text-[#41ADE8] dark:border-[#41ADE8] hover:bg-[#055BA4]/10 dark:hover:bg-[#41ADE8]/20 font-medium"
            >
              <Link to="/blog">
                {t('home.blog.button')}
                <ArrowRight className={`ml-2 ${isRTL ? 'transform rotate-180' : ''}`} size={20} />
              </Link>
            </Button>
          </div>
        </div>

        {/* Post Detail Modal */}
        {selectedPost && (
          <BlogDetail
            selectedPost={selectedPost}
            onClose={closePostDetail}
            t={t}
            formatDate={formatDate}
            isRTL={isRTL}
            categories={categories}
        style={{
            zIndex: 9999,
          }}
          />
        )}
      </section>

      {/* Section Process - Arrière-plan avec dégradé Oxford Blue */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-slate-50 via-[#031A3D]/10 to-slate-100 dark:from-[#031A3D] dark:via-[#031A3D]/80 dark:to-[#031A3D]/90">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-12">
            <motion.h2
              className={`text-3xl font-bold text-slate-800 dark:text-white mb-4`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {t('home.process.title')} <span className="text-[#055BA4] dark:text-[#41ADE8]">{t('home.process.titleHighlight')}</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%" }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex justify-center mb-6"
            >
              <div className="h-1 bg-gradient-to-r from-transparent via-[#055BA4] to-transparent w-48"></div>
            </motion.div>
            <motion.p
              className={`text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {t('home.process.subtitle')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {t('home.process.steps', { returnObjects: true }).map((step, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-[#031A3D]/50 backdrop-blur-sm p-5 md:p-6 rounded-xl border border-slate-200 dark:border-slate-700 text-center hover:shadow-lg hover:shadow-[#055BA4]/20 dark:hover:shadow-[#41ADE8]/30"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#055BA4]/10 to-[#41ADE8]/10 dark:from-[#055BA4]/30 dark:to-[#41ADE8]/20 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                  {step.icon === 'Users' && <Users className="text-[#055BA4] dark:text-[#41ADE8]" size={24} />}
                  {step.icon === 'Code' && <Code className="text-[#055BA4] dark:text-[#41ADE8]" size={24} />}
                  {step.icon === 'BarChart' && <BarChart className="text-[#055BA4] dark:text-[#41ADE8]" size={24} />}
                  {step.icon === 'Shield' && <Shield className="text-[#055BA4] dark:text-[#41ADE8]" size={24} />}
                </div>
                <span className="inline-block bg-gradient-to-r from-[#055BA4]/10 to-[#41ADE8]/10 dark:from-[#055BA4] dark:to-[#41ADE8] text-[#055BA4] dark:text-[#41ADE8] px-3 py-1 rounded-full text-xs md:text-sm font-medium mb-2 md:mb-3">
                  {step.step}
                </span>
                <h3 className={`text-lg md:text-xl font-semibold text-slate-800 dark:text-white mb-2 ${textAlign}`}>{step.title}</h3>
                <p className={`text-sm md:text-base text-slate-600 dark:text-slate-400 ${textAlign}`}>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section CTA - Dégradé Lapis Lazuli et Picton Blue */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-[#055BA4] to-[#41ADE8] dark:from-[#055BA4] dark:to-[#41ADE8] text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-1/2 -left-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle,var(--tw-gradient-stops))] from-[#055BA4]/10 to-transparent"></div>
          <div className="absolute -bottom-1/3 -right-1/4 w-[120%] h-[120%] bg-[radial-gradient(circle,var(--tw-gradient-stops))] from-[#41ADE8]/10 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <AnimatedSection>
            <motion.h2
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {t('home.cta.title')}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%" }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex justify-center mb-6"
            >
              <div className="h-1 bg-gradient-to-r from-transparent via-white to-transparent w-48"></div>
            </motion.div>
            <motion.p
              className="text-lg md:text-xl mb-6 md:mb-8 opacity-90 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t('home.cta.subtitle')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-white to-slate-100 text-[#055BA4] hover:text-[#054A85] shadow-lg shadow-[#055BA4]/30 dark:shadow-[#41ADE8]/40 hover:shadow-[#055BA4]/40 font-bold"
              >
                <Link to="/devis">
                  {t('home.cta.button')}
                  <ArrowRight className={`ml-2 ${isRTL ? 'transform rotate-180' : ''}`} size={20} />
                </Link>
              </Button>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Accueil;