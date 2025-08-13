import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowRight,
  Layout,
  Cpu,
  BarChart,
  Users,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { 
  FiCode, 
  FiSmartphone, 
  FiSearch, 
  FiBarChart2,
  FiServer,
  FiLayers,
  FiCheckCircle,
  FiLayout,
  FiCloud,
  FiBarChart,
  FiShoppingCart,
  FiGrid,
  FiShare2,
  FiUsers,
  FiCheck, FiArrowRight, FiStar
} from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const Services = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';
  const textAlign = isRTL ? 'text-right' : 'text-left';
  const flexDirection = isRTL ? 'flex-row-reverse' : 'flex-row';
  const marginIcon = isRTL ? 'ml-2' : 'mr-2';
  const arrowIcon = isRTL ? 'rotate-180' : '';

  useEffect(() => {
    document.title = t('services.meta.title');
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('services.meta.description'));
  }, [t]);

  const services = [
    {
      icon: FiLayout,
      title: t('services.services.web.title'),
      description: t('services.services.web.description'),
      features: t('services.services.web.features', { returnObjects: true }),
      technologies: t('services.services.web.technologies', { returnObjects: true })
    },
    {
      icon: FiGrid,
      title: t('services.services.app.title'),
      description: t('services.services.app.description'),
      features: t('services.services.app.features', { returnObjects: true }),
      technologies: t('services.services.app.technologies', { returnObjects: true })
    },
    {
      icon: FiSmartphone,
      title: t('services.services.mobile.title'),
      description: t('services.services.mobile.description'),
      features: t('services.services.mobile.features', { returnObjects: true }),
      technologies: t('services.services.mobile.technologies', { returnObjects: true })
    },
    {
      icon: FiBarChart,
      title: t('services.services.marketing.title'),
      description: t('services.services.marketing.description'),
      features: t('services.services.marketing.features', { returnObjects: true }),
      technologies: t('services.services.marketing.technologies', { returnObjects: true })
    }
  ];

  const processSteps = t('services.processSteps', { returnObjects: true });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    hover: {
      y: -10,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div 
      className="pt-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800"
      dir={direction}
    >
      <section className="py-40 bg-gradient-to-br from-slate-50 to-teal-50 dark:from-slate-900 dark:to-teal-900/20">
        <div className="container mx-auto px-4">
          <motion.div 
            className={`text-center max-w-4xl mx-auto`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-slate-800 dark:text-white mb-6">
              {t('services.hero.title1')}{' '}
              <span className="text-teal-600 dark:text-teal-400">
                {t('services.hero.title2')}
              </span>
            </h1>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%" }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex justify-center mb-6"
            >
              <div className="h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent w-48"></div>
            </motion.div>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              {t('services.hero.subtitle')}
            </p>
            <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600">
              <Link to="/contact">
                {t('services.hero.button')}
                <ArrowRight className={`${arrowIcon} ${isRTL ? 'mr-2' : 'ml-2'}`} size={20} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 dark:opacity-5">
          <div className="absolute top-1/4 -left-40 w-96 h-96 bg-teal-500 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-1/3 -right-40 w-96 h-96 bg-purple-500 rounded-full blur-[150px]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className={`text-center mb-16`}>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {t('services.services.title1')}{' '}
              <span className="text-teal-600 dark:text-teal-400">
                {t('services.services.title2')}
              </span>
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
              className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {t('services.services.subtitle')}
            </motion.p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:max-w-[800px] gap-6 mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {services.map((service, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="h-full lg:max-w-[800px]"
                whileHover="hover"
              >
                <div className="group h-full bg-white dark:bg-slate-800/30 backdrop-blur-sm border border-slate-200 dark:border-slate-700/60 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-teal-300/50 dark:hover:border-teal-500/50 relative">
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-purple-500/5 dark:from-teal-700/5 dark:to-purple-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 border border-slate-200 dark:border-slate-700/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="relative z-10 p-6 h-full flex flex-col">
                    <div className="text-center mb-4">
                      <motion.div 
                        className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform duration-300"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                      >
                        <service.icon className="text-white text-2xl" />
                      </motion.div>
                      <motion.h3 
                        className="text-xl font-bold text-slate-800 dark:text-white"
                        whileHover={{ color: "#0d9488" }}
                        transition={{ duration: 0.2 }}
                      >
                        {service.title}
                      </motion.h3>
                    </div>
                    
                    <p className="text-slate-600 dark:text-slate-400 mb-5 text-center">
                      {service.description}
                    </p>
                    
                    <div className="mb-5">
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center">
                        <span className="bg-slate-200 dark:bg-slate-700/50 h-px flex-grow mr-3"></span>
                        {t('services.services.featuresTitle')}
                        <span className="bg-slate-200 dark:bg-slate-700/50 h-px flex-grow ml-3"></span>
                      </h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li 
                            key={featureIndex} 
                            className="flex items-start text-sm text-slate-700 dark:text-slate-300"
                            style={{ direction }}
                          >
                            <FiCheck className={`text-teal-600 dark:text-teal-400 ${marginIcon} mt-0.5 flex-shrink-0`} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-auto pt-4">
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center">
                        <span className="bg-slate-200 dark:bg-slate-700/50 h-px flex-grow mr-3"></span>
                        {t('services.services.techTitle')}
                        <span className="bg-slate-200 dark:bg-slate-700/50 h-px flex-grow ml-3"></span>
                      </h4>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {service.technologies.map((tech, techIndex) => (
                          <motion.span 
                            key={techIndex}
                            className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 rounded-full text-xs font-medium backdrop-blur-sm"
                            whileHover={{ 
                              scale: 1.1,
                              backgroundColor: "rgba(13, 148, 136, 0.1)",
                              color: "#0d9488",
                              border: "1px solid rgba(13, 148, 136, 0.3)"
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Button 
              asChild 
              size="lg" 
              variant="outline"
              className="border-teal-600 text-teal-600 dark:text-teal-400 dark:border-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 font-medium group"
            >
              <Link to="/devis">
                <span className="group-hover:translate-x-1 transition-transform">
                  {t('services.services.ctaButton')}
                </span>
                <FiArrowRight className={`${arrowIcon} ${isRTL ? 'mr-2' : 'ml-2'} inline-block group-hover:translate-x-1 transition-transform`} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16`}>
            <motion.h2 
              className="text-4xl font-bold text-slate-800 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {t('services.process.title1')}{' '}
              <span className="text-teal-600 dark:text-teal-400">
                {t('services.process.title2')}
              </span>
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
              className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {t('services.process.subtitle')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div 
                key={index}
                className="bg-white dark:bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-200 dark:border-slate-700 text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Layout className="text-teal-600 dark:text-teal-400" size={32} />
                </div>
                <span className="inline-block bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-sm font-medium mb-3">
                  {step.step}
                </span>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">{step.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${flexDirection}`}>
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-teal-600/10 dark:bg-teal-400/10 rounded-2xl rotate-3"></div>
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96" />
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-6 text-center">
                {t('services.why.title1')}{' '}
                <span className="text-teal-600 dark:text-teal-400">
                  {t('services.why.title2')}
                </span>
              </h2>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%" }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex justify-center mb-6"
            >
              <div className="h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent w-48"></div>
            </motion.div>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
                {t('services.why.subtitle')}
              </p>
              
              <div className="space-y-6">
                {t('services.why.features', { returnObjects: true }).map((item, index) => (
                  <motion.div 
                    key={index}
                    className={`flex items-start ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}
                    whileHover={{ x: isRTL ? -10 : 10 }}
                  >
                    <div className={`flex-shrink-0 mt-1 ${isRTL ? 'ml-2' : 'mr-2'}`}>
                      <ShieldCheck className="text-teal-600 dark:text-teal-400" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200">{item.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-700 dark:from-teal-700 dark:to-teal-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t('services.cta.title')}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {t('services.cta.subtitle')}
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Button asChild size="lg" className="bg-white text-teal-600 hover:bg-slate-100 dark:bg-slate-100 dark:text-teal-700">
              <Link to="/contact">
                {t('services.cta.button1')}
                <ArrowRight className={`${arrowIcon} ${isRTL ? 'mr-2' : 'ml-2'}`} size={20} />
              </Link>
            </Button>
            <Button asChild size="lg" className="border-white text-white hover:bg-white/10">
              <Link to="/projects">{t('services.cta.button2')}</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Services;