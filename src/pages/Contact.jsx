import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  CheckCircle,
  Github,
  Linkedin
} from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulation d'envoi de formulaire
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        service: '',
        budget: '',
        message: ''
      })
    }, 3000)
  }

  const services = [
    'Développement Web',
    'Application Web',
    'UX/UI Design',
    'Optimisation SEO',
    'Hébergement Web',
    'Formation & Conseil',
    'Autre'
  ]

  const budgetRanges = [
    'Moins de 500€',
    '500€ - 1000€',
    '1000€ - 2500€',
    '2500€ - 5000€',
    'Plus de 5000€',
    'À discuter'
  ]

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: ['mounir8mehdi@gmail.com', 'mounir.mehdi.etu@ai2-education.com'],
      action: 'mailto:mounir8mehdi@gmail.com'
    },
    {
      icon: Phone,
      title: 'Téléphone',
      details: ['0567895510', '0563238742'],
      action: 'tel:0567895510'
    },
    {
      icon: MapPin,
      title: 'Localisation',
      details: ['Paris, France'],
      action: null
    },
    {
      icon: Clock,
      title: 'Disponibilité',
      details: ['Lun - Ven : 9h - 18h', 'Réponse sous 24h'],
      action: null
    }
  ]

  const socialLinks = [
    {
      icon: Github,
      name: 'GitHub',
      url: 'https://github.com/MounirMehdi',
      username: 'MounirMehdi'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/mounir-mehdi',
      username: 'mounir-mehdi'
    }
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-slate-800 mb-6">
              Contactez-moi
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Vous avez un projet en tête ? Discutons-en ! Je suis là pour vous accompagner 
              dans la réalisation de vos ambitions digitales.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800">
                  Demander un devis gratuit
                </CardTitle>
                <p className="text-slate-600">
                  Remplissez ce formulaire et je vous recontacterai dans les plus brefs délais.
                </p>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">
                      Message envoyé avec succès !
                    </h3>
                    <p className="text-slate-600">
                      Je vous recontacterai dans les plus brefs délais.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Votre prénom"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Votre nom"
                        />
                      </div>
                    </div>

                    {/* Contact Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="votre@email.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="06 12 34 56 78"
                        />
                      </div>
                    </div>

                    {/* Service and Budget */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="service">Type de service *</Label>
                        <Select onValueChange={(value) => handleSelectChange('service', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un service" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem key={service} value={service}>
                                {service}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="budget">Budget estimé</Label>
                        <Select onValueChange={(value) => handleSelectChange('budget', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez votre budget" />
                          </SelectTrigger>
                          <SelectContent>
                            {budgetRanges.map((range) => (
                              <SelectItem key={range} value={range}>
                                {range}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message">Description du projet *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Décrivez votre projet, vos besoins, vos objectifs..."
                        rows={6}
                      />
                    </div>

                    {/* Submit Button */}
                    <Button 
                      type="submit" 
                      className="w-full bg-teal-600 hover:bg-teal-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2" size={16} />
                          Envoyer ma demande
                        </>
                      )}
                    </Button>

                    <p className="text-sm text-slate-600 text-center">
                      * Champs obligatoires. Vos données sont protégées et ne seront jamais partagées.
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-slate-800">
                  Informations de contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <info.icon className="text-teal-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{info.title}</h3>
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-slate-600 text-sm">
                          {info.action ? (
                            <a 
                              href={info.action} 
                              className="hover:text-teal-600 transition-colors"
                            >
                              {detail}
                            </a>
                          ) : (
                            detail
                          )}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-slate-800">
                  Réseaux sociaux
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                        <social.icon className="text-slate-600 group-hover:text-teal-600 transition-colors" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-800">{social.name}</h3>
                        <p className="text-sm text-slate-600">{social.username}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Response */}
            <Card className="bg-teal-50 border-teal-200">
              <CardContent className="p-6">
                <div className="text-center">
                  <Clock className="w-12 h-12 text-teal-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-slate-800 mb-2">
                    Réponse rapide garantie
                  </h3>
                  <p className="text-sm text-slate-600">
                    Je m'engage à vous répondre dans les 24h suivant votre demande.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Questions Fréquentes</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Retrouvez les réponses aux questions les plus courantes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="font-semibold text-slate-800 mb-2">Quels sont vos délais de livraison ?</h3>
              <p className="text-slate-600 text-sm">
                Les délais varient selon la complexité du projet. Un site vitrine prend généralement 2-3 semaines, 
                une application web 4-8 semaines.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-2">Proposez-vous de la maintenance ?</h3>
              <p className="text-slate-600 text-sm">
                Oui, je propose des contrats de maintenance pour assurer la sécurité, 
                les mises à jour et le bon fonctionnement de votre site.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-2">Travaillez-vous avec des clients à distance ?</h3>
              <p className="text-slate-600 text-sm">
                Absolument ! Je travaille avec des clients partout en France et à l'international 
                grâce aux outils de communication modernes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-2">Comment se déroule le processus de paiement ?</h3>
              <p className="text-slate-600 text-sm">
                Généralement 30% à la commande, 40% à mi-parcours et 30% à la livraison. 
                Les modalités peuvent être adaptées selon le projet.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact

