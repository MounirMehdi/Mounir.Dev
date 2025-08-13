import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { KeyboardArrowUp } from "@mui/icons-material";
import "../../assets/css/scrollUp.css";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 200);
    };
    
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          className="scroll-to-top-button"
          aria-label="Retour en haut"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1, backgroundColor: "var(--color-teal-500)" }}
          whileTap={{ scale: 0.9 }}
        >
          <KeyboardArrowUp sx={{ fontSize: 24 }} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;