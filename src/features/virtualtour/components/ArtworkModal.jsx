// src/features/virtualtour/components/ArtworkModal.jsx
import React, { useState } from 'react';
import { FiX, FiPlay, FiPause } from 'react-icons/fi';
import '../styles/ArtworkModal.css';

function ArtworkModal({ artwork, onClose }) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeTab, setActiveTab] = useState('info');

  if (!artwork) return null;

 const handleAudioToggle = () => {
  const audio = document.getElementById('artwork-audio');
  console.log('=== DEBUG AUDIO ===');
  console.log('Audio element:', audio);
  console.log('Audio src:', artwork.audio);
  console.log('Is playing:', isPlayingAudio);
  
  if (isPlayingAudio) {
    audio?.pause();
    setIsPlayingAudio(false);
  } else {
    audio?.play()
      .then(() => {
        console.log('Audio started successfully');
        setIsPlayingAudio(true);
      })
      .catch(err => {
        console.error('Erreur lecture audio:', err);
        alert('Erreur: ' + err.message);
      });
  }
};
  return (
    <div className="artwork-modal-overlay" onClick={onClose}>
      <div className="artwork-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{artwork.title}</h2>
          <button className="modal-close" onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>

        <div className="modal-tabs">
          <button
            className={`tab ${activeTab === 'info' ? 'active' : ''}`}
            onClick={() => setActiveTab('info')}
          >
            📖 Informations
          </button>
          <button
            className={`tab ${activeTab === 'audio' ? 'active' : ''}`}
            onClick={() => setActiveTab('audio')}
          >
            🎧 Guide Audio
          </button>
          <button
            className={`tab ${activeTab === 'video' ? 'active' : ''}`}
            onClick={() => setActiveTab('video')}
          >
            🎬 Vidéo
          </button>
        </div>

        <div className="modal-content">
          {activeTab === 'info' && (
            <div className="info-tab">
              <div className="artwork-image-container">
                <img 
                  src={artwork.image} 
                  alt={artwork.title}
                  className="artwork-image"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/500x600?text=Image+Non+Disponible';
                  }}
                />
              </div>
              <div className="artwork-details">
                <div className="detail-row">
                  <span className="detail-label">🎨 Artiste :</span>
                  <span className="detail-value">{artwork.artist}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">📅 Année :</span>
                  <span className="detail-value">{artwork.year}</span>
                </div>
                <div className="detail-description">
                  <h3>Description</h3>
                  <p>{artwork.description}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'audio' && (
            <div className="audio-tab">
              <div className="audio-player">
                <div className="audio-artwork-preview">
                  <img 
                    src={artwork.image} 
                    alt={artwork.title}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300?text=Image';
                    }}
                  />
                </div>
                <h3>🎧 Guide Audio</h3>
                <p className="audio-description">
                  Écoutez la description détaillée de "{artwork.title}" par nos experts.
                </p>
                
                <audio 
                  id="artwork-audio"
                  src={artwork.audio}
                  onEnded={() => setIsPlayingAudio(false)}
                />

                <div className="audio-controls">
                  <button 
                    className="btn-audio-play"
                    onClick={handleAudioToggle}
                  >
                    {isPlayingAudio ? (
                      <>
                        <FiPause size={24} />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <FiPlay size={24} />
                        <span>Écouter</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="audio-note">
                  💡 Mettez vos écouteurs pour une expérience optimale
                </p>
              </div>
            </div>
          )}

          {activeTab === 'video' && (
            <div className="video-tab">
              <div className="video-player">
                <h3>🎬 Présentation Vidéo</h3>
                <p className="video-description">
                  Découvrez l'histoire et les détails fascinants de cette œuvre.
                </p>
                <video
                  controls
                  className="artwork-video"
                  poster={artwork.image}
                  onError={(e) => {
                    e.target.poster = 'https://via.placeholder.com/800x450?text=Vidéo+Non+Disponible';
                  }}
                >
                  <source src={artwork.video} type="video/mp4" />
                  Votre navigateur ne supporte pas la lecture vidéo.
                </video>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArtworkModal;