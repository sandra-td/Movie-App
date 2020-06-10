import React, { Component } from 'react';
import { connect } from 'react-redux';
import SplashScreen from "../components/SplashScreen/index.js";
import MovieList from '../components/MovieList';

class PopularMovies extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    renderMovies = () => {
        if (!this.props.movies) {
            return <SplashScreen text="Loading" />
        }
        return (
            <MovieList title="Popular Movies" movies={this.props.movies} />

        )
    };

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
        movies: state.startPage.popular
    }
}

export default connect(mapStateToProps, {})(PopularMovies);