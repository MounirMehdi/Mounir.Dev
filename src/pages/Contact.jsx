import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  CheckCircle,
  User,
  MessageCircle,
  ChevronRight,
  FileText,
  Quote
} from 'lucide-react';
import emailjs from 'emailjs-com';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Contact = () => {
  const { t, i18n } = useTranslation('translation');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef();

  const isRTL = i18n.language === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';
  const textAlign = isRTL ? 'text-right' : 'text-left';
  const flexDirection = isRTL ? 'flex-row-reverse' : 'flex-row';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        'service_pr533zl',
        'template_kmthksv',
        formRef.current,
        'BiECaGzCS4niWGltN'
      );

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Réinitialiser le formulaire après envoi
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 5000);
    } catch (error) {
      console.error("Erreur d'envoi :", error);
      alert(t('contact.errorMessage'));
      setIsSubmitting(false);
    }
  };

  const contactInfo = t('contact.contactInfo', { returnObjects: true });
  const formLabels = t('contact.form', { returnObjects: true });
  const sectionTitles = t('contact.sectionTitles', { returnObjects: true });
  const faqItems = t('contact.faqItems', { returnObjects: true });
  
  // CORRECTION : Récupération correcte des garanties
  const guarantees = t('contact.guarantees', { returnObjects: true }) || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        type: "spring",
        damping: 12
      }
    }
  };

  const hoverVariants = {
    hover: { 
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    }
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-[#031A3D] dark:to-[#031A3D]/90"
      dir={direction}
    >
      {/* Hero Section - Améliorée */}
      <section className="relative py-30 bg-gradient-to-br from-[#41ADE8]/20 to-[#055BA4]/20 dark:from-[#031A3D] dark:to-[#055BA4]/30 overflow-hidden pt-40">
        {/* Effets de fond animés */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 dark:opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 bg-[#41ADE8] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#055BA4] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-[#031A3D] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
            className="text-4xl font-extrabold text-[#031A3D] dark:text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            >
              {t('contact.hero.title1')} <span className="text-[#055BA4] dark:text-[#41ADE8]">{t('contact.hero.title2')}</span>
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
            className="text-xl text-[#055BA4] dark:text-slate-300 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            >
              {t('contact.hero.subtitle')}
            </motion.p>
            
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button asChild className="bg-gradient-to-r from-[#055BA4] to-[#41ADE8] hover:from-[#054A85] hover:to-[#2E8BC0] text-white">
                <a href="#contact-form" className="flex items-center gap-2">
                  <MessageCircle size={18} />
                  {t('contact.hero.contactButton')}
                </a>
              </Button>
              
              <Button asChild variant="secondary" className="bg-white dark:bg-[#031A3D] text-[#055BA4] dark:text-[#41ADE8] border border-[#055BA4]/20 dark:border-[#41ADE8]/20">
                <Link to="/devis" className="flex items-center gap-2">
                  <FileText size={18} />
                  {t('contact.hero.devisButton')}
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12" id="contact-form">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 z">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-[#031A3D]/60 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-[#055BA4]/30 shadow-xl p-8">
              <div className="mb-8">
                <motion.h2 
                  className="text-2xl font-bold text-[#031A3D] dark:text-white mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {sectionTitles.sendMessage}
                </motion.h2>
                <motion.p 
                  className="text-[#055BA4] dark:text-slate-400"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {sectionTitles.sendMessageDesc}
                </motion.p>
              </div>
              
              {isSubmitted ? (
                <motion.div 
                  className="text-center py-10"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#031A3D] dark:text-white mb-3">
                    {t('contact.successTitle')}
                  </h3>
                  <p className="text-[#055BA4] dark:text-slate-400 mb-8 max-w-md mx-auto">
                    {t('contact.successMessage')}
                  </p>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Label htmlFor="name" className="block mb-2 text-[#055BA4] dark:text-slate-300">
                        {formLabels.nameLabel} *
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-[#055BA4]/60" />
                        </div>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder={formLabels.namePlaceholder}
                          className="pl-10 border-[#055BA4]/20 focus:border-[#055BA4]"
                        />
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Label htmlFor="email" className="block mb-2 text-[#055BA4] dark:text-slate-300">
                        {formLabels.emailLabel} *
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-[#055BA4]/60" />
                        </div>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder={formLabels.emailPlaceholder}
                          className="pl-10 border-[#055BA4]/20 focus:border-[#055BA4]"
                        />
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Label htmlFor="subject" className="block mb-2 text-[#055BA4] dark:text-slate-300">
                        {formLabels.subjectLabel} *
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MessageCircle className="h-5 w-5 text-[#055BA4]/60" />
                        </div>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder={formLabels.subjectPlaceholder}
                          className="pl-10 border-[#055BA4]/20 focus:border-[#055BA4]"
                        />
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <Label htmlFor="message" className="block mb-2 text-[#055BA4] dark:text-slate-300">
                        {formLabels.messageLabel} *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder={formLabels.messagePlaceholder}
                        rows={6}
                        className="min-h-[150px] border-[#055BA4]/20 focus:border-[#055BA4]"
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-[#055BA4] to-[#41ADE8] hover:from-[#054A85] hover:to-[#2E8BC0] text-white transition-all transform hover:-translate-y-0.5 cursor-pointer"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            {t('contact.sending')}
                          </>
                        ) : (
                          <>
                            <Send className="mr-2" size={18} />
                            {t('contact.sendMessage')}
                          </>
                        )}
                      </Button>
                    </motion.div>
                    
                    <motion.p 
                      className="text-sm text-[#055BA4] dark:text-slate-400 text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                    >
                      {t('contact.formFooter')}
                    </motion.p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
          
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="sticky top-24 space-y-10">
              {/* WhatsApp Contact Card */}
              <motion.div 
                className="bg-gradient-to-r from-green-600 to-green-700 dark:from-green-700 dark:to-green-800 text-white rounded-2xl shadow-xl overflow-hidden"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-white/20 p-3 rounded-full">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <motion.h3 
                        className="text-xl font-bold mb-1"
                        variants={itemVariants}
                      >
                        {t('contact.whatsapp.title')}
                      </motion.h3>
                      <motion.p 
                        className="opacity-90"
                        variants={itemVariants}
                      >
                        {t('contact.whatsapp.description')}
                      </motion.p>
                    </div>
                  </div>
                  <motion.div variants={itemVariants}>
                    <Button 
                      asChild 
                      className="w-full bg-white text-green-700 hover:bg-green-50 dark:bg-white dark:text-green-700 mt-4"
                    >
                      <a 
                        href={t('contact.whatsapp.link')} 
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t('contact.whatsapp.button')}
                      </a>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Free Quote Card */}
              <motion.div 
                className="bg-gradient-to-r from-[#055BA4] to-[#41ADE8] dark:from-[#055BA4] dark:to-[#41ADE8] text-white rounded-2xl shadow-xl overflow-hidden"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-white/20 p-3 rounded-full">
                      <Quote className="h-6 w-6" />
                    </div>
                    <div>
                      <motion.h3 
                        className="text-xl font-bold mb-1"
                        variants={itemVariants}
                      >
                        {t('contact.devis.title')}
                      </motion.h3>
                      <motion.p 
                        className="opacity-90"
                        variants={itemVariants}
                      >
                        {t('contact.devis.description')}
                      </motion.p>
                    </div>
                  </div>
                  <motion.div variants={itemVariants}>
                    <Button 
                      asChild 
                      className="w-full bg-white text-[#055BA4] hover:bg-[#055BA4]/10 dark:bg-white dark:text-[#055BA4] mt-4"
                    >
                      <Link to="/devis">
                        {t('contact.devis.button')}
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Guarantees */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.h2 
                  className="text-2xl font-bold text-[#031A3D] dark:text-white mb-6"
                  variants={itemVariants}
                >
                  {sectionTitles.guarantees}
                </motion.h2>
                
                <motion.div 
                  className="space-y-6"
                  variants={containerVariants}
                >
                  {/* CORRECTION : Utilisation correcte des garanties */}
                  {guarantees.map((guarantee, index) => (
                    <motion.div 
                      key={index}
                      className="bg-white dark:bg-[#031A3D]/60 backdrop-blur-sm rounded-xl border border-[#055BA4]/20 dark:border-[#055BA4]/30 p-5"
                      whileHover="hover"
                      variants={hoverVariants}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg ${
                          index === 0 ? 'bg-[#055BA4]/10 dark:bg-[#055BA4]/20 text-[#055BA4] dark:text-[#41ADE8]' :
                          index === 1 ? 'bg-[#41ADE8]/10 dark:bg-[#41ADE8]/20 text-[#055BA4] dark:text-[#41ADE8]' :
                          'bg-[#031A3D]/10 dark:bg-[#031A3D]/20 text-[#055BA4] dark:text-[#41ADE8]'
                        }`}>
                          {index === 0 && <Clock className="h-5 w-5" />}
                          {index === 1 && <Send className="h-5 w-5" />}
                          {index === 2 && <CheckCircle className="h-5 w-5" />}
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#031A3D] dark:text-slate-200 mb-1">
                            {guarantee.title}
                          </h3>
                          <p className="text-[#055BA4] dark:text-slate-400 text-sm">
                            {guarantee.text}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-20 bg-[#41ADE8]/10 dark:bg-[#031A3D]/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl font-bold text-[#031A3D] dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {t('contact.faqTitle1')} <span className="text-[#055BA4] dark:text-[#41ADE8]">{t('contact.faqTitle2')}</span>
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
              className="text-lg text-[#055BA4] dark:text-slate-300 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {t('contact.faqSubtitle')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {faqItems.map((faq, index) => (
              <motion.div 
                key={index}
                className="bg-white dark:bg-[#031A3D]/60 backdrop-blur-sm rounded-2xl border border-[#055BA4]/20 dark:border-[#055BA4]/30 p-6"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="font-semibold text-lg text-[#031A3D] dark:text-slate-200 mb-2">{faq.question}</h3>
                <p className="text-[#055BA4] dark:text-slate-400">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact;