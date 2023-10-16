import React, {useState, useEffect} from "react";
import axios from "axios";
// import PropTypes from "prop-types";
import { API_KEY, BASE_URL } from "../../apiKeyInfo";
import { Link } from "react-router-dom";
import './Home.css'

const Home = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // const [sortedResults, setSortedResults] = useState([]);
  const [sortBy, setSortBy] = useState('popularity.desc');
  // const [displayResults, setDisplayResults] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        // const apiKey = '040fc8e322ea180a7cbc24c9d82466fe'
        const searchResponse = await axios.get(
          `${BASE_URL}/search/movie`, {
            params: {
              api_key: API_KEY,
              query: query,
              // sortBy: sortBy,
            }
          }
        );
        // const sortedResponse = await axios.get(
        //   `${BASE_URL}/movie/top_rated`, {
        //     params: {
        //       api_key: API_KEY,
        //       sort_by: sortBy,
        //     }
        //   }
        // );
        setSearchResults(searchResponse.data.results);
        // setSortedResults(sortedResponse.data.results);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();
  }, [query, sortBy]);

  const sortResults = (toSort, ordered) => {
    const sortedResults = [...toSort];
    return sortedResults.sort((a, b) => {
      if (ordered === 'popularity.desc') {
        return b.popularity - a.popularity;
      } else if (ordered === 'popularity.asc') {
        return a.popularity - b.popularity;
      } else if (ordered === 'vote_average.asc') {
        return a.vote_average - b.vote_average;
      } else if (ordered === 'vote_average.desc') {
        return b.vote_average - a.vote_average;
      }
      return 0;
    });
  }

  const sortedResults = sortResults(searchResults, sortBy);

  return (
    <div className="container">
      <div className="search-box-container">
        <h3 className="search-header">SEARCH FOR A MOVIE:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;SORT BY:</h3>

        <div className="search-box">
          <input
              type="text"
              placeholder="SEARCH FOR MOVIES..."
              value={query}
              onChange={event => setQuery(event.target.value)}
              className="search"
          />
          <select className="sort" value={sortBy} onChange={event => setSortBy(event.target.value)}>
            <option value="popularity.desc">POPULARITY DESCENDING</option>
            <option value="popularity.asc">POPULARITY ASCENDING</option>
            <option value="vote_average.desc">RATING DESCENDING</option>
            <option value="vote_average.asc">RATING ASCENDING</option>
          </select>
        </div>
      </div>
      
      <ul className="movies">
        {sortedResults.map(result => (
          <li key={result.id} className="movie">
            <Link to={{pathname: `/detail/${result.id}`, state: sortedResults}}>
              <div className="content-poster">
                <img
                  alt={`The movie titled: ${result.title}`}
                  src={`https://image.tmdb.org/t/p/w154${result.poster_path}`}
                />
              </div>
              <div className="movie-info">
                <p>TITLE •&emsp;{result.title}</p>
                <p>RELEASED •&emsp;{result.release_date}</p>
                <p>RATING •&emsp;{result.vote_average}</p>
              </div>
            </Link>
          </li>
          
        ))}
      </ul>
    </div>
  );
}
export default Home;