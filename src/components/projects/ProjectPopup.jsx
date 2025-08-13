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
import { useTranslation } from 'react-i18next';

const ProjectPopup = () => {
  const { t, i18n } = useTranslation();
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const popupRef = useRef(null);
  const swiperRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const isRTL = i18n.language === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';
  const textAlign = isRTL ? 'text-right' : 'text-left';

  const projects = t('projectPopup.projects', { returnObjects: true });

  const canLoop = projects.length > 1;

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
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'ArrowLeft') handlePrevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, activeImage]);

  const openPopup = (project) => {
    setSelectedProject(project);
    setActiveImage(0);
    if (swiperRef.current && swiperRef.current.swiper.autoplay.running) {
      swiperRef.current.swiper.autoplay.stop();
      setIsPlaying(false);
    }
  };

  const closePopup = () => {
    setSelectedProject(null);
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
            depth: 50,
            modifier: projects.length > 3 ? 3 : 2,
            slideShadows: true,
          }}
          keyboard={{ enabled: true }}
          mousewheel={{ forceToAxis: true }}
          spaceBetween={projects.length > 3 ? 20 : 40}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: true,
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
            paddingTop: '10px',
            paddingBottom: '5px',
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
                width: '280px',
                height: '340px',
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

                {project.new && (
                  <span className="absolute top-4 right-4 px-3 py-1 bg-teal-500 text-white text-xs font-medium rounded-full z-20">
                    {t('projectPopup.newBadge')}
                  </span>
                )}

                <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent"></div>

                <div className="relative z-20 p-6 h-full flex flex-col justify-end">
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
      <AnimatePresence dir={direction}>
        {selectedProject && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
              style={{ zIndex: 9999 }}
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
                <div className={`sticky top-0 bg-white dark:bg-gray-800 z-10 p-4 border-b border-slate-200 dark:border-gray-700 flex justify-between items-center`}>
                  <h2 className={`text-xl font-bold text-slate-800 dark:text-white ${textAlign}`}>
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
                          <div className="absolute inset-0 flex items-center justify-between px-2" dir="ltr">
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
                              className={`w-2 h-2 rounded-full ${index === activeImage
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
                      <h3 className={`text-lg font-bold text-slate-800 dark:text-white mb-3 ${textAlign}`}>
                        {t('projectPopup.descriptionTitle')}
                      </h3>
                      <p className={`text-slate-600 dark:text-slate-400 mb-6 ${textAlign}`}>
                        {selectedProject.fullDescription}
                      </p>

                      <h3 className={`text-lg font-bold text-slate-800 dark:text-white mb-3 ${textAlign}`}>
                        {t('projectPopup.challengesTitle')}
                      </h3>
                      <p className={`text-slate-600 dark:text-slate-400 mb-6 ${textAlign}`}>
                        {selectedProject.challenges}
                      </p>

                      {selectedProject.resultsList && selectedProject.resultsList.length > 0 && (
                        <>
                          <h3 className={`text-lg font-bold text-slate-800 dark:text-white mb-3 ${textAlign}`}>
                            {t('projectPopup.resultsTitle')}
                          </h3>
                          <ul className={`list-disc ${isRTL ? 'pr-5' : 'pl-5'} text-slate-600 dark:text-slate-400 mb-6 space-y-2 ${textAlign}`}>
                            {selectedProject.resultsList.slice(0, 3).map((result, index) => (
                              <li key={index}>{result}</li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>

                    <div>
                      <div className="bg-slate-50 dark:bg-gray-700/30 rounded-xl p-4 mb-4">
                        <h3 className={`text-lg font-bold text-slate-800 dark:text-white mb-3 ${textAlign}`}>
                          {t('projectPopup.detailsTitle')}
                        </h3>

                        <div className="space-y-3">
                          <div className={`flex items-center`}>
                            <div className={`flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg ${isRTL ? 'ml-3' : 'mr-3'}`}>
                              <FiCalendar className="text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div className={textAlign}>
                              <p className="font-medium text-slate-800 dark:text-white">
                                {selectedProject.launchDate}
                              </p>
                            </div>
                          </div>

                          <div className={`flex items-center`}>
                            <div className={`flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg ${isRTL ? 'ml-3' : 'mr-3'}`}>
                              <FiClock className="text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div className={textAlign}>
                              <p className="font-medium text-slate-800 dark:text-white">
                                {selectedProject.duration}
                              </p>
                            </div>
                          </div>

                          {selectedProject.team && (
                            <div className={`flex items-center`}>
                              <div className={`flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg ${isRTL ? 'ml-3' : 'mr-3'}`}>
                                <FiUsers className="text-indigo-600 dark:text-indigo-400" />
                              </div>
                              <div className={textAlign}>
                                <p className="font-medium text-slate-800 dark:text-white">
                                  {selectedProject.team.join(', ')}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="bg-slate-50 dark:bg-gray-700/30 rounded-xl p-4 mb-4">
                        <h3 className={`text-lg font-bold text-slate-800 dark:text-white mb-3 ${textAlign}`}>
                          {t('projectPopup.technologiesTitle')}
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

                      <div className={`flex flex-wrap gap-3 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                        {/* Bouton Demo - affiché seulement si l'URL existe */}
                        {selectedProject.demoUrl && (
                          <a
                            href={selectedProject.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium text-center"
                          >
                            {isRTL ? (
                              <span className="flex items-center">
                                {t('projectPopup.visitButton')}
                                <FiExternalLink className="mr-2" />
                              </span>
                            ) : (
                              <span className="flex items-center">
                                <FiExternalLink className="ml-2" />
                                {t('projectPopup.visitButton')}
                              </span>
                            )}
                          </a>
                        )}

                        {/* Bouton Code - affiché seulement si l'URL existe */}
                        {selectedProject.githubUrl && (
                          <a
                            href={selectedProject.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center px-4 py-3 bg-slate-200 dark:bg-gray-700 hover:bg-slate-300 dark:hover:bg-gray-600 text-slate-800 dark:text-white rounded-lg transition-colors font-medium text-center"
                          >
                            {isRTL ? (
                              <span className="flex items-center">
                                {t('projectPopup.codeButton')}
                                <FiGithub className="mr-2" />
                              </span>
                            ) : (
                              <span className="flex items-center">
                                <FiGithub className="ml-2" />
                                {t('projectPopup.codeButton')}
                              </span>
                            )}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Miniatures de la galerie */}
                  {selectedProject.images && selectedProject.images.length > 1 && (
                    <div className="mt-6">
                      <h3 className={`text-lg font-bold text-slate-800 dark:text-white mb-3 ${textAlign}`}>
                        {t('projectPopup.galleryTitle')}
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {selectedProject.images.map((img, index) => (
                          <button
                            key={index}
                            className={`rounded-lg overflow-hidden border-2 transition-all ${index === activeImage
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
            width: '320px' !important;
            height: '420px' !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectPopup;