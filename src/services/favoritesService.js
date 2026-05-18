import {
    ref,
    set,
    remove,
    get,
} from 'firebase/database';

import {
    auth,
    database,
} from './firebase';

// ❤️ Añadir favorito
export const addFavorite =
    async (restaurantId) => {

        try {

            const user =
                auth.currentUser;

            if (!user) {
                return;
            }

            await set(

                ref(
                    database,
                    `favorites/${user.uid}/${restaurantId}`
                ),

                true

            );

        } catch (error) {

            console.log(
                'ERROR ADD FAVORITE:',
                error
            );

        }

    };

// ❌ Eliminar favorito
export const removeFavorite =
    async (restaurantId) => {

        try {

            const user =
                auth.currentUser;

            if (!user) {
                return;
            }

            await remove(

                ref(
                    database,
                    `favorites/${user.uid}/${restaurantId}`
                )

            );

        } catch (error) {

            console.log(
                'ERROR REMOVE FAVORITE:',
                error
            );

        }

    };

// 📥 Obtener favoritos
export const getFavorites =
    async () => {

        try {

            const user =
                auth.currentUser;

            if (!user) {
                return [];
            }

            const snapshot =
                await get(

                    ref(
                        database,
                        `favorites/${user.uid}`
                    )

                );

            if (!snapshot.exists()) {
                return [];
            }

            return Object.keys(
                snapshot.val()
            );

        } catch (error) {

            console.log(
                'ERROR GET FAVORITES:',
                error
            );

            return [];

        }

    };