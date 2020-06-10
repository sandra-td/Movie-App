import React, { useState } from 'react';
import { getDateInString } from '../shared/timeAndDate';

const ActorDetails = (props) => {
    const [showFullText, setShowFullText] = useState(false);

    const renderDetails = () => {
        if (props.details) {
            const {
                profile_path,
                name,
                biography,
                birthday,
                place_of_birth,
                homepage } = props.details
            const birthDay = getDateInString(birthday)
            console.log(birthday);

            return (
                <div className="actor-container">
                    <div className="movie-info-wrapper">
                        <ul className="actor-info-left">
                            <img alt="" src={`https://image.tmdb.org/t/p/w300/${profile_path}`}></img>
                            <a className="item-details" target="_blank" rel="noopener noreferrer" href={homepage}><li ><i className="fas fa-ellipsis-h"></i>Visit website</li></a>
                        </ul>
                    </div>
                    <div className="actor-info-right">
                        <div >
                            <h2>{name}</h2>
                            <h3>Biography</h3>
                            <p className={showFullText ? "" : "ellipsis-actor"}>{biography}</p>
                            <span className="more-info-button"
                                onClick={() => setShowFullText(!showFullText)}
                            >{showFullText ? "Show less" : "Show more"}</span>
                        </div>
                        <div className="details-actor">
                            <p>Born: &nbsp;<span> {birthDay}</span></p>
                            <p>Place of birth: &nbsp;<span>{place_of_birth}</span></p>
                        </div>
                    </div >
                </div>

            )
        }
    }
    return (
        <>
            {renderDetails()}
        </>
    )
}

export default ActorDetails;