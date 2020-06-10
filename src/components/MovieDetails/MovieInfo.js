import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
    fetchMovieDetails,
    setRating
} from '../../state/actions';
import {
    checkIfFavoriteWatchlist,
    addToFavorites,
    removeFavorite,
    addToWatchlist,
    removeFromWatchlist
} from '../../state/actions/profileActions';
import StarRating from '../StarRating/StarRating';
import Notification from '../Notification';
import CircleProgressBar from '../CircleProgressBar'

import {
    getDateInString,
    getYearInString,
    getMovieDuration
} from '../shared/timeAndDate';

import { returnLanguageString } from "../shared/services";

class MovieInfo extends Component {
    state = {
        toggleRatingDropdown: false,
        showNotification: false
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        if (this.props.sessionId) {
            setTimeout(() => this.props.checkIfFavoriteWatchlist(this.props.id, this.props.session), 200)
        }
    }

    handleClickFavorite = () => {
        if (this.props.sessionId) {
            if (!this.props.favorite) {
                this.props.addToFavorites(this.props.accountId, this.props.sessionId, this.props.id)
            } else {
                this.props.removeFavorite(this.props.accountId,
                    this.props.sessionId, this.props.id)
            }
        }
    }

    handleClickWatchlist = () => {
        if (this.props.sessionId) {
            if (!this.props.watchlist) {
                this.props.addToWatchlist(this.props.accountId, this.props.sessionId, this.props.id)
            } else {
                this.props.removeFromWatchlist(this.props.accountId, this.props.sessionId, this.props.id)
            }
        }
    }

    handleRating = () => {
        if (!this.props.rated && !this.props.userRated) {

            this.setState({ toggleRatingDropdown: !this.state.toggleRatingDropdown })
        }

    }

    setUserRating = (rating) => {
        this.props.setRating(this.props.id, rating, this.props.sessionId)
        this.setState({ toggleRatingDropdown: !this.state.toggleRatingDropdown })
        this.setState({ showNotification: !this.state.showNotification })
        setTimeout(() => {
            this.setState({ showNotification: !this.state.showNotification })
        }, 2000);

    }

    buildLinkToReviews = (movieId, movieTitle) => {
        let title = movieTitle.toLowerCase()
        let splittedTitle = title.split(' ').join('-')
        return (`https://www.themoviedb.org/movie/${movieId}-${splittedTitle}/reviews`)

    }

    getDirectorsAndWriters = (crew) => {
        let directors = [];
        let writers = [];
        crew.forEach(function (entry) {
            if (entry.job === 'Director') {
                directors.push(entry.name);
            } else if (entry.job === 'Writer') {
                writers.push(entry.name);
            }
        })
        let director = directors.join(', ');
        // let writer = writers.join(', ');
        return director
    }

