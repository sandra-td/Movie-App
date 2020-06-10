import { FETCH_PERSON_DETAILS, IS_FETCHING } from "../actions/peopleActions/types";

import initialState from '../initialState';

export default (state = initialState.people, action) => {
    switch (action.type) {
        case FETCH_PERSON_DETAILS:
            return { ...state, details: action.payload, isFetching: false }
        case IS_FETCHING:
            return { ...state, isFetching: true }
        default:
            return state;
    }
}
