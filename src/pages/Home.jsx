import React, { useState, useEffect } from "react";
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
  CheckCircle,
  ChevronRight,
  ChevronDown,
  FolderIcon,
  ArrowRight,
  BookOpen,
  User,
  Clock,
  MessageSquare,
  Globe,
  LayoutTemplate,
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

  const blogPosts = [
    {
      id: 1,
      title: t('home.blog.post1.title'),
      excerpt: t('home.blog.post1.excerpt'),
      date: t('home.blog.post1.date'),
      readTime: t('home.blog.post1.readTime'),
      category: t('home.blog.post1.category')
    },
    {
      id: 2,
      title: t('home.blog.post2.title'),
      excerpt: t('home.blog.post2.excerpt'),
      date: t('home.blog.post2.date'),
      readTime: t('home.blog.post2.readTime'),
      category: t('home.blog.post2.category')
    },
    {
      id: 3,
      title: t('home.blog.post3.title'),
      excerpt: t('home.blog.post3.excerpt'),
      date: t('home.blog.post3.date'),
      readTime: t('home.blog.post3.readTime'),
      category: t('home.blog.post3.category')
    }
  ];

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
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&w=800&auto=format&fit=crop",
      alt: t('home.slides.slide3.alt')
    },
    {
      id: 4,
      title: t('home.slides.slide4.title'),
      description: t('home.slides.slide4.description'),
      image: "https://images.unsplash.com/photo-1468436139062-f60a71c5c892?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&w=800&auto=format&fit=crop",
      alt: t('home.slides.slide4.alt')
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
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000 })
  ]);
  
  const openPostDetail = (post) => {
    setSelectedPost(post);
    document.body.style.overflow = 'hidden';
  };
  
  return (
    <div 
      className="bg-gradient-to-b from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-950"
      dir={direction}
    >
      <section className="pt-30 pb-20 min-h-[90vh] lg:min-h-[750px] lg:max-h-[750px] flex items-center overflow-hidden relative">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-cover bg-center" style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')",
            backgroundPosition: "center center",
            backgroundAttachment: 'fixed'
          }}>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-teal-900/60"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-6">
                <motion.div
                  className="inline-block px-4 py-1 bg-teal-500/20 dark:bg-teal-700/30 text-teal-600 dark:text-teal-300 rounded-full text-sm font-medium backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {t('home.hero.welcome')}
                </motion.div>

                <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight ${textAlign}`}>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {t('home.hero.title1')}
                  </motion.span>
                  <br />
                  <FlipWords
                    className="text-3xl md:text-4xl lg:text-5xl text-teal-400 block mt-2"
                    words={t('home.hero.flipWords', { returnObjects: true })}
                    duration={3000}
                  />
                </h1>

                <motion.p
                  className={`text-lg text-slate-200 leading-relaxed max-w-2xl ${isRTL ? 'text-right' : 'text-left'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {t('home.hero.description')}
                </motion.p>
              </div>

              <motion.div
                className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-lg shadow-teal-500/30 backdrop-blur-sm"
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
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
                >
                  <Link to="/devis">{t('home.hero.button2')}</Link>
                </Button>
              </motion.div>

              <motion.div
                className="grid grid-cols-3 gap-4 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {t('home.hero.stats', { returnObjects: true }).map((stat, index) => (
                  <motion.div
                    key={index}
                    className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 text-center"
                    whileHover={{ y: -5 }}
                  >
                    <div className="text-2xl font-bold text-teal-400">{stat.value}</div>
                    <div className="text-sm text-slate-200 mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
                dir="ltr"
            >
              <div className="relative z-10 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-purple-500/5 dark:from-teal-700/5 dark:to-purple-700/5 z-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-teal-900/60"></div></div>

                <div className="relative z-10 rounded-xl overflow-hidden">
                  <div className="embla overflow-hidden h-96" ref={emblaRef}>
                    <div className="embla__container flex">
                      {slides.map((slide) => (
                        <div className="embla__slide flex-[0_0_100%] min-w-0 relative" key={slide.id}>
                          <img
                            src={slide.image}
                            alt={slide.alt}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/30 to-teal-900/40"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-teal-500 rounded-full blur-2xl opacity-30 dark:opacity-20"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-purple-500 rounded-full blur-2xl opacity-30 dark:opacity-20"></div>
              </div>

              <div className="absolute -top-6 -right-6 w-full h-full bg-teal-500/10 dark:bg-teal-700/10 rounded-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              className={`text-4xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {t('home.skills.title')} <span className="text-teal-600 dark:text-teal-400">{t('home.skills.titleHighlight')}</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%" }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex justify-center mb-6"
            >
              <div className="h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent w-48"></div>
            </motion.div>
            <motion.p
              className={`text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {t('home.skills.subtitle')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div className="group h-full border border-slate-200 dark:border-gray-800 hover:border-teal-300 dark:hover:border-teal-500 transition-all duration-300 bg-white/80 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl overflow-hidden p-6 hover:shadow-lg hover:-translate-y-1.5">
                  <motion.div
                    className="w-14 h-14 bg-gradient-to-br from-teal-100 to-teal-50 dark:from-teal-900/30 dark:to-teal-800/20 rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:bg-gradient-to-br group-hover:from-teal-500 group-hover:to-teal-400 transition-all duration-300"
                    whileHover={{ rotate: 5, scale: 1.05 }}
                  >
                    <skill.icon
                      className="text-teal-600 dark:text-teal-400 group-hover:text-white transition-colors duration-300"
                      size={28}
                    />
                  </motion.div>

                  <h3 className={`text-xl font-semibold text-slate-800 dark:text-white mb-2 text-center`}>
                    {skill.name}
                  </h3>

                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {skill.tech.split(',').map((tech, i) => (
                      <motion.span
                        key={i}
                        className="px-3 py-1 text-xs font-medium bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-slate-300 rounded-full"
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

      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              className={`text-4xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {t('home.services.title')} <span className="text-teal-600 dark:text-teal-400">{t('home.services.titleHighlight')}</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%" }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex justify-center mb-6"
            >
              <div className="h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent w-48"></div>
            </motion.div>

            <motion.p
              className={`text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {t('home.services.subtitle')}
            </motion.p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:max-w-[800px] gap-6 mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="h-full lg:max-w-[800px]"
                whileHover="hover"
              >
                <div className="group h-full bg-white dark:bg-slate-800/30 backdrop-blur-sm border border-slate-200 dark:border-slate-700/60 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-teal-300/50 dark:hover:border-teal-500/50 relative">
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-purple-500/5 dark:from-teal-700/5 dark:to-purple-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 border border-slate-200 dark:border-slate-700/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <div className="relative z-10 p-6 h-full flex flex-col">
                    <div className="text-center mb-4">
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform duration-300"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                      >
                        <service.icon className="text-white text-2xl" />
                      </motion.div>
                      <motion.h3
                        className="text-xl font-bold text-slate-800 dark:text-white"
                        whileHover={{ color: "#0d9488" }}
                        transition={{ duration: 0.2 }}
                      >
                        {service.title}
                      </motion.h3>
                    </div>

                    <p className={`text-slate-600 dark:text-slate-400 mb-5 text-center`}>
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-teal-600 text-teal-600 dark:text-teal-400 dark:border-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 font-medium group"
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

      <section className="py-16 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-900/50">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <motion.h2
                className={`text-4xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {t('home.projects.title')} <span className="text-teal-600 dark:text-teal-400">{t('home.projects.titleHighlight')}</span>
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex justify-center mb-6"
              >
                <div className="h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent w-48"></div>
              </motion.div>
              <motion.p
                className={`text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                {t('home.projects.subtitle')}
              </motion.p>
            </div>
          </AnimatedSection>

          <ProjectPopup />

          <AnimatedSection>
            <div className="text-center mt-10">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-teal-600 text-teal-600 dark:text-teal-400 dark:border-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 font-medium"
              >
                <Link to="/projects">
                  {t('home.projects.button')}
                  <ArrowRight className={`ml-2 ${isRTL ? 'transform rotate-180' : ''}`} size={20} />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              className={`text-4xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {t('home.blog.title')} <span className="text-teal-600 dark:text-teal-400">{t('home.blog.titleHighlight')}</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%" }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex justify-center mb-6"
            >
              <div className="h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent w-48"></div>
            </motion.div>
            <motion.p
              className={`text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {t('home.blog.subtitle')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                className="h-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="group h-full bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-xl transition-all"
                onClick={() => openPostDetail(post)}>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-xs font-medium mb-4">
                      {post.category}
                    </span>

                    <h3 className={`text-xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors ${textAlign}`}>
                      {post.title}
                    </h3>

                    <p className={`text-slate-600 dark:text-slate-400 mb-4 ${textAlign}`}>
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

                    <Button
                      asChild
                      variant="link"
                      className={`mt-4 ${isRTL ? 'pr-0' : 'pl-0'} text-teal-600 dark:text-teal-400 hover:no-underline`}
                    >
                      <Link to="/blog">
                        {isRTL && <ArrowRight className="mr-1 transform rotate-180" size={16} />}
                        {t('home.blog.readButton')}
                        {!isRTL && <ArrowRight className="ml-1" size={16} />}
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-teal-600 text-teal-600 dark:text-teal-400 dark:border-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 font-medium"
            >
              <Link to="/blog">
                {t('home.blog.button')}
                <ArrowRight className={`ml-2 ${isRTL ? 'transform rotate-180' : ''}`} size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              className={`text-4xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {t('home.process.title')} <span className="text-teal-600 dark:text-teal-400">{t('home.process.titleHighlight')}</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%" }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex justify-center mb-6"
            >
              <div className="h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent w-48"></div>
            </motion.div>
            <motion.p
              className={`text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {t('home.process.subtitle')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {t('home.process.steps', { returnObjects: true }).map((step, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-200 dark:border-slate-700 text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                  {step.icon === 'Users' && <Users className="text-teal-600 dark:text-teal-400" size={32} />}
                  {step.icon === 'Code' && <Code className="text-teal-600 dark:text-teal-400" size={32} />}
                  {step.icon === 'BarChart' && <BarChart className="text-teal-600 dark:text-teal-400" size={32} />}
                  {step.icon === 'Shield' && <Shield className="text-teal-600 dark:text-teal-400" size={32} />}
                </div>
                <span className="inline-block bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-sm font-medium mb-3">
                  {step.step}
                </span>
                <h3 className={`text-xl font-semibold text-slate-800 dark:text-white mb-2 ${textAlign}`}>{step.title}</h3>
                <p className={`text-slate-600 dark:text-slate-400 ${textAlign}`}>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-700 dark:from-teal-700 dark:to-teal-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <motion.h2
              className="text-4xl font-bold mb-4"
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
              <div className="h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent w-48"></div>
            </motion.div>
            <motion.p
              className="text-xl mb-8 opacity-90 max-w-2xl mx-auto"
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
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/20 dark:shadow-orange-600/30"
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