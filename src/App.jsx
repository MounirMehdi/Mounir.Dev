import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import Projects from './pages/Projects'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Devis from './pages/Devis'
import Cookies from './pages/Cookies'
import './App.css'
import ScrollToTop from "./components/mage-ui/ScrollUp";

function App() {
  return (
      <div className="min-h-screen bg-background">
        <Header />
        <ScrollToTop />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/devis" element={<Devis />} />
            <Route path="/cookies" element={<Cookies />} />
          </Routes>
        </main>
        <Footer />
      </div>
  )
}

export default App

