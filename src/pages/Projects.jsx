import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
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
  FiCode,
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

  // ==== SCROLL ANIMATIONS ====
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 300], [0, 80]);

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
      className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-[#031A3D] dark:to-[#031A3D]/90 overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      dir={direction}
    >
      {/* Hero Section Moderne */}
      <section className="py-32 md:py-40 text-center relative overflow-hidden">
        {/* Background avec parallaxe */}
        <motion.div
          style={{
            y: heroY,
            backgroundAttachment: 'fixed',
          }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center opacity-30 dark:opacity-20"
        />

        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-1/4 w-64 h-64 bg-[#41ADE8]/30 dark:bg-[#055BA4]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-[#055BA4]/30 dark:bg-[#031A3D]/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-[#41ADE8]/20 dark:bg-[#055BA4]/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-[#031A3D] dark:text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="block mb-2">{t('projects.hero.title1')}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#055BA4] to-[#41ADE8] dark:from-[#055BA4] dark:to-[#41ADE8]">
              {t('projects.hero.title2')}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex justify-center mb-6"
          >
            <div className="h-1 bg-gradient-to-r from-transparent via-[#055BA4] to-transparent w-48"></div>
          </motion.div>

          <motion.p
            className="text-lg md:text-xl text-[#055BA4] dark:text-slate-300 mb-10 max-w-2xl mx-auto"
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
              <FiSearch className="h-5 w-5 text-[#055BA4] dark:text-slate-400" />
            </div>
            <input
              type="text"
              placeholder={t('projects.hero.searchPlaceholder')}
              className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-4 rounded-full border border-slate-300 dark:border-[#055BA4]/30 bg-white/80 dark:bg-[#031A3D]/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#055BA4] focus:border-transparent shadow-lg`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-4 md:py-6 bg-white dark:bg-[#031A3D] border-b border-slate-200 dark:border-[#055BA4]/30 top-16 z-10 sticky">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-3">
            {/* Filtres principaux */}
            <div className="w-full sm:w-auto">

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
                      className={`px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm rounded-full font-medium transition-colors whitespace-nowrap ${categoryFilter === filter.id
                        ? "bg-[#055BA4] hover:bg-[#054A85] text-white"
                        : "bg-slate-100 dark:bg-[#055BA4]/20 hover:bg-slate-200 dark:hover:bg-[#055BA4]/30 text-[#055BA4] dark:text-slate-300"
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
                className={`w-full flex items-center justify-center space-x-1 text-[#055BA4] dark:text-slate-400 hover:text-[#055BA4] dark:hover:text-[#41ADE8] px-3 py-2 rounded-lg bg-slate-100 dark:bg-[#055BA4]/20 hover:bg-slate-200 dark:hover:bg-[#055BA4]/30 ${isRTL ? 'space-x-reverse' : ''
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
                    className={`absolute ${isRTL ? 'sm:left-0' : 'sm:right-0'
                      } mt-2 w-full sm:w-64 bg-white dark:bg-[#031A3D] rounded-xl shadow-lg border border-slate-200 dark:border-[#055BA4]/30 z-20`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="p-4">
                      <h3 className="font-semibold text-[#031A3D] dark:text-white mb-3">{t('projects.filters.projectStatus')}</h3>
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
                            <label htmlFor={`status-${filter.id}`} className="text-[#055BA4] dark:text-slate-300">
                              {filter.label}
                            </label>
                          </div>
                        ))}
                      </div>

                      <h3 className="font-semibold text-[#031A3D] dark:text-white mt-4 mb-3">{t('projects.filters.technologies')}</h3>
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
                            <label htmlFor={`tech-${tech}`} className="text-[#055BA4] dark:text-slate-300">
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
                          className="px-3 py-2 text-sm rounded-lg bg-slate-100 dark:bg-[#055BA4]/20 hover:bg-slate-200 dark:hover:bg-[#055BA4]/30 text-[#055BA4] dark:text-slate-300 whitespace-nowrap"
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
              <h3 className="text-xl font-semibold text-[#031A3D] dark:text-white mb-2">
                {t('projects.noProjects.title')}
              </h3>
              <p className="text-[#055BA4] dark:text-slate-400 max-w-md mx-auto">
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
                      className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-white dark:bg-[#031A3D] border border-slate-200 dark:border-[#055BA4]/30 rounded-xl cursor-pointer h-full flex flex-col"
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="relative overflow-hidden flex-shrink-0">
                        <div className="bg-gradient-to-r from-[#055BA4] to-[#41ADE8] w-full h-64" />
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
                              <span className="px-2 py-1 bg-[#41ADE8]/20 text-[#41ADE8] rounded-full">
                                {t(`projects.categories.${project.category}`)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 space-y-4 flex flex-col flex-grow">
                        <div className="flex items-start">
                          <div className={`${marginIcon} mt-1 text-[#055BA4] dark:text-[#41ADE8]`}>
                            <FiBriefcase size={20} />
                          </div>
                          <p className="text-[#055BA4] dark:text-slate-400">
                            {project.client}
                          </p>
                        </div>

                        <p className="text-[#055BA4] dark:text-slate-400 leading-relaxed line-clamp-3">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 4).map((tech, index) => (
                            <span
                              key={index}
                              className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#41ADE8]/10 dark:bg-[#055BA4]/30 text-[#055BA4] dark:text-[#41ADE8]"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#41ADE8]/10 dark:bg-[#055BA4]/30 text-[#055BA4] dark:text-[#41ADE8]">
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>

                        <div className={`flex justify-between items-center pt-4 border-t border-slate-200 dark:border-[#055BA4]/30 ${flexDirection} mt-auto`}>
                          <button
                            className="text-[#055BA4] dark:text-[#41ADE8] font-medium flex items-center group"
                          >
                            {t('projects.viewDetails')}
                            <FiArrowRight className={`${marginIcon} transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 mr-2' : 'ml-2'}`} />
                          </button>

                          <div className={`flex space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                            {project.link && (
                              <button
                                className="text-[#055BA4] dark:text-slate-400 hover:text-[#055BA4] dark:hover:text-[#41ADE8] p-2"
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
                                className="text-[#055BA4] dark:text-slate-400 hover:text-[#055BA4] dark:hover:text-[#41ADE8] p-2"
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
                      ? 'bg-gray-200 dark:bg-[#055BA4]/30 text-gray-500'
                      : 'bg-white dark:bg-[#031A3D] hover:bg-slate-100 dark:hover:bg-[#055BA4]/30 text-[#055BA4] dark:text-slate-300 border border-slate-300 dark:border-[#055BA4]/30'
                      }`}
                  >
                    <FiChevronLeft className={isRTL ? 'rotate-180' : ''} />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => paginate(page)}
                      className={`cursor-pointer w-10 h-10 rounded-full mx-1 font-medium ${page === currentPage
                        ? 'bg-[#055BA4] text-white'
                        : 'bg-white dark:bg-[#031A3D] hover:bg-slate-100 dark:hover:bg-[#055BA4]/30 text-[#055BA4] dark:text-slate-300 border border-slate-300 dark:border-[#055BA4]/30'
                        }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`flex items-center justify-center w-10 h-10 rounded-full ml-2 disabled:opacity-50 disabled:cursor-not-allowed ${currentPage === totalPages
                      ? 'bg-gray-200 dark:bg-[#055BA4]/30 text-gray-500'
                      : 'bg-white dark:bg-[#031A3D] hover:bg-slate-100 dark:hover:bg-[#055BA4]/30 text-[#055BA4] dark:text-slate-300 border border-slate-300 dark:border-[#055BA4]/30'
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
      <section className="py-16 bg-[#41ADE8]/10 dark:bg-[#031A3D]/50">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12`}>
            <motion.h2
              className="text-3xl font-bold text-[#031A3D] dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {t('projects.technologies.title1')} <span className="text-[#055BA4] dark:text-[#41ADE8]">{t('projects.technologies.title2')}</span>
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
              className="text-lg text-[#055BA4] dark:text-slate-400 max-w-2xl mx-auto"
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
                className="bg-white dark:bg-[#031A3D] p-4 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow group"
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
                <span className="text-[#055BA4] dark:text-slate-300 font-medium group-hover:text-[#055BA4] dark:group-hover:text-[#41ADE8] transition-colors">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 bg-gradient-to-r from-[#055BA4] to-[#41ADE8] dark:from-[#055BA4] dark:to-[#41ADE8] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#055BA4]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-[#41ADE8]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              className="text-3xl font-bold mb-6"
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
              <div className="h-1 bg-gradient-to-r from-transparent via-[#41ADE8] to-transparent w-48"></div>
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
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-white to-slate-100 text-[#055BA4] hover:text-[#054A85] shadow-lg shadow-[#055BA4]/30 dark:shadow-[#41ADE8]/40 hover:shadow-[#055BA4]/40 font-bold"
              >
                <Link to="/devis">
                  {t('home.cta.button')}
                  <FiArrowRight className={`ml-2 ${isRTL ? 'transform rotate-180' : ''}`} size={20} />
                </Link>
              </Button>
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