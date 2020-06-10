import axios from "axios";

import {
    FETCH_PERSON_DETAILS,
    IS_FETCHING
} from "./types";

export const fetchPersonDetails = (id) => dispatch => {
    dispatch({ type: IS_FETCHING });
    axios({
        method: "get",
        url: `https://api.themoviedb.org/3/person/${id}?api_key=37d221c2301fc617ed594f567533476f&append_to_response=movie_credits,external_ids`
    })
        .then(response => {
            dispatch({
                type: FETCH_PERSON_DETAILS,
                payload: response.data
            });
        })
        .catch(error => console.log(error));
};
