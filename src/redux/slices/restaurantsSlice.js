import { createSlice } from '@reduxjs/toolkit';

import restaurantsData from '../../data/restaurantes';

const initialState = {

    restaurants: restaurantsData,

    loading: false,

    error: null,

};

const restaurantsSlice = createSlice({

    name: 'restaurants',

    initialState,

    reducers: {

        setRestaurants: (
            state,
            action
        ) => {

            state.restaurants =
                action.payload;

        },

        setLoading: (
            state,
            action
        ) => {

            state.loading =
                action.payload;

        },

        setError: (
            state,
            action
        ) => {

            state.error =
                action.payload;

        },

    },

});

export const {

    setRestaurants,
    setLoading,
    setError,

} = restaurantsSlice.actions;

export default
    restaurantsSlice.reducer;