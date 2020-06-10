import axios from "axios";

import {
    FETCH_FAVORITES,
    FETCH_WATCHLIST,
    CHECK_IF_FAVORITE_WATCHLIST,
    IS_FETCHING,
    ADD_TO_FAVORITES,
    REMOVE_FAVORITE,
    ADD_TO_WATCHLIST,
    REMOVE_WATCHLIST
} from "./types";

export const fetchFavorites = (accountId, sessionId) => dispatch => {
    dispatch({ type: IS_FETCHING });
    axios({
        method: "get",
        url: `https://api.themoviedb.org/3/account/${accountId}/favorite/movies?api_key=37d221c2301fc617ed594f567533476f&session_id=${sessionId}`
    })
        .then(response => {
            dispatch({
                type: FETCH_FAVORITES,
                payload: response.data.results
            });
        })
        .catch(error => console.log(error));
};

export const fetchWatchlist = (accountId, sessionId) => dispatch => {
    dispatch({ type: IS_FETCHING });
    axios({
        method: "get",
        url: `https://api.themoviedb.org/3/account/${accountId}/watchlist/movies?api_key=37d221c2301fc617ed594f567533476f&session_id=${sessionId}`
    })
        .then(response => {
            dispatch({
                type: FETCH_WATCHLIST,
                payload: response.data.results
            });
        })
        .catch(error => console.log(error));
};

export const checkIfFavoriteWatchlist = (
    movieId,
    sessionId
) => dispatch => {
    dispatch({ type: IS_FETCHING });
    axios({
        method: "get",
        url: `https://api.themoviedb.org/3/movie/${movieId}/account_states?api_key=37d221c2301fc617ed594f567533476f&session_id=${sessionId}`
    })
        .then(response => {
            dispatch({
                type: CHECK_IF_FAVORITE_WATCHLIST,
                payload: {
                    favorite: response.data.favorite,
                    watchlist: response.data.watchlist,
                    rated: response.data.rated
                }
            });
        })
        .catch(error => console.log(error));
};

export const addToFavorites = (
    accountId,
    sessionId,
    movieId
) => dispatch => {
    axios({
        method: "post",
        url: `https://api.themoviedb.org/3/account/${accountId}/favorite?api_key=37d221c2301fc617ed594f567533476f&session_id=${sessionId}`,
        data: {
            media_type: "movie",
            media_id: movieId,
            favorite: true
        }
    })
        .then(response => {
            dispatch({ type: ADD_TO_FAVORITES });
        })
        .catch(error => console.log(error));
};

export const removeFavorite = (
    accountId,
    sessionId,
    movieId
) => dispatch => {
    axios({
        method: "post",
        url: `https://api.themoviedb.org/3/account/${accountId}/favorite?api_key=37d221c2301fc617ed594f567533476f&session_id=${sessionId}`,
        data: {
            media_type: "movie",
            media_id: movieId,
            favorite: false
        }
    })
        .then(response => {
            dispatch({ type: REMOVE_FAVORITE });
        })
        .catch(error => console.log(error));
};

export const addToWatchlist = (
    accountId,
    sessionId,
    movieId
) => dispatch => {
    axios({
        method: "post",
        url: `https://api.themoviedb.org/3/account/${accountId}/watchlist?api_key=37d221c2301fc617ed594f567533476f&session_id=${sessionId}`,
        data: {
            media_type: "movie",
            media_id: movieId,
            watchlist: true
        }
    })
        .then(response => {
            dispatch({ type: ADD_TO_WATCHLIST });
        })
        .catch(error => console.log(error));
};

export const removeFromWatchlist = (
    accountId,
    sessionId,
    movieId
) => dispatch => {
    axios({
        method: "post",
        url: `https://api.themoviedb.org/3/account/${accountId}/watchlist?api_key=37d221c2301fc617ed594f567533476f&session_id=${sessionId}`,
        data: {
            media_type: "movie",
            media_id: movieId,
            watchlist: false
        }
    })
        .then(response => {
            dispatch({ type: REMOVE_WATCHLIST });
        })
        .catch(error => console.log(error));
};
