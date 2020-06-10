import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import MovieList from '../components/MovieList';

const SearchResults = (props) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const renderResults = () => {
        if (!props.results) {
            return <p>No results</p>
        }
        return (
            <MovieList title={`Results for "${props.match.params.id}"`} movies={props.results} />
        )
    }

    return (
        <>
            {renderResults()}
        </>
    )
}

const mapStateToProps = state => {
    return {
        results: state.search.results,
        query: state.search.query
    }
}

export default connect(mapStateToProps)(SearchResults);