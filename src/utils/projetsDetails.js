const projects = [
  {
    id: 1,
    title: "Portfolio NextJS",
    category: "Développement Web",
    shortDescription: "Un portfolio moderne avec dark mode et animations fluides",
    fullDescription: "Un portfolio moderne avec dark mode, animations fluides et internationalisation. Construit avec Next.js, Tailwind CSS et Framer Motion. Ce projet a été conçu pour présenter mon travail de manière élégante et interactive.",
    challenges: "Le principal défi était de créer une expérience utilisateur fluide avec des animations performantes sans sacrifier le référencement. J'ai résolu cela en utilisant Next.js pour le rendu côté serveur et Framer Motion pour des animations optimisées.",
    resultsIntro: "Après la mise en œuvre de notre solution, nous avons constaté une amélioration significative des performances et de l'expérience utilisateur :",
    resultsList: [
      "Augmentation de 40% du taux de conversion",
      "Réduction de 30% du temps de chargement des pages",
      "Amélioration de 95% de la satisfaction client"
    ],
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "i18next"],
    demoUrl: "https://portfolio-nextjs-example.com",
    githubUrl: "https://github.com/votre-user/portfolio-nextjs",
    featured: true,
    new: false,
    launchDate: "15 Mars 2023",
    duration: "2 mois",
    team: ["Développeur Frontend", "Designer UI/UX"],
    images: [
      "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 2,
    title: "E-commerce React",
    category: "Application Fullstack",
    shortDescription: "Plateforme e-commerce complète avec panier et paiement Stripe",
    fullDescription: "Plateforme e-commerce complète avec panier, paiement Stripe et tableau de bord administrateur. Optimisée pour les performances et le SEO. L'application comprend un système de gestion de produits, de catégories et de commandes.",
    challenges: "L'intégration sécurisée de Stripe tout en garantissant une expérience utilisateur fluide était complexe. J'ai implémenté un système de panier persistante et des webhooks pour gérer les paiements asynchrones.",
    resultsIntro: "Le projet a permis de :",
    resultsList: [
      "Réduire les abandons de panier de 25%",
      "Augmenter les ventes de 35%",
      "Diminuer les incidents de paiement de 90%"
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "Stripe API"],
    demoUrl: "https://ecommerce-react-demo.com",
    githubUrl: "https://github.com/votre-user/ecommerce-react",
    featured: true,
    new: true,
    launchDate: "10 Juin 2023",
    duration: "5 mois",
    team: ["Développeur Fullstack", "Designer UX"],
    images: [
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1603739903239-8b6e64c3b185?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 3,
    title: "Application Météo",
    category: "Application Mobile",
    shortDescription: "Application météo en temps réel avec prévisions sur 7 jours",
    fullDescription: "Application météo en temps réel avec prévisions sur 7 jours. Utilise l'API OpenWeatherMap avec géolocalisation et recherche par ville. L'application offre des notifications push pour les alertes météo importantes.",
    challenges: "L'optimisation des performances pour les appareils mobiles avec une consommation minimale de données était le principal défi. J'ai utilisé la mise en cache intelligente et la compression des données pour résoudre ce problème.",
    resultsIntro: "Après le lancement, l'application a atteint :",
    resultsList: [
      "4.8 étoiles sur les stores d'applications",
      "Plus de 50 000 téléchargements en 3 mois",
      "Temps de chargement moyen de 1.2 secondes"
    ],
    tech: ["React Native", "Redux", "OpenWeather API", "Geolocation API"],
    demoUrl: "https://weather-app-demo.com",
    githubUrl: "https://github.com/votre-user/weather-app",
    featured: false,
    new: true,
    launchDate: "5 Janvier 2023",
    duration: "3 mois",
    team: ["Développeur Mobile"],
    images: [
      "https://images.unsplash.com/photo-1543964198-d54e4f0e44e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1496450681664-3df85efbd29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580193769210-b8d1c049a7d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  }
];

export default projects;