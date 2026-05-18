import {
    createSlice,
} from '@reduxjs/toolkit';

const initialState = {

    ratings: {},

};

const ratingsSlice =
    createSlice({

        name: 'ratings',

        initialState,

        reducers: {

            // ⭐ Guardar rating
            setRating: (
                state,
                action
            ) => {

                const {
                    restaurantId,
                    rating,
                } = action.payload;

                state.ratings[
                    restaurantId
                ] = rating;

            },

            // ☁️ Cargar ratings
            setRatings: (
                state,
                action
            ) => {

                state.ratings =
                    action.payload;

            },

        },

    });

export const {

    setRating,
    setRatings,

} = ratingsSlice.actions;

export default
    ratingsSlice.reducer;