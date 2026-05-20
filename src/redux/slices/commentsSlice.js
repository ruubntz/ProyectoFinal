import { createSlice } from '@reduxjs/toolkit';



const initialState = {

    comments: [],
    loading: false,
    error: null,

};



const commentsSlice = createSlice({

    name: 'comments',
    initialState,
    reducers: {

        addComment: (state, action) => {

            state.comments.push(action.payload);

        },

        deleteComment: (state, action) => {

            state.comments = state.comments.filter(comment => comment.id !== action.payload);

        },


        setComments: (state, action) => {

            state.comments = action.payload;

        },

    },

});

export const {

    addComment,
    deleteComment,
    setComments,

} = commentsSlice.actions;

export default
    commentsSlice.reducer;