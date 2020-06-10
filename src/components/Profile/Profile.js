import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Favorites from './Favorites';
import Watchlist from './WatchList';
import ProfileNavbar from './ProfileNavbar';
import Lists from './Lists';
import CreateList from './Lists/CreateList';
import ListPage from './Lists/ListPage';
import EditListMovies from './Lists/EditListMovies';

export default class ProfilePage extends Component {
    render() {
        return (
            <div className="profile-page-container">
                <div className="user-content">
                    <ProfileNavbar />
                    <Switch>
                        <Route path="/profile/favs" component={Favorites} />
                        <Route path="/profile/watchlist" component={Watchlist} />
                        <Route path="/profile/list" exact component={Lists} />
                        <Route exact path="/profile/list/new" component={CreateList} />
                        <Route exact path='/profile/list/:id' component={ListPage} />
                        <Route path='/profile/list/:id/add-movies' component={EditListMovies} />
                    </Switch>
                </div>
            </div>
        )
    }
}

