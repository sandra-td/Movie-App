import React from 'react';
import { Link } from 'react-router-dom';

export default function ProfileNavbar() {
    return (
        <nav className="navbar-profile">
            <ul className="nav-links-user">
                <li className="nav-link-user"> <Link to="/profile/favs" >Favorites</Link></li>
                <li className="nav-link-user"><Link to="/profile/watchlist" >Watchlist</Link></li>
                <li className="nav-link-user"> <Link to="/profile/list" >Lists</Link></li>
            </ul>
        </nav>
    )
}
