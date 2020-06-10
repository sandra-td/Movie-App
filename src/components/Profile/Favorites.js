import React, { Component } from 'react';
import { connect } from 'react-redux';
import FavoriteMovie from './FavoriteMovie';
import { fetchFavorites } from '../../state/actions/profileActions';
import SplashScreen from "../SplashScreen/index.js";

class Favorites extends Component {
    state = {
        rerender: false
    }
    componentDidMount() {
        setTimeout(() => this.props.fetchFavorites(this.props.accountId, this.props.sessionId), 300)
    }

    rerenderComponent = () => {
        this.setState({ rerender: true })
        setTimeout(() => this.props.fetchFavorites(this.props.accountId, this.props.sessionId), 300)
    }

    renderFavorites = () => {
        if (this.props.isFetching) {
            return <SplashScreen text="Loading" />
        }
        else if (this.props.favorites.length === 0) {
            return <p className="empty-list-message">This list is empty.</p>
        }

        return (
            this.props.favorites.map(favorite => {
                return (
                    <FavoriteMovie rerender={this.rerenderComponent} movie={favorite} key={favorite.id} />
                )
            })
        )
    }
    render() {
        return (
            <div className="user-list-container">
                <div className="user-list-header">
                    <h3>Your Favorites</h3>
                </div>
                <div className="search-list-results top-border">
                    {this.renderFavorites()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        accountId: state.auth.accountId,
        sessionId: state.auth.sessionId,
        favorites: state.profile.favoriteMovies,
        isFetching: state.profile.isFetching
    }
}


export default connect(mapStateToProps, { fetchFavorites })(Favorites);
