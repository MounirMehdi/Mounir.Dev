import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { 
  FiX, 
  FiExternalLink, 
  FiGithub, 
  FiCalendar, 
  FiClock, 
  FiUsers,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination, Keyboard, Mousewheel, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const ProjectPopup = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const popupRef = useRef(null);
  const swiperRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Données des projets
  const projects = [
    {
      id: 1,
      title: "Portfolio NextJS",
      category: "Développement Web",
      shortDescription: "Un portfolio moderne avec dark mode et animations fluides",
      fullDescription: "Un portfolio moderne avec dark mode, animations fluides et internationalisation. Construit avec Next.js, Tailwind CSS et Framer Motion. Ce projet a été conçu pour présenter mon travail de manière élégante et interactive.",
      challenges: "Le principal défi était de créer une expérience utilisateur fluide avec des animations performantes sans sacrifier le référencement. J'ai résolu cela en utilisant Next.js pour le rendu côté serveur et Framer Motion pour des animations optimisées.",
      resultsIntro: "Après la mise en œuvre de notre solution, nous avons constaté une amélioration significative des performances et de l'expérience utilisateur :",
      resultsList: [
        "Augmentation de 40% du taux de conversion",
        "Réduction de 30% du temps de chargement des pages",
        "Amélioration de 95% de la satisfaction client"
      ],
      tech: ["Next.js", "Tailwind CSS", "Framer Motion", "i18next"],
      demoUrl: "https://portfolio-nextjs-example.com",
      githubUrl: "https://github.com/votre-user/portfolio-nextjs",
      featured: true,
      new: false,
      launchDate: "2023",
      duration: "2 mois",
      team: ["Développeur Frontend", "Designer UI/UX"],
      images: [
        "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 2,
      title: "E-commerce React",
      category: "Application Fullstack",
      shortDescription: "Plateforme e-commerce complète avec panier et paiement Stripe",
      fullDescription: "Plateforme e-commerce complète avec panier, paiement Stripe et tableau de bord administrateur. Optimisée pour les performances et le SEO. L'application comprend un système de gestion de produits, de catégories et de commandes.",
      challenges: "L'intégration sécurisée de Stripe tout en garantissant une expérience utilisateur fluide était complexe. J'ai implémenté un système de panier persistante et des webhooks pour gérer les paiements asynchrones.",
      resultsIntro: "Le projet a permis de :",
      resultsList: [
        "Réduire les abandons de panier de 25%",
        "Augmenter les ventes de 35%",
        "Diminuer les incidents de paiement de 90%"
      ],
      tech: ["React", "Node.js", "Express", "MongoDB", "Stripe API"],
      demoUrl: "https://ecommerce-react-demo.com",
      githubUrl: "https://github.com/votre-user/ecommerce-react",
      featured: true,
      new: true,
      launchDate: "Juin 2023",
      duration: "5 mois",
      team: ["Développeur Fullstack", "Designer UX"],
      images: [
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1603739903239-8b6e64c3b185?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 3,
      title: "Application Météo",
      category: "Application Mobile",
      shortDescription: "Application météo en temps réel avec prévisions sur 7 jours",
      fullDescription: "Application météo en temps réel avec prévisions sur 7 jours. Utilise l'API OpenWeatherMap avec géolocalisation et recherche par ville. L'application offre des notifications push pour les alertes météo importantes.",
      challenges: "L'optimisation des performances pour les appareils mobiles avec une consommation minimale de données était le principal défi. J'ai utilisé la mise en cache intelligente et la compression des données pour résoudre ce problème.",
      resultsIntro: "Après le lancement, l'application a atteint :",
      resultsList: [
        "4.8 étoiles sur les stores d'applications",
        "Plus de 50 000 téléchargements en 3 mois",
        "Temps de chargement moyen de 1.2 secondes"
      ],
      tech: ["React Native", "Redux", "OpenWeather API", "Geolocation API"],
      demoUrl: "https://weather-app-demo.com",
      githubUrl: "https://github.com/votre-user/weather-app",
      featured: false,
      new: true,
      launchDate: "5 Janvier 2023",
      duration: "3 mois",
      team: ["Développeur Mobile"],
      images: [
        "https://images.unsplash.com/photo-1543964198-d54e4f0e44e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1496450681664-3df85efbd29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1580193769210-b8d1c049a7d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 4,
      title: "Système de Gestion de Contenu",
      category: "Développement Web",
      shortDescription: "CMS personnalisé avec interface d'administration intuitive",
      fullDescription: "Un système de gestion de contenu complet avec éditeur WYSIWYG, gestion des utilisateurs et API GraphQL. Conçu pour les clients ayant besoin d'une solution flexible et facile à utiliser.",
      challenges: "Créer un éditeur de contenu riche qui fonctionne de manière cohérente sur tous les navigateurs tout en conservant un balisage propre était le principal défi.",
      resultsIntro: "Les résultats obtenus :",
      resultsList: [
        "Temps de développement de contenu réduit de 60%",
        "Formation des utilisateurs en moins de 2 heures",
        "Intégration avec 3 systèmes existants"
      ],
      tech: ["React", "Node.js", "GraphQL", "MongoDB"],
      demoUrl: "https://cms-example.com",
      githubUrl: "https://github.com/votre-user/custom-cms",
      featured: true,
      new: true,
      launchDate: "Avril 2023",
      duration: "6 mois",
      team: ["Développeur Fullstack", "Designer UI"],
      images: [
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 5,
      title: "Portfolio NextJS",
      category: "Développement Web",
      shortDescription: "Un portfolio moderne avec dark mode et animations fluides",
      fullDescription: "Un portfolio moderne avec dark mode, animations fluides et internationalisation. Construit avec Next.js, Tailwind CSS et Framer Motion. Ce projet a été conçu pour présenter mon travail de manière élégante et interactive.",
      challenges: "Le principal défi était de créer une expérience utilisateur fluide avec des animations performantes sans sacrifier le référencement. J'ai résolu cela en utilisant Next.js pour le rendu côté serveur et Framer Motion pour des animations optimisées.",
      resultsIntro: "Après la mise en œuvre de notre solution, nous avons constaté une amélioration significative des performances et de l'expérience utilisateur :",
      resultsList: [
        "Augmentation de 40% du taux de conversion",
        "Réduction de 30% du temps de chargement des pages",
        "Amélioration de 95% de la satisfaction client"
      ],
      tech: ["Next.js", "Tailwind CSS", "Framer Motion", "i18next"],
      demoUrl: "https://portfolio-nextjs-example.com",
      githubUrl: "https://github.com/votre-user/portfolio-nextjs",
      featured: true,
      new: false,
      launchDate: "2023",
      duration: "2 mois",
      team: ["Développeur Frontend", "Designer UI/UX"],
      images: [
        "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 6,
      title: "E-commerce React",
      category: "Application Fullstack",
      shortDescription: "Plateforme e-commerce complète avec panier et paiement Stripe",
      fullDescription: "Plateforme e-commerce complète avec panier, paiement Stripe et tableau de bord administrateur. Optimisée pour les performances et le SEO. L'application comprend un système de gestion de produits, de catégories et de commandes.",
      challenges: "L'intégration sécurisée de Stripe tout en garantissant une expérience utilisateur fluide était complexe. J'ai implémenté un système de panier persistante et des webhooks pour gérer les paiements asynchrones.",
      resultsIntro: "Le projet a permis de :",
      resultsList: [
        "Réduire les abandons de panier de 25%",
        "Augmenter les ventes de 35%",
        "Diminuer les incidents de paiement de 90%"
      ],
      tech: ["React", "Node.js", "Express", "MongoDB", "Stripe API"],
      demoUrl: "https://ecommerce-react-demo.com",
      githubUrl: "https://github.com/votre-user/ecommerce-react",
      featured: true,
      new: true,
      launchDate: "Juin 2023",
      duration: "5 mois",
      team: ["Développeur Fullstack", "Designer UX"],
      images: [
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1603739903239-8b6e64c3b185?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 7,
      title: "Application Météo",
      category: "Application Mobile",
      shortDescription: "Application météo en temps réel avec prévisions sur 7 jours",
      fullDescription: "Application météo en temps réel avec prévisions sur 7 jours. Utilise l'API OpenWeatherMap avec géolocalisation et recherche par ville. L'application offre des notifications push pour les alertes météo importantes.",
      challenges: "L'optimisation des performances pour les appareils mobiles avec une consommation minimale de données était le principal défi. J'ai utilisé la mise en cache intelligente et la compression des données pour résoudre ce problème.",
      resultsIntro: "Après le lancement, l'application a atteint :",
      resultsList: [
        "4.8 étoiles sur les stores d'applications",
        "Plus de 50 000 téléchargements en 3 mois",
        "Temps de chargement moyen de 1.2 secondes"
      ],
      tech: ["React Native", "Redux", "OpenWeather API", "Geolocation API"],
      demoUrl: "https://weather-app-demo.com",
      githubUrl: "https://github.com/votre-user/weather-app",
      featured: false,
      new: true,
      launchDate: "5 Janvier 2023",
      duration: "3 mois",
      team: ["Développeur Mobile"],
      images: [
        "https://images.unsplash.com/photo-1543964198-d54e4f0e44e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1496450681664-3df85efbd29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1580193769210-b8d1c049a7d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 8,
      title: "Système de Gestion de Contenu",
      category: "Développement Web",
      shortDescription: "CMS personnalisé avec interface d'administration intuitive",
      fullDescription: "Un système de gestion de contenu complet avec éditeur WYSIWYG, gestion des utilisateurs et API GraphQL. Conçu pour les clients ayant besoin d'une solution flexible et facile à utiliser.",
      challenges: "Créer un éditeur de contenu riche qui fonctionne de manière cohérente sur tous les navigateurs tout en conservant un balisage propre était le principal défi.",
      resultsIntro: "Les résultats obtenus :",
      resultsList: [
        "Temps de développement de contenu réduit de 60%",
        "Formation des utilisateurs en moins de 2 heures",
        "Intégration avec 3 systèmes existants"
      ],
      tech: ["React", "Node.js", "GraphQL", "MongoDB"],
      demoUrl: "https://cms-example.com",
      githubUrl: "https://github.com/votre-user/custom-cms",
      featured: true,
      new: true,
      launchDate: "Avril 2023",
      duration: "6 mois",
      team: ["Développeur Fullstack", "Designer UI"],
      images: [
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    }
  ];
// Calculer si on peut activer le loop
  const canLoop = projects.length > 2;

  // Fermer la popup en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        closePopup();
      }
    };

    if (selectedProject) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [selectedProject]);

  // Navigation clavier
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedProject) return;
      
      if (e.key === 'Escape') closePopup();
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'ArrowLeft') handlePrevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, activeImage]);

  const openPopup = (project) => {
    setSelectedProject(project);
    setActiveImage(0);
    // Pause l'autoplay lors de l'ouverture de la popup
    if (swiperRef.current && swiperRef.current.swiper.autoplay.running) {
      swiperRef.current.swiper.autoplay.stop();
      setIsPlaying(false);
    }
  };

  const closePopup = () => {
    setSelectedProject(null);
    // Reprend l'autoplay si nécessaire
    if (swiperRef.current && isPlaying) {
      swiperRef.current.swiper.autoplay.start();
    }
  };

  const handleNextImage = () => {
    if (selectedProject?.images?.length) {
      setActiveImage((prev) => (prev + 1) % selectedProject.images.length);
    }
  };

  const handlePrevImage = () => {
    if (selectedProject?.images?.length) {
      setActiveImage((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length);
    }
  };

  // Toggle autoplay
  const toggleAutoplay = () => {
    if (swiperRef.current) {
      if (swiperRef.current.swiper.autoplay.running) {
        swiperRef.current.swiper.autoplay.stop();
        setIsPlaying(false);
      } else {
        swiperRef.current.swiper.autoplay.start();
        setIsPlaying(true);
      }
    }
  };

  // Animation variants
  const popupVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: { 
        duration: 0.2,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  // Calculer le nombre de slides à afficher selon le nombre de projets
  const getSlidesPerView = () => {
    if (projects.length === 1) return 1;
    if (projects.length === 2) return 1.2;
    return 'auto';
  };

  return (
    <div>
      {/* Section des projets avec Swiper Carousel */}
      <div className="relative px-4">
        <Swiper
          ref={swiperRef}
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: projects.length > 3 ? 1 : 2,
            slideShadows: true,
          }}
          keyboard={{ enabled: true }}
          mousewheel={{ forceToAxis: true }}
          spaceBetween={projects.length > 3 ? 20 : 40}
          loop={canLoop}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ 
            clickable: true,
            el: '.swiper-pagination',
            type: 'bullets',
          }}
          modules={[EffectCoverflow, Pagination, Keyboard, Mousewheel, Autoplay]}
          className="swiper-container"
          style={{
            width: '100%',
            paddingTop: '20px',
            paddingBottom: '20px',
          }}
          breakpoints={{
            640: {
              spaceBetween: projects.length > 3 ? 15 : 30,
            },
            1024: {
              spaceBetween: projects.length > 3 ? 30 : 60,
            }
          }}
        >
          {projects.map((project) => (
            <SwiperSlide 
              key={project.id}
              className="swiper-slide"
              style={{
                width: projects.length > 3 ? '280px' : '300px',
                height: projects.length > 3 ? '380px' : '420px',
                boxShadow: '0 15px 50px rgba(0, 0, 0, 0.2)',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'end',
                alignItems: 'self-start',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                opacity: '0.7',
                transform: 'scale(0.9)',
              }}
            >
              <div 
                className="relative overflow-hidden rounded-2xl group cursor-pointer h-full w-full"
                onClick={() => openPopup(project)}
              >
                {/* Fond d'image */}
                <div className="bg-gray-200 dark:bg-gray-700 w-full h-full absolute inset-0">
                  {project.images?.[0] && (
                    <img 
                      src={project.images[0]} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  )}
                </div>
                
                {/* Badge "Nouveau" */}
                {project.new && (
                  <span className="absolute top-4 right-4 px-3 py-1 bg-teal-500 text-white text-xs font-medium rounded-full z-20">
                    Nouveau
                  </span>
                )}
                
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent"></div>
                
                <div className="relative z-20 p-6 h-full flex flex-col justify-end">
                  {/* Catégorie */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 text-slate-800 dark:text-white text-sm font-medium rounded-full backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.tech.slice(0, 3).map((tech, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-slate-800/70 text-slate-200 text-xs rounded-full backdrop-blur"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-3 py-1 bg-slate-800/70 text-slate-200 text-xs rounded-full backdrop-blur">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                  <p className="text-slate-300 text-sm">{project.shortDescription}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
          
          {/* Pagination */}
          <div 
            className="swiper-pagination !bottom-0 mt-8"
            style={{
              position: 'relative',
              bottom: '0',
            }}
          />
        </Swiper>
      </div>
      
      {/* Fenêtre Popup */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50" 
              style={{ zIndex:9999 }}
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <motion.div
                ref={popupRef}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                variants={popupVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* En-tête de la popup */}
                <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 p-4 border-b border-slate-200 dark:border-gray-700 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                    {selectedProject.title}
                  </h2>
                  <button 
                    onClick={closePopup}
                    className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white p-1 rounded-full hover:bg-slate-100 dark:hover:bg-gray-700"
                  >
                    <FiX size={24} />
                  </button>
                </div>

                {/* Contenu de la popup */}
                <div className="p-6">
                  {/* Galerie d'images */}
                  <div className="relative rounded-xl overflow-hidden mb-6">
                    {selectedProject.images && selectedProject.images.length > 0 && (
                      <>
                        <img 
                          src={selectedProject.images[activeImage]} 
                          alt={selectedProject.title}
                          className="w-full h-64 md:h-80 object-cover"
                          loading="lazy"
                        />
                        
                        {selectedProject.images.length > 1 && (
                          <div className="absolute inset-0 flex items-center justify-between px-2">
                            <button 
                              onClick={handlePrevImage}
                              className="bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
                            >
                              <FiChevronLeft size={24} />
                            </button>
                            <button 
                              onClick={handleNextImage}
                              className="bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
                            >
                              <FiChevronRight size={24} />
                            </button>
                          </div>
                        )}
                        
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1">
                          {selectedProject.images.map((_, index) => (
                            <button
                              key={index}
                              className={`w-2 h-2 rounded-full ${
                                index === activeImage 
                                  ? 'bg-indigo-600 dark:bg-indigo-400' 
                                  : 'bg-white/50'
                              }`}
                              onClick={() => setActiveImage(index)}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Détails du projet */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3">
                        Description
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-6">
                        {selectedProject.fullDescription}
                      </p>
                      
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3">
                        Défis
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-6">
                        {selectedProject.challenges}
                      </p>
                      
                      {selectedProject.resultsList && selectedProject.resultsList.length > 0 && (
                        <>
                          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3">
                            Résultats
                          </h3>
                          <ul className="list-disc pl-5 text-slate-600 dark:text-slate-400 mb-6 space-y-2">
                            {selectedProject.resultsList.slice(0, 3).map((result, index) => (
                              <li key={index}>{result}</li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                    
                    <div>
                      <div className="bg-slate-50 dark:bg-gray-700/30 rounded-xl p-4 mb-4">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3">
                          Détails
                        </h3>
                        
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg mr-3">
                              <FiCalendar className="text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div>
                              <p className="font-medium text-slate-800 dark:text-white">
                                {selectedProject.launchDate}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg mr-3">
                              <FiClock className="text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div>
                              <p className="font-medium text-slate-800 dark:text-white">
                                {selectedProject.duration}
                              </p>
                            </div>
                          </div>
                          
                          {selectedProject.team && (
                            <div className="flex items-center">
                              <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg mr-3">
                                <FiUsers className="text-indigo-600 dark:text-indigo-400" />
                              </div>
                              <div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Équipe</p>
                                <p className="font-medium text-slate-800 dark:text-white">
                                  {selectedProject.team.join(', ')}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="bg-slate-50 dark:bg-gray-700/30 rounded-xl p-4 mb-4">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3">
                          Technologies
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tech.map((tech, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-white dark:bg-gray-600 text-slate-700 dark:text-slate-300 rounded-full text-xs font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <a 
                          href={selectedProject.demoUrl || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium text-center"
                        >
                          <FiExternalLink className="mr-2" />
                          Visiter
                        </a>
                        
                        <a 
                          href={selectedProject.githubUrl || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center px-4 py-3 bg-slate-200 dark:bg-gray-700 hover:bg-slate-300 dark:hover:bg-gray-600 text-slate-800 dark:text-white rounded-lg transition-colors font-medium text-center"
                        >
                          <FiGithub className="mr-2" />
                          Code
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  {/* Miniatures de la galerie */}
                  {selectedProject.images && selectedProject.images.length > 1 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3">
                        Galerie
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {selectedProject.images.map((img, index) => (
                          <button
                            key={index}
                            className={`rounded-lg overflow-hidden border-2 transition-all ${
                              index === activeImage 
                                ? 'border-indigo-500 dark:border-indigo-400' 
                                : 'border-transparent'
                            }`}
                            onClick={() => setActiveImage(index)}
                          >
                            <img 
                              src={img} 
                              alt={`${selectedProject.title} - ${index + 1}`}
                              className="w-full h-24 object-cover"
                              loading="lazy"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Styles pour le carrousel */}
      <style>{`
        .swiper-slide-active {
          opacity: 1 !important;
          transform: scale(1) !important;
          filter: none !important;
          z-index: 1 !important;
        }
        
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #9ca3af;
          opacity: 0.5;
          transition: all 0.3s ease;
        }
        
        .swiper-pagination-bullet-active {
          width: 20px;
          border-radius: 4px;
          background: #4f46e5;
          opacity: 1;
        }
        
        .swiper-slide-shadow-left,
        .swiper-slide-shadow-right {
          background-image: none !important;
        }

        @media (min-width: 768px) {
          .swiper-slide {
            width: ${projects.length > 3 ? '320px' : '350px'} !important;
            height: ${projects.length > 3 ? '420px' : '480px'} !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectPopup;