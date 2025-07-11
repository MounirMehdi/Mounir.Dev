import React from 'react'
import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Mounir Mehdi</h3>
            <p className="text-slate-300 mb-4 leading-relaxed">
              Développeur Full Stack passionné avec plus de 2 ans d'expérience dans la création 
              d'applications web modernes et performantes. Spécialisé en React, Laravel et UX/UI Design.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/MounirMehdi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-teal-400 transition-colors"
              >
                <Github size={24} />
              </a>
              <a 
                href="https://linkedin.com/in/mounir-mehdi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-teal-400 transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="mailto:mounir8mehdi@gmail.com"
                className="text-slate-300 hover:text-teal-400 transition-colors"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-300 hover:text-teal-400 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-300 hover:text-teal-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-slate-300 hover:text-teal-400 transition-colors">
                  Projets
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-slate-300 hover:text-teal-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-300 hover:text-teal-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin size={18} className="text-teal-400" />
                <span className="text-slate-300">Paris, France</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-teal-400" />
                <span className="text-slate-300">0567895510</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-teal-400" />
                <span className="text-slate-300">mounir8mehdi@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-400">
            © 2025 Mounir Mehdi. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

