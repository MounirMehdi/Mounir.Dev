import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock, 
  User, 
  Search,
  ArrowRight,
  Tag,
  Mail,
  BookOpen,
  TrendingUp,
  LayoutGrid,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import BlogDetail from '../components/blogs/BlogDetail';
import { useTranslation } from "react-i18next";

// Mapping des icônes
const iconComponents = {
  LayoutGrid,
  BookOpen,
  TrendingUp
};

const Blog = () => {
  const { t, i18n } = useTranslation('translation');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showCategories, setShowCategories] = useState(false);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const categoriesRef = useRef(null);
  
  const isRTL = i18n.language === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';
  const textAlign = isRTL ? 'text-right' : 'text-left';
  const flexDirection = isRTL ? 'flex-row-reverse' : 'flex-row';

  // Récupération des données de traduction
  const blogData = t('blog', { returnObjects: true });
  
  // Extraction des données
  const {
    title: blogTitle,
    subtitle,
    searchPlaceholder,
    categories,
    filters,
    featuredPostTitle,
    recentPostsTitle,
    foundPostsTitle,
    noPostsFound,
    viewAllPosts,
    aboutTitle,
    aboutDescription,
    popularTagsTitle,
    newsletterTitle,
    newsletterDescription,
    newsletterPlaceholder,
    newsletterButton,
    readMore,
    read,
    close,
    leaveComment,
    categoriesButton,
    categoriesList = [],
    popularTags = []
  } = blogData;

  const blogPosts = t('blogPosts', { returnObjects: true });
  useEffect(() => {
    setIsVisible(true);
    
    const timer = setTimeout(() => {
      const searchInput = document.getElementById('search-input');
      if (searchInput) {
        searchInput.focus();
      }
    }, 500);

    // Gestion du scroll pour le header
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Fermer le dropdown des catégories en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
        setShowCategories(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.every(tag => post.tags.includes(tag));
      
      return matchesSearch && matchesCategory && matchesTags;
    });
  }, [blogPosts, searchTerm, selectedCategory, selectedTags]);

  const featuredPost = blogPosts[0];
  const recentPosts = blogPosts.slice(1, 4);

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedTags([]);
  };

  const openPostDetail = (post) => {
    setSelectedPost(post);
    document.body.style.overflow = 'hidden';
  };

  const closePostDetail = () => {
    setSelectedPost(null);
    document.body.style.overflow = 'auto';
  };

  // Variants d'animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  // Formater la date selon la locale
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(i18n.language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div 
      className="pt-16 bg-gradient-to-b from-white to-slate-50 dark:from-[#031A3D] dark:to-[#031A3D]/90 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      dir={direction}
    >
      {/* Hero Section améliorée */}
      <section className="relative py-24 bg-gradient-to-br from-[#41ADE8]/20 to-[#055BA4]/20 dark:from-[#031A3D] dark:to-[#055BA4]/30 overflow-hidden">
        {/* Shapes décoratifs */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 dark:opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 bg-[#41ADE8] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#055BA4] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-[#031A3D] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className={`text-center max-w-3xl mx-auto`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#031A3D] dark:text-white mb-6 leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-[#055BA4] to-[#41ADE8] dark:from-[#055BA4] dark:to-[#41ADE8] bg-clip-text text-transparent">
                {blogTitle}
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
              className="text-xl text-[#055BA4] dark:text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {subtitle}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="relative max-w-xl mx-auto"
            >
              <Search className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 transform -translate-y-1/2 text-[#055BA4]`} size={20} />
              <input
                id="search-input"
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full ${isRTL ? 'pr-12' : 'pl-12'} py-4 bg-white dark:bg-[#031A3D]/80 backdrop-blur-sm border border-[#41ADE8]/20 dark:border-[#055BA4]/30 rounded-xl focus:ring-2 focus:ring-[#055BA4] focus:border-transparent transition-all shadow-lg`}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Filtres améliorés avec sticky header */}
      <motion.section 
        className={`sticky top-0 z-30 py-4 bg-white/90 dark:bg-[#031A3D]/90 backdrop-blur-md border-b border-[#41ADE8]/20 dark:border-[#055BA4]/30 transition-all duration-300 ${
          isHeaderScrolled ? 'shadow-md' : ''
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Catégories */}
            <div className="relative" ref={categoriesRef}>
              <button 
                onClick={() => setShowCategories(!showCategories)}
                className={`flex items-center gap-2 px-4 py-2.5 bg-[#41ADE8]/10 dark:bg-[#055BA4]/20 text-[#031A3D] dark:text-slate-200 rounded-xl hover:bg-[#41ADE8]/20 dark:hover:bg-[#055BA4]/30 transition-colors cursor-pointer`}
              >
                <LayoutGrid size={18} />
                <span className="font-medium">{categoriesButton}</span>
                {showCategories ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              
              <AnimatePresence>
                {showCategories && (
                  <motion.div 
                    className={`absolute z-40 mt-2 w-64 bg-white dark:bg-[#031A3D]/95 backdrop-blur-sm rounded-xl border border-[#41ADE8]/20 dark:border-[#055BA4]/30 shadow-2xl py-2 ${textAlign}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {categoriesList.map((category) => {
                      const IconComponent = iconComponents[category.icon];
                      return (
                        <button
                          key={category.id}
                          onClick={() => {
                            setSelectedCategory(category.id);
                            setShowCategories(false);
                          }}
                          className={`w-full px-4 py-3 flex items-center gap-3 ${
                            selectedCategory === category.id 
                              ? 'bg-[#055BA4]/10 dark:bg-[#055BA4]/40 text-[#055BA4] dark:text-[#41ADE8]' 
                              : 'hover:bg-[#41ADE8]/10 dark:hover:bg-[#055BA4]/20'
                          } transition-colors`}
                        >
                          {IconComponent && <IconComponent size={18} className="flex-shrink-0" />}
                          <span className="font-medium">{categories[category.id]}</span>
                          {selectedCategory === category.id && (
                            <div className={`ml-auto ${isRTL ? 'mr-auto' : 'ml-auto'}`}>
                              <div className="w-2 h-2 bg-[#055BA4] dark:bg-[#41ADE8] rounded-full"></div>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Filtres actifs */}
            <div className={`flex flex-wrap gap-3`}>
              {(selectedCategory !== 'all' || selectedTags.length > 0 || searchTerm) && (
                <motion.button 
                  onClick={resetFilters}
                  className={`px-3 py-1.5 text-[#055BA4] dark:text-slate-300 hover:text-[#031A3D] dark:hover:text-slate-100 text-sm flex items-center gap-1.5 bg-[#41ADE8]/10 dark:bg-[#055BA4]/20 rounded-lg font-medium`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={16} /> {filters?.resetButton || "Réinitialiser"}
                </motion.button>
              )}
              
              {selectedCategory !== 'all' && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`px-3 py-1.5 bg-[#055BA4]/10 dark:bg-[#055BA4]/40 text-[#055BA4] dark:text-[#41ADE8] rounded-lg text-sm flex items-center gap-2 font-medium`}
                >
                  {categories[selectedCategory]}
                  <button 
                    onClick={() => setSelectedCategory('all')}
                    className="text-[#055BA4] dark:text-[#41ADE8] hover:text-[#031A3D] dark:hover:text-white"
                  >
                    <X size={14} />
                  </button>
                </motion.div>
              )}
              
              {selectedTags.map(tag => (
                <motion.div
                  key={tag}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`px-3 py-1.5 bg-[#41ADE8]/10 dark:bg-[#41ADE8]/40 text-[#055BA4] dark:text-[#41ADE8] rounded-lg text-sm flex items-center gap-2 font-medium`}
                >
                  #{tag}
                  <button 
                    onClick={() => toggleTag(tag)}
                    className="text-[#055BA4] dark:text-[#41ADE8] hover:text-[#031A3D] dark:hover:text-white"
                  >
                    <X size={14} />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Article */}
            {searchTerm === '' && selectedCategory === 'all' && selectedTags.length === 0 && featuredPost && (
              <motion.div 
                className="mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h2 className={`text-2xl font-bold text-[#031A3D] dark:text-white mb-6 ${textAlign}`}>
                  {featuredPostTitle}
                </h2>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-[#031A3D]/50 backdrop-blur-sm rounded-2xl border border-[#41ADE8]/20 dark:border-[#055BA4]/30 overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer group"
                  onClick={() => openPostDetail(featuredPost)}
                >
                  <div className="relative h-64 md:h-80 lg:h-96">
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#031A3D]/80 to-transparent"></div>
                    <div className={`absolute bottom-0 left-0 right-0 p-6 ${textAlign}`}>
                      <div className={`flex items-center gap-3 mb-3`}>
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-[#055BA4] shadow-md`}>
                          <BookOpen className="text-white" size={20} />
                        </div>
                        <div>
                          <span className="text-sm font-medium text-white">
                            {categories[featuredPost.category]}
                          </span>
                          <div className={`flex items-center gap-2 text-sm text-slate-200`}>
                            <span className="flex items-center gap-1">
                              <User size={14} />
                              {featuredPost.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar size={14} />
                              {formatDate(featuredPost.date)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        {featuredPost.title}
                      </h3>
                      
                      <p className="text-slate-200 mb-4 max-w-3xl">
                        {featuredPost.excerpt}
                      </p>
                      
                      <div className={`flex flex-wrap items-center justify-between gap-3`}>
                        <div className="flex flex-wrap gap-2">
                          {featuredPost.tags.map((tag, index) => (
                            <motion.span 
                              key={index}
                              className="px-3 py-1 bg-white/20 text-white rounded-full text-xs font-medium hover:bg-white/30 transition-colors cursor-pointer"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleTag(tag);
                              }}
                            >
                              #{tag}
                            </motion.span>
                          ))}
                        </div>
                        <Button className="bg-white text-[#055BA4] hover:bg-slate-100 shadow-md group-hover:bg-[#055BA4] group-hover:text-white transition-colors cursor-pointer">
                          {readMore}
                          <ArrowRight className={`ml-2 transition-transform group-hover:translate-x-1 ${isRTL ? 'transform rotate-180' : ''}`} size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Articles Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              <div className={`flex flex-wrap items-center justify-between mb-6 gap-4 ${textAlign}`}>
                <h2 className="text-2xl font-bold text-[#031A3D] dark:text-white">
                  {searchTerm || selectedCategory !== 'all' || selectedTags.length > 0 ? foundPostsTitle : recentPostsTitle}
                </h2>
                <span className="text-[#055BA4] dark:text-slate-400 font-medium">
                  {filteredPosts.length} {filteredPosts.length !== 1 ? t('blog.articles') : t('blog.article')}
                </span>
              </div>
              
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPosts.map((post) => (
                    <motion.div 
                      key={post.id}
                      variants={itemVariants}
                      whileHover={{ y: -10 }}
                    >
                      <div 
                        className="bg-white dark:bg-[#031A3D]/50 backdrop-blur-sm border border-[#41ADE8]/20 dark:border-[#055BA4]/30 rounded-xl overflow-hidden group hover:shadow-xl transition-all h-full cursor-pointer"
                        onClick={() => openPostDetail(post)}
                      >
                        <div className="relative h-48">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'}`}>
                            <span className={`px-3 py-1.5 text-xs font-medium text-white rounded-full bg-[#055BA4] shadow-md`}>
                              {categories[post.category]}
                            </span>
                          </div>
                        </div>
                        
                        <div className={`p-5 h-full flex flex-col ${textAlign}`}>
                          <div className={`flex items-center gap-3 mb-4`}>
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-[#055BA4] shadow-md`}>
                              <BookOpen className="text-white" size={20} />
                            </div>
                            <div>
                              <div className={`flex items-center gap-2 text-xs text-[#055BA4] dark:text-slate-400`}>
                                <span className="flex items-center gap-1">
                                  <Calendar size={12} />
                                  {formatDate(post.date)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock size={12} />
                                  {post.readTime}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <h3 className="text-xl font-bold text-[#031A3D] dark:text-white mb-3 group-hover:text-[#055BA4] dark:group-hover:text-[#41ADE8] transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          
                          <p className="text-[#055BA4] dark:text-slate-300 mb-4 flex-grow line-clamp-3">
                            {post.excerpt}
                          </p>
                          
                          <div className={`flex items-center justify-between mt-auto`}>
                            <div className="flex flex-wrap gap-2">
                              {post.tags.slice(0, 2).map((tag, index) => (
                                <motion.span 
                                  key={index}
                                  className="px-2.5 py-1 bg-[#41ADE8]/10 dark:bg-[#055BA4]/20 text-[#055BA4] dark:text-[#41ADE8] rounded-lg text-xs font-medium hover:bg-[#41ADE8]/20 dark:hover:bg-[#055BA4]/30 transition-colors"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleTag(tag);
                                  }}
                                >
                                  #{tag}
                                </motion.span>
                              ))}
                            </div>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="text-[#055BA4] dark:text-[#41ADE8] hover:bg-[#055BA4]/10 dark:hover:bg-[#055BA4]/20 group-hover:bg-[#055BA4]/10 dark:group-hover:bg-[#055BA4]/20"
                            >
                              {read}
                              <ArrowRight className={`ml-1.5 transition-transform group-hover:translate-x-1 ${isRTL ? 'transform rotate-180' : ''}`} size={14} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div 
                  className={`text-center py-16 ${textAlign}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-[#41ADE8]/10 dark:bg-[#055BA4]/20 rounded-full mb-6">
                    <Search className="text-[#055BA4] dark:text-[#41ADE8]" size={32} />
                  </div>
                  <p className="text-[#055BA4] dark:text-slate-300 text-xl mb-4 font-medium">
                    {noPostsFound}
                  </p>
                  <Button 
                    onClick={resetFilters}
                    className="mt-4"
                    variant="outline"
                  >
                    {viewAllPosts}
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-8 sticky top-24">
              {/* About */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <div className={`bg-white dark:bg-[#031A3D]/50 backdrop-blur-sm rounded-xl border border-[#41ADE8]/20 dark:border-[#055BA4]/30 p-6 ${textAlign}`}>
                  <h3 className="text-lg font-semibold text-[#031A3D] dark:text-white mb-4">
                    {aboutTitle}
                  </h3>
                  <p className="text-[#055BA4] dark:text-slate-300 text-sm leading-relaxed mb-4">
                    {aboutDescription}
                  </p>
                  <div className="flex gap-3">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="w-10 h-10 bg-[#41ADE8]/10 dark:bg-[#055BA4]/20 rounded-full flex items-center justify-center transition-transform hover:scale-110 cursor-pointer">
                        <div className="bg-[#055BA4] dark:bg-[#41ADE8] rounded-full w-8 h-8"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Popular Tags */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <div className={`bg-white dark:bg-[#031A3D]/50 backdrop-blur-sm rounded-xl border border-[#41ADE8]/20 dark:border-[#055BA4]/30 p-6 ${textAlign}`}>
                  <h3 className="text-lg font-semibold text-[#031A3D] dark:text-white mb-4">
                    {popularTagsTitle}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleTag(tag)}
                        className={`cursor-pointer px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center ${
                          selectedTags.includes(tag)
                            ? 'bg-[#055BA4] text-white shadow-md'
                            : 'bg-[#41ADE8]/10 dark:bg-[#055BA4]/20 text-[#055BA4] dark:text-[#41ADE8] hover:bg-[#41ADE8]/20 dark:hover:bg-[#055BA4]/30'
                        }`}
                      >
                        <Tag size={14} className={`${isRTL ? 'ml-1.5' : 'mr-1.5'}`} />
                        {tag}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Recent Posts */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                <div className={`bg-white dark:bg-[#031A3D]/50 backdrop-blur-sm rounded-xl border border-[#41ADE8]/20 dark:border-[#055BA4]/30 p-6 ${textAlign}`}>
                  <h3 className="text-lg font-semibold text-[#031A3D] dark:text-white mb-4">
                    {recentPostsTitle}
                  </h3>
                  <div className="space-y-4">
                    {recentPosts.map((post) => (
                      <motion.div 
                        key={post.id} 
                        className="group"
                        whileHover={{ x: isRTL ? -5 : 5 }}
                      >
                        <div 
                          className={`flex items-start gap-3 cursor-pointer`}
                          onClick={() => openPostDetail(post)}
                        >
                          <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden shadow-sm">
                            <img 
                              src={post.image} 
                              alt={post.title}
                              className="w-full h-full object-cover transition-transform group-hover:scale-110"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-[#031A3D] dark:text-slate-200 group-hover:text-[#055BA4] dark:group-hover:text-[#41ADE8] transition-colors line-clamp-2 mb-1">
                              {post.title}
                            </h4>
                            <div className={`flex items-center gap-2 text-xs text-[#055BA4] dark:text-slate-400`}>
                              <Calendar size={12} />
                              <span>{formatDate(post.date)}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Newsletter */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <div className={`bg-gradient-to-br from-[#055BA4] to-[#41ADE8] dark:from-[#055BA4] dark:to-[#41ADE8] rounded-xl p-6 text-white ${textAlign} shadow-lg`}>
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {newsletterTitle}
                  </h3>
                  <p className="text-blue-100 text-sm mb-4">
                    {newsletterDescription}
                  </p>
                  <div className="relative mb-3">
                    <input 
                      type="email" 
                      placeholder={newsletterPlaceholder}
                      className={`w-full py-3 bg-white/20 backdrop-blur-sm text-white placeholder-blue-200 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent border border-blue-300 transition-all ${isRTL ? 'pr-4 pl-10' : 'pl-4 pr-10'}`}
                    />
                    <Mail className={`absolute top-1/2 transform -translate-y-1/2 text-blue-200 ${isRTL ? 'left-3' : 'right-3'}`} size={16} />
                  </div>
                  <Button className="w-full bg-white text-[#055BA4] hover:bg-slate-100 font-medium shadow-md">
                    {newsletterButton}
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Post Detail Modal */}
      <BlogDetail 
        selectedPost={selectedPost} 
        onClose={closePostDetail}
        t={t}
        formatDate={formatDate}
        isRTL={isRTL}
        categories={categories}
      />
    </motion.div>
  )
}

export default Blog;