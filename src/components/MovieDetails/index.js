import React, { Component } from 'react';
import { connect } from 'react-redux';
import MovieInfo from './MovieInfo';

import SplashScreen from '../SplashScreen/index.js';
import GridDisplay from '../GridDisplay';

import {
    fetchMovieDetails
} from '../../state/actions';

class MovieDetails extends Component {
    componentDidMount = () => {
        this.props.fetchMovieDetails(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.id !== nextProps.match.params.id) {
            this.props.fetchMovieDetails(nextProps.match.params.id);
        }
    }

    renderContent = () => {
        if (!this.props.isFetching && this.props.isSuccess) {
            return (
                <div className="movie-details-wrapper">
                    <MovieInfo
                        id={this.props.match.params.id}
                        session={this.props.sessionId}
                    />
                    <GridDisplay
                        items={this.props.cast}
                        heading="Top Billed Cast"
                        mainLink={false}
                        id={this.props.match.params.id}
                    />
                    <GridDisplay
                        items={this.props.similarMovies}
                        heading="Similar Movies"
                        mainLink="/similar-movies/"
                        id={this.props.match.params.id}
                    />
                    <GridDisplay
                        items={this.props.recommendedMovies}
                        heading="Recommended Movies"
                        mainLink="/recommended-movies/"
                        id={this.props.match.params.id}
                    />

                </div>
            )
        }
        else {
            return <SplashScreen text="Loading" />
        }
    }

    render() {
        return (
            <>
                {this.renderContent()}
            </>
        )
    }
}


const mapStateToProps = state => {
    return {
        sessionId: state.auth.sessionId,
        movieDetails: state.movies.movieDetails,
        isFetching: state.movies.isFetchingDetails,
        isSuccess: state.movies.isFetchDetailsSuccess,
        similarMovies: state.movies.similarMovies,
        recommendedMovies: state.movies.recommendedMovies,
        cast: state.movies.cast



    }
}

export default connect(mapStateToProps, {
    fetchMovieDetails

})(MovieDetails);
