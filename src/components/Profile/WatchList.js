import React, { Component } from 'react';
import { connect } from 'react-redux';
import WatchlistItem from './WatchlistItem';
import { fetchWatchlist } from '../../state/actions/profileActions';
import SplashScreen from "../SplashScreen/index.js";

class Watchlist extends Component {
    state = {
        rerender: false
    }

    componentDidMount() {
        setTimeout(() => this.props.fetchWatchlist(this.props.accountId, this.props.sessionId), 300)
    }

    rerenderComponent = () => {
        this.setState({ rerender: true })
        setTimeout(() => this.props.fetchWatchlist(this.props.accountId, this.props.sessionId), 300)

    }

    renderWatchlist = () => {
        if (this.props.watchlist.length === 0) {
            return <p className="empty-list-message">This list is empty.</p>
        } else if (this.props.isFetching) {
            return <SplashScreen text="Loading" />
        }
        return (
            this.props.watchlist.map(item => {
                return (
                    <WatchlistItem rerender={this.rerenderComponent} movie={item} key={item.id} />
                )
            })
        )
    }

    render() {
        return (
            <div className="user-list-container">
                <div className="user-list-header">
                    <h3>Your Watchlist</h3>
                </div>
                <div className="search-list-results top-border">
                    <div className="user-favorites">
                        {this.renderWatchlist()}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        accountId: state.auth.accountId,
        sessionId: state.auth.sessionId,
        watchlist: state.profile.watchlistMovies,
        isFetching: state.profile.isFetching
    }
}


export default connect(mapStateToProps, { fetchWatchlist })(Watchlist);
