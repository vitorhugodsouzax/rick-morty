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
  const [episodes, setEpisodes] = useState([]);

  const showDetails = async (characterId) => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
      const data = await response.json();
      setSelectedCharacter(data);
      fetchForEachEpisode(data);
    } catch (error) {
      console.error('Error fetching character details:', error);
    }
  };

  const fetchForEachEpisode = async (character) => {
    const allEpisodes = [];

    for (let i = 0; i < character.episode.length; i++) {
      const url = character.episode[i];
      const responseEpisodes = await fetch(url);
      const dataEpisodes = await responseEpisodes.json();
      allEpisodes.push(dataEpisodes);
    }

    setEpisodes(allEpisodes);
  };

  return (
    <div className="app-container">
      <div className="character-list">
        <h2>Personagens de Rick and Morty</h2>
        <div className="pesquisa-container">
          <input
            type="text"
            placeholder="Pesquisar por personagem"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pesquisa"
          />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="pesquisa">
            <option value="">Todos os Status</option>
            <option value="alive">Vivo</option>
            <option value="dead">Morto</option>
            <option value="unknown">Desconhecido</option>
          </select>
        </div>
        <ul>
          {characters.map((character) => (
            <li key={character.id} onClick={() => showDetails(character.id)} className="personagem-item">
              <div className="character-info">
                <img className="imagem-personagem" src={character.image} alt={`${character.name} thumbnail`} />
                <span className="nome-personagem">{character.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {selectedCharacter && (
        <div className="character-details">
          <div className="detailsContainer">
            <div className="imageContainer">
              <h3 className="detail-title">Detalhes do Personagem</h3>
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
              <h1 className="title-episodio">Episódios</h1>
              <ul>
                {episodes.map((episode) => (
                  <li key={episode.id} className="li">
                    <h1 className="episodios">{episode.episode}, {episode.name}</h1>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
