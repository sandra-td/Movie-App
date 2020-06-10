import React from 'react'
import { Link } from 'react-router-dom';
import CircleProgressBar from '../CircleProgressBar';
import { getDateInString } from '../shared/timeAndDate';


const MovieCard = (props) => {

    const {
        id,
        title,
        release_date,
        poster_path,
        overview,
        vote_average } = props.movie;

    return (
        <div className="movie-card">
            <div className="image-content">
                <Link to={`/movie/${id}`}> <img alt="" src={`https://image.tmdb.org/t/p/w185${poster_path}`} /></Link>
            </div>
            <div className="info">
                <div className="wrapper">
                    <div>
                        <CircleProgressBar
                            trailStrokeColor="gray"
                            strokeColor=""
                            percentage={vote_average}
                            innerText="complete"
                            speed={1}
                            maxSize="20px" />
                    </div>
                    {/* <div className="rating">{vote_average}</div> */}
                    <div className="title">
                        <Link to={`/movie/${id}`}>   <p>{title}</p></Link>
                        <span>{getDateInString(release_date)}</span>
                    </div>
                </div>
                <p className="overview ellipsis">
                    {overview}
                </p>
                <Link to={`/movie/${id}`} className="view-more">Read more</Link>
            </div>

        </div >
    )
}

export default MovieCard;