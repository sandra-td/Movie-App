import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchQuery, getSuggestions } from '../../../state/actions/listsActions';
import MovieCardList from './MovieCardList';

const EditListMovies = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        props.getSuggestions(props.term)
        props.searchQuery(null)
    }

    const renderForm = () => {
        return (
            <div className="user-list-container another">
                <div className="user-list-header">
                    <h3>Step 2 - Search and add movies to your list<br />{props.location.title ? props.location.title : null}</h3>
                </div>
                <div className="add-movies-form">
                    <form className="search-list" onSubmit={handleSubmit}>
                        <input required type="text" className="search-input" placeholder="Search movies"
                            onChange={(e) => props.searchQuery(e.target.value)}
                        />
                        <button className="search-button">Search</button>
                    </form>
                    <Link to={`/profile/list/${props.match.params.id}`}><span className="button-link">Go to Your List</span></Link>
                </div>
            </div>

        )
    }

    const renderMovies = () => {
        if (!props.movies) {
            return
        }
        return (
            props.movies.map(m => {
                return <MovieCardList listId={props.match.params.id} movie={m} key={m.id} />
            })
        )
    }
    return (
        <div className="edit-list-container">
            {renderForm()}
            <div className="search-list-results">
                {renderMovies()}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        term: state.profile.lists.searchQuery,
        movies: state.profile.lists.suggestions,
        currentList: state.profile.lists.currentList
    }
}
export default connect(mapStateToProps, { searchQuery, getSuggestions })(EditListMovies);