import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CircleProgressBar from '../CircleProgressBar';

import { removeFavorite } from '../../state/actions/profileActions';
class FavoriteMovie extends Component {
    handleClick = () => {
        this.props.removeFavorite(this.props.accountId, this.props.sessionId, this.props.movie.id);
        this.props.rerender()
    }
    render() {
        const {
            id,
            title,
            release_date,
            poster_path,
            overview,
            vote_average } = this.props.movie;

        return (
            <div className="favorite-card">
                <div className="image-content">
                    <Link to={`/movie/${id}`}>     <img src={`https://image.tmdb.org/t/p/w185${poster_path}`} alt="" /></Link>
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
                            <p>{title}</p>
                            <span>{release_date}</span>
                        </div>
                    </div>
                    <p className="overview ellipsis">
                        {overview}
                    </p>
                    <span className="button-favs" onClick={this.handleClick}>Remove</span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        sessionId: state.auth.sessionId,
        accountId: state.auth.accountId,
        favorites: state.profile.favoriteMovies
    }
}
export default connect(mapStateToProps, { removeFavorite })(FavoriteMovie);