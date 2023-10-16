import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { BASE_URL, API_KEY } from "../../apiKeyInfo";
import "./Detail.css";
// import sortedRes from "../home/Home";

const Detail = () => {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();

  // const movieId = parseInt(id, 10);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/movie/${movieId}`, {
          params: {
            api_key: API_KEY,
            sort_by: 'popularity.desc',
          }
        });
        setMovie(res.data);
      } catch (error) {
        console.log('Error fetching data: ', error);
      }
    };
    fetchMovie();
  }, [movieId]);

  //const { state } = this.props.location;
  
  return (
    <div className="detail-container">
      <div className="detail-title">
        <h2>VIEW IN DETAIL</h2>
      </div>
      <div className="detail-container-inner">
        { movie ? (
          <>
            <div className="movie-title">
              <h2>{movie.title}</h2>
              <p><i>RELEASED &nbsp;{movie.release_date}</i></p>
            </div>
            <div className="details">
              <div className="detail-poster">
                <img src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} alt={movie.title} />
              </div>
              <div className="info">
              <p><i><strong>RATING</strong></i> <br></br> {movie.vote_average}</p>
              <p><i><strong>RUNTIME</strong></i> <br></br> {movie.runtime}</p>
              <p><i><strong>OVERVIEW</strong></i> <br></br> {movie.overview}</p>
              </div>
            </div>
          </>
        ) : (
          <p><i>LOADING...</i></p>
        )}

        <div className="nav">
          <Link to={`/detail/${parseInt(movieId, 10) - 1}`} 
            className="prev">
              &lt;
            </Link>
            <Link to={`/detail/${parseInt(movieId, 10) + 1}`} 
            className="next">
              &gt;
            </Link>
        </div>
      </div>
    </div>
  );
};

Detail.propTypes = {
  movieId: PropTypes.string,
  title: PropTypes.string,
  poster_path: PropTypes.string,
  overview: PropTypes.string,
};

export default Detail;