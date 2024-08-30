import { createStore } from 'redux';
import {  applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import repoReducer from './reducer';

const favoritesFromStorage = localStorage.getItem('favorites');
const initialFavorites: string[] = favoritesFromStorage ? JSON.parse(favoritesFromStorage) : [];

export const favoritesReducer = (state = initialFavorites, action: { type?: string; payload?: any }) => {
    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            if (state.includes(action.payload)) {
                return state.filter(id => id !== action.payload);
            } else {
                return [...state, action.payload];
            }
        default:
            return state;
    }
};


const rootReducer = combineReducers({
    favorites: favoritesReducer,
     repos: repoReducer,

});
export type RootState = ReturnType<typeof rootReducer>;
console.log(thunk)

const store = createStore(rootReducer, applyMiddleware(thunk));

store.subscribe(() => {
    localStorage.setItem('favorites', JSON.stringify(store.getState().favorites));
});

export default store;
