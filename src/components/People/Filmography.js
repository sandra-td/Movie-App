import React, { useState } from 'react';
import FilmographyDropdown from './FilmographyDropdown';

const Filmography = (props) => {
    const [showCast, setShowCast] = useState(false);
    const [showCrew, setShowCrew] = useState(false);


    const renderContent = () => {
        if (props.movies) {
            const { cast, crew } = props.movies.movie_credits
            const creditsCast = cast.length
            const creditsCrew = crew.length

            return (
                <div className="filmography-container">
                    <div>
                        <h3>Filmography</h3>
                    </div>
                    <div className="dropdown-menu">
                        <p>Actor<span>  ({creditsCast} credits)</span></p>
                        <button onClick={() => setShowCast(!showCast)}>{showCast ? "Show less " : "Show more"}</button>
                    </div>
                    {showCast && <FilmographyDropdown movies={props.movies.movie_credits.cast} />}
                    <div className="dropdown-menu">
                        <p>Producer<span>  ({creditsCrew} credits)</span></p>
                        <button onClick={() => setShowCrew(!showCrew)}>{showCrew ? "Show less " : "Show more"}</button>
                    </div>
                    {showCrew && <FilmographyDropdown movies={props.movies.movie_credits.crew} />}
                </div >
            )
        }
    }
    return (
        <>
            {renderContent()}
        </>
    )
}

export default Filmography;