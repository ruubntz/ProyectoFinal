import { configureStore } from '@reduxjs/toolkit';

import restaurantsReducer from '../redux/slices/restaurantsSlice';
import favoritesReducer from 'redux/slices/favoritesSlice';

export const store = configureStore({

    reducer: {

        restaurants: restaurantsReducer,
        favorites: favoritesReducer,

    },

});