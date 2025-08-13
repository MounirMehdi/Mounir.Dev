import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Chat from './components/Chat'
import ScrollToTopButton from './components/mage-ui/ScrollToTopButton'
import NeonCursor from './components/mage-ui/cursor-effects/NeonCursor'
import './i18n'
import CookieConsent from "./components/CookieConsent"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="w-full max-w-[1920px] mx-auto px-0">

      <BrowserRouter>
        <Chat />
        <ScrollToTopButton />
        <CookieConsent />
        <App />
        <NeonCursor />
      </BrowserRouter>
    </div>
  </StrictMode>
)
