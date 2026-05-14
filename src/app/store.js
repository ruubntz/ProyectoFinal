import { configureStore } from '@reduxjs/toolkit';

import restaurantsReducer from '../redux/slices/restaurantsSlice';
import favoritesReducer from '../redux/slices/favoritesSlice';
import commentsReducer from '../redux/slices/commentsSlice';

export const store = configureStore({

    reducer: {

        restaurants: restaurantsReducer,
        favorites: favoritesReducer,
        comments: commentsReducer,

    },

});