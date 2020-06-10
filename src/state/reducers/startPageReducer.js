import initialState from '../initialState';

import {
    IS_FETCHING,
    FETCH_MOVIES_STARTPAGE,
    FETCH_SUCCESS,
} from '../actions/startPageActions/types';


export default (state = initialState.startPage, action) => {
    switch (action.type) {
        case IS_FETCHING:
            return { ...state, isFetching: true }
        case FETCH_MOVIES_STARTPAGE:
            const {
                nowPlaying,
                popular,
                topRated,
                upcoming,
                latest
            } = action.payload
            return {
                ...state,
                nowPlaying,
                popular,
                topRated,
                upcoming,
                latest,
                isFetching: false
            }
        case FETCH_SUCCESS:
            return { ...state, isSuccess: true }
        default:
            return state;
    }
}

