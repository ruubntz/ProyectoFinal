import { createSlice } from '@reduxjs/toolkit';


const initialState = {

    user: null,
    isLoggedIn: false,
    loading: false,
    error: null,

};



const userSlice = createSlice({

    name: 'user',
    initialState,

    reducers: {

        //  Loading
        setLoading: (state, action) => {

            state.loading = action.payload;

        },

        //  Login correcto
        setUser: (state, action) => {

            state.user = action.payload;
            state.isLoggedIn = true;
            state.error = null;

        },

        //  Logout
        clearUser: (state) => {

            state.user = null;
            state.isLoggedIn = false;

        },

        // Error auth
        setError: (state, action) => {

            state.error = action.payload;

        },

    },

});

export const {

    setLoading,
    setUser,
    clearUser,
    setError,

} = userSlice.actions;

export default userSlice.reducer;