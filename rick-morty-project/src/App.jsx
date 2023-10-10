import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Estado e lógica relacionados à lista de personagens
  const [characters, setCharacters] = useState([]); // Cria um estado para armazenar a lista de personagens.
  const [searchQuery, setSearchQuery] = useState(''); // Cria um estado para armazenar a consulta de pesquisa.
  const [filterStatus, setFilterStatus] = useState(''); // Cria um estado para armazenar o filtro de status.

  useEffect(() => {
    // Esta função será executada sempre que searchQuery ou filterStatus forem alterados.
    const fetchCharacters = async () => {
      try {
        let apiUrl = 'https://rickandmortyapi.com/api/character/';

        if (searchQuery) {
          apiUrl += `?name=${searchQuery}`; // Se houver uma consulta de pesquisa, adiciona ao URL.
        } else if (filterStatus) {
          apiUrl += `?status=${filterStatus}`; // Se houver um filtro de status, adiciona ao URL.
        }

        const response = await fetch(apiUrl); // Faz uma solicitação para a API com o URL construído.
        const data = await response.json(); // Converte a resposta em um objeto JSON.
        setCharacters(data.results); // Atualiza o estado com a lista de personagens obtida da API.
      } catch (error) {
        console.error('Error fetching characters:', error); // Trata erros em caso de falha na solicitação.
      }
    };

    fetchCharacters(); // Chama a função de busca quando o componente é montado ou quando os estados mudam.
  }, [searchQuery, filterStatus]);

  // Estado e lógica relacionados aos detalhes do personagem
  const [selectedCharacter, setSelectedCharacter] = useState(null); // Cria um estado para armazenar o personagem selecionado.

  const showDetails = async (characterId) => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`); // Faz uma solicitação para obter detalhes de um personagem específico.
      const data = await response.json(); // Converte a resposta em um objeto JSON.
      setSelectedCharacter(data); // Atualiza o estado com os detalhes do personagem selecionado.
    } catch (error) {
      console.error('Error fetching character details:', error); // Trata erros em caso de falha na solicitação.
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
          onChange={(e) => setSearchQuery(e.target.value)} // Atualiza o estado de pesquisa quando o valor do campo de entrada muda.
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
          {/* Aqui são exibidos os detalhes do personagem selecionado */}
        </div>
      )}
    </div>
  );
}

export default App;
