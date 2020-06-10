import React from 'react';
import { Link } from 'react-router-dom';
import * as timeAndDate from "../shared/timeAndDate"

const FilmographyItem = (props) => {
    const renderFilmography = () => {
        if (props.movie) {
            const { title, character, id, release_date } = props.movie
            const year = timeAndDate.getYearInString(release_date)
            return (
                <div className="filmography-item">
                    <div>
                        <Link to={`/movie/${id}`}><p>{title}</p></Link>
                        <span>{character}</span>
                    </div>
                    <p>{year}</p>
                </div>
            )
        }
    }

    return (
        <>
            {renderFilmography()}
        </>
    )
}

export default FilmographyItem;