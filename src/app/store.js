import { configureStore } from '@reduxjs/toolkit';

import restaurantsReducer from '../redux/slices/restaurantsSlice';
import favoritesReducer from '../redux/slices/favoritesSlice';
import commentsReducer from '../redux/slices/commentsSlice';
<<<<<<< HEAD
import userReducer from '../redux/slices/userSlice';
=======
>>>>>>> b4fd8ab034f3357ee3e410a8c66f196f79474e03

export const store = configureStore({

    reducer: {

        restaurants: restaurantsReducer,
        favorites: favoritesReducer,
        comments: commentsReducer,
<<<<<<< HEAD
        user: userReducer,
=======
>>>>>>> b4fd8ab034f3357ee3e410a8c66f196f79474e03

    },

});