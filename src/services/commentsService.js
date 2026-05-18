import {
    ref,
    push,
    get,
    remove,
} from 'firebase/database';

import {
    auth,
    database,
} from './firebase';

// 💾 Guardar comentario
export const saveComment =
    async ({
        restaurantId,
        author,
        text,
        rating,
        date,
    }) => {

        try {

            const user =
                auth.currentUser;

            if (!user) {
                return;
            }

            await push(

                ref(
                    database,
                    'comments'
                ),

                {
                    userId:
                        user.uid,

                    restaurantId,

                    author,

                    text,

                    rating,

                    date,
                }

            );

        } catch (error) {

            console.log(
                'ERROR SAVE COMMENT:',
                error
            );

        }

    };

// 📥 Obtener comentarios
export const getComments =
    async () => {

        try {

            const snapshot =
                await get(

                    ref(
                        database,
                        'comments'
                    )

                );

            if (!snapshot.exists()) {
                return [];
            }

            const data =
                snapshot.val();

            return Object.entries(data).map(

                ([id, comment]) => ({

                    id,

                    ...comment,

                })

            );

        } catch (error) {

            console.log(
                'ERROR GET COMMENTS:',
                error
            );

            return [];

        }

    };

// 🗑️ Eliminar comentario
export const deleteComment =
    async (commentId) => {

        try {

            await remove(

                ref(
                    database,
                    `comments/${commentId}`
                )

            );

        } catch (error) {

            console.log(
                'ERROR DELETE COMMENT:',
                error
            );

        }

    };