import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Close, AttachFile, SmartToy } from "@mui/icons-material";
import "../assets/css/chat.css";

const API_KEY = "AIzaSyC_epqoSrQ6WfDM4eSNmXkch40vpRQxJVQ";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const Chat = () => {
  const chatBodyRef = useRef(null);
  const messageInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [pendingFile, setPendingFile] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const message = messageInputRef.current.value.trim();
    if (!message && !pendingFile) return;
    if (!message && pendingFile) {
      setError("Veuillez ajouter du texte avec votre image");
      return;
    }

    setError(null);
    setIsTyping(true);

    // Créer le message utilisateur
    const userMessage = {
      id: Date.now(),
      role: "user",
      parts: [{ text: message }],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    if (pendingFile) {
      userMessage.filePreviewUrl = pendingFile.previewUrl;
      userMessage.parts.push({ inline_data: pendingFile });
    }

    // Mettre à jour l'historique
    setChatHistory(prev => [...prev, userMessage]);
    messageInputRef.current.value = "";
    
    // Réinitialiser le fichier en attente après l'envoi
    setPendingFile(null);

    // Ajouter le message de chargement
    const botLoadingMessage = {
      id: Date.now() + 1,
      role: "model",
      parts: [{ text: "..." }],
      loading: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatHistory(prev => [...prev, botLoadingMessage]);

    // Envoyer à l'API
    try {
      const sanitizeContent = (content) => ({
        role: content.role,
        parts: content.parts.map((part) => {
          if (part.inline_data) {
            return {
              inline_data: {
                data: part.inline_data.data,
                mime_type: part.inline_data.mime_type,
              },
            };
          } else {
            return { text: part.text };
          }
        }),
      });

      // Envoyer uniquement les 5 derniers messages pour éviter la surcharge
      const recentHistory = chatHistory.slice(-5);
      const sanitizedHistory = [...recentHistory, userMessage].map(sanitizeContent);
      
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: sanitizedHistory }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || "Erreur inconnue de l'API");

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text
        ?.replace(/\*\*(.*?)\*\*/g, "$1")
        .trim() || "Désolé, je n'ai pas pu générer de réponse.";

      // Mettre à jour le dernier message
      setChatHistory(prev => {
        const updated = [...prev];
        const lastIndex = updated.findIndex(msg => msg.loading);
        if (lastIndex !== -1) {
          updated[lastIndex] = {
            ...updated[lastIndex],
            role: "model",
            parts: [{ text }],
            loading: false,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
        }
        return updated;
      });
    } catch (err) {
      setError(err.message);
      setChatHistory(prev => {
        const updated = [...prev];
        const lastIndex = updated.findIndex(msg => msg.loading);
        if (lastIndex !== -1) {
          updated[lastIndex] = {
            ...updated[lastIndex],
            role: "model",
            parts: [{ text: "⚠️ Désolé, une erreur est survenue. Veuillez réessayer." }],
            error: true,
            loading: false,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
        }
        return updated;
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match("image.*")) {
      setError("Veuillez sélectionner une image valide (JPG, PNG, GIF)");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result.split(",")[1];
      setPendingFile({
        data: base64,
        mime_type: file.type,
        previewUrl: event.target.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const clearChat = () => {
    setChatHistory([]);
    setPendingFile(null);
    setError(null);
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
    
    if (showChatbot && chatHistory.length === 0) {
      const welcomeMessage = {
        id: Date.now(),
        role: "model",
        parts: [{ text: "Bonjour 👋 ! Comment puis-je vous aider aujourd'hui ?" }],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory([welcomeMessage]);
    }
  }, [chatHistory, showChatbot]);

  return (
    <>
      <AnimatePresence>
        {!showChatbot && (
          <motion.button
            id="chatbot-toggler"
            onClick={() => setShowChatbot(true)}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="fade-in-bounceup"
            style={{
              background: "linear-gradient(135deg, #055BA4 0%, #41ADE8 100%)",
              boxShadow: "0 4px 14px 0 rgba(5, 91, 164, 0.4)"
            }}
          >
            <SmartToy sx={{ fontSize: 25, color: "white" }} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showChatbot && (
          <motion.div
            className="chatbot-popup"
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 100 }}
            transition={{ type: "spring", damping: 20 }}
            style={{
              background: "linear-gradient(135deg, #031A3D 0%, #055BA4 100%)",
              border: "1px solid #41ADE8",
              boxShadow: "0 10px 30px rgba(3, 26, 61, 0.5)"
            }}
          >
            {/* Header */}
            <div 
              className="chat-header"
              style={{
                background: "#031A3D",
                borderBottom: "1px solid #41ADE8"
              }}
            >
              <div className="header-info">
                <SmartToy sx={{ fontSize: 25, color: "#41ADE8" }} />
                <h2 className="logo-text" style={{ color: "white" }}>AI Assist</h2>
              </div>
              
              <div className="header-actions">
                <button 
                  onClick={clearChat} 
                  className="header-btn" 
                  title="Nouvelle conversation"
                  style={{ color: "#41ADE8" }}
                >
                  <span className="material-symbols-rounded">refresh</span>
                </button>
                <button 
                  onClick={() => setShowChatbot(false)} 
                  className="header-btn" 
                  id="close-chatbot"
                  title="Fermer"
                  style={{ color: "white" }}
                >
                  <Close sx={{ fontSize: 20, color: "#41ADE8" }} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div 
              className="chat-body" 
              ref={chatBodyRef}
              style={{ backgroundColor: "#f8fafc" }}
            >
              {chatHistory.map((msg) => (
                <motion.div
                  key={msg.id}
                  className={`message ${msg.role === "user" ? "user-message" : "bot-message"} ${msg.loading ? "thinking" : ""}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    color: "white"
                  }}
                >
                  {msg.role === "model" && !msg.loading && (
                    <div className="bot-avatar">
                      <SmartToy sx={{ fontSize: 20, color: "white" }} />
                    </div>
                  )}
                  
                  <div className="message-content">
                    <div className={`message-text ${msg.error ? "error" : ""}`}>
                      {msg.loading ? (
                        <div className="thinking-indicator">
                          <div className="dot" style={{ backgroundColor: "white" }}></div>
                          <div className="dot" style={{ backgroundColor: "white" }}></div>
                          <div className="dot" style={{ backgroundColor: "white" }}></div>
                        </div>
                      ) : (
                        msg.parts?.[0]?.text || ""
                      )}
                    </div>
                    
                    {msg.filePreviewUrl && msg.role === "user" && (
                      <div className="attachment-wrapper">
                        <img
                          src={msg.filePreviewUrl}
                          alt="Image envoyée"
                          className="attachment"
                        />
                        <div className="attachment-overlay">Image jointe</div>
                      </div>
                    )}
                    
                    <div 
                      className="message-time"
                      style={{ color: "rgba(15, 0, 99, 0.7)" }}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div 
              className="chat-footer"
              style={{
                backgroundColor: "#031A3D",
                borderTop: "1px solid #41ADE8"
              }}
            >
              {error && (
                <div 
                  className="error-message"
                  style={{
                    backgroundColor: "rgba(239, 68, 68, 0.2)",
                    color: "#fef2f2",
                    border: "1px solid rgba(239, 68, 68, 0.5)"
                  }}
                >
                  <span className="material-symbols-rounded">error</span>
                  {error}
                </div>
              )}
              
              <form className="chat-form" onSubmit={handleSendMessage}>
                <div className="input-wrapper">
                  <div className="file-upload-wrapper">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      id="file-input"
                      hidden
                      onChange={handleFileChange}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        fileInputRef.current.value = "";
                        fileInputRef.current.click();
                      }}
                      className={`file-btn ${pendingFile ? "active" : ""}`}
                      title="Joindre une image"
                      style={{
                        color: pendingFile ? "#41ADE8" : "#055BA4",
                        backgroundColor: "white"
                      }}
                    >
                      <AttachFile sx={{ fontSize: 22 }} />
                    </button>
                  </div>
                  
                  <textarea
                    className="message-input"
                    ref={messageInputRef}
                    placeholder="Écrivez votre message..."
                    required={!pendingFile}
                    rows={1}
                    style={{
                      backgroundColor: "white",
                      color: "#031A3D",
                      border: "1px solid #41ADE8"
                    }}
                    onInput={(e) => {
                      e.target.style.height = "auto";
                      e.target.style.height = (e.target.scrollHeight) + "px";
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(e);
                      }
                    }}
                  />
                  
                  <button 
                    type="submit" 
                    id="send-message" 
                    className="send-btn"
                    disabled={isTyping}
                    style={{
                      backgroundColor: "#41ADE8",
                      color: "white"
                    }}
                  >
                    <Send sx={{ fontSize: 22 }} />
                  </button>
                </div>
                
                {pendingFile && (
                  <div className="file-preview">
                    <img
                      src={pendingFile.previewUrl}
                      alt="Prévisualisation"
                      className="preview-image"
                    />
                    <button
                      type="button"
                      onClick={() => setPendingFile(null)}
                      className="remove-file"
                      style={{
                        backgroundColor: "#031A3D",
                        color: "white"
                      }}
                    >
                      <Close sx={{ fontSize: 18 }} />
                    </button>
                  </div>
                )}
              </form>
              
              <div 
                className="chat-footer-note"
                style={{ color: "rgba(255, 255, 255, 0.7)" }}
              >
                <small>AI Assist peut faire des erreurs. Vérifiez les informations importantes.</small>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chat;