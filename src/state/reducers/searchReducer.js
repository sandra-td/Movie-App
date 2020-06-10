import {
    SET_QUERY,
    FETCH_SEARCH_RESULTS,
    IS_FETCHING_SEARCH_RESULTS,
    RESET_QUERY
} from '../actions/searchActions/types';
import initialState from '../initialState';

export default (state = initialState.search, action) => {
    switch (action.type) {
        case SET_QUERY:
            return { ...state, query: action.payload }
        case RESET_QUERY:
            return { ...state, query: "" }
        case IS_FETCHING_SEARCH_RESULTS:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_SEARCH_RESULTS:
            return {
                ...state,
                results: action.payload,
                isFetching: false
            }
        default:
            return state;
    }
}