// src/features/virtualtour/components/RoomList.jsx
import React from 'react';
import { ArrowRight } from 'react-icons/fi';
import '../styles/VirtualTour.css';
import { FiArrowRight } from 'react-icons/fi';

function RoomList({ rooms, onSelectRoom }) {
  return (
    <div className="room-list-container">
      <div className="room-list-header">
        <h1>🏛️ Visite Virtuelle 360°</h1>
        <p>Explorez les salles du Musée des Civilisations Noires</p>
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-number">{rooms.length}</span>
            <span className="stat-label">Salles</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {rooms.reduce((acc, room) => acc + (room.artworks?.length || 0), 0)}
            </span>
            <span className="stat-label">Œuvres</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">360°</span>
            <span className="stat-label">Immersion</span>
          </div>
        </div>
      </div>

      <div className="room-grid">
        {rooms.map((room) => (
          <div 
            key={room.id} 
            className="room-card"
            onClick={() => onSelectRoom(room)}
          >
            <div className="room-card-image-wrapper">
              <img 
                src={room.thumbnail || room.panoramaImage} 
                alt={room.name}
                className="room-card-image"
              />
              <div className="room-card-overlay">
                <span className="explore-badge">🔍 Explorer en 360°</span>
              </div>
            </div>
            
            <div className="room-card-content">
              <h3 className="room-card-title">{room.name}</h3>
              <p className="room-card-description">{room.description}</p>
              
              <div className="room-card-footer">
                <div className="room-info">
                  <span className="artwork-count">
                    🎨 {room.artworks?.length || 0} œuvres
                  </span>
                  {room.ambientSound && (
                    <span className="has-audio">🔊 Audio</span>
                  )}
                </div>
                <button className="btn-explore">
                  Visiter
                 <FiArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Guide rapide */}
      <div className="quick-guide">
        <h3>💡 Comment ça marche ?</h3>
        <div className="guide-steps">
          <div className="guide-step">
            <div className="step-number">1</div>
            <p>Choisissez une salle à visiter</p>
          </div>
          <div className="guide-step">
            <div className="step-number">2</div>
            <p>Explorez en 360° en glissant</p>
          </div>
          <div className="guide-step">
            <div className="step-number">3</div>
            <p>Cliquez sur les œuvres</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomList;