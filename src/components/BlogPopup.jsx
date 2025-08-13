import React from 'react';
import { motion } from 'framer-motion';
import { X, BookOpen, Calendar, User, ChevronLeft, ChevronRight } from 'lucide-react';

const BlogPopup = ({ blog, onClose }) => {
  return (
    <motion.div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        transition={{ type: "spring", damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Détails de l'article
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="relative rounded-xl overflow-hidden mb-6">
            <div className="bg-gray-200 border-2 border-dashed w-full h-96" />
          </div>
          
          <div className="mb-8">
            <span className="inline-block px-3 py-1 bg-teal-100 dark:bg-teal-900/20 text-teal-800 dark:text-teal-300 text-sm rounded-full mb-4">
              {blog.category}
            </span>
            
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              {blog.title}
            </h1>
            
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-6">
              <div className="flex items-center mr-6">
                <Calendar className="mr-2" size={18} />
                <span>{blog.date}</span>
              </div>
              <div className="flex items-center">
                <User className="mr-2" size={18} />
                <span>Mounir Mehdi</span>
              </div>
            </div>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2>Introduction aux tendances web 2024</h2>
            <p>
              Le paysage du développement web évolue à une vitesse fulgurante. En 2024, nous observons plusieurs tendances majeures qui transforment la façon dont nous construisons les applications web.
            </p>
            
            <h3>Les frameworks JavaScript continuent de dominer</h3>
            <p>
              React, Vue et Angular restent les frameworks les plus populaires, mais de nouveaux venus comme Svelte et SolidJS gagnent rapidement en popularité grâce à leurs performances exceptionnelles.
            </p>
            
            <h3>L'essor des architectures JAMstack</h3>
            <p>
              Les sites statiques avec des fonctions serverless (JAMstack) offrent désormais des performances inégalées. Des plateformes comme Next.js, Gatsby et Nuxt.js permettent de créer des applications complexes avec des temps de chargement quasi-instantanés.
            </p>
            
            <h3>WebAssembly change la donne</h3>
            <p>
              Avec WebAssembly, il est désormais possible d'exécuter du code compilé (C++, Rust) dans le navigateur, ouvrant la voie à des applications web aux performances proches du natif.
            </p>
          </div>
          
          <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-between">
            <Button variant="outline">
              <ChevronLeft className="mr-2" size={18} />
              Article précédent
            </Button>
            <Button variant="outline">
              Article suivant
              <ChevronRight className="ml-2" size={18} />
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BlogPopup;