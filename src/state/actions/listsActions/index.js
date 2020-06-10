import axios from 'axios';
import {
    GET_USER_LISTS,
    CREATE_USER_LIST,
    CHECK_ITEM_STATUS,
    ADD_MOVIE_TO_LIST,
    REMOVE_FROM_LIST,
    IS_FETCHING_LISTS,
    GET_LIST,
    USER_INPUT_NAME,
    USER_INPUT_DESCRIPTION,
    IS_FETCHING_CURRENT_LIST,
    SEARCH_QUERY,
    GET_SUGGESTIONS,
    IS_FETCHING_SUGGESTIONS,
    FETCH_FAILED,
    FETCH_LIST_ITEMS,
} from './types';


export const getUserLists = (accountId, sessionId) => (dispatch) => {
    dispatch({ type: IS_FETCHING_LISTS });
    axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/account/${accountId}/lists?api_key=37d221c2301fc617ed594f567533476f&session_id=${sessionId}&language=en-US&page=1`
    }).then(response => {
        dispatch({ type: GET_USER_LISTS, payload: response.data.results })
    }).catch(error => console.log(error))
}

export const userInputName = (data) => {
    return {
        type: USER_INPUT_NAME,
        payload: data
    }
}

export const userInputDescription = (data) => {
    return {
        type: USER_INPUT_DESCRIPTION,
        payload: data
    }
}

export const createNewList = (sessionId) => (dispatch, getState) => {
    const state = getState();
    const name = state.profile.inputName;
    const desc = state.profile.inputDescription
    axios({
        method: 'post',
        url: `https://api.themoviedb.org/3/list?api_key=37d221c2301fc617ed594f567533476f&session_id=${sessionId}`,
        data: {
            "name": name,
            "description": desc,
            "language": "en"
        }
    }).then(response => {
        let listId = response.data.list_id;
        dispatch({ type: CREATE_USER_LIST })
        window.location.assign(`/profile/list/${listId}/add-movies`)
    }).catch(error => console.log(error))
}

export const getList = (id) => (dispatch) => {
    dispatch({ type: IS_FETCHING_CURRENT_LIST });
    axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/list/${id}?api_key=37d221c2301fc617ed594f567533476f`
    }).then(response => {
        dispatch({ type: GET_LIST, payload: response.data })
    }).catch(error => console.log(error))
}

export const getListItems = (id) => (dispatch) => {
    axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/list/${id}?api_key=37d221c2301fc617ed594f567533476f`
    }).then(response => {

        dispatch({ type: FETCH_LIST_ITEMS, payload: response.data.items })
    }).catch(error => console.log(error))
}

export const searchQuery = (data) => {
    return {
        type: SEARCH_QUERY,
        payload: data
    }
}

export const getSuggestions = (query) => dispatch => {
    dispatch({ type: IS_FETCHING_SUGGESTIONS });
    axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/search/movie?api_key=37d221c2301fc617ed594f567533476f&query=${query}`
    }).then(response => {
        dispatch({ type: GET_SUGGESTIONS, payload: response.data.results })
    }).catch(error => {
        console.log(error)
        dispatch({ type: FETCH_FAILED })
    })
}

export const addMovieToList = (listId, sessionId, movieId) => (dispatch) => {
    axios({
        method: 'post',
        url: `https://api.themoviedb.org/3/list/${listId}/add_item?api_key=37d221c2301fc617ed594f567533476f&session_id=${sessionId}`,
        data: {
            "media_id": movieId
        }
    }).then(response => {
        dispatch({ type: ADD_MOVIE_TO_LIST })

    }).catch(error => console.log(error))
}

export const removeMovieFromList = (listId, sessionId, movieId) => async (dispatch, getState) => {
    axios({
        method: 'post',
        url: `https://api.themoviedb.org/3/list/${listId}/remove_item?api_key=37d221c2301fc617ed594f567533476f&session_id=${sessionId}`,
        data: {
            "media_id": movieId
        }
    }).then(response => {
        dispatch({ type: REMOVE_FROM_LIST })
    }).catch(error => console.log(error))
}


export const checkItemStatus = (listId, movieId) => dispatch => {
    axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/list/${listId}/item_status?api_key=37d221c2301fc617ed594f567533476f&movie_id=${movieId}`
    }).then(response => {
        dispatch({ type: CHECK_ITEM_STATUS, payload: response.data })
    }).catch(error => {
        console.log(error)
    })

}

export const deleteList = (listId, sessionId) => dispatch => {
    axios({
        method: 'delete',
        url: `https://api.themoviedb.org/3/list/${listId}?api_key=37d221c2301fc617ed594f567533476f&session_id=${sessionId}`
    }).then(response => {
        window.location.assign('/profile/list')
    }).catch(error => {
        console.log(error)
        window.location.assign('/profile/list')
    })
}


export const clearList = (listId, sessionId) => (dispatch) => {
    axios({
        method: 'post',
        url: `https://api.themoviedb.org/3/list/${listId}/clear?api_key=37d221c2301fc617ed594f567533476f&session_id=${sessionId}&confirm=true`,
    }).then(response => {
    }).catch(error => console.log(error))
}