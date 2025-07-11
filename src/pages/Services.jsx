import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Code, 
  Smartphone, 
  Palette, 
  Search, 
  Server, 
  GraduationCap,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

const Services = () => {
  const services = [
    {
      icon: Code,
      title: 'Développement Web',
      description: 'Création de sites web dynamiques et responsives avec les dernières technologies.',
      features: [
        'Sites web multi-pages',
        'Intégration de formulaires',
        'APIs et bases de données',
        'Design responsive'
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP'],
      price: 'À partir de 800€'
    },
    {
      icon: Smartphone,
      title: 'Applications Web',
      description: 'Développement d\'applications web modernes et performantes sur mesure.',
      features: [
        'Applications métier',
        'Interfaces utilisateur modernes',
        'Gestion des données',
        'Sécurité renforcée'
      ],
      technologies: ['Laravel', 'Vue.js', 'React', 'MySQL'],
      price: 'À partir de 1500€'
    },
    {
      icon: Palette,
      title: 'UX/UI Design',
      description: 'Conception d\'interfaces utilisateur attrayantes et intuitives.',
      features: [
        'Maquettes et prototypes',
        'Design system',
        'Expérience utilisateur',
        'Design responsive'
      ],
      technologies: ['Figma', 'Photoshop', 'Canva Pro', 'Illustrator'],
      price: 'À partir de 500€'
    },
    {
      icon: Search,
      title: 'Optimisation SEO',
      description: 'Amélioration du référencement naturel pour une meilleure visibilité.',
      features: [
        'Audit SEO complet',
        'Optimisation technique',
        'Contenu optimisé',
        'Suivi des performances'
      ],
      technologies: ['Google Analytics', 'Search Console', 'SEMrush'],
      price: 'À partir de 300€'
    },
    {
      icon: Server,
      title: 'Hébergement Web',
      description: 'Mise en ligne et maintenance de vos sites web et applications.',
      features: [
        'Configuration serveur',
        'Nom de domaine',
        'Certificat SSL',
        'Maintenance technique'
      ],
      technologies: ['cPanel', 'FTP', 'DNS', 'CloudFlare'],
      price: 'À partir de 100€/an'
    },
    {
      icon: GraduationCap,
      title: 'Formation & Conseil',
      description: 'Accompagnement et formation sur les technologies web modernes.',
      features: [
        'Formation personnalisée',
        'Conseil technique',
        'Méthodologies Agile',
        'Bonnes pratiques'
      ],
      technologies: ['Scrum', 'Git', 'DevOps', 'Code Review'],
      price: 'À partir de 80€/h'
    }
  ]

  const processSteps = [
    {
      step: '01',
      title: 'Analyse des besoins',
      description: 'Étude approfondie de votre projet et définition des objectifs.'
    },
    {
      step: '02',
      title: 'Conception & Design',
      description: 'Création des maquettes et validation du design avec vous.'
    },
    {
      step: '03',
      title: 'Développement',
      description: 'Réalisation technique avec des points réguliers d\'avancement.'
    },
    {
      step: '04',
      title: 'Tests & Livraison',
      description: 'Tests complets et mise en ligne de votre projet.'
    }
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-slate-800 mb-6">
              Mes Services
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Solutions complètes pour vos projets web, du design à la mise en ligne. 
              Une expertise technique au service de vos ambitions digitales.
            </p>
            <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700">
              <Link to="/contact">
                Demander un devis
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-teal-600 transition-colors">
                    <service.icon className="text-teal-600 group-hover:text-white transition-colors" size={32} />
                  </div>
                  <CardTitle className="text-xl text-slate-800">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-600">{service.description}</p>
                  
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">Fonctionnalités :</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-slate-600">
                          <CheckCircle className="text-teal-600 mr-2" size={16} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">Technologies :</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-teal-600">{service.price}</span>
                      <Button asChild size="sm" variant="outline">
                        <Link to="/contact">Devis</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Mon Processus de Travail</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Une méthodologie éprouvée pour garantir la réussite de votre projet
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">{step.title}</h3>
                <p className="text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Me Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-800 mb-6">
                Pourquoi me choisir ?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-teal-600 mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-slate-800">Expertise technique</h3>
                    <p className="text-slate-600">Plus de 2 ans d'expérience avec les technologies modernes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-teal-600 mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-slate-800">Approche personnalisée</h3>
                    <p className="text-slate-600">Chaque projet est unique et mérite une attention particulière</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-teal-600 mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-slate-800">Respect des délais</h3>
                    <p className="text-slate-600">Livraison dans les temps avec une communication transparente</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-teal-600 mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-slate-800">Support continu</h3>
                    <p className="text-slate-600">Accompagnement après livraison et maintenance</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/src/assets/bcb1vDfnAQwT.png" 
                alt="Développeur au travail" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Prêt à commencer ?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Discutons de votre projet et voyons comment je peux vous aider à le concrétiser.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
              <Link to="/contact">
                Demander un devis gratuit
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-teal-600">
              <Link to="/projects">Voir mes réalisations</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services

