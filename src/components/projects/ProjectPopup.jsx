import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import {
  FiX,
  FiExternalLink,
  FiGithub,
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiLayers,
  FiCode,
  FiBriefcase,
  FiCheck,
  FiPlay,
} from 'react-icons/fi';
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Keyboard, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { useTranslation } from 'react-i18next';

// Composant pour le carrousel d'images dans la modale
const ImageCarousel = ({ images, isRTL }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
      <div className="aspect-video relative">
        <img
          src={images[activeIndex].url}
          alt={images[activeIndex].alt || "Project image"}
          className="w-full h-full object-cover"
        />
        
        {images.length > 1 && (
          <>
            <button
              onClick={() => setActiveIndex((prev) => (prev - 1 + images.length) % images.length)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <FiChevronLeft size={20} />
            </button>
            <button
              onClick={() => setActiveIndex((prev) => (prev + 1) % images.length)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <FiChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 p-4 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                index === activeIndex 
                  ? 'border-blue-500 scale-105' 
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Composant pour afficher le média principal (image ou vidéo)
const ProjectMedia = ({ project }) => {
  const videoRef = useRef(null);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState(false);

  if (!project) return null;

  // Fonction pour gérer le chargement de la vidéo
  const handleVideoLoad = () => {
    setIsVideoLoading(false);
  };

  const handleVideoError = () => {
    setIsVideoLoading(false);
    setVideoError(true);
    console.error("Erreur de chargement de la vidéo:", project.video);
  };

  // Si on a des images, afficher le carrousel
  if (project.images && project.images.length > 0) {
    return <ImageCarousel images={project.images} />;
  }

  // Si on a une image principale, l'afficher
  if (project.img && project.img.url) {
    return (
      <div className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={project.img.url}
          alt={project.img.alt || project.title}
          className="w-full h-auto object-cover rounded-xl"
        />
      </div>
    );
  }

  // Si on a une vidéo, l'afficher
  if (project.video) {
    return (
      <div className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 relative">
        {videoError ? (
          <div className="aspect-video flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
            <FiPlay size={48} className="mb-4" />
            <p>Erreur de chargement de la vidéo</p>
            <p className="text-sm mt-2">URL: {project.video}</p>
          </div>
        ) : (
          <video
            ref={videoRef}
            controls
            autoPlay
            muted
            loop
            className="w-full h-auto rounded-xl"
            onLoadStart={() => setIsVideoLoading(true)}
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
            preload="metadata"
          >
            <source src={project.video} type="video/webm" />
            <source src={project.video.replace('.webm', '.mp4')} type="video/mp4" />
            Votre navigateur ne supporte pas la lecture de vidéos.
          </video>
        )}
      </div>
    );
  }

  // Fallback si aucun média
  return (
    <div className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-video flex items-center justify-center">
      <p className="text-gray-500 dark:text-gray-400">Aucun média disponible</p>
    </div>
  );
};

// Composant pour l'affichage des médias dans le carrousel principal
const ProjectThumbnail = ({ project }) => {
  const [mediaError, setMediaError] = useState(false);

  if (project.img && project.img.url) {
    return (
      <img
        src={project.img.url}
        alt={project.img.alt || project.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
        onError={() => setMediaError(true)}
      />
    );
  }

  if (project.video && !mediaError) {
    return (
      <div className="w-full h-full relative">
        <video
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setMediaError(true)}
        >
          <source src={project.video} type="video/webm" />
          <source src={project.video.replace('.webm', '.mp4')} type="video/mp4" />
        </video>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-600">
      <span className="text-gray-500 text-sm">Aucun média</span>
    </div>
  );
};

// Composant principal ProjectPopup
const ProjectPopup = () => {
  const { t, i18n } = useTranslation();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const popupRef = useRef(null);
  const swiperRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const isRTL = i18n.language === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';
  const textAlign = isRTL ? 'text-right' : 'text-left';
  const flexDirection = isRTL ? 'flex-row-reverse' : 'flex-row';
  const marginIcon = isRTL ? 'ml-2' : 'mr-2';
  
  const projects = t('projectsData', { returnObjects: true });
  const canLoop = projects.length >= 2;

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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedProject) return;
      if (e.key === 'Escape') closePopup();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  const openPopup = (project) => {
    setSelectedProject(project);
    setIsVisible(true);
    if (swiperRef.current && swiperRef.current.swiper.autoplay.running) {
      swiperRef.current.swiper.autoplay.stop();
      setIsPlaying(false);
    }
  };

  const closePopup = () => {
    setIsVisible(false);
    setTimeout(() => {
      setSelectedProject(null);
    }, 300);
    
    if (swiperRef.current && isPlaying) {
      swiperRef.current.swiper.autoplay.start();
    }
  };

  const handleClose = () => {
    closePopup();
  };

  // Fonction pour obtenir les icônes des technologies
  const getTechIcon = (tech) => {
    const techIcons = {
      'React': '⚛️',
      'Vue.js': '🟢',
      'Laravel': '🔶',
      'JavaScript': '🟡',
      'TypeScript': '🔷',
      'HTML': '🌐',
      'CSS': '🎨',
      'PHP': '🐘',
      'MySQL': '🐬',
      'SQLite': '💾',
      'Java': '☕',
      'Python': '🐍',
      'Node.js': '🟢',
      'Vuetify': '💜',
      'Swing': '🪟',
      'API REST': '🔗',
      'GraphQL': '📊',
      'Firebase': '🔥',
      'MongoDB': '🍃',
      'Redux': '💠',
      'Tailwind CSS': '💨'
    };
    return techIcons[tech] || '💻';
  };

  return (
    <div>
      <div className="relative px-2 py-5">
        <Swiper
          ref={swiperRef}
          grabCursor={true}
          centeredSlides={false}
          slidesPerView={'auto'}
          spaceBetween={24}
          loop={canLoop}
          keyboard={{
            enabled: true,
            onlyInViewport: true
          }}
          mousewheel={{
            forceToAxis: true,
            sensitivity: 0.5
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            el: '.swiper-pagination',
            type: 'bullets',
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 32,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 32,
            }
          }}
          modules={[Navigation, Pagination, Autoplay, Keyboard, Mousewheel ]}
          className="swiper-container"
        >
          {projects.map((project) => (
            <SwiperSlide
              key={project.id}
              className="swiper-slide"
              style={{
                width: 'auto',
                maxWidth: '300px',
                height: '340px',
              }}
            >
              <div
                className="relative overflow-hidden rounded-2xl group cursor-pointer h-full w-full border border-slate-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all"
                onClick={() => openPopup(project)}
              >
                <div className="bg-gray-200 dark:bg-gray-700 w-full h-full absolute inset-0">
                  <ProjectThumbnail project={project} />
                </div>

                {project.new && (
                  <span className="absolute top-4 right-4 px-3 py-1 bg-[#055BA4] text-white text-xs font-medium rounded-full z-20">
                    Nouveau
                  </span>
                )}

                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#031A3D]/90 via-[#031A3D]/40 to-transparent"></div>

                <div className="relative z-20 p-6 h-full flex flex-col justify-end">
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 dark:bg-[#031A3D]/90 text-[#031A3D] dark:text-white text-sm font-medium rounded-full backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#031A3D]/70 text-white text-xs rounded-full backdrop-blur"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                  <p className="text-[#41ADE8] text-sm line-clamp-2">{project.shortDescription}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Modale de détail du projet */}
      <AnimatePresence>
        {isVisible && selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 100 }}
              ref={popupRef}
              onClick={(e) => e.stopPropagation()}
              dir={direction}
            >
              {/* Modal Header */}
              <div className={`sticky top-0 bg-white dark:bg-gray-900 z-10 p-6 border-b border-blue-500/20 flex justify-between items-center rounded-t-xl`}>
                <motion.h2
                  className="text-2xl font-bold text-gray-800 dark:text-white"
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {selectedProject.title}
                </motion.h2>
                <button
                  onClick={handleClose}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 ${isRTL ? 'rtl-grid' : ''}`}>
                  <div className="lg:col-span-2">
                    {/* Media (Image Carousel ou Vidéo) */}
                    <div className="mb-6">
                      <ProjectMedia project={selectedProject} />
                    </div>

                    <div className="space-y-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h3 className={`text-lg font-bold text-gray-800 dark:text-white mb-3 flex items-center`}>
                          <FiLayers className={`${marginIcon} text-blue-500`} />
                          Description complète
                        </h3>
                        <p className={`text-gray-600 dark:text-gray-300 ${textAlign}`}>
                          {selectedProject.fullDescription}
                        </p>
                      </motion.div>
                      
                      <motion.div
                        className="mb-6"
                        initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        <h3 className={`text-lg font-bold text-gray-800 dark:text-white mb-3 flex items-center`}>
                          <FiLayers className={`${marginIcon} text-blue-500`} />
                          Fonctionnalités principales
                        </h3>
                        <ul className={`space-y-2 ${textAlign}`}>
                          {selectedProject.features.map((feature, index) => (
                            <motion.li
                              key={index}
                              className={`flex items-start`}
                              initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.8 + index * 0.1 }}
                            >
                              <div className={`flex-shrink-0 mt-1 ${isRTL ? 'ml-3' : 'mr-3'} text-blue-500`}>
                                <FiCheck />
                              </div>
                              <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>
                  </div>

                  <div>
                    <motion.div
                      className={`bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 mb-6 ${textAlign}`}
                      initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                        Détails du projet
                      </h3>

                      <div className="space-y-4">
                        <div className={`flex items-center`}>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-600 dark:bg-blue-500/30 dark:text-blue-300  ${isRTL ? 'ml-3' : 'mr-3'}`}>
                            {selectedProject.category}
                          </span>
                          <div className={`flex items-center`}>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              selectedProject.status === 'inProgress'
                                ? 'bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/30 dark:text-yellow-300'
                                : 'bg-green-500/10 text-green-600 dark:bg-green-500/30 dark:text-green-300'
                            }`}>
                              {selectedProject.status === 'completed' ? 'Complété' : 'En cours'}
                            </span>
                          </div>
                        </div>

                        <div className={`flex items-start`}>
                          <div className={`flex-shrink-0 bg-blue-100 dark:bg-blue-800/30 p-2 rounded-lg ${isRTL ? 'ml-3' : 'mr-3'}`}>
                            <FiCalendar className="text-blue-500" />
                          </div>
                          <div>
                            <p className={`font-medium text-gray-800 dark:text-white ${textAlign}`}>
                              {selectedProject.period}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Période de développement</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      className="mb-6"
                      initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h3 className={`text-lg font-bold text-gray-800 dark:text-white mb-3 flex items-center`}>
                        <FiCode className={`${marginIcon} text-blue-500`} />
                        Technologies utilisées
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, index) => (
                          <motion.div
                            key={index}
                            className={`flex items-center bg-blue-100 dark:bg-blue-900/30 px-3 py-1.5 rounded-full`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                          >
                            <span className={`${marginIcon}`}>{getTechIcon(tech)}</span>
                            <span className="text-sm text-gray-700 dark:text-gray-300">{tech}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className={`text-lg font-bold text-gray-800 dark:text-white mb-3 flex items-center`}>
                        <FiBriefcase className={`${marginIcon} text-blue-500`} />
                        Client
                      </h3>
                      <p className={`text-gray-600 dark:text-gray-300 ${textAlign}`}>
                        {selectedProject.client}
                      </p>
                    </motion.div>
                  </div>
                </div>

                {(selectedProject.demoUrl || selectedProject.githubUrl) && (
                  <div className={`mt-8 pt-6 border-t border-blue-200 dark:border-blue-800 flex ${isRTL ? 'justify-start' : 'justify-end'} gap-3`}>
                    {selectedProject.demoUrl && (
                      <motion.button
                        className={`px-4 py-2 border border-blue-300 dark:border-blue-700 rounded-lg text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 flex items-center ${flexDirection} transition-colors`}
                        onClick={() => window.open(selectedProject.demoUrl, '_blank')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiExternalLink className={`${marginIcon}`} />
                        Voir la démo
                      </motion.button>
                    )}

                    {selectedProject.githubUrl && (
                      <motion.button
                        className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center ${flexDirection} transition-colors`}
                        onClick={() => window.open(selectedProject.githubUrl, '_blank')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiGithub className={`${marginIcon}`} />
                        Voir le code
                      </motion.button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Styles pour le carrousel*/}
      <style jsx="true">{`
        .swiper-slide {
          transition: transform 0.3s ease, opacity 0.3s ease;
          opacity: 0.9;
        }
        
        .swiper-slide:hover {
          opacity: 1;
          transform: translateY(-5px);
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
          background: #055BA4;
          opacity: 1;
        }
        
        .swiper-button-prev,
        .swiper-button-next {
          position: absolute;
          top: 50%;
          width: 40px;
          height: 40px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateY(-50%);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .swiper-button-prev {
          left: -10px;
        }
        
        .swiper-button-next {
          right: -10px;
        }
        
        .swiper-button-prev:hover,
        .swiper-button-next:hover {
          background: #f3f4f6;
          transform: translateY(-50%) scale(1.1);
        }
        
        @media (max-width: 768px) {
          .swiper-button-prev,
          .swiper-button-next {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectPopup;