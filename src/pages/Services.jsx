import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import {
  FiLayout,
  FiGrid,
  FiSmartphone,
  FiBarChart,
  FiCheck,
  FiArrowRight,
} from "react-icons/fi";
import { ShieldCheck } from "lucide-react";

const Services = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const direction = isRTL ? "rtl" : "ltr";
  const arrowIcon = isRTL ? "rotate-180" : "";

  useEffect(() => {
    document.title = t("services.meta.title");
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", t("services.meta.description"));
  }, [t]);

  // ==== DATA ====
  const services = [
    {
      icon: FiLayout,
      title: t("services.services.web.title"),
      description: t("services.services.web.description"),
      features: t("services.services.web.features", { returnObjects: true }),
      technologies: t("services.services.web.technologies", { returnObjects: true }),
    },
    {
      icon: FiGrid,
      title: t("services.services.app.title"),
      description: t("services.services.app.description"),
      features: t("services.services.app.features", { returnObjects: true }),
      technologies: t("services.services.app.technologies", { returnObjects: true }),
    },
    {
      icon: FiSmartphone,
      title: t("services.services.mobile.title"),
      description: t("services.services.mobile.description"),
      features: t("services.services.mobile.features", { returnObjects: true }),
      technologies: t("services.services.mobile.technologies", { returnObjects: true }),
    },
    {
      icon: FiBarChart,
      title: t("services.services.marketing.title"),
      description: t("services.services.marketing.description"),
      features: t("services.services.marketing.features", { returnObjects: true }),
      technologies: t("services.services.marketing.technologies", { returnObjects: true }),
    },
  ];

  const processSteps = t("services.processSteps", { returnObjects: true });

  // ==== SCROLL ANIMATIONS ====
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 300], [0, 80]);
  const whyUsY = useTransform(scrollY, [300, 900], [0, -60]);

  // ==== VARIANTS ====
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div
      className="pt-16 bg-gradient-to-b from-white to-slate-50 dark:from-[#031A3D] dark:to-[#031A3D]/90"
      dir={direction}
    >
      {/* ================= HERO ================= */}
      <section className="py-32 text-center relative overflow-hidden">
        {/* Background avec parallaxe */}
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center opacity-20"
        />
        <div className="relative z-10">
          <motion.h1
            className="text-5xl font-extrabold text-[#031A3D] dark:text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t("services.hero.title1")}{" "}
            <span className="text-[#055BA4] dark:text-[#41ADE8]">
              {t("services.hero.title2")}
            </span>
          </motion.h1>

          <motion.p
            className="text-xl text-[#055BA4] dark:text-slate-300 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {t("services.hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              asChild
              size="lg"
              className="px-8 py-6 text-lg bg-gradient-to-r from-[#055BA4] to-[#41ADE8] hover:from-[#054A85] hover:to-[#2E8BC0] dark:from-[#055BA4] dark:to-[#41ADE8] dark:hover:from-[#054A85] dark:hover:to-[#2E8BC0] text-white rounded-full shadow-lg hover:shadow-xl transition"
            >
              <Link to="/contact">
                {t("services.hero.button")}
                <FiArrowRight className={`${arrowIcon} ml-2`} size={20} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ================= SERVICES GRID ================= */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-3xl font-bold text-center text-[#031A3D] dark:text-white mb-16"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
          >
            {t("services.services.title1")}{" "}
            <span className="text-[#055BA4] dark:text-[#41ADE8]">
              {t("services.services.title2")}
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-10">
            {services.map((s, i) => (
              <motion.div
                key={i}
                className="p-8 rounded-2xl bg-white/70 dark:bg-[#031A3D]/60 backdrop-blur-xl border border-slate-200 dark:border-[#055BA4]/30 shadow-lg hover:shadow-xl transition group"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                whileHover={{ y: -8 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-[#055BA4] to-[#41ADE8] text-white rounded-xl mb-6 group-hover:scale-110 transition-transform">
                    <s.icon size={28} />
                  </div>
                  <h3 className="text-xl font-semibold text-[#031A3D] dark:text-white mb-3">
                    {s.title}
                  </h3>
                  <p className="text-[#055BA4] dark:text-slate-400 mb-6">
                    {s.description}
                  </p>

                  <h4 className="font-medium text-[#031A3D] dark:text-slate-300 mb-2">
                    {t("services.services.featuresTitle")}
                  </h4>
                  <ul className="text-sm text-[#055BA4] dark:text-slate-400 mb-6 space-y-1">
                    {s.features.map((f, idx) => (
                      <li key={idx} className="flex items-center justify-center">
                        <FiCheck className="text-[#055BA4] dark:text-[#41ADE8] mr-2" /> {f}
                      </li>
                    ))}
                  </ul>

                  <h4 className="font-medium text-[#031A3D] dark:text-slate-300 mb-3">
                    {t("services.services.techTitle")}
                  </h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {s.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-[#41ADE8]/10 dark:bg-[#055BA4]/40 rounded-full text-xs text-[#055BA4] dark:text-[#41ADE8]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="py-24 bg-[#41ADE8]/10 dark:bg-[#031A3D]/50">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-3xl font-bold text-center mb-16 text-[#031A3D] dark:text-white"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {t("services.process.title1")}{" "}
            <span className="text-[#055BA4] dark:text-[#41ADE8]">
              {t("services.process.title2")}
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                className="bg-white dark:bg-[#031A3D]/60 p-6 rounded-2xl border border-[#41ADE8]/20 dark:border-[#055BA4]/30 text-center shadow hover:shadow-lg transition"
                initial="hidden"
                whileInView="visible"
                variants={fadeUp}
                whileHover={{ y: -8 }}
                viewport={{ once: true }}
              >
                <div className="w-14 h-14 mx-auto flex items-center justify-center bg-[#055BA4]/10 dark:bg-[#055BA4]/40 text-[#055BA4] dark:text-[#41ADE8] rounded-xl mb-4">
                  <span className="font-bold text-lg">{i + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-[#031A3D] dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-[#055BA4] dark:text-slate-400 text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY US ================= */}
      <section className="py-24 container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          style={{ y: whyUsY }}
          className="rounded-2xl overflow-hidden shadow-lg border border-[#41ADE8]/20 dark:border-[#055BA4]/30"
        >
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1170&q=80"
            alt={t("services.why.imageAlt")}
            className="w-full h-96 object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-[#031A3D] dark:text-white mb-6">
            {t("services.why.title1")}{" "}
            <span className="text-[#055BA4] dark:text-[#41ADE8]">
              {t("services.why.title2")}
            </span>
          </h2>
          <p className="text-lg text-[#055BA4] dark:text-slate-300 mb-8">
            {t("services.why.subtitle")}
          </p>

          <div className="space-y-6">
            {t("services.why.features", { returnObjects: true }).map(
              (item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start"
                  whileHover={{ x: 6 }}
                >
                  <ShieldCheck className="text-[#055BA4] dark:text-[#41ADE8] mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-[#031A3D] dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-[#055BA4] dark:text-slate-400 text-sm">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 bg-gradient-to-r from-[#055BA4] to-[#41ADE8] text-white text-center">
        <motion.h2
          className="text-4xl font-bold mb-6"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true }}
        >
          {t("services.cta.title")}
        </motion.h2>
        <motion.p
          className="text-lg mb-10 opacity-90 max-w-2xl mx-auto"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {t("services.cta.subtitle")}
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Button
            asChild
            size="lg"
            className="bg-white text-[#055BA4] hover:bg-slate-100 rounded-full px-8 py-6 shadow-lg hover:shadow-xl"
          >
            <Link to="/contact">
              {t("services.cta.button1")}
              <FiArrowRight className={`${arrowIcon} ml-2`} size={20} />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="border border-white px-8 py-6  bg-gradient-to-r from-[#055BA4] to-[#41ADE8] hover:from-[#054A85] hover:to-[#2E8BC0] dark:from-[#055BA4] dark:to-[#41ADE8] dark:hover:from-[#054A85] dark:hover:to-[#2E8BC0] text-white rounded-full shadow-lg hover:shadow-xl transition"
          >
            <Link to="/projects">{t("services.cta.button2")}</Link>
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default Services;