import { configureStore } from '@reduxjs/toolkit';

import restaurantsReducer from '../redux/slices/restaurantsSlice';

export const store = configureStore({

    reducer: {

        restaurants: restaurantsReducer,

    },

});