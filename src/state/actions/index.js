import {
    FETCH_MOVIE_DETAILS,
    IS_FETCHING,
    FETCH_ALL_SIMILAR,
    FETCH_ALL_RECOMMENDATIONS,
    IS_FETCHING_DETAILS,
    SET_RATING,
    FETCH_DETAILS_SUCCESS

} from './types';
import axios from 'axios';

export const fetchMovieDetails = id => dispatch => {
    dispatch({ type: IS_FETCHING_DETAILS })
    axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/${id}?api_key=37d221c2301fc617ed594f567533476f&append_to_response=credits,recommendations,similar`
    })
        .then(response => dispatch({ type: FETCH_MOVIE_DETAILS, payload: response.data }),
            error => console.log(error))
        .then(dispatch({ type: FETCH_DETAILS_SUCCESS }))

}

export const fetchAllSimilar = (id) => dispatch => {
    dispatch({ type: IS_FETCHING });

    axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/${id}/similar?api_key=37d221c2301fc617ed594f567533476f`
    }).then(response => dispatch({ type: FETCH_ALL_SIMILAR, payload: response.data.results }),
        error => console.log(error))

}

export const fetchAllRecommendations = (id) => dispatch => {
    dispatch({ type: IS_FETCHING });

    axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=37d221c2301fc617ed594f567533476f`
    }).then(response => dispatch({ type: FETCH_ALL_RECOMMENDATIONS, payload: response.data.results }),
        error => console.log(error))

}

export const setRating = (id, rating, sessionId) => dispatch => {
    axios({
        method: 'post',
        url: `https://api.themoviedb.org/3/movie/${id}/rating?api_key=37d221c2301fc617ed594f567533476f&session_id=${sessionId}`,
        data: {
            value: rating
        }
    }).then(response => {
        dispatch({ type: SET_RATING })
    }).catch(error => console.log(error))
}

