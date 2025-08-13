import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollUp = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Dès que le chemin change (donc y compris au chargement), scroll vers le haut
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null; // Ce composant ne rend rien
};

export default ScrollUp;