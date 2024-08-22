import { useEffect, useState } from "react";
import "./App.css";

import CardFilme from "./components/CardFilme";

function App() {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch('/data.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const openModal = (movie) => {
    setModal(movie);
  };

  const closeModal = () => {
    setModal(null);
  };

  //search
  const searchMovies = data?.movies.filter((movie) => movie.title.toLowerCase().includes(search.toLowerCase())) || [];

  return (
    <div className="mx-48 py-16">
      <h1 className="bg-gray-800 text-white py-4 text-center text-2xl font-semibold">
        LISTA DE FILMES
      </h1>

      <div className="flex justify-center gap-8">
        <input
          className="border border-gray-300 rounded-sm w-full px-4 py-2 my-16"
          type="text"
          placeholder="Pesquise pelo título do filme"
          onChange={(e) => setSearch(e.target.value)} // Atualiza o estado do search ao digitar um valor
        />
        <button className="bg-gray-600 px-16 my-16 rounded text-white">
          Pesquisar
        </button>
      </div>

      <div className="grid grid-cols-4 gap-32">
        {searchMovies.map((movie) => (
          <CardFilme
            key={movie.id}
            title={movie.title}
            image={movie.image}
            onClick={() => openModal(movie)}
          />
        ))}
      </div>

      {modal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 md:w-1/2">
            <h2 className="text-xl font-bold mb-2">{modal.title}</h2>
            <p>Diretor: {modal.director}</p>
            <p>Ano de Lançamento: {modal.year}</p>
            <p>Gênero: {modal.genre}</p>
            <p className="mt-4">{modal.synopsis}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={closeModal}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
