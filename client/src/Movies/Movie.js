import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, getMovieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();
  
  // same as:
  // const history = useHistory();
  // const push = history.push;

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const deleteMovie = (e) => {
    e.preventDefault();
    axios
      // Delet the movie in question (line 37).
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then((res) => {
        console.log(res.data);
        // Set the component-level state to reflect the deletion (line 41). 
        getMovieList();
        // Redirect the user to the home-page movies list (line 43).
        push("/")
      });
  };

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>

      <button 
        className="update-button" 
        onClick={() => push(`/update-movie/${movie.id}`)}
      >
        Edit
      </button>

      <button 
        className="delete-button" 
        onClick={deleteMovie}
      >
        Delete
      </button>
    </div>
  );
}

export default Movie;
