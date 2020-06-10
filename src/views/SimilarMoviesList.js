import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllSimilar } from '../state/actions';
import SplashScreen from "../components/SplashScreen/index.js";
import MovieList from '../components/MovieList';

class SimilarMoviesList extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.fetchAllSimilar(this.props.match.params.id)
    }

    renderMovies = () => {
        if (!this.props.movies) {
            return <SplashScreen text="Loading" />
        }
        return (
            <MovieList title="SImilar Movies" movies={this.props.movies} />
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

const mapStateToProps = state => {
    return {
        movies: state.movies.similarMoviesAll
    }
}

export default connect(mapStateToProps, { fetchAllSimilar })(SimilarMoviesList);