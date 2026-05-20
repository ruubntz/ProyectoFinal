import { ref, get, } from 'firebase/database';
import { database, } from './firebase';



// Obtener restaurantes
export const getRestaurants = async () => {

    try {

        const restaurantsRef = ref(database, 'restaurants');

        const snapshot = await get(restaurantsRef);

        // Check de existencia de datos
        if (!snapshot.exists()) { return []; }

        // Datos Firebase
        const data = snapshot.val();

        // Convertimos de Objeto a array
        const restaurants = Object.entries(data).map(

            ([id, restaurant]) => ({

                id, ...restaurant,

                allergens: restaurant.allergens ? restaurant.allergens
                    .replace('[', '')
                    .replace(']', '')
                    .replaceAll("'", '')
                    .split(',')
                    .map(item => item.trim())

                    : [],

                categories: restaurant.categories ? restaurant.categories
                    .replace('[', '')
                    .replace(']', '')
                    .replaceAll("'", '')
                    .split(',')
                    .map(item => item.trim())

                    : [],

            })
        );

        return restaurants;


    } catch (error) {

        console.log(
            'ERROR GET RESTAURANTS:',
            error
        );

        return [];

    }

};