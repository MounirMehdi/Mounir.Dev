import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiExternalLink,
  FiGithub,
  FiCalendar,
  FiFilter,
  FiArrowRight,
  FiX,
  FiChevronDown,
  FiBriefcase,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiCode 
} from 'react-icons/fi';
import {
  SiReact,
  SiVuedotjs,
  SiLaravel,
  SiTailwindcss,
  SiFigma,
  SiMysql,
  SiNodedotjs
} from 'react-icons/si';
import {
  FaJava
} from 'react-icons/fa';
import ProjectDetailModal from '../components/projects/ProjectDetailModal';

const Projects = () => {
  const { t, i18n } = useTranslation('translation');
  const isRTL = i18n.language === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';
  const textAlign = isRTL ? 'text-right' : 'text-left';
  const flexDirection = isRTL ? 'flex-row-reverse' : 'flex-row';
  const marginIcon = isRTL ? 'ml-2' : 'mr-2';

  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [techFilters, setTechFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  // Récupérer les projets traduits
  const projects = t('projectsData', { returnObjects: true });

  // Filtres
  const categoryFilters = [
    { id: 'all', label: t('projects.filters.all') },
    { id: 'web', label: t('projects.filters.web') },
    { id: 'desktop', label: t('projects.filters.desktop') },
    { id: 'mobile', label: t('projects.filters.mobile') }
  ];

  const statusFilters = [
    { id: 'all', label: t('projects.filters.statusAll') },
    { id: 'completed', label: t('projects.filters.statusCompleted') },
    { id: 'inProgress', label: t('projects.filters.statusInProgress') }
  ];

  const availableTechs = ['React', 'Vue.js', 'Laravel', 'Java', 'Node.js', 'Tailwind CSS', 'Figma', 'MySQL'];

  // Gestion des filtres de technologie
  const toggleTechFilter = (tech) => {
    if (techFilters.includes(tech)) {
      setTechFilters(techFilters.filter(t => t !== tech));
    } else {
      setTechFilters([...techFilters, tech]);
    }
  };

  // Filtrer les projets
  const filteredProjects = projects.filter(project => {
    // Filtre par catégorie
    const matchesCategory = categoryFilter === 'all' || project.category === categoryFilter;
    
    // Filtre par statut
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    
    // Filtre par technologies
    const matchesTech = techFilters.length === 0 || 
                        techFilters.some(tech => project.technologies.includes(tech));
    
    // Filtre par recherche
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesStatus && matchesTech && matchesSearch;
  });

  // Pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Animation variants
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
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  // Réinitialiser la pagination quand les filtres changent
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryFilter, statusFilter, techFilters, searchQuery]);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-900/50 overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      dir={direction}
    >
      {/* Hero Section Moderne */}
      <section className="relative py-32 md:py-40 bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-900/10 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-1/4 w-64 h-64 bg-teal-200/30 dark:bg-teal-800/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-indigo-200/30 dark:bg-indigo-800/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-purple-200/20 dark:bg-purple-800/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className={`text-center max-w-3xl mx-auto`}>
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-slate-800 dark:text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="block mb-2">{t('projects.hero.title1')}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-600 dark:from-teal-400 dark:to-indigo-400">
                {t('projects.hero.title2')}
              </span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%" }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex justify-center mb-8"
            >
              <div className="h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent w-48"></div>
            </motion.div>
            
            <motion.p
              className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t('projects.hero.subtitle')}
            </motion.p>
            
            <motion.div
              className="relative w-full max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className={`absolute inset-y-0 ${isRTL ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none`}>
                <FiSearch className="h-5 w-5 text-slate-500 dark:text-slate-400" />
              </div>
              <input
                type="text"
                placeholder={t('projects.hero.searchPlaceholder')}
                className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-4 rounded-full border border-slate-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-lg`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-4 md:py-6 bg-white dark:bg-gray-800 border-b border-slate-200 dark:border-gray-700 top-16 z-10 sticky">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-3">
            {/* Filtres principaux */}
            <div className="w-full sm:w-auto">
              <div className="flex items-center text-slate-600 dark:text-slate-400 mb-2 sm:mb-2">
                <FiFilter size={18} />
                <span className={`font-medium ${isRTL ? 'pr-2' : 'pl-2'}`}>
                  {t('projects.filters.filterLabel')}
                </span>
              </div>
              
              <div className="flex overflow-x-auto pb-2 gap-2 hide-scrollbar">
                {categoryFilters.map((filter) => (
                  <motion.div
                    key={filter.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-shrink-0"
                  >
                    <button
                      onClick={() => setCategoryFilter(filter.id)}
                      className={`px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm rounded-full font-medium transition-colors whitespace-nowrap ${
                        categoryFilter === filter.id
                          ? "bg-teal-600 hover:bg-teal-700 text-white"
                          : "bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {t(`projects.filters.${filter.id}`)}
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bouton Filtres supplémentaires */}
            <div className="relative w-full sm:w-auto">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`w-full flex items-center justify-center space-x-1 text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 px-3 py-2 rounded-lg bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 ${
                  isRTL ? 'space-x-reverse' : ''
                }`}
              >
                <span>{t('projects.filters.moreFilters')}</span>
                <FiChevronDown
                  className={`transition-transform ${showFilters ? 'rotate-180 ml-1' : 'mr-1'}`}
                />
              </button>

              {/* Menu déroulant des filtres */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    className={`absolute ${
                      isRTL ? 'sm:left-0' : 'sm:right-0'
                    } mt-2 w-full sm:w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-slate-200 dark:border-gray-700 z-20`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="p-4">
                      <h3 className="font-semibold text-slate-800 dark:text-white mb-3">{t('projects.filters.projectStatus')}</h3>
                      <div className="space-y-2">
                        {statusFilters.map(filter => (
                          <div key={filter.id} className="flex items-center" dir={direction}>
                            <input
                              type="radio"
                              id={`status-${filter.id}`}
                              className={`${isRTL ? 'ml-2' : 'mr-2'}`}
                              checked={statusFilter === filter.id}
                              onChange={() => setStatusFilter(filter.id)}
                            />
                            <label htmlFor={`status-${filter.id}`} className="text-slate-700 dark:text-slate-300">
                              {filter.label}
                            </label>
                          </div>
                        ))}
                      </div>

                      <h3 className="font-semibold text-slate-800 dark:text-white mt-4 mb-3">{t('projects.filters.technologies')}</h3>
                      <div className="space-y-2">
                        {availableTechs.map(tech => (
                          <div key={tech} className="flex items-center" dir={direction}>
                            <input
                              type="checkbox"
                              id={`tech-${tech}`}
                              className={`${isRTL ? 'ml-2' : 'mr-2'}`}
                              checked={techFilters.includes(tech)}
                              onChange={() => toggleTechFilter(tech)}
                            />
                            <label htmlFor={`tech-${tech}`} className="text-slate-700 dark:text-slate-300">
                              {tech}
                            </label>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 flex justify-end">
                        <button
          onClick={() => {
            setCategoryFilter('all');
            setStatusFilter('all');
            setTechFilters([]);
            setShowFilters(false);
          }}
          className="px-3 py-2 text-sm rounded-lg bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 text-slate-700 dark:text-slate-300 whitespace-nowrap"
          aria-label={t('projects.filters.reset')}
        >
          {t('projects.filters.reset')}
        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-3 sm:px-4">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center mb-4">
                <FiSearch size={24} className="text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                {t('projects.noProjects.title')}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                {t('projects.noProjects.message')}
              </p>
            </div>
          ) : (
            <>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {currentProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={item}
                    whileHover={{ y: -5 }}
                  >
                    <div
                      className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl cursor-pointer h-full flex flex-col"
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="relative overflow-hidden flex-shrink-0">
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 w-full h-64" />
                        <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'}`}>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.status === 'inProgress'
                            ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                            : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            }`}>
                            {t(`projects.status.${project.status}`)}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                          <div>
                            <h3 className="text-xl font-bold text-white">{project.title}</h3>
                            <div className="flex items-center space-x-3 text-sm text-slate-200 mt-2">
                              <div className="flex items-center space-x-1">
                                <FiCalendar size={14} />
                                <span>{project.period}</span>
                              </div>
                              <span className="px-2 py-1 bg-teal-500/20 text-teal-300 rounded-full">
                                {t(`projects.categories.${project.category}`)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 space-y-4 flex flex-col flex-grow">
                        <div className="flex items-start">
                          <div className={`${marginIcon} mt-1 text-teal-600 dark:text-teal-400`}>
                            <FiBriefcase size={20} />
                          </div>
                          <p className="text-slate-600 dark:text-slate-400">
                            {project.client}
                          </p>
                        </div>

                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 4).map((tech, index) => (
                            <span
                              key={index}
                              className="px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-slate-300"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-slate-300">
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>

                        <div className={`flex justify-between items-center pt-4 border-t border-slate-200 dark:border-gray-700 ${flexDirection} mt-auto`}>
                          <button
                            className="text-teal-600 dark:text-teal-400 font-medium flex items-center group"
                          >
                            {t('projects.viewDetails')}
                            <FiArrowRight className={`${marginIcon} transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 mr-2' : 'ml-2'}`} />
                          </button>

                          <div className={`flex space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                            {project.link && (
                              <button
                                className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 p-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(project.link, '_blank');
                                }}
                              >
                                <FiExternalLink size={16} />
                              </button>
                            )}
                            {project.github && (
                              <button
                                className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 p-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(project.github, '_blank');
                                }}
                              >
                                <FiGithub size={16} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className={`flex items-center justify-center mt-12 ${textAlign}`}>
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`cursor-pointer flex items-center justify-center w-10 h-10 rounded-full mr-2 disabled:opacity-50 disabled:cursor-not-allowed ${currentPage === 1
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                      : 'bg-white dark:bg-gray-800 hover:bg-slate-100 dark:hover:bg-gray-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-gray-600'
                      }`}
                  >
                    <FiChevronLeft className={isRTL ? 'rotate-180' : ''} />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => paginate(page)}
                      className={`cursor-pointer w-10 h-10 rounded-full mx-1 font-medium ${page === currentPage
                        ? 'bg-teal-600 text-white'
                        : 'bg-white dark:bg-gray-800 hover:bg-slate-100 dark:hover:bg-gray-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-gray-600'
                        }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`flex items-center justify-center w-10 h-10 rounded-full ml-2 disabled:opacity-50 disabled:cursor-not-allowed ${currentPage === totalPages
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                      : 'bg-white dark:bg-gray-800 hover:bg-slate-100 dark:hover:bg-gray-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-gray-600'
                      }`}
                  >
                    <FiChevronRight className={isRTL ? 'rotate-180' : ''} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-slate-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12`}>
            <motion.h2
              className="text-3xl font-bold text-slate-800 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {t('projects.technologies.title1')} <span className="text-teal-600 dark:text-teal-400">{t('projects.technologies.title2')}</span>
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
              className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {t('projects.technologies.subtitle')}
            </motion.p>
          </div>

          <motion.div
            className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {t('technologies', { returnObjects: true }).map((tech, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-700 p-4 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow group"
                whileHover={{ y: -5 }}
              >
                <div className="w-10 h-10 mx-auto mb-3 flex items-center justify-center">
                  {tech.icon === 'SiReact' && <SiReact className="text-blue-500 text-2xl" />}
                  {tech.icon === 'SiVuedotjs' && <SiVuedotjs className="text-green-500 text-2xl" />}
                  {tech.icon === 'SiTailwindcss' && <SiTailwindcss className="text-teal-500 text-2xl" />}
                  {tech.icon === 'FiCode' && <FiCode className="text-blue-600 text-2xl" />}
                  {tech.icon === 'SiNodedotjs' && <SiNodedotjs className="text-green-600 text-2xl" />}
                  {tech.icon === 'SiLaravel' && <SiLaravel className="text-red-500 text-2xl" />}
                  {tech.icon === 'FaJava' && <FaJava className="text-red-400 text-2xl" />}
                  {tech.icon === 'SiMysql' && <SiMysql className="text-orange-500 text-2xl" />}
                  {tech.icon === 'SiFigma' && <SiFigma className="text-purple-500 text-2xl" />}
                </div>
                <span className="text-slate-700 dark:text-slate-300 font-medium group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 bg-gradient-to-r from-teal-600 to-teal-700 dark:from-teal-800 dark:to-teal-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {t('projects.cta.title')}
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
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {t('projects.cta.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.4,
                type: "spring",
                stiffness: 300
              }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
            >
              <a href="#contact" className="inline-block">
                <button
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3 px-6 rounded-full shadow-lg shadow-orange-500/20 dark:shadow-orange-600/30 inline-flex items-center cursor-pointer"
                >
                  {t('projects.cta.button')}
                  <FiArrowRight className={`${marginIcon} ${isRTL ? 'rotate-180 mr-2' : 'ml-2'}`} size={20} />
                </button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        isRTL={isRTL}
        direction={direction}
        flexDirection={flexDirection}
        marginIcon={marginIcon}
        textAlign={textAlign}
        t={t}
      />
    </motion.div>
  );
};

export default Projects;