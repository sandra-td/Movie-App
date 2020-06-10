import React, { Component } from 'react';
import { connect } from 'react-redux';
import SplashScreen from "../components/SplashScreen/index.js";
import MovieList from '../components/MovieList';

class UpcomingMovies extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    renderMovies = () => {
        if (!this.props.movies) {
            return <SplashScreen text="Loading" />
        }
        return (
            <MovieList title="Upcoming Movies" movies={this.props.movies} />
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
        movies: state.startPage.upcoming
    }
}

export default connect(mapStateToProps, {})(UpcomingMovies);