import {
    ref,
    set,
    get,
} from 'firebase/database';

import {
    auth,
    database,
} from './firebase';

// ⭐ Guardar rating
export const saveRating =
    async (
        restaurantId,
        rating
    ) => {

        try {

            console.log(
                'SAVE RATING:',
                restaurantId,
                rating
            );

            const user =
                auth.currentUser;

            if (!user) {
                return;
            }

            console.log(
                'CURRENT USER:',
                auth.currentUser
            );

            await set(

                ref(
                    database,
                    `ratings/${user.uid}/${restaurantId}`
                ),

                rating

            );

        } catch (error) {

            console.log(
                'ERROR SAVE RATING:',
                error
            );

        }

    };

// 📥 Obtener ratings usuario
export const getUserRatings =
    async () => {

        try {

            const user =
                auth.currentUser;

            if (!user) {
                return {};
            }

            const snapshot =
                await get(

                    ref(
                        database,
                        `ratings/${user.uid}`
                    )

                );

            if (!snapshot.exists()) {
                return {};
            }

            return snapshot.val();

        } catch (error) {

            console.log(
                'ERROR GET RATINGS:',
                error
            );

            return {};

        }

    };