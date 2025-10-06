import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiX,
  FiCalendar,
  FiBriefcase,
  FiCode,
  FiUsers,
  FiLayers,
  FiExternalLink,
  FiGithub,
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiPlay
} from 'react-icons/fi';
import {
  SiLaravel,
  SiVuedotjs,
  SiMysql
} from 'react-icons/si';

const getTechIcon = (tech) => {
  const icons = {
    'Laravel': <SiLaravel className="text-red-500" />,
    'Vue.js': <SiVuedotjs className="text-green-500" />,
    'Vuetify': <FiCode className="text-blue-500" />,
    'MySQL': <SiMysql className="text-orange-500" />,
    'API REST': <FiCode className="text-purple-500" />
  };

  return icons[tech] || <FiCode className="text-blue-500" />;
};

// Composant VideoPlayer pour la modale
const VideoPlayer = ({ src, alt, className = "" }) => {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Normaliser le chemin de la vidéo - CORRECTION ICI
  const normalizeVideoPath = (path) => {
    if (!path) return null;
    
    // Si le chemin commence déjà par /, le garder tel quel
    if (path.startsWith('/')) return path;
    
    // Si c'est une URL HTTP, la garder telle quelle
    if (path.startsWith('http')) return path;
    
    // Pour les chemins relatifs comme "assets/..." - CORRECTION IMPORTANTE
    // Dans React, les assets dans public sont servis à la racine
    if (path.startsWith('assets/')) {
      return `/${path}`; // Ajouter un slash au début
    }
    
    // Par défaut, ajouter un slash
    return `/${path}`;
  };

  const videoSrc = normalizeVideoPath(src);
  
  console.log('VideoPlayer Debug:', {
    srcOriginal: src,
    srcNormalized: videoSrc,
    isLoading,
    hasError
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) {
      console.log('VideoPlayer: video element or source missing');
      setHasError(true);
      setIsLoading(false);
      return;
    }

    console.log('Initialisation de la vidéo:', videoSrc);

    const handleCanPlay = () => {
      console.log('Video can play, starting playback...');
      setIsLoading(false);
      video.play().catch(error => {
        console.error('Erreur lors de la lecture:', error);
        setHasError(true);
      });
    };

    const handleError = (e) => {
      console.error('Erreur de chargement vidéo:', {
        error: e,
        src: videoSrc,
        networkState: video.networkState,
        errorCode: video.error,
        readyState: video.readyState
      });
      setIsLoading(false);
      setHasError(true);
    };

    const handleLoadStart = () => {
      console.log('Début du chargement vidéo');
      setIsLoading(true);
    };

    const handlePlaying = () => {
      console.log('Vidéo en cours de lecture');
      setIsLoading(false);
    };

    const handleStalled = () => {
      console.log('Vidéo bloquée');
    };

    const handleSuspend = () => {
      console.log('Chargement vidéo suspendu');
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('stalled', handleStalled);
    video.addEventListener('suspend', handleSuspend);

    // Définir la source et forcer le chargement
    video.src = videoSrc;
    video.load();

    // Démarrer la lecture avec timeout de secours
    const playTimeout = setTimeout(() => {
      if (video.readyState >= 2) { // HAVE_CURRENT_DATA ou plus
        video.play().catch(error => {
          console.error('Erreur de lecture après timeout:', error);
          setHasError(true);
        });
      }
    }, 1000);

    return () => {
      clearTimeout(playTimeout);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('stalled', handleStalled);
      video.removeEventListener('suspend', handleSuspend);
    };
  }, [videoSrc]);

  if (!videoSrc) {
    return (
      <div className="aspect-video flex items-center justify-center bg-gray-200 dark:bg-gray-700">
        <p className="text-gray-500">URL vidéo manquante</p>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="aspect-video flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-700 p-4">
        <FiPlay size={48} className="text-gray-400 mb-4" />
        <p className="text-gray-500 text-center mb-2">Erreur de chargement de la vidéo</p>
        <p className="text-sm text-gray-400 text-center mb-4">Vérifiez que le fichier existe à cet emplacement</p>
        <div className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 p-2 rounded mb-4">
          <p>Chemin: {videoSrc}</p>
          <p>Original: {src}</p>
        </div>
        <button 
          onClick={() => window.open(videoSrc, '_blank')}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-colors"
        >
          Tester le lien direct
        </button>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 z-10 rounded-xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-3"></div>
            <span className="text-gray-600 dark:text-gray-300">Chargement de la vidéo...</span>
          </div>
        </div>
      )}
      
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="w-full h-full object-cover rounded-xl"
        style={{ 
          display: isLoading ? 'none' : 'block',
          backgroundColor: '#f3f4f6' // Fond gris pendant le chargement
        }}
      >
        <source src={videoSrc} type="video/webm" />
        <source src={videoSrc.replace('.webm', '.mp4')} type="video/mp4" />
        Votre navigateur ne supporte pas la lecture de vidéos.
      </video>
    </div>
  );
};

