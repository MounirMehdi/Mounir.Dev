import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from '@mui/icons-material';


const ServiceCard = ({ service, index }) => {
  return (
    <motion.div 
      className="h-full"
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 }
      }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      <div className="group h-full border border-slate-200 dark:border-gray-800 hover:border-teal-300 dark:hover:border-teal-500 transition-all duration-300 bg-white/80 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl overflow-hidden p-6 hover:shadow-lg hover:-translate-y-1.5">
        <motion.div 
          className="w-14 h-14 bg-gradient-to-br from-teal-100 to-teal-50 dark:from-teal-900/30 dark:to-teal-800/20 rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:bg-gradient-to-br group-hover:from-teal-500 group-hover:to-teal-400 transition-all duration-300"
          whileHover={{ rotate: 5, scale: 1.05 }}
        >
          <service.icon
            className="text-teal-600 dark:text-teal-400 group-hover:text-white transition-colors duration-300"
            size={28}
          />
        </motion.div>
        
        <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2 text-center">
          {service.title}
        </h3>
        
        <p className="text-slate-600 dark:text-slate-400 text-center mb-4">
          {service.description}
        </p>
        
        <ul className="space-y-2 mt-4">
          {service.features.map((feature, i) => (
            <li key={i} className="flex items-start text-slate-700 dark:text-slate-300">
              <CheckCircle className="text-teal-600 dark:text-teal-400 mr-2 mt-0.5 flex-shrink-0" size={16} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default ServiceCard;