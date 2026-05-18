import { createSlice }
    from '@reduxjs/toolkit';

const initialState = {

    comments: [

        {
            id: 1,
            restaurantId: 1,
            author: 'Juan',
            text: 'Muy buen sitio',
            rating: 5,
            date: new Date().toISOString(),
        },

        {
            id: 2,
            restaurantId: 1,
            author: 'María',
            text: 'Servicio rápido y comida excelente',
            rating: 4,
            date: new Date().toISOString(),
        },

    ],

    loading: false,

    error: null,

};

const commentsSlice = createSlice({

    name: 'comments',

    initialState,

    reducers: {

        addComment: (
            state,
            action
        ) => {

            state.comments.push(
                action.payload
            );

        },

        deleteComment: (
            state,
            action
        ) => {

            state.comments =
                state.comments.filter(
                    comment =>
                        comment.id !==
                        action.payload
                );

        },


        setComments: (
            state,
            action
        ) => {

            state.comments =
                action.payload;

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