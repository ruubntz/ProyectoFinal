import { createSlice } from '@reduxjs/toolkit';

const initialState = {

    favorites: [],

};

const favoritesSlice = createSlice({

    name: 'favorites',

    initialState,

    reducers: {

        toggleFavorite: (
            state,
            action
        ) => {

            const restaurantId =
                action.payload;

            const exists =
                state.favorites.includes(
                    restaurantId
                );

            if (exists) {

                state.favorites =
                    state.favorites.filter(
                        id =>
                            id !== restaurantId
                    );

            }
            else {

                state.favorites.push(
                    restaurantId
                );

            }

        },

        setFavorites: (
            state,
            action
        ) => {

            state.favorites =
                action.payload;

        },

    },

});

export const {

    toggleFavorite,
    setFavorites,

} = favoritesSlice.actions;

export default
    favoritesSlice.reducer;