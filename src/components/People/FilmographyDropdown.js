import React from 'react';
import FilmographyItem from './FilmographyItem';
import { sortDates } from '../shared/services';

const FilmographyDropdown = (props) => {
    const renderMovies = () => {
        if (props.movies) {
            let sortedMovies = sortDates(props.movies)
            return (
                sortedMovies.map(movie => {
                    return (
                        <FilmographyItem movie={movie} key={movie.id} />
                    )
                })
            )
        }
    }

    return (
        <div className="filmography-drowdown-container">
            {renderMovies()}
        </div>

    )


}

export default FilmographyDropdown;