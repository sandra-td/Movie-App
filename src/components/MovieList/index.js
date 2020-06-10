import React from 'react';
import MovieCard from '../MovieCard';

const MovieList = (props) => {
    const { title, movies } = props;

    const renderMovieCards = () => {
        return (
            movies.map(movie => {
                return (
                    <MovieCard movie={movie} key={movie.id} />

                )
            })
        )
    }

    const renderList = () => {
        return (
            <div className="main-wrapper">
                <h2>{title}</h2>
                <div className="results">
                    {renderMovieCards()}
                </div>
            </div>
        )
    }

    return (
        <>
            {renderList()}
        </>
    )
}


export default MovieList;