import {
    IS_LOGGED_IN,
    LOG_OUT
} from './types';

import axios from 'axios';

export const isLoggedIn = (accountId, sessionId) => {
    localStorage.setItem("token", sessionId)
    localStorage.setItem("account_token", accountId)
    return {
        type: IS_LOGGED_IN,
        payload: {
            accountId, sessionId
        }
    }
}

export const logOut = () => dispatch => {
    const sessionId = localStorage.token;
    axios({
        method: 'delete',
        url: "https://api.themoviedb.org/3/authentication/session?api_key=37d221c2301fc617ed594f567533476f",
        data: {
            "session_id": sessionId
        }
    }).then(response => {
        dispatch({ type: LOG_OUT })
    }).catch(error => console.log(error, "eerorrr logout frontend"))
}

export const checkIfLoggedIn = () => dispatch => {
    const sessionId = localStorage.token;
    const accountId = localStorage.account_token;
    if (sessionId) {
        axios({
            method: 'get',
            url: `https://api.themoviedb.org/3/account?api_key=37d221c2301fc617ed594f567533476f&session_id=${sessionId}`
        }).then(response => {
            dispatch({
                type: IS_LOGGED_IN,
                payload: {
                    accountId, sessionId
                }
            })
        })
            .catch(error => console.log(error, "error frontend"))
        // .then(
        //     await axios({
        //         method: 'get',
        //         url: `http://localhost:3001/api/login`,
        //         headers: {
        //             'Content-type': 'application/json',
        //             Accept: 'application/json',
        //             'Authorization': accountId
        //         }
        //     }).then(response => {
        //         console.log(response, "my own, checking")

        // })
        // )
        // .catch(error => console.log(error, "my own wrror"))
    }
}

