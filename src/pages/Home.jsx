import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Code,
  Smartphone,
  Palette,
  Search,
  Server,
  GraduationCap,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

import { FlipWords } from "../components/mage-ui/text/flip-words";

const Home = () => {
  const skills = [
    { icon: Code, name: "Frontend", tech: "HTML/CSS/JS, React, Vue.js" },
    { icon: Server, name: "Backend", tech: "PHP, Laravel, Java" },
    { icon: Palette, name: "Design", tech: "UX/UI, Photoshop, Canva" },
    { icon: Search, name: "SEO", tech: "Analytics, Search Console" },
    { icon: Smartphone, name: "Mobile", tech: "Responsive Design" },
    { icon: GraduationCap, name: "Méthodologie", tech: "Agile, Scrum" },
  ];

  const projects = [
    {
      title: "Numilex - Sites Web Dynamiques",
      description:
        "Création de sites web multi-pages avec formulaires, APIs et optimisation SEO.",
      tech: ["HTML", "CSS", "JavaScript", "PHP"],
      image: "/src/assets/89pYHLPzF6rW.jpg",
    },
    {
      title: "EPB - Application de Suivi",
      description:
        "Application web pour le suivi des escales portuaires avec interface moderne.",
      tech: ["Laravel", "Vue.js", "MySQL"],
      image: "/src/assets/duHKRv8YAvFa.jpg",
    },
    {
      title: "AWAL - Logiciel de Gestion",
      description:
        "Logiciel desktop de gestion immobilière avec interface intuitive.",
      tech: ["Java", "Swing", "SQLite"],
      image: "/src/assets/hZbcnvmVxIeZ.jpg",
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center bg-gradient-to-br from-slate-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 leading-tight">
                    Développeur&nbsp;
                    <FlipWords
                      className="text-teal-600 block"
                      words={["web","app Mobile","responsive","sur-mesure","performant","moderne","créatif"]}
                      duration={3000}
                    />
                </h1>
                  <div className="text-xl md:text-2xl font-semibold text-slate-700 dark:text-white">
                    Donnez vie à vos idées digitales
                  </div>
                <p className="text-xl text-slate-600 leading-relaxed">
                  Créateur d'expériences web uniques et performantes. Diplomé en master génie logiciel. Spécialisé
                  en développement moderne.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  <Link to="/projects">
                    Voir mes projets
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">Demander un devis</Link>
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-slate-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="text-teal-600" size={16} />
                  <span>2+ ans d'expérience</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="text-teal-600" size={16} />
                  <span>Projets livrés</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="text-teal-600" size={16} />
                  <span>Clients satisfaits</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8">
                <img
                  src="/src/assets/ph7elXcGsh0V.webp"
                  alt="Développeur Full Stack"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full bg-teal-100 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Mes Compétences
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Une expertise complète pour réaliser vos projets web de A à Z
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-teal-600 transition-colors">
                    <skill.icon
                      className="text-teal-600 group-hover:text-white transition-colors"
                      size={32}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    {skill.name}
                  </h3>
                  <p className="text-slate-600">{skill.tech}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Projets Récents
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Découvrez quelques-unes de mes réalisations les plus marquantes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
              <Link to="/projects">
                Voir tous les projets
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Prêt à démarrer votre projet ?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Contactez-moi dès aujourd'hui pour discuter de vos besoins et
            obtenir un devis gratuit personnalisé.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Link to="/contact">
              Demander un devis gratuit
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
