import { configureStore } from '@reduxjs/toolkit';

import restaurantsReducer from '../redux/slices/restaurantsSlice';
import favoritesReducer from '../redux/slices/favoritesSlice';
import commentsReducer from '../redux/slices/commentsSlice';
import userReducer from '../redux/slices/userSlice';
import ratingsReducer from '../redux/slices/ratingsSlice';



export const store = configureStore({

    reducer: {

        restaurants: restaurantsReducer,
        favorites: favoritesReducer,
        comments: commentsReducer,
        user: userReducer,
        ratings: ratingsReducer,


    },

});