import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageCircle,
  User,
  Briefcase,
  Calendar,
  Layers,
  File,
  FileText,
  Folder,
  XCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import emailjs from 'emailjs-com';
import { Link } from 'react-router-dom';

const Devis = () => {
  const { t, i18n } = useTranslation();
  const direction = i18n.dir();
  const isRTL = direction === 'rtl';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    service: '',
    serviceOther: '',
    projectType: '',
    projectTypeOther: '',
    budget: '',
    budgetOther: '',
    timeline: '',
    timelineOther: '',
    features: [],
    projectName: '',
    projectGoals: '',
    targetAudience: '',
    technicalRequirements: '',
    attachments: [],
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const fileInputRef = useRef(null);

  useEffect(() => {
    document.title = t('devis.documentTitle');
  }, [t]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
      [`${name}Other`]: value === t('devis.otherOption') ? prev[`${name}Other`] : ''
    }));
  };

  const handleCheckboxChange = (feature) => {
    setFormData(prev => {
      if (prev.features.includes(feature)) {
        return { ...prev, features: prev.features.filter(f => f !== feature) };
      } else {
        return { ...prev, features: [...prev.features, feature] };
      }
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      const extension = file.name.split('.').pop().toLowerCase();
      const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'psd', 'ai', 'fig', 'sketch'];
      return validExtensions.includes(extension);
    });

    if (validFiles.length > 0) {
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...validFiles]
      }));
    }
  };

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    let isValid = true;

    if (currentStep === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email) {
        isValid = false;
        alert(t('devis.validation.step1'));
      }
    }

    if (currentStep === 2) {
      if (!formData.service) {
        isValid = false;
        alert(t('devis.validation.step2'));
      }
    }

    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const templateParams = {
      name: `${formData.firstName} ${formData.lastName}`,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      service: formData.service === t('devis.otherOption') ? formData.serviceOther : formData.service,
      project_type: formData.projectType === t('devis.otherOption') ? formData.projectTypeOther : formData.projectType,
      budget: formData.budget === t('devis.otherOption') ? formData.budgetOther : formData.budget,
      timeline: formData.timeline === t('devis.otherOption') ? formData.timelineOther : formData.timeline,
      features: formData.features.join(', '),
      project_name: formData.projectName,
      project_goals: formData.projectGoals,
      target_audience: formData.targetAudience,
      technical_requirements: formData.technicalRequirements,
      message: formData.message,
      website: formData.website,
      attachments_count: formData.attachments.length
    };

    try {
      await emailjs.send(
        'service_pr533zl',
        'template_kmthksv',
        templateParams,
        'BiECaGzCS4niWGltN'
      );

      if (formData.attachments.length > 0) {
        const attachmentFormData = new FormData();
        formData.attachments.forEach(file => {
          attachmentFormData.append('attachments', file);
        });
        console.log("Files to upload:", formData.attachments);
      }

      setIsSubmitting(false);
      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          website: '',
          service: '',
          serviceOther: '',
          projectType: '',
          projectTypeOther: '',
          budget: '',
          budgetOther: '',
          timeline: '',
          timelineOther: '',
          features: [],
          projectName: '',
          projectGoals: '',
          targetAudience: '',
          technicalRequirements: '',
          attachments: [],
          message: ''
        });
        setCurrentStep(1);
      }, 5000);
    } catch (error) {
      console.error(t('devis.submitError'), error);
      alert(t('devis.submitErrorMessage'));
      setIsSubmitting(false);
    }
  };

  const services = t('devis.services', { returnObjects: true });
  const projectTypes = t('devis.projectTypes', { returnObjects: true });
  const timelines = t('devis.timelines', { returnObjects: true });
  const budgetRanges = t('devis.budgetRanges', { returnObjects: true });
  const featuresList = t('devis.featuresList', { returnObjects: true });
  const stepTitles = t('devis.stepTitles', { returnObjects: true });
  const guarantees = t('devis.guarantees', { returnObjects: true });
  const faqItems = t('devis.faq.items', { returnObjects: true });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div
      className="pt-16 bg-gradient-to-b from-slate-50 to-white dark:from-[#031A3D] dark:to-[#031A3D]/90"
      dir={direction}
    >
      {/* Hero Section - Améliorée */}
      <section className="relative py-25 bg-gradient-to-br from-[#41ADE8]/20 to-[#055BA4]/20 dark:from-[#031A3D] dark:to-[#055BA4]/30 overflow-hidden pt-25">
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
              {t('devis.hero.title1')} <span className="text-[#055BA4] dark:text-[#41ADE8]">{t('devis.hero.title2')}</span>
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
              {t('devis.hero.subtitle')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center gap-4"
            >
              <Button asChild className="bg-gradient-to-r from-[#055BA4] to-[#41ADE8] hover:from-[#054A85] hover:to-[#2E8BC0] text-white">
                <Link to="/contact" className="flex items-center gap-2">
                  <MessageCircle size={18} />
                  {t('devis.hero.contactButton')}
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border border-slate-200 dark:border-[#055BA4]/30 shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-[#055BA4] to-[#41ADE8] dark:from-[#055BA4] dark:to-[#41ADE8] text-white py-6 px-6">
                  <CardHeader className="p-0">
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <FileText size={28} />
                      <span>{t('devis.form.title')}</span>
                    </CardTitle>
                    <p className="text-[#41ADE8] dark:text-[#41ADE8] mt-2">
                      {t('devis.form.step', {
                        step: currentStep,
                        total: 4,
                        interpolation: { escapeValue: false }
                      })}: {stepTitles[currentStep - 1]}
                    </p>
                  </CardHeader>
                </div>

                <div className="relative h-2 bg-slate-100 dark:bg-[#031A3D]">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#055BA4] to-[#41ADE8]"
                    initial={{ width: `${(currentStep - 1) * 25}%` }}
                    animate={{ width: `${(currentStep - 1) * 25}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                <CardContent className="p-6">
                  {isSubmitted ? (
                    <motion.div
                      className="text-center py-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                      <h3 className="text-2xl font-bold text-[#031A3D] dark:text-white mb-3">
                        {t('devis.form.success.title')}
                      </h3>
                      <p className="text-[#055BA4] dark:text-slate-300 mb-8 max-w-md mx-auto">
                        {t('devis.form.success.message')}
                      </p>
                      <Button asChild className="bg-gradient-to-r from-[#055BA4] to-[#41ADE8] hover:from-[#054A85] hover:to-[#2E8BC0]">
                        <Link to="/">
                          {t('devis.form.success.button')}
                        </Link>
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      {/* Step 1: Personal Information */}
                      {currentStep === 1 && (
                        <motion.div
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                          className="space-y-6"
                        >
                          <motion.h3 className="text-xl font-semibold text-[#031A3D] dark:text-white flex items-center gap-2 mb-6" variants={itemVariants}>
                            <User size={20} />
                            <span>{t('devis.step1.title')}</span>
                          </motion.h3>

                          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4" variants={itemVariants}>
                            <div className="space-y-2">
                              <Label htmlFor="firstName">{t('devis.step1.firstName')} *</Label>
                              <Input
                                id="firstName"
                                name="firstName"
                                required
                                value={formData.firstName}
                                onChange={handleInputChange}
                                placeholder={t('devis.step1.firstNamePlaceholder')}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="lastName">{t('devis.step1.lastName')} *</Label>
                              <Input
                                id="lastName"
                                name="lastName"
                                required
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder={t('devis.step1.lastNamePlaceholder')}
                              />
                            </div>
                          </motion.div>

                          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4" variants={itemVariants}>
                            <div className="space-y-2">
                              <Label htmlFor="email">{t('devis.step1.email')} *</Label>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder={t('devis.step1.emailPlaceholder')}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone">{t('devis.step1.phone')}</Label>
                              <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder={t('devis.step1.phonePlaceholder')}
                              />
                            </div>
                          </motion.div>

                          <motion.div className="grid grid-cols-1 gap-4" variants={itemVariants}>
                            <div className="space-y-2">
                              <Label htmlFor="company">{t('devis.step1.company')}</Label>
                              <Input
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleInputChange}
                                placeholder={t('devis.step1.companyPlaceholder')}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="website">{t('devis.step1.website')}</Label>
                              <Input
                                id="website"
                                name="website"
                                value={formData.website}
                                onChange={handleInputChange}
                                placeholder={t('devis.step1.websitePlaceholder')}
                              />
                            </div>
                          </motion.div>

                          <motion.div className={`pt-6 flex ${isRTL ? 'justify-start' : 'justify-end'}`} variants={itemVariants}>
                            <Button
                              type="button"
                              onClick={nextStep}
                              className="bg-gradient-to-r from-[#055BA4] to-[#41ADE8] hover:from-[#054A85] hover:to-[#2E8BC0]"
                            >
                              {t('devis.step1.nextButton')}
                              <ChevronRight className={`${isRTL ? 'mr-2 transform rotate-180' : 'ml-2'}`} size={16} />
                            </Button>
                          </motion.div>
                        </motion.div>
                      )}

                      {/* Step 2: Project Details */}
                      {currentStep === 2 && (
                        <motion.div
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                          className="space-y-6"
                        >
                          <motion.h3 className="text-xl font-semibold text-[#031A3D] dark:text-white flex items-center gap-2 mb-6" variants={itemVariants}>
                            <Briefcase size={20} />
                            <span>{t('devis.step2.title')}</span>
                          </motion.h3>

                          <motion.div className="space-y-4" variants={itemVariants}>
                            <div className="space-y-2">
                              <Label htmlFor="projectName">{t('devis.step2.projectName')} *</Label>
                              <Input
                                id="projectName"
                                name="projectName"
                                required
                                value={formData.projectName}
                                onChange={handleInputChange}
                                placeholder={t('devis.step2.projectNamePlaceholder')}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="service">{t('devis.step2.service')} *</Label>
                              <Select
                                value={formData.service}
                                onValueChange={(value) => handleSelectChange('service', value)}
                                required
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder={t('devis.step2.servicePlaceholder')} />
                                </SelectTrigger>
                                <SelectContent>
                                  {services.map((service) => (
                                    <SelectItem key={service} value={service}>
                                      {service}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {formData.service === t('devis.otherOption') && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  className="mt-2"
                                >
                                  <Input
                                    name="serviceOther"
                                    value={formData.serviceOther}
                                    onChange={handleInputChange}
                                    placeholder={t('devis.step2.serviceOtherPlaceholder')}
                                    required
                                  />
                                </motion.div>
                              )}
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="projectType">{t('devis.step2.projectType')} *</Label>
                              <Select
                                value={formData.projectType}
                                onValueChange={(value) => handleSelectChange('projectType', value)}
                                required
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder={t('devis.step2.projectTypePlaceholder')} />
                                </SelectTrigger>
                                <SelectContent>
                                  {projectTypes.map((type) => (
                                    <SelectItem key={type} value={type}>
                                      {type}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {formData.projectType === t('devis.otherOption') && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  className="mt-2"
                                >
                                  <Input
                                    name="projectTypeOther"
                                    value={formData.projectTypeOther}
                                    onChange={handleInputChange}
                                    placeholder={t('devis.step2.projectTypeOtherPlaceholder')}
                                    required
                                  />
                                </motion.div>
                              )}
                            </div>
                          </motion.div>

                          <motion.div className={`pt-6 flex ${isRTL ? 'flex-row-reverse' : 'justify-between'}`} variants={itemVariants}>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={prevStep}
                            >
                              {isRTL ? (
                                <>
                                  {t('devis.step2.nextButton')}
                                  <ChevronRight className="ml-2" size={16} />
                                </>
                              ) : (
                                <>
                                  <ChevronLeft className="mr-2" size={16} />
                                  {t('devis.step2.prevButton')}
                                </>
                              )}
                            </Button>
                            <Button
                              type="button"
                              onClick={nextStep}
                              className="bg-gradient-to-r from-[#055BA4] to-[#41ADE8] hover:from-[#054A85] hover:to-[#2E8BC0]"
                            >
                              {isRTL ? (
                                <>
                                  <ChevronLeft className="mr-2 transform rotate-180" size={16} />
                                  {t('devis.step2.prevButton')}
                                </>
                              ) : (
                                <>
                                  {t('devis.step2.nextButton')}
                                  <ChevronRight className="ml-2" size={16} />
                                </>
                              )}
                            </Button>
                          </motion.div>
                        </motion.div>
                      )}

                      {/* Step 3: Requirements and Files */}
                      {currentStep === 3 && (
                        <motion.div
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                          className="space-y-6"
                        >
                          <motion.h3 className="text-xl font-semibold text-[#031A3D] dark:text-white flex items-center gap-2 mb-6" variants={itemVariants}>
                            <Layers size={20} />
                            <span>{t('devis.step3.title')}</span>
                          </motion.h3>

                          <motion.div variants={itemVariants}>
                            <Label className="block mb-3">{t('devis.step3.featuresLabel')}</Label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {featuresList.map((feature, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    id={`feature-${index}`}
                                    checked={formData.features.includes(feature)}
                                    onChange={() => handleCheckboxChange(feature)}
                                    className="h-4 w-4 text-[#055BA4] border-slate-300 rounded focus:ring-[#055BA4]"
                                  />
                                  <label htmlFor={`feature-${index}`} className="text-[#055BA4] dark:text-slate-300">
                                    {feature}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </motion.div>

                          <motion.div className="space-y-4" variants={itemVariants}>
                            <div className="space-y-2">
                              <Label>{t('devis.step3.projectGoals')} *</Label>
                              <Textarea
                                name="projectGoals"
                                required
                                value={formData.projectGoals}
                                onChange={handleInputChange}
                                placeholder={t('devis.step3.projectGoalsPlaceholder')}
                                rows={3}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label>{t('devis.step3.targetAudience')}</Label>
                              <Textarea
                                name="targetAudience"
                                value={formData.targetAudience}
                                onChange={handleInputChange}
                                placeholder={t('devis.step3.targetAudiencePlaceholder')}
                                rows={2}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label>{t('devis.step3.technicalRequirements')}</Label>
                              <Textarea
                                name="technicalRequirements"
                                value={formData.technicalRequirements}
                                onChange={handleInputChange}
                                placeholder={t('devis.step3.technicalRequirementsPlaceholder')}
                                rows={2}
                              />
                            </div>
                          </motion.div>

                          <motion.div className="space-y-4" variants={itemVariants}>
                            <Label>{t('devis.step3.fileUpload.title')}</Label>
                            <div className="border-2 border-dashed border-slate-300 dark:border-[#055BA4]/30 rounded-lg p-6 text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-[#031A3D]/50 transition-colors"
                              onClick={() => fileInputRef.current.click()}>
                              <Folder className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                              <p className="text-[#055BA4] dark:text-slate-400 mb-1">
                                {t('devis.step3.fileUpload.instruction1')}{' '}
                                <span className="text-[#055BA4] dark:text-[#41ADE8] font-medium">
                                  {t('devis.step3.fileUpload.instruction2')}
                                </span>
                              </p>
                              <p className="text-sm text-[#055BA4] dark:text-slate-500">
                                {t('devis.step3.fileUpload.formats')}
                              </p>
                              <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                multiple
                                className="hidden"
                                accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.xls,.xlsx,.psd,.ai,.fig,.sketch"
                              />
                            </div>

                            {formData.attachments.length > 0 && (
                              <div className="space-y-2">
                                <p className="text-sm text-[#055BA4] dark:text-slate-400">
                                  {t('devis.step3.fileUpload.attachments', { count: formData.attachments.length })}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {formData.attachments.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between bg-slate-100 dark:bg-[#031A3D]/50 rounded-lg p-3">
                                      <div className="flex items-center truncate">
                                        <File className="text-[#055BA4] mr-2 flex-shrink-0" size={16} />
                                        <span className="text-sm truncate">{file.name}</span>
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => removeFile(index)}
                                        className="text-[#055BA4] hover:text-red-500"
                                      >
                                        <XCircle size={18} />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </motion.div>

                          <motion.div className={`pt-6 flex ${isRTL ? 'flex-row-reverse' : 'justify-between'}`} variants={itemVariants}>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={prevStep}
                            >
                              <ChevronLeft className={`${isRTL ? 'ml-2' : 'mr-2'}`} size={16} />
                              {t('devis.step3.prevButton')}
                            </Button>
                            <Button
                              type="button"
                              onClick={nextStep}
                              className="bg-gradient-to-r from-[#055BA4] to-[#41ADE8] hover:from-[#054A85] hover:to-[#2E8BC0]"
                            >
                              {t('devis.step3.nextButton')}
                              <ChevronRight className={`${isRTL ? 'mr-2' : 'ml-2'}`} size={16} />
                            </Button>
                          </motion.div>
                        </motion.div>
                      )}

                      {/* Step 4: Timeline and Finalization */}
                      {currentStep === 4 && (
                        <motion.div
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                          className="space-y-6"
                        >
                          <motion.h3 className="text-xl font-semibold text-[#031A3D] dark:text-white flex items-center gap-2 mb-6" variants={itemVariants}>
                            <Calendar size={20} />
                            <span>{t('devis.step4.title')}</span>
                          </motion.h3>

                          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4" variants={itemVariants}>
                            <div className="space-y-2">
                              <Label htmlFor="timeline">{t('devis.step4.timeline')} *</Label>
                              <Select
                                value={formData.timeline}
                                onValueChange={(value) => handleSelectChange('timeline', value)}
                                required
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder={t('devis.step4.timelinePlaceholder')} />
                                </SelectTrigger>
                                <SelectContent>
                                  {timelines.map((timeline) => (
                                    <SelectItem key={timeline} value={timeline}>
                                      {timeline}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {formData.timeline === t('devis.otherOption') && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  className="mt-2"
                                >
                                  <Input
                                    name="timelineOther"
                                    value={formData.timelineOther}
                                    onChange={handleInputChange}
                                    placeholder={t('devis.step4.timelineOtherPlaceholder')}
                                    required
                                  />
                                </motion.div>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="budget">{t('devis.step4.budget')} *</Label>
                              <Select
                                value={formData.budget}
                                onValueChange={(value) => handleSelectChange('budget', value)}
                                required
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder={t('devis.step4.budgetPlaceholder')} />
                                </SelectTrigger>
                                <SelectContent>
                                  {budgetRanges.map((range) => (
                                    <SelectItem key={range} value={range}>
                                      {range}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {formData.budget === t('devis.otherOption') && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  className="mt-2"
                                >
                                  <Input
                                    name="budgetOther"
                                    value={formData.budgetOther}
                                    onChange={handleInputChange}
                                    placeholder={t('devis.step4.budgetOtherPlaceholder')}
                                    required
                                  />
                                </motion.div>
                              )}
                            </div>
                          </motion.div>

                          <motion.div className="space-y-2" variants={itemVariants}>
                            <Label htmlFor="message">{t('devis.step4.message')}</Label>
                            <Textarea
                              id="message"
                              name="message"
                              value={formData.message}
                              onChange={handleInputChange}
                              placeholder={t('devis.step4.messagePlaceholder')}
                              rows={4}
                            />
                          </motion.div>

                          <motion.div className={`pt-6 flex ${isRTL ? 'flex-row-reverse' : 'justify-between'}`} variants={itemVariants}>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={prevStep}
                            >
                              <ChevronLeft className={`${isRTL ? 'ml-2' : 'mr-2'}`} size={16} />
                              {t('devis.step4.prevButton')}
                            </Button>
                            <Button
                              type="submit"
                              className="bg-gradient-to-r from-[#055BA4] to-[#41ADE8] hover:from-[#054A85] hover:to-[#2E8BC0]"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                  {t('devis.step4.sending')}
                                </>
                              ) : (
                                <>
                                  <Send className={`${isRTL ? 'ml-2' : 'mr-2'}`} size={16} />
                                  {t('devis.step4.submitButton')}
                                </>
                              )}
                            </Button>
                          </motion.div>

                          <motion.p className="text-sm text-[#055BA4] dark:text-slate-400 text-center pt-6" variants={itemVariants}>
                            {t('devis.step4.disclaimer')}
                          </motion.p>
                        </motion.div>
                      )}
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-8">
            {/* WhatsApp Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border border-slate-200 dark:border-[#055BA4]/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Phone size={20} />
                    <span>{t('contact.whatsapp.title')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center text-center p-4">
                    <p className="text-[#055BA4] dark:text-slate-400 mb-6">
                      {t('contact.whatsapp.description')}
                    </p>
                    <Button
                      asChild
                      className="bg-green-600 hover:bg-green-700 w-full"
                    >
                      <a
                        href={t('contact.whatsapp.link')}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t('contact.whatsapp.button')}
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Page Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="border border-slate-200 dark:border-[#055BA4]/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Mail size={20} />
                    <span>{t('devis.contactPage.title')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center text-center p-4">
                    <p className="text-[#055BA4] dark:text-slate-400 mb-6">
                      {t('devis.contactPage.description')}
                    </p>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-[#055BA4] to-[#41ADE8] hover:from-[#054A85] hover:to-[#2E8BC0] w-full"
                    >
                      <Link to="/contact">
                        {t('devis.contactPage.button')}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Guarantees */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              {guarantees.map((guarantee, index) => (
                <div
                  key={index}
                  className={`border rounded-xl p-5 ${index === 0 ? 'bg-[#41ADE8]/10 dark:bg-[#41ADE8]/20 border-[#41ADE8]/20' :
                      index === 1 ? 'bg-[#055BA4]/10 dark:bg-[#055BA4]/20 border-[#055BA4]/20' :
                        'bg-[#031A3D]/10 dark:bg-[#031A3D]/20 border-[#031A3D]/20'
                    }`}
                >
                  <div className="flex items-start space-x-3">
                    {index === 0 && <Clock className="text-[#055BA4] dark:text-[#41ADE8] mt-0.5 flex-shrink-0" size={20} />}
                    {index === 1 && <File className="text-[#055BA4] dark:text-[#41ADE8] mt-0.5 flex-shrink-0" size={20} />}
                    {index === 2 && <CheckCircle className="text-[#055BA4] dark:text-[#41ADE8] mt-0.5 flex-shrink-0" size={20} />}
                    <div>
                      <h3 className="font-semibold text-[#031A3D] dark:text-slate-200">{guarantee.title}</h3>
                      <p className="text-sm text-[#055BA4] dark:text-slate-400">
                        {guarantee.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
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
              {t('devis.faq.title')}
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
              {t('devis.faq.subtitle')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {faqItems.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-[#031A3D]/60 p-6 rounded-xl border border-slate-200 dark:border-[#055BA4]/30"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <h3 className="font-semibold text-lg text-[#031A3D] dark:text-white mb-3">{faq.question}</h3>
                <p className="text-[#055BA4] dark:text-slate-400">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Devis;