    renderMovieInfo = () => {

        const {
            overview,
            backdrop_path,
            poster_path,
            title,
            release_date,
            vote_average,
            tagline,
            runtime,
            genres,
            original_language,
            credits,
            status,
            homepage,
            id

        } = this.props.movieDetails;



        const classChange = this.props.favorite && this.props.sessionId ? "active" : " ";
        const classRating = this.props.rated || this.props.userRated ? "activeRated" : " ";
        const classWatchlist = this.props.watchlist && this.props.sessionId ? "activeWatchlist" : " ";
        const titleWatchlist = this.props.watchlist ? "Remove from watchlist" :
            "Add to watchlist";
        const titleRating = this.props.rated || this.props.userRated ? "You have already rated the movie" : "Rate the movie!"
        const notLoggedInButtons2 = !this.props.sessionId ? "You have to be logged in" : titleWatchlist;
        const titleFavorite = this.props.favorite ? "Remove from favorites" : " Mark as favorite";
        const notLoggedInButtons = !this.props.sessionId ? "You have to be logged in" : titleFavorite;
        const notLoggedInRating = !this.props.sessionId ? "You have to be logged in" : titleRating

        return (
            <React.Fragment>
                <div className="movie-info-bg" style={{ backgroundImage: `linear-gradient(rgba(0,0, 0, 0.4) 0%, rgba(0,0, 0, 0.4) 55%, rgba(0, 0, 0, 1) 100%),url(http://image.tmdb.org/t/p/w1280/${backdrop_path})` }}>
                </div>
                <div className="movie-wrapper">
                    <div className="main-movie-header">
                        <div className="title-box">
                            <h2>{title}</h2>
                            <span>({getYearInString(release_date)})</span>
                        </div>
                        <ul className="buttons-box">
                            <li className="diff">MovieDB <span className="grade">{vote_average}</span> </li>
                            <li onClick={this.handleClickWatchlist} title={notLoggedInButtons2}> <i className={`fas fa-clock ${classWatchlist}`}></i>Watch Later</li>
                            <Link to='/profile/list' className="link-buttons">  <li title={notLoggedInButtons2} id="link-buttons"> <i className="fas fa-plus" ></i>Add to list</li></Link>
                        </ul>
                    </div>
                    <div className="line"></div>
                    <div className="movie-info-wrapper">
                        <ul className="details-image">
                            <img alt=""
                                src={`https://image.tmdb.org/t/p/w300${poster_path}`} />
                            <li className="item-details"
                                title={notLoggedInButtons}
                                onClick={this.handleClickFavorite}
                            > <i className={`fas fa-heart ${classChange}`}></i>Add as Favorite</li>
                            <li className="item-details"
                                title={notLoggedInButtons2}
                                onClick={this.handleClickWatchlist}> <i className={`fas fa-clock ${classWatchlist}`}></i>Watch Later</li>
                            <a className="item-details" target="_blank" rel="noopener noreferrer" href={homepage}>
                                <li >
                                    <i className="fas fa-ellipsis-h">
                                    </i>Visit website
                               </li>
                            </a>
                            <a className="item-details special-button-details-image" target="_blank" rel="noopener noreferrer" href={this.buildLinkToReviews(id, title)}>
                                <li className=""><i className="fas fa-comments"></i>Show Reviews</li></a>
                        </ul>
                        <div className="details-info">
                            <div className="details-title">
                                <h2>{title}</h2>
                                <p>{tagline}</p>
                            </div>
                            <div className="details-links">

                                <ul className="details-list">
                                    <li>   <CircleProgressBar
                                        trailStrokeColor="gray"
                                        strokeColor=""
                                        percentage={vote_average}
                                        innerText="complete"
                                        speed={1}

                                    /></li>
                                    {/* <li className="styled-icon1">
                                        <i className="fas fa-star specialIcon"></i><span>{vote_average}</span></li> */}
                                    <li title={notLoggedInButtons}
                                        className={`styled-icon icon-link ${classChange}`}
                                        onClick={this.handleClickFavorite}
                                    ><i className="fas fa-heart"></i></li>
                                    <li className="styled-icon icon-link"
                                        title={notLoggedInRating}
                                        onClick={this.handleRating}
                                    ><i className={`fas fa-star ${classRating}`}></i></li>
                                    <li title={notLoggedInButtons2}
                                        className="styled-icon icon-link"
                                        onClick={this.handleClickWatchlist}
                                    ><i className={`fas fa-bookmark ${classWatchlist}`}></i></li>
                                </ul>
                                {this.state.toggleRatingDropdown ? <StarRating setUserRating={this.setUserRating} /> : null}
                                {this.state.showNotification ? <Notification text="Rated!" /> : null}
                                <div className="details-facts">
                                    <p>{getMovieDuration(runtime)}</p>
                                    <div className="genres">
                                        {genres ? genres.map(genre => {
                                            return <span key={genre.id}>{genre.name}</span>
                                        }) : null}
                                    </div>
                                </div>
                            </div>
                            <div className="details-featured">
                                <h3>Details</h3>
                                <p>Director: &nbsp;<span> {this.getDirectorsAndWriters(credits.crew)}</span></p>
                                {/* <p>Writers: &nbsp;<span> {writer}</span></p> */}
                                <p>Language: &nbsp;<span>{returnLanguageString(original_language)}</span></p>
                                <p>Status:  &nbsp;  <span>{status}</span> </p>
                                <p>Release Date: &nbsp;<span>{getDateInString(release_date)}</span></p>
                            </div>
                            <div className="details-overview">
                                <h3>Overview</h3>
                                <p>{overview}</p>
                            </div>

                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }

    render() {
        return (
            <React.Fragment>
                {this.renderMovieInfo()}
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        movieDetails: state.movies.movieDetails,
        sessionId: state.auth.sessionId,
        accountId: state.auth.accountId,
        favorite: state.profile.favorite,
        watchlist: state.profile.watchlist,
        rated: state.profile.rated,
        isFetchingAccountState: state.profile.isFetching,
        isFetchingMovie: state.movies.isFetching,
        userRated: state.movies.rated
    }
}

export default connect(mapStateToProps, {
    fetchMovieDetails,
    checkIfFavoriteWatchlist,
    addToFavorites,
    removeFavorite,
    addToWatchlist,
    removeFromWatchlist,
    setRating
})(MovieInfo);