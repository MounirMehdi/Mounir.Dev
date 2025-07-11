import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ExternalLink, 
  Github, 
  Calendar,
  Building,
  Filter
} from 'lucide-react'

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')

  const projects = [
    {
      id: 1,
      title: 'Numilex - Sites Web Dynamiques',
      category: 'web',
      client: 'Numilex, Béjaïa',
      period: '09.2023 - Présent',
      description: 'Création de sites web dynamiques multi-pages avec intégration de formulaires, APIs, optimisation SEO et animations. Développement d\'une plateforme complète pour présenter les services de l\'entreprise.',
      longDescription: 'Projet complet de développement web pour l\'entreprise Numilex. Création d\'un site vitrine moderne avec système de gestion de contenu, formulaires de contact avancés, intégration d\'APIs tierces pour les services, optimisation SEO complète et animations CSS/JavaScript pour une expérience utilisateur engageante.',
      technologies: ['HTML5', 'CSS3/SCSS', 'JavaScript', 'PHP', 'MySQL', 'SEO'],
      features: [
        'Design responsive multi-appareils',
        'Système de gestion de contenu',
        'Formulaires de contact avancés',
        'Intégration APIs tierces',
        'Optimisation SEO complète',
        'Animations et transitions fluides',
        'Hébergement et maintenance'
      ],
      image: '/src/assets/89pYHLPzF6rW.jpg',
      status: 'En cours',
      link: null,
      github: null
    },
    {
      id: 2,
      title: 'EPB - Application de Suivi des Escales',
      category: 'web',
      client: 'Entreprise Portuaire de Béjaïa',
      period: '02.2022 - 04.2022',
      description: 'Conception et développement d\'une application web pour le suivi en temps réel des escales portuaires. Interface moderne avec tableaux de bord et gestion des données.',
      longDescription: 'Application web complète développée dans le cadre de mon projet de fin d\'études Master. L\'application permet le suivi en temps réel des navires, la gestion des escales, la planification des opérations portuaires et la génération de rapports détaillés. Interface utilisateur moderne avec Vue.js et backend robuste avec Laravel.',
      technologies: ['Laravel', 'Vue.js', 'Vuetify', 'MySQL', 'API REST'],
      features: [
        'Suivi en temps réel des navires',
        'Gestion des escales portuaires',
        'Tableaux de bord interactifs',
        'Génération de rapports',
        'Interface utilisateur moderne',
        'API REST complète',
        'Authentification sécurisée'
      ],
      image: '/src/assets/duHKRv8YAvFa.jpg',
      status: 'Terminé',
      link: null,
      github: null
    },
    {
      id: 3,
      title: 'AWAL - Logiciel de Gestion Immobilière',
      category: 'desktop',
      client: 'Agence Immobilière AWAL',
      period: '03.2019 - 04.2019',
      description: 'Développement d\'un logiciel desktop de gestion immobilière avec interface Swing. Gestion des biens, clients et transactions.',
      longDescription: 'Logiciel de gestion complet développé en Java pour une agence immobilière. Le système permet la gestion des biens immobiliers, des clients, des contrats de location et de vente, ainsi que la génération de rapports financiers. Interface utilisateur intuitive avec Java Swing et base de données SQLite.',
      technologies: ['Java', 'Swing', 'SQLite', 'iReport', 'POO'],
      features: [
        'Gestion des biens immobiliers',
        'Gestion des clients et prospects',
        'Contrats de location et vente',
        'Génération de rapports',
        'Interface utilisateur intuitive',
        'Base de données locale',
        'Système de sauvegarde'
      ],
      image: '/src/assets/hZbcnvmVxIeZ.jpg',
      status: 'Terminé',
      link: null,
      github: null
    },
    {
      id: 4,
      title: 'Portfolio Personnel',
      category: 'web',
      client: 'Projet Personnel',
      period: '2025',
      description: 'Site portfolio moderne développé avec React et Tailwind CSS. Design responsive avec animations et optimisation des performances.',
      longDescription: 'Portfolio personnel moderne développé avec les dernières technologies web. Site entièrement responsive avec animations fluides, optimisation SEO, et performances optimales. Présentation des compétences, projets et services avec un design moderne et professionnel.',
      technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
      features: [
        'Design moderne et responsive',
        'Animations fluides',
        'Optimisation SEO',
        'Performance optimisée',
        'Formulaire de contact',
        'Blog intégré',
        'Déploiement automatisé'
      ],
      image: '/src/assets/VT8VhuLWWFIo.png',
      status: 'En cours',
      link: '#',
      github: '#'
    }
  ]

  const filters = [
    { id: 'all', label: 'Tous les projets' },
    { id: 'web', label: 'Web' },
    { id: 'desktop', label: 'Desktop' },
    { id: 'mobile', label: 'Mobile' }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-slate-800 mb-6">
              Mes Projets
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Découvrez mes réalisations et l'expertise technique mise en œuvre 
              pour chaque projet. Du web au desktop, chaque solution est pensée 
              pour répondre aux besoins spécifiques de mes clients.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center space-x-2 text-slate-600">
              <Filter size={20} />
              <span className="font-medium">Filtrer par :</span>
            </div>
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                onClick={() => setActiveFilter(filter.id)}
                className={activeFilter === filter.id ? "bg-teal-600 hover:bg-teal-700" : ""}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                  <div className="absolute top-4 right-4">
                    <Badge 
                      variant={project.status === 'En cours' ? 'default' : 'secondary'}
                      className={project.status === 'En cours' ? 'bg-orange-500' : 'bg-green-500'}
                    >
                      {project.status}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">{project.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-slate-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <Building size={16} />
                        <span>{project.client}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar size={16} />
                        <span>{project.period}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-600 leading-relaxed">{project.description}</p>

                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">Technologies utilisées :</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">Fonctionnalités clés :</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm text-slate-600">
                      {project.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-teal-600 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <div className="flex space-x-3">
                      {project.link && (
                        <Button asChild size="sm" className="bg-teal-600 hover:bg-teal-700">
                          <a href={project.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={16} className="mr-1" />
                            Voir le site
                          </a>
                        </Button>
                      )}
                      {project.github && (
                        <Button asChild size="sm" variant="outline">
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github size={16} className="mr-1" />
                            Code
                          </a>
                        </Button>
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {project.category.toUpperCase()}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Used */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Technologies Maîtrisées</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Un aperçu des technologies et outils que j'utilise pour créer des solutions performantes
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              'HTML5', 'CSS3', 'JavaScript', 'React', 'Vue.js', 'Laravel',
              'PHP', 'Java', 'MySQL', 'SQLite', 'Git', 'Figma',
              'Photoshop', 'Canva', 'SEO', 'Agile'
            ].map((tech, index) => (
              <div 
                key={index}
                className="bg-white p-4 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-slate-700 font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Vous avez un projet en tête ?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Discutons ensemble de votre projet et voyons comment je peux vous aider à le concrétiser.
          </p>
          <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
            <Link to="/contact">
              Démarrer un projet
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

export default Projects

