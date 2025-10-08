// src/features/virtualtour/components/RoomViewer.jsx
import React, { useEffect, useState } from 'react';
import 'aframe';
import { Entity, Scene } from 'aframe-react';
import { FiArrowLeft, FiMaximize, FiInfo, FiVolumeX, FiVolume2 } from 'react-icons/fi';
import ArtworkModal from './ArtworkModal';
import '../styles/VirtualTour.css';

function RoomViewer({ room, onBack }) {
  const [showInfo, setShowInfo] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  useEffect(() => {
    const scene = document.querySelector('a-scene');
    if (scene) {
      scene.setAttribute('vr-mode-ui', 'enabled: false');
    }
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.querySelector('#scene-container')?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleHotspotClick = (artwork) => {
    console.log('Œuvre cliquée:', artwork);
    setSelectedArtwork(artwork);
  };

  if (!room) return <div>Chargement...</div>;

  return (
    <div className="room-viewer-aframe" id="scene-container">
      <div className="viewer-header">
        <button onClick={onBack} className="btn-back">
          <FiArrowLeft size={20} />
          <span>Retour</span>
        </button>
        <h2 className="room-title">{room.name}</h2>
        <div className="viewer-controls">
          <button 
            onClick={() => setShowInfo(!showInfo)} 
            className="btn-control"
            title="Informations"
          >
            <FiInfo size={20} />
          </button>
          <button 
            onClick={() => setSoundEnabled(!soundEnabled)} 
            className="btn-control"
            title={soundEnabled ? "Couper le son" : "Activer le son"}
          >
            {soundEnabled ? <FiVolume2 size={20} /> : <FiVolumeX size={20} />}
          </button>
          <button 
            onClick={toggleFullscreen} 
            className="btn-control"
            title="Plein écran"
          >
            <FiMaximize size={20} />
          </button>
        </div>
      </div>

      <Scene
        embedded
        vr-mode-ui="enabled: false"
        cursor="rayOrigin: mouse"
        raycaster="objects: .clickable"
      >
        <Entity
          primitive="a-camera"
          look-controls="touchEnabled: true"
          wasd-controls="enabled: false"
        >
          <Entity
            primitive="a-cursor"
            animation__click="property: scale; startEvents: click; from: 0.1 0.1 0.1; to: 1 1 1; dur: 150"
          />
        </Entity>

        <Entity
          primitive="a-sky"
          src={room.panoramaImage}
          rotation="0 -130 0"
        />

        {room.artworks && room.artworks.map((artwork) => {
          const theta = (artwork.position.x / 100) * 2 * Math.PI;
          const phi = (artwork.position.y / 100) * Math.PI;
          const radius = 5;

          const x = radius * Math.sin(phi) * Math.cos(theta);
          const y = radius * Math.cos(phi);
          const z = radius * Math.sin(phi) * Math.sin(theta);

          return (
            <Entity
              key={artwork.id}
              position={`${x} ${y} ${z}`}
              className="clickable"
            >
              <Entity
                primitive="a-sphere"
                radius="0.15"
                color="#FFD700"
                opacity="0.8"
                animation="property: scale; to: 1.3 1.3 1.3; dir: alternate; dur: 1000; loop: true"
                onClick={() => handleHotspotClick(artwork)}
              />
              
              <Entity
                primitive="a-torus"
                radius="0.2"
                radius-tubular="0.02"
                color="#FFD700"
                rotation="90 0 0"
                opacity="0.5"
                animation="property: scale; to: 2 2 2; opacity: 0; dur: 2000; loop: true"
              />

              <Entity
                primitive="a-text"
                value={artwork.title}
                align="center"
                color="#FFFFFF"
                width="3"
                position="0 0.3 0"
                look-at="[camera]"
               
              />
            </Entity>
          );
        })}

        <Entity primitive="a-light" type="ambient" color="#FFF" intensity="0.8" />
        <Entity primitive="a-light" type="directional" color="#FFF" intensity="0.5" position="1 1 1" />

        {soundEnabled && room.ambientSound && (
          <Entity
            primitive="a-sound"
            src={room.ambientSound}
            autoplay="true"
            loop="true"
            volume="0.3"
          />
        )}
      </Scene>

      {showInfo && (
        <div className="info-panel">
          <button 
            className="info-close"
            onClick={() => setShowInfo(false)}
          >
            ✕
          </button>
          <h3>📍 {room.name}</h3>
          <p>{room.description}</p>
          
          <div className="artwork-list">
            <h4>🎨 Œuvres présentes ({room.artworks?.length || 0})</h4>
            <ul>
              {room.artworks?.map((artwork) => (
                <li key={artwork.id}>
                  <strong>{artwork.title}</strong>
                  <br />
                  <span className="artist-name">{artwork.artist}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="controls-guide">
            <h4>🎮 Contrôles</h4>
            <ul>
              <li>🖱️ Cliquez et glissez pour regarder autour</li>
              <li>📱 Sur mobile : Orientez votre appareil</li>
              <li>🎨 Cliquez sur les marqueurs dorés</li>
              <li>🔍 Double-cliquez pour zoomer</li>
            </ul>
          </div>
        </div>
      )}

      <div className="viewer-instructions">
        <p>🔄 Glissez pour explorer la salle en 360° | 🎨 Cliquez sur les marqueurs dorés</p>
      </div>

      {selectedArtwork && (
        <ArtworkModal 
          artwork={selectedArtwork} 
          onClose={() => setSelectedArtwork(null)} 
        />
      )}
    </div>
  );
}

export default RoomViewer;