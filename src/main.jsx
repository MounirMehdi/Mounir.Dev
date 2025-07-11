import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import RippleCursor from './components/mage-ui/cursor-effects/RippleCursor'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RippleCursor />
    <App />
  </StrictMode>,
)
