// src/features/virtualtour/data/rooms.js
import artworksData from '../../../data/artworks.json';

// Répartition des 10 œuvres dans 4 salles du musée
export const rooms = [
  {
    id: 1,
    name: "Salle des Portraits Classiques",
    description: "Admirez les portraits emblématiques de la Renaissance et du XVIIe siècle.",
    panoramaImage: "https://images.unsplash.com/photo-1566127444358-85a6ade2e1b3?w=2000&h=1000&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1566127444358-85a6ade2e1b3?w=600&h=400&fit=crop",
    ambientSound: null,
    // Œuvres : La Joconde, La Jeune Fille à la perle
    artworkIds: ["1", "5"],
    artworks: [
      {
        ...artworksData.find(art => art.id === "1"), // La Joconde
        position: { x: 30, y: 50 }
      },
      {
        ...artworksData.find(art => art.id === "5"), // La Jeune Fille à la perle
        position: { x: 70, y: 48 }
      }
    ],
    connectedRooms: [2],
  },
  {
    id: 2,
    name: "Salle de l'Expressionnisme",
    description: "Plongez dans l'univers émotionnel des maîtres expressionnistes et post-impressionnistes.",
    panoramaImage: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=2000&h=1000&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600&h=400&fit=crop",
    ambientSound: null,
    // Œuvres : Le Cri, La Nuit étoilée, Les Nymphéas
    artworkIds: ["2", "3", "8"],
    artworks: [
      {
        ...artworksData.find(art => art.id === "2"), // Le Cri
        position: { x: 25, y: 50 }
      },
      {
        ...artworksData.find(art => art.id === "3"), // La Nuit étoilée
        position: { x: 50, y: 48 }
      },
      {
        ...artworksData.find(art => art.id === "8"), // Les Nymphéas
        position: { x: 75, y: 52 }
      }
    ],
    connectedRooms: [1, 3],
  },
  {
    id: 3,
    name: "Salle de l'Art Moderne",
    description: "Découvrez les chefs-d'œuvre du cubisme, du surréalisme et de l'art révolutionnaire.",
    panoramaImage: "https://images.unsplash.com/photo-1577083862680-cd732c0dfd58?w=2000&h=1000&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1577083862680-cd732c0dfd58?w=600&h=400&fit=crop",
    ambientSound: null,
    // Œuvres : Guernica, La Persistance de la mémoire, La Liberté guidant le peuple
    artworkIds: ["4", "9", "7"],
    artworks: [
      {
        ...artworksData.find(art => art.id === "4"), // Guernica
        position: { x: 30, y: 50 }
      },
      {
        ...artworksData.find(art => art.id === "9"), // La Persistance de la mémoire
        position: { x: 55, y: 48 }
      },
      {
        ...artworksData.find(art => art.id === "7"), // La Liberté guidant le peuple
        position: { x: 75, y: 51 }
      }
    ],
    connectedRooms: [2, 4],
  },
  {
    id: 4,
    name: "Salle de l'Art Symboliste et Réaliste",
    description: "Explorez les œuvres emblématiques du symbolisme et du réalisme du XIXe siècle.",
    panoramaImage: "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=2000&h=1000&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=600&h=400&fit=crop",
    ambientSound: null,
    // Œuvres : Le Baiser, Le Déjeuner sur l'herbe
    artworkIds: ["6", "10"],
    artworks: [
      {
        ...artworksData.find(art => art.id === "6"), // Le Baiser
        position: { x: 35, y: 50 }
      },
      {
        ...artworksData.find(art => art.id === "10"), // Le Déjeuner sur l'herbe
        position: { x: 65, y: 49 }
      }
    ],
    connectedRooms: [3],
  }
];

// Fonction helper pour obtenir une salle par ID
export const getRoomById = (id) => {
  return rooms.find(room => room.id === id);
};

// Fonction pour obtenir les salles adjacentes
export const getConnectedRooms = (roomId) => {
  const room = getRoomById(roomId);
  if (!room) return [];
  return room.connectedRooms.map(id => getRoomById(id));
};

// Fonction pour obtenir toutes les œuvres d'une salle
export const getArtworksInRoom = (roomId) => {
  const room = getRoomById(roomId);
  return room ? room.artworks : [];
};

// Fonction pour rechercher une œuvre par ID dans toutes les salles
export const findArtworkById = (artworkId) => {
  for (const room of rooms) {
    const artwork = room.artworks.find(art => art.id === artworkId);
    if (artwork) {
      return { artwork, room };
    }
  }
  return null;
};