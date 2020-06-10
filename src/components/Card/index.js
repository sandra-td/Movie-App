import React from 'react';
import { Link } from 'react-router-dom';
import MissingPicture from '../MissingPicture';
import { getYearInString } from '../shared/timeAndDate';

const Card = (props) => {
    const {
        id,
        title,
        release_date,
        poster_path,
        character,
        name,
        profile_path
    } = props.item;

    const renderLinkAndImage = () => {
        if (poster_path) {
            return (
                <Link to={`/movie/${id}`}> <img alt="" src={`https://image.tmdb.org/t/p/w185${poster_path}`} /></Link>
            )
        }
        if (profile_path) {
            return (
                <Link to={`/person/${id}`}> <img alt="" src={`https://image.tmdb.org/t/p/w185${profile_path}`} /></Link>)
        }
        else {
            return <MissingPicture />
        }
    }

    const renderMovieOrActorDetails = () => {
        if (title) {
            return (
                <>
                    <Link to={`/movie/${id}`}><p>{title}</p>  </Link>
                    <span>{getYearInString(release_date)} </span>
                </>
            )
        } else {
            return (
                <>
                    <Link to={`/person/${id}`}>  <p>{name}</p></Link>
                    <span>{character}</span>
                </>
            )
        }
    }

    const renderContent = () => {
        return (
            <div className="cast-member-card">
                <div className="image-container">
                    {renderLinkAndImage()}
                </div>
                <div className="cast-info">
                    {renderMovieOrActorDetails()}
                </div>
            </div>
        )
    }

    return (
        <>
            {renderContent()}
        </>
    )
}

export default Card;

