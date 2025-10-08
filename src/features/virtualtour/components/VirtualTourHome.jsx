// src/features/virtualtour/components/VirtualTourHome.jsx
import React, { useState } from 'react';
import RoomList from './RoomList';
import RoomViewer from './RoomViewer';
import ArtworkModal from './ArtworkModal';
import { rooms } from '../data/rooms';

function VirtualTourHome() {
  const [currentRoom, setCurrentRoom] = useState(null);
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const handleSelectRoom = (room) => {
    setCurrentRoom(room);
  };

  const handleBackToList = () => {
    setCurrentRoom(null);
  };

  const handleArtworkClick = (artwork) => {
    setSelectedArtwork(artwork);
  };

  const handleCloseModal = () => {
    setSelectedArtwork(null);
  };

  return (
    <div className="virtual-tour-home">
      {!currentRoom ? (
        <RoomList rooms={rooms} onSelectRoom={handleSelectRoom} />
      ) : (
        <RoomViewer 
          room={currentRoom} 
          onBack={handleBackToList}
          onArtworkClick={handleArtworkClick}
        />
      )}

      {selectedArtwork && (
        <ArtworkModal 
          artwork={selectedArtwork} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}

export default VirtualTourHome;