import axios from "axios";

import {
    IS_FETCHING,
    FETCH_MOVIES_STARTPAGE,
    FETCH_SUCCESS,
} from "./types";
import { baseUrl, APIKEY } from "../../constants";


export const fetchNowPlaying = () => {
    return axios.get(`${baseUrl}movie/now_playing?${APIKEY}&language=en-US&page=1`)
};

export const fetchPopular = () => {
    return axios.get(`${baseUrl}movie/popular?${APIKEY}&language=en-US&page=1`)
};

export const fetchTopRated = () => {
    return axios.get(`${baseUrl}movie/top_rated?${APIKEY}&language=en-US&page=1`)
};

export const fetchUpcoming = () => {
    return axios.get(`${baseUrl}movie/upcoming?${APIKEY}&language=en-US&page=1`)
};

export const fetchLatest = () => {
    return axios.get(`${baseUrl}trending/movie/week?${APIKEY}`)
}

export const fetchDatatoStartPage = () => dispatch => {
    dispatch({ type: IS_FETCHING })
    axios.all([
        fetchNowPlaying(),
        fetchPopular(),
        fetchTopRated(),
        fetchUpcoming(),
        fetchLatest()
    ])
        .then(axios.spread((
            nowPlaying,
            popular,
            toprated,
            upcoming,
            latest
        ) => {
            const fetchedMovies = {
                nowPlaying: [...nowPlaying.data.results],
                popular: [...popular.data.results],
                topRated: [...toprated.data.results],
                upcoming: [...upcoming.data.results],
                latest: [...latest.data.results],
            }
            dispatch({ type: FETCH_MOVIES_STARTPAGE, payload: fetchedMovies })
        }))
        .then(dispatch({ type: FETCH_SUCCESS }))
        .catch(error => console.log(error))
}



