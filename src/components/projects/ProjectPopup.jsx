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
} from 'react-icons/fi';
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Keyboard, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { useTranslation } from 'react-i18next';
import ProjectDetailModal from './ProjectDetailModal';

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
  if (projects.length <= 1) return 1;
  if (projects.length === 2) return 1.2; // Special case for 2 slides
  return 'auto'; // Default for 3+ slides
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
                  {project.images?.[0]?.url && (
                    <img
                      src={project.images[0].url}
                      alt={project.images[0].alt || project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  )}
                </div>

                {project.new && (
                  <span className="absolute top-4 right-4 px-3 py-1 bg-[#055BA4] text-white text-xs font-medium rounded-full z-20">
                    {t('projectPopup.newBadge')}
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

      <ProjectDetailModal
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        isRTL={isRTL}
        direction={direction}
        flexDirection={flexDirection}
        marginIcon={marginIcon}
        textAlign={textAlign}
        t={t}
        style={{
            zIndex: 9999,
          }}
      />

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