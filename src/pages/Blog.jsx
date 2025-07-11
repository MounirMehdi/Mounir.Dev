import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Calendar, 
  Clock, 
  User, 
  Search,
  ArrowRight,
  Tag
} from 'lucide-react'

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const blogPosts = [
    {
      id: 1,
      title: 'Les Tendances du Développement Web en 2025',
      excerpt: 'Découvrez les technologies et frameworks qui vont dominer le développement web cette année. De React 19 aux nouvelles fonctionnalités CSS, explorons ensemble l\'avenir du web.',
      content: 'Le développement web évolue constamment, et 2025 s\'annonce comme une année riche en innovations...',
      category: 'Développement',
      author: 'Mounir Mehdi',
      date: '2025-01-15',
      readTime: '5 min',
      image: '/src/assets/VT8VhuLWWFIo.png',
      tags: ['React', 'CSS', 'JavaScript', 'Tendances']
    },
    {
      id: 2,
      title: 'Optimisation SEO : Guide Complet pour 2025',
      excerpt: 'Maîtrisez les techniques d\'optimisation SEO les plus efficaces pour améliorer le référencement de vos sites web et attirer plus de visiteurs qualifiés.',
      content: 'Le SEO reste un pilier fondamental du marketing digital. Voici les stratégies à adopter...',
      category: 'SEO',
      author: 'Mounir Mehdi',
      date: '2025-01-10',
      readTime: '8 min',
      image: '/src/assets/5XKgNOmc4lRA.png',
      tags: ['SEO', 'Marketing', 'Google', 'Référencement']
    },
    {
      id: 3,
      title: 'Laravel vs React : Choisir la Bonne Stack',
      excerpt: 'Comparaison détaillée entre Laravel et React pour vos projets web. Avantages, inconvénients et cas d\'usage pour faire le bon choix technologique.',
      content: 'Le choix de la stack technologique est crucial pour le succès d\'un projet...',
      category: 'Développement',
      author: 'Mounir Mehdi',
      date: '2025-01-05',
      readTime: '6 min',
      image: '/src/assets/bcb1vDfnAQwT.png',
      tags: ['Laravel', 'React', 'PHP', 'JavaScript']
    },
    {
      id: 4,
      title: 'UX/UI Design : Créer des Interfaces Intuitives',
      excerpt: 'Les principes fondamentaux du design UX/UI pour créer des interfaces utilisateur engageantes et intuitives. Conseils pratiques et exemples concrets.',
      content: 'Une bonne interface utilisateur peut faire la différence entre le succès et l\'échec d\'une application...',
      category: 'Design',
      author: 'Mounir Mehdi',
      date: '2024-12-28',
      readTime: '7 min',
      image: '/src/assets/VClZJhkQKTJD.png',
      tags: ['UX', 'UI', 'Design', 'Interface']
    },
    {
      id: 5,
      title: 'Méthodologie Agile : Optimiser vos Projets',
      excerpt: 'Comment implémenter efficacement la méthodologie Agile dans vos projets de développement pour améliorer la productivité et la qualité.',
      content: 'L\'approche Agile révolutionne la gestion de projet en développement logiciel...',
      category: 'Méthodologie',
      author: 'Mounir Mehdi',
      date: '2024-12-20',
      readTime: '4 min',
      image: '/src/assets/REA5EtQyaqGw.jpg',
      tags: ['Agile', 'Scrum', 'Gestion', 'Productivité']
    },
    {
      id: 6,
      title: 'Sécurité Web : Protéger vos Applications',
      excerpt: 'Guide essentiel pour sécuriser vos applications web. Découvrez les vulnérabilités courantes et les meilleures pratiques de sécurité.',
      content: 'La sécurité web est un enjeu majeur dans le développement d\'applications modernes...',
      category: 'Sécurité',
      author: 'Mounir Mehdi',
      date: '2024-12-15',
      readTime: '9 min',
      image: '/src/assets/uor65CeyUbPn.jpg',
      tags: ['Sécurité', 'HTTPS', 'Authentification', 'Protection']
    }
  ]

  const categories = [
    { id: 'all', label: 'Tous les articles' },
    { id: 'Développement', label: 'Développement' },
    { id: 'Design', label: 'Design' },
    { id: 'SEO', label: 'SEO' },
    { id: 'Méthodologie', label: 'Méthodologie' },
    { id: 'Sécurité', label: 'Sécurité' }
  ]

  const popularTags = ['React', 'Laravel', 'JavaScript', 'SEO', 'UX/UI', 'Agile', 'PHP', 'CSS']

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPost = blogPosts[0]
  const recentPosts = blogPosts.slice(1, 4)

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-slate-800 mb-6">
              Blog
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Découvrez mes réflexions sur le développement web, les nouvelles technologies, 
              et les meilleures pratiques du secteur. Partageons ensemble notre passion pour le code !
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <Input
                type="text"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id ? "bg-teal-600 hover:bg-teal-700" : ""}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Article */}
            {searchTerm === '' && selectedCategory === 'all' && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Article à la Une</h2>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-teal-600">{featuredPost.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-slate-800 mb-3 hover:text-teal-600 transition-colors">
                      <Link to={`/blog/${featuredPost.id}`}>{featuredPost.title}</Link>
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-slate-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <User size={16} />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar size={16} />
                        <span>{new Date(featuredPost.date).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={16} />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                    <p className="text-slate-600 mb-4 leading-relaxed">{featuredPost.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {featuredPost.tags.slice(0, 3).map((tag, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <Button asChild variant="outline">
                        <Link to={`/blog/${featuredPost.id}`}>
                          Lire la suite
                          <ArrowRight className="ml-2" size={16} />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Articles Grid */}
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">
                {searchTerm || selectedCategory !== 'all' ? 'Résultats de recherche' : 'Articles Récents'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <div className="relative overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-teal-600">{post.category}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-teal-600 transition-colors line-clamp-2">
                        <Link to={`/blog/${post.id}`}>{post.title}</Link>
                      </h3>
                      <div className="flex items-center space-x-3 text-xs text-slate-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>{new Date(post.date).toLocaleDateString('fr-FR')}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock size={14} />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 2).map((tag, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <Button asChild size="sm" variant="ghost">
                          <Link to={`/blog/${post.id}`}>
                            Lire
                            <ArrowRight className="ml-1" size={14} />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-slate-600 text-lg">Aucun article trouvé pour votre recherche.</p>
                  <Button 
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedCategory('all')
                    }}
                    className="mt-4"
                    variant="outline"
                  >
                    Voir tous les articles
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              {/* About */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-slate-800">À propos</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Développeur Full Stack passionné, je partage ici mes expériences, 
                    découvertes et réflexions sur le monde du développement web.
                  </p>
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-slate-800">Tags Populaires</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag, index) => (
                      <button
                        key={index}
                        onClick={() => setSearchTerm(tag)}
                        className="px-3 py-1 bg-slate-100 hover:bg-teal-100 text-slate-700 hover:text-teal-700 rounded-full text-sm transition-colors"
                      >
                        <Tag size={12} className="inline mr-1" />
                        {tag}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Posts */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-slate-800">Articles Récents</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentPosts.map((post) => (
                      <div key={post.id} className="group">
                        <Link to={`/blog/${post.id}`} className="block">
                          <h4 className="text-sm font-medium text-slate-800 group-hover:text-teal-600 transition-colors line-clamp-2 mb-1">
                            {post.title}
                          </h4>
                          <div className="flex items-center space-x-2 text-xs text-slate-600">
                            <Calendar size={12} />
                            <span>{new Date(post.date).toLocaleDateString('fr-FR')}</span>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Restez informé</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Recevez les derniers articles et conseils directement dans votre boîte mail.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Votre adresse email"
              className="bg-white text-slate-800"
            />
            <Button className="bg-orange-500 hover:bg-orange-600 whitespace-nowrap">
              S'abonner
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Blog

