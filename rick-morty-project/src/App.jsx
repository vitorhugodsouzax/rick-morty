import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Estado e lógica relacionados à lista de personagens
  const [characters, setCharacters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        let apiUrl = 'https://rickandmortyapi.com/api/character/';

        if (searchQuery) {
          apiUrl += `?name=${searchQuery}`;
        } else if (filterStatus) {
          apiUrl += `?status=${filterStatus}`;
        }

        const response = await fetch(apiUrl);
        const data = await response.json();
        setCharacters(data.results);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, [searchQuery, filterStatus]);

  // Estado e lógica relacionados aos detalhes do personagem
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const showDetails = async (characterId) => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
      const data = await response.json();
      setSelectedCharacter(data);
    } catch (error) {
      console.error('Error fetching character details:', error);
    }
  };

  return (
    <div className="app-container">
      <div className="character-list">
        <h2>Personagens de Rick and Morty</h2>
        <input
          type="text"
          placeholder="Pesquisar por personagem"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">Todos os Status</option>
          <option value="alive">Vivo</option>
          <option value="dead">Morto</option>
          <option value="unknown">Desconhecido</option>
        </select>
        <ul>
          {characters.map((character) => (
            <li key={character.id} onClick={() => showDetails(character.id)} className="personagem-item">
              <img className="imagem-personagem" src={character.image} alt={`${character.name} thumbnail`} />
              <span className="nome-personagem">{character.name}</span>
            </li>
          ))}
        </ul>
      </div>
      {selectedCharacter && (
        <div className="character-details">
          <div className="detailsContainer">
            <div className="imageContainer">
              <div className="detail-title">Detalhes do Personagem</div>
              <img
                src={selectedCharacter.image}
                alt={`${selectedCharacter.name} thumbnail`}
                className="characterImage"
              />
            </div>
            <div className="detailsText">
              <h2>{selectedCharacter.name}</h2>
              <p><strong>Nome:</strong> {selectedCharacter.name}</p>
              <p><strong>Status:</strong> {selectedCharacter.status}</p>
              <p><strong>Espécie:</strong> {selectedCharacter.species}</p>
              <h3>Episódios:</h3>
              <ul>
              {selectedCharacter && selectedCharacter.episode && selectedCharacter.episode.map((episode, index) => {
  const parts = episode.split('/');
  const episodeNumber = parts[parts.length - 1];
  const episodeTitle = selectedCharacter.episodeTitle && selectedCharacter.episodeTitle[index];
  const titleText = episodeTitle ? `Título: ${episodeTitle}` : 'Título desconhecido';
  return (
    <li key={index}>
      Número: {episodeNumber}, {titleText}
    </li>
  );
})}

  

              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
