import {
    FETCH_MOVIE_DETAILS,
    IS_FETCHING,
    FETCH_ALL_SIMILAR,
    FETCH_ALL_RECOMMENDATIONS,
    SET_RATING,
    IS_FETCHING_DETAILS,
    FETCH_DETAILS_SUCCESS
} from '../actions/types';
import initialState from '../initialState';


export default (state = initialState.movies, action) => {
    switch (action.type) {
        case IS_FETCHING: {
            return { ...state, isFetching: true }
        }
        case IS_FETCHING_DETAILS: {
            return { ...state, isFetchingDetails: true }
        }
        case FETCH_MOVIE_DETAILS:
            return {
                ...state,
                movieDetails: action.payload,
                similarMovies: action.payload.similar.results.slice(0, 5),
                recommendedMovies: action.payload.recommendations.results.slice(0, 5),
                cast: action.payload.credits.cast.slice(0, 5),
                isFetchingDetails: false
            }

        case FETCH_DETAILS_SUCCESS: {
            return { ...state, isFetchDetailsSuccess: true }
        }
        case FETCH_ALL_SIMILAR:
            return {
                ...state,
                similarMoviesAll: action.payload,
                isFetching: false
            }
        case FETCH_ALL_RECOMMENDATIONS:
            return {
                ...state,
                recommendedMoviesAll: action.payload
            }
        case SET_RATING:
            return { ...state, rated: true }
        default:
            return state;
    }
}

