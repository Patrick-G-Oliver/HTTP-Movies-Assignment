import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovieStats = {
    title: "",
    director: "",
    metascore: "",
    stars: []
};

const AddMovie = (props) => {
    const [movieStats, setMovieStats] = useState(initialMovieStats);
    const { push } = useHistory();
    // same as:
    // const history = useHistory();
    // const push = history.push;
    
    const changeHandler = (e) => {
        if (e.target.name === "stars") {
            setMovieStats({
                ...movieStats, 
                stars: e.target.value.split(",")
            });
        } else {
            setMovieStats({
                ...movieStats,
                [e.target.name]: e.target.value
            })
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Make a POST request to add the movieStats.
        // .put(<endpoint>, <movieStats to be updated>)
        axios
            .post("http://localhost:5000/api/movies", movieStats)
            .then( (res) => {
                console.log(res.data);
                // Set (APPLICATION-LEVEL-STATE) movieList to res.data,
                // after .put update is completed and returned.
                props.setMovieList(res.data)
                // redirect user from the UpdateMovieForm form, to the updated movie's card
                push("/");
            })
            .catch( (err) => console.log(err));
    };

    return (
        <div>
            <h1>Add a Movie</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    placeholder="Title"
                    value={movieStats.title}
                />
                <input 
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    placeholder="Director"
                    value={movieStats.director}
                />
                <input 
                    type="text"
                    name="metascore"
                    onChange={changeHandler}
                    placeholder="Metascore"
                    value={movieStats.metascore}
                />

                <input
                    type="text"
                    name="stars"
                    onChange={changeHandler}
                    placeholder="Stars"
                    value={movieStats.stars}
                />
                <button>Submit Changes</button>
            </form>
        </div>
    );
};

export default AddMovie;