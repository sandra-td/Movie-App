import { combineReducers } from 'redux';
import moviesReducer from './moviesReducer';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import startPageReducer from './startPageReducer';
import searchReducer from './searchReducer';
import peopleReducer from './peopleReducer';

export default combineReducers({
    movies: moviesReducer,
    auth: authReducer,
    profile: profileReducer,
    startPage: startPageReducer,
    search: searchReducer,
    people: peopleReducer
});