import React, { useRef } from 'react';
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
  FiCheck 
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
import { FaJava } from 'react-icons/fa';

const getTechIcon = (tech) => {
  const icons = {
    'React': <SiReact className="text-[#41ADE8]" />,
    'Vue.js': <SiVuedotjs className="text-[#055BA4]" />,
    'Laravel': <SiLaravel className="text-[#031A3D]" />,
    'Java': <FaJava className="text-[#055BA4]" />,
    'Tailwind CSS': <SiTailwindcss className="text-[#41ADE8]" />,
    'Figma': <SiFigma className="text-[#055BA4]" />,
    'MySQL': <SiMysql className="text-[#031A3D]" />,
    'Node.js': <SiNodedotjs className="text-[#41ADE8]" />
  };

  return icons[tech] || <FiCode className="text-[#055BA4]" />;
};

const ProjectDetailModal = ({ 
  selectedProject, 
  setSelectedProject, 
  isRTL, 
  direction, 
  flexDirection, 
  marginIcon, 
  textAlign, 
  t 
}) => {
  const projectRef = useRef(null);

  if (!selectedProject) return null;

  return (
    <AnimatePresence>
      {selectedProject && (
        <motion.div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            className="bg-white dark:bg-[#031A3D] rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 25 }}
            ref={projectRef}
            onClick={(e) => e.stopPropagation()}
            dir={direction}
          >
            {/* Modal Header */}
            <div className={`sticky top-0 bg-white dark:bg-[#031A3D] z-10 p-6 border-b border-[#41ADE8]/20 dark:border-[#055BA4]/30 flex justify-between items-center`}>
              <h2 className="text-2xl font-bold text-[#031A3D] dark:text-white">
                {selectedProject.title}
              </h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-[#055BA4] dark:text-[#41ADE8] hover:text-[#031A3D] dark:hover:text-white p-1 rounded-full hover:bg-[#41ADE8]/10 dark:hover:bg-[#055BA4]/20"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 ${isRTL ? 'rtl-grid' : ''}`}>
                <div className="lg:col-span-2">
                  <div className="relative rounded-xl overflow-hidden mb-6">
                    <div className="bg-gradient-to-r from-[#055BA4] to-[#41ADE8] w-full h-80" />
                    <div className={`absolute bottom-4 ${isRTL ? 'right-4' : 'left-4'} bg-[#031A3D]/80 text-white py-1 px-3 rounded-full text-sm`}>
                      {selectedProject.images[0].caption}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {selectedProject.images.slice(1).map((image) => (
                      <div key={image.id} className="relative rounded-lg overflow-hidden h-32">
                        <div className="bg-gradient-to-r from-[#055BA4] to-[#41ADE8] w-full h-full" />
                        <div className={`absolute bottom-2 ${isRTL ? 'right-2' : 'left-2'} bg-[#031A3D]/80 text-white py-1 px-2 rounded-full text-xs`}>
                          {image.caption}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className={`text-lg font-bold text-[#031A3D] dark:text-white mb-3 flex items-center`}>
                        <FiLayers className={`${marginIcon} text-[#055BA4] dark:text-[#41ADE8]`} />
                        {t('projects.projectDetails.description')}
                      </h3>
                      <p className={`text-[#055BA4] dark:text-[#41ADE8] ${textAlign}`}>
                        {selectedProject.longDescription}
                      </p>
                    </div>

                    <div>
                      <h3 className={`text-lg font-bold text-[#031A3D] dark:text-white mb-3 flex items-center`}>
                        <FiBriefcase className={`${marginIcon} text-[#055BA4] dark:text-[#41ADE8]`} />
                        {t('projects.projectDetails.client')}
                      </h3>
                      <p className={`text-[#055BA4] dark:text-[#41ADE8] ${textAlign}`}>
                        {selectedProject.client}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className={`bg-[#41ADE8]/10 dark:bg-[#055BA4]/20 rounded-xl p-5 mb-6 ${textAlign}`}>
                    <h3 className="text-lg font-bold text-[#031A3D] dark:text-white mb-4">
                      {t('projects.projectDetails.title')}
                    </h3>

                    <div className="space-y-4">
                      <div className={`flex items-center`}>
                        <div className={`flex-shrink-0 bg-[#055BA4]/10 dark:bg-[#055BA4]/30 p-2 rounded-lg ${isRTL ? 'ml-3' : 'mr-3'}`}>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-[#055BA4]/10 text-[#055BA4] dark:bg-[#055BA4]/30 dark:text-[#41ADE8]">
                            {t(`projects.categories.${selectedProject.category}`)}
                          </span>
                        </div>
                        <div className={`flex items-centre`}>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${selectedProject.status === 'inProgress'
                            ? 'bg-[#055BA4]/10 text-[#055BA4] dark:bg-[#055BA4]/30 dark:text-[#41ADE8]'
                            : 'bg-[#41ADE8]/10 text-[#055BA4] dark:bg-[#41ADE8]/30 dark:text-[#41ADE8]'
                            }`}>
                            {t(`projects.status.${selectedProject.status}`)}
                          </span>
                        </div>
                      </div>

                      <div className={`flex items-start`}>
                        <div className={`flex-shrink-0 bg-[#055BA4]/10 dark:bg-[#055BA4]/30 p-2 rounded-lg ${isRTL ? 'ml-3' : 'mr-3'}`}>
                          <FiCalendar className="text-[#055BA4] dark:text-[#41ADE8]" />
                        </div>
                        <div>
                          <p className={`font-medium text-[#031A3D] dark:text-white ${textAlign}`}>
                            {selectedProject.period}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className={`text-lg font-bold text-[#031A3D] dark:text-white mb-3 flex items-center`}>
                      <FiCode className={`${marginIcon} text-[#055BA4] dark:text-[#41ADE8]`} />
                      {t('projects.projectDetails.technologies')}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <div key={index} className={`flex items-center bg-[#41ADE8]/10 dark:bg-[#055BA4]/20 px-3 py-1.5 rounded-full`}>
                          <span className={`${marginIcon}`}>{getTechIcon(tech)}</span>
                          <span className="text-sm text-[#055BA4] dark:text-[#41ADE8]">{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className={`text-lg font-bold text-[#031A3D] dark:text-white mb-3 flex items-center`}>
                      <FiLayers className={`${marginIcon} text-[#055BA4] dark:text-[#41ADE8]`} />
                      {t('projects.projectDetails.features')}
                    </h3>
                    <ul className={`space-y-2 ${textAlign}`}>
                      {selectedProject.features.map((feature, index) => (
                        <li key={index} className={`flex items-start`}>
                          <div className={`flex-shrink-0 mt-1 ${isRTL ? 'ml-3' : 'mr-3'}`}>
                            <div className="w-2 h-2 bg-[#055BA4] dark:bg-[#41ADE8] rounded-full"></div>
                          </div>
                          <span className="text-[#055BA4] dark:text-[#41ADE8]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className={`text-lg font-bold text-[#031A3D] dark:text-white mb-3 flex items-center`}>
                      <FiUsers className={`${marginIcon} text-[#055BA4] dark:text-[#41ADE8]`} />
                      {t('projects.projectDetails.results')}
                    </h3>
                    <ul className={`space-y-2 ${textAlign}`}>
                      {selectedProject.results.map((result, index) => (
                        <li key={index} className={`flex items-start`}>
                          <div className={`flex-shrink-0 mt-1 ${isRTL ? 'ml-3' : 'mr-3'} text-[#055BA4] dark:text-[#41ADE8]`}>
                            <FiCheck />
                          </div>
                          <span className="text-[#055BA4] dark:text-[#41ADE8]">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className={`mt-8 pt-6 border-t border-[#41ADE8]/20 dark:border-[#055BA4]/30 flex ${isRTL ? 'justify-start' : 'justify-end'} gap-3`}>
                {selectedProject.link && (
                  <button
                    className={`px-4 py-2 border border-[#41ADE8]/30 dark:border-[#055BA4]/30 rounded-lg text-[#055BA4] dark:text-[#41ADE8] hover:bg-[#41ADE8]/10 dark:hover:bg-[#055BA4]/20 flex items-center ${flexDirection}`}
                    onClick={() => window.open(selectedProject.link, '_blank')}
                  >
                    <FiExternalLink className={`${marginIcon}`} />
                    {t('projects.projectDetails.visitSite')}
                  </button>
                )}

                {selectedProject.github && (
                  <button
                    className={`px-4 py-2 bg-gradient-to-r from-[#055BA4] to-[#41ADE8] hover:from-[#054A85] hover:to-[#2E8BC0] text-white rounded-lg flex items-center ${flexDirection}`}
                    onClick={() => window.open(selectedProject.github, '_blank')}
                  >
                    <FiGithub className={`${marginIcon}`} />
                    {t('projects.projectDetails.viewCode')}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailModal;