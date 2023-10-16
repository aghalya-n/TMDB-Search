import React, {useState, useEffect} from "react";
import axios from "axios";
import { API_KEY, BASE_URL } from "../../apiKeyInfo";
import { Link } from "react-router-dom";
import './Gallery.css'

const Gallery = () => {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [movies, setMovies] = useState([]);

  const genres = [
    {id: 'All', name: 'ALL'},
    {id: '28', name: 'ACTION'},
    {id: '12', name: 'ADVENTURE'},
    {id: '16', name: 'ANIMATION'},
    {id: '35', name: 'COMEDY'},
    {id: '80', name: 'CRIME'},
    {id: '9648', name: 'MYSTERY'},
    {id: '99', name: 'DOCUMENTARY'},
    {id: '18', name: 'DRAMA'},
    {id: '10402', name: 'MUSICAL'},
    {id: '10749', name: 'ROMANCE'},
    {id: '878', name: 'SCI-FI'},
    {id: '53', name: 'THRILLER'},
    {id: '27', name: 'HORROR'},
    {id: '37', name: 'WESTERN'},
  ];

  useEffect(() => {  
    const fetchData = async () => {
      const genreId = selectedGenre === 'All' ? '' : selectedGenre;

      try {
        const response = await axios.get(
          `${BASE_URL}/discover/movie` , {
            params: {
              api_key: API_KEY,
              sort_by: 'popularity.desc',
              with_genres: genreId,
            }
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching data: ', error);
      } 
    }
    fetchData();
  }, [selectedGenre]);
    
  const genreFilterHandler = (genreId) => {
    setSelectedGenre(genreId);
  }

  return (
    <div className="container">
      <div className="filters">
        <h2 className="filter-header">FILTER BY GENRE:</h2>
        <div className="filter-buttons">
          {genres.map((genre) => (
            <button 
              className={selectedGenre === genre.id ? 'active' : ''}
              key={genre.id}
              onClick={() => genreFilterHandler(genre.id)}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>
      <div className="gallery">
        {movies.map((movie) => (
          <div className="poster" key={movie.id}>
            <Link to={`/detail/${movie.id}`}>
              <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={movie.title} 
              />
              <h4>{movie.title}</h4>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;