import {
    FETCH_FAVORITES,
    FETCH_WATCHLIST,
    CHECK_IF_FAVORITE_WATCHLIST,
    IS_FETCHING,
    ADD_TO_FAVORITES,
    REMOVE_FAVORITE,
    ADD_TO_WATCHLIST,
    REMOVE_WATCHLIST,


} from '../actions/profileActions/types';
import {
    GET_USER_LISTS,
    ADD_INFO_TO_LIST,
    IS_FETCHING_LISTS,
    USER_INPUT_NAME,
    USER_INPUT_DESCRIPTION,
    IS_FETCHING_CURRENT_LIST,
    GET_LIST,
    GET_SUGGESTIONS,
    SEARCH_QUERY,
    FETCH_LIST_ITEMS,
    ADD_MOVIE_TO_LIST,
    CHECK_ITEM_STATUS,
} from '../actions/listsActions/types';
import initialState from '../initialState';

export default (state = initialState.profile, action) => {
    switch (action.type) {
        case FETCH_FAVORITES:
            return {
                ...state, favoriteMovies: action.payload,
                isFetching: false
            }
        case FETCH_WATCHLIST:
            return {
                ...state, watchlistMovies: action.payload,
                isFetching: false
            }
        case IS_FETCHING: {
            return { ...state, isFetching: true }
        }
        case CHECK_IF_FAVORITE_WATCHLIST:
            return {
                ...state,
                favorite: action.payload.favorite,
                watchlist: action.payload.watchlist,
                rated: action.payload.rated,
                isFetching: false
            }
        case ADD_TO_FAVORITES:
            return { ...state, favorite: true }
        case REMOVE_FAVORITE:
            return { ...state, favorite: false }
        case ADD_TO_WATCHLIST:
            return { ...state, watchlist: true }
        case REMOVE_WATCHLIST:
            return { ...state, watchlist: false }
        case IS_FETCHING_LISTS:
            return {
                ...state, lists: {
                    isFetching: true
                }
            }
        case GET_USER_LISTS:
            return {
                ...state, lists: {
                    userLists: action.payload,
                    isFetching: false
                }
            }
        case ADD_INFO_TO_LIST:
            return {
                ...state, lists: {
                    form: action.payload

                }
            }
        case USER_INPUT_NAME:
            return {
                ...state, inputName: action.payload
            }
        case USER_INPUT_DESCRIPTION:
            return {
                ...state, inputDescription: action.payload
            }
        case IS_FETCHING_CURRENT_LIST:
            return {
                ...state, lists: {
                    isFetchingCurrentList: true
                }
            }
        case GET_LIST:
            return {
                ...state, lists: {
                    currentList: action.payload,
                    isFetchingCurrentList: false
                }
            }
        case FETCH_LIST_ITEMS:
            return {
                ...state, lists: {
                    currentListItems: action.payload,
                }
            }
        case SEARCH_QUERY:
            return {
                ...state, lists: {
                    searchQuery: action.payload
                }
            }
        case GET_SUGGESTIONS:
            return {
                ...state, lists: {
                    suggestions: action.payload
                }
            }
        case ADD_MOVIE_TO_LIST:
            return {
                ...state, addedSuccess: true
            }
        case CHECK_ITEM_STATUS:
            return {
                ...state, lists: {
                    isItemOnList: true
                }
            }
        default:
            return state;
    }
}