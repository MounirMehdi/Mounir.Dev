import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';

const BlogCard = ({ blog, index, onClick }) => {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1
      }}
      whileHover={{ y: -10 }}
    >
      <div 
        className="h-full bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-xl transition-all cursor-pointer"
        onClick={onClick}
      >
        <div className="relative h-48">
          <div className="bg-gray-200 border-2 border-dashed w-full h-full" />
        </div>
        
        <div className="p-6">
          <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mb-4">
            <span className="mr-4">{blog.date}</span>
            <span className="flex items-center">
              <Clock className="mr-1" size={14} />
              {blog.readTime}
            </span>
          </div>
          
          <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-3 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            {blog.title}
          </h3>
          
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            {blog.excerpt}
          </p>
          
          <button className="text-teal-600 dark:text-teal-400 font-medium flex items-center group">
            Lire l'article
            <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;