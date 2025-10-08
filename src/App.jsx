// src/App.jsx
import React, { useState } from "react";
import { VirtualTourHome } from "./features/virtualtour";
import QRScanner from "./features/qrscan/components/QRScanner";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="app">
      {currentPage === 'home' && (
        <div className="homepage">
          <h1>🏛️ Musée des Civilisations Noires</h1>
          <p>Bienvenue dans votre musée interactif nouvelle génération</p>
          
          <div className="features-nav">
            <button 
              className="feature-card"
              onClick={() => setCurrentPage('virtual-tour')}
            >
              <span className="feature-icon">🌐</span>
              <h3>Visite Virtuelle 360°</h3>
              <p>Explorez les 4 salles du musée en immersion totale</p>
              <div className="feature-badge">13 œuvres</div>
            </button>
            
            <button 
              className="feature-card"
              onClick={() => setCurrentPage('qr-scanner')}
            >
              <span className="feature-icon">📷</span>
              <h3>Scanner QR Code</h3>
              <p>Scannez les codes pour découvrir les détails des œuvres</p>
              <div className="feature-badge">Audio + Vidéo</div>
            </button>
            
            <button className="feature-card" disabled>
              <span className="feature-icon">🎨</span>
              <h3>Catalogue des Œuvres</h3>
              <p>Consultez toutes les œuvres (Bientôt disponible)</p>
              <div className="feature-badge coming-soon">Bientôt</div>
            </button>
          </div>

          <div className="home-stats">
            <div className="stat-card">
              <div className="stat-number">13</div>
              <div className="stat-label">Œuvres d'art</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">4</div>
              <div className="stat-label">Salles virtuelles</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">360°</div>
              <div className="stat-label">Immersion totale</div>
            </div>
          </div>

          <div className="home-info">
            <h2>✨ Nouvelle expérience muséale</h2>
            <p>
              Découvrez le Musée des Civilisations Noires comme jamais auparavant. 
              Naviguez en 360°, scannez les QR codes pour accéder aux guides audio 
              et vidéo, et plongez dans l'histoire fascinante de chaque œuvre.
            </p>
          </div>
        </div>
      )}

      {currentPage === 'virtual-tour' && (
        <VirtualTourHome onBack={() => setCurrentPage('home')} />
      )}

      {currentPage === 'qr-scanner' && (
        <QRScanner onBack={() => setCurrentPage('home')} />
      )}
    </div>
  );
}

export default App;