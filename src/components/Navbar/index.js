import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setQuery, fetchSearchResults, resetQuery } from '../../state/actions/searchActions';

import LogoutBtn from '../Logout/LogoutBtn';


const Navbar = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        props.fetchSearchResults(props.query);
        props.resetQuery();
        props.history.push(`/search/${props.query}`);

    }

    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li><Link to='/' className="nav-link">home</Link></li>
                <li><Link to="/popular-movies" className="nav-link">Popular</Link></li>
                <li><Link to="/toprated-movies" className="nav-link">Top Rated</Link></li>
            </ul>
            <form className="search" onSubmit={handleSubmit}>
                <input
                    value={props.query}
                    type="text"
                    className="search-input"
                    placeholder="Search movies"
                    required
                    onChange={(e) => props.setQuery(e.target.value)}
                />
                <button className="search-button"><i className="fas fa-search search-icon"></i></button>
            </form>

            <div className="user-nav">
                {props.isSignedIn ? <li><Link to="/profile/list" className="nav-link">Profile</Link></li> : null}
                {props.isSignedIn ? <LogoutBtn /> : <li style={{ marginRight: "1.5rem" }}><Link to="/login" className="nav-link">Login</Link></li>}
            </div>

        </nav>
    )
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn,
        accountId: state.auth.accountId,
        sessionId: state.auth.sessionId,
        query: state.search.query
    }
}

export default withRouter(connect(mapStateToProps, { setQuery, fetchSearchResults, resetQuery })(Navbar));

