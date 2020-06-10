import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllRecommendations } from '../state/actions';
import SplashScreen from "../components/SplashScreen/index.js";
import MovieList from '../components/MovieList';

class RecommendationsList extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.fetchAllRecommendations(this.props.match.params.id)
    }

    renderMovies = () => {
        if (!this.props.movies) {
            return <SplashScreen text="Loading" />
        }
        return (
            <MovieList title="Recommended Movies" movies={this.props.movies} />
        )
    }

    render() {
        return (
            <>
                {this.renderMovies()}
            </>
        )
    }
}

const mapStateToProps = (state, ) => {
    return {
        movies: state.movies.recommendedMoviesAll,
    }
}

export default connect(mapStateToProps, { fetchAllRecommendations })(RecommendationsList);