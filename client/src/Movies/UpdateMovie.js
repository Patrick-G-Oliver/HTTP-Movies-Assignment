import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovieStats = {
    title: "",
    director: "",
    metascore: ""
    //stars: []
};

const UpdateMovieForm = (props) => {
    const [movieStats, setMovieStats] = useState(initialMovieStats);
    const { id } = useParams();
    const { push } = useHistory();
    // same as:
    // const history = useHistory();
    // const push = history.push;

    useEffect( () => {
        axios   
            .get(`http://localhost:3000/movies/${id}`)
            .then( (res) => {
                // Set (COMPONENT-LEVEL-STATE) item to res.data.
                setMovieStats(res.data)
            })
            .catch( (err) => console.log(err));
    }, [id]);

    const changeHandler = (e) => {
        e.persist();
        let value = e.target.value;

        setMovieStats({
            ...movieStats,
            [e.target.name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // make a PUT request to edit the movieStats
        // .put(<endpoint>, <movieStats to be updated>)
        axios
            .put(`http://localhost:3000/movies/${id}`, movieStats)
            .then( (res) => {
                // Set (APPLICATION-LEVEL-STATE) movieList to res.data,
                // after .put update is completed and returned.
                props.setMovieList(res.data)
                // redirect user from the UpdateMovieForm form, to the updated movie's card
                push(`/movies/${id}`)
            })
            .catch( (err) => console.log(err));
    };

    return (
        <div>
            <h1>Edit Movie Stats</h1>
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
                <button>Submit Changes</button>
            </form>
        </div>
    );
};

export default UpdateMovieForm;