// Composant VideoThumbnail pour le carrousel principal
const VideoThumbnail = ({ src }) => {
  const videoRef = useRef(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const normalizeVideoPath = (path) => {
    if (!path) return null;
    if (path.startsWith('/') || path.startsWith('http')) return path;
    if (path.startsWith('assets/')) return `/${path}`;
    return `/${path}`;
  };

  const videoSrc = normalizeVideoPath(src);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) {
      setHasError(true);
      setIsLoading(false);
      return;
    }

    const handleError = () => {
      console.error('Erreur vidéo thumbnail:', videoSrc);
      setHasError(true);
      setIsLoading(false);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
      video.play().catch(error => {
        console.error('Erreur lecture vidéo thumbnail:', error);
        setHasError(true);
      });
    };

    video.addEventListener('error', handleError);
    video.addEventListener('canplay', handleCanPlay);
    
    video.src = videoSrc;
    video.load();

    return () => {
      video.removeEventListener('error', handleError);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [videoSrc]);

  if (hasError || !videoSrc) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-600">
        <span className="text-gray-500 text-sm">Erreur vidéo</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-300 dark:bg-gray-600 z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        style={{ display: isLoading ? 'none' : 'block' }}
      >
        <source src={videoSrc} type="video/webm" />
        <source src={videoSrc.replace('.webm', '.mp4')} type="video/mp4" />
      </video>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-black/30 rounded-full p-2">
          <FiPlay className="text-white" size={20} />
        </div>
      </div>
    </div>
  );
};

const ImageCarousel = ({ images, isRTL }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      nextImage();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  if (!images || images.length === 0) {
    return (
      <div className="relative w-full h-80 rounded-xl overflow-hidden mb-4 bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center">
        <div className="text-white text-center p-4">
          <h3 className="text-xl font-bold mb-2">Aucune image disponible</h3>
          <p className="text-sm opacity-80">Image illustrative</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-80 rounded-xl overflow-hidden mb-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img
            src={images[currentIndex].url}
            alt={images[currentIndex].alt}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
          >
            <FiChevronLeft size={24} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
          >
            <FiChevronRight size={24} />
          </button>
        </>
      )}

      {/* Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Composant MediaDisplay pour gérer l'affichage des médias dans la modale
const MediaDisplay = ({ project, isRTL }) => {
  console.log('MediaDisplay Debug:', {
    projectTitle: project?.title,
    hasImages: !!(project?.images && project.images.length > 0),
    hasVideo: !!project?.video,
    hasImg: !!project?.img?.url,
    images: project?.images,
    video: project?.video,
    img: project?.img
  });

  // CORRECTION : Vérifier si images est null ou vide array
  const hasImages = project?.images && Array.isArray(project.images) && project.images.length > 0;
  const hasVideo = !!project?.video;
  const hasImg = !!project?.img?.url;

  if (hasImages) {
    return <ImageCarousel images={project.images} isRTL={isRTL} />;
  }

  if (hasVideo) {
    return (
      <div className="relative w-full h-80 rounded-xl overflow-hidden mb-4 bg-gray-100 dark:bg-gray-800">
        <VideoPlayer 
          src={project.video} 
          alt={`Vidéo du projet ${project.title}`} 
          className="h-full" 
        />
      </div>
    );
  }

  if (hasImg) {
    return (
      <div className="relative w-full h-80 rounded-xl overflow-hidden mb-4">
        <img
          src={project.img.url}
          alt={project.img.alt || project.title}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-80 rounded-xl overflow-hidden mb-4 bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center">
      <div className="text-white text-center p-4">
        <h3 className="text-xl font-bold mb-2">Aucun média disponible</h3>
        <p className="text-sm opacity-80">Image illustrative</p>
      </div>
    </div>
  );
};

const ProjectDetailModal = ({
  selectedProject,
  setSelectedProject,
  isRTL,
  direction,
  flexDirection,
  marginIcon,
  textAlign
}) => {
  const projectRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (selectedProject) {
      setIsVisible(true);
    }
  }, [selectedProject]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  if (!selectedProject) return null;

  return (
    <AnimatePresence>
      {isVisible && (
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
            ref={projectRef}
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
                  {/* Media Display */}
                  <MediaDisplay project={selectedProject} isRTL={isRTL} />

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
                    {selectedProject.features && selectedProject.features.length > 0 && (
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
                    )}
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
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${selectedProject.status === 'inProgress'
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

              {(selectedProject.demoUrl || selectedProject.githubUrl) && (<div className={`mt-8 pt-6 border-t border-blue-200 dark:border-blue-800 flex ${isRTL ? 'justify-start' : 'justify-end'} gap-3`}>
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
              </div>)}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailModal;