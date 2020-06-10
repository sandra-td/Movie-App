import axios from 'axios';

import {
    SET_QUERY,
    RESET_QUERY,
    FETCH_SEARCH_RESULTS,
    IS_FETCHING_SEARCH_RESULTS
} from './types';

export const setQuery = (data) => {
    return {
        type: SET_QUERY,
        payload: data

    }
}

export const fetchSearchResults = (query) => dispatch => {
    dispatch({ type: IS_FETCHING_SEARCH_RESULTS });
    axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/search/movie?api_key=37d221c2301fc617ed594f567533476f&language=en-US&query=${query}`
    }).then(response => {
        dispatch({ type: FETCH_SEARCH_RESULTS, payload: response.data.results })
    }).catch(error => console.log(error));
}

export const resetQuery = () => {
    return {
        type: RESET_QUERY
    }
}