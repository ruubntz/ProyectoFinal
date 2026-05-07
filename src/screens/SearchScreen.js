import { useState } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TextInput,
    FlatList,
    TouchableOpacity,
} from 'react-native';

// 📦 Base de datos local
import restaurants from '../data/restaurantes';

export default function SearchScreen({ navigation }) {

    // 🔍 Texto búsqueda
    const [searchText, setSearchText] = useState('');

    // ⭐ Rating mínimo
    const [minRating, setMinRating] = useState(0);

    // ⚠️ Filtro gluten
    const [glutenFreeOnly, setGlutenFreeOnly] = useState(false);

    // 🔎 Filtrado restaurantes
    const filteredRestaurants = restaurants.filter((restaurant) => {

        // 🔍 Buscar por nombre o categoría
        const matchesSearch =

            restaurant.name
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||

            restaurant.categories
                .join(' ')
                .toLowerCase()
                .includes(searchText.toLowerCase());

        // ⭐ Rating mínimo
        const matchesRating =
            restaurant.rating >= minRating;

        // ⚠️ Sin gluten
        const matchesGluten =
            !glutenFreeOnly ||
            !restaurant.allergens.includes('Gluten');

        return (
            matchesSearch &&
            matchesRating &&
            matchesGluten
        );
    });

    // 🍔 Render restaurante
    const renderRestaurant = ({ item }) => (

        <TouchableOpacity
            style={styles.restaurantCard}
            onPress={() => {

                navigation.navigate(
                    'Detail',
                    {
                        restaurant: item,
                    }
                );

            }}
        >

            <Text style={styles.restaurantName}>
                {item.name}
            </Text>

            <Text style={styles.restaurantType}>
                🍽 {item.categories.join(', ')}
            </Text>

            <Text style={styles.restaurantRating}>
                ⭐ {item.rating}
            </Text>

            <Text style={styles.restaurantAllergens}>
                ⚠️ {
                    item.allergens.length > 0
                        ? item.allergens.join(', ')
                        : 'Sin alérgenos'
                }
            </Text>

        </TouchableOpacity>

    );

    return (
        <View style={styles.container}>

            {/* 🔍 Título */}
            <Text style={styles.title}>
                Buscar Restaurantes
            </Text>

            {/* 🗺️ Botón mapa */}
            <TouchableOpacity
                style={styles.mapButton}
                onPress={() => {

                    navigation.navigate(
                        'Map',
                        {
                            restaurants:
                                filteredRestaurants,
                        }
                    );

                }}
            >

                <Text style={styles.mapButtonText}>
                    🗺️ Ver restaurantes en el mapa
                </Text>

            </TouchableOpacity>

            {/* 🔎 SearchBar */}
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar por nombre o categoría..."
                value={searchText}
                onChangeText={setSearchText}
            />

            {/* ⭐ Rating */}
            <Text style={styles.filterTitle}>
                Rating mínimo
            </Text>

            <View style={styles.ratingButtons}>

                {[0, 3, 4, 4.5].map((rating) => (

                    <TouchableOpacity
                        key={rating}
                        style={[
                            styles.filterButton,
                            minRating === rating &&
                            styles.activeFilter
                        ]}
                        onPress={() =>
                            setMinRating(rating)
                        }
                    >

                        <Text>
                            ⭐ {rating}
                        </Text>

                    </TouchableOpacity>

                ))}

            </View>

            {/* ⚠️ Sin gluten */}
            <TouchableOpacity
                style={[
                    styles.filterButton,
                    glutenFreeOnly &&
                    styles.activeFilter
                ]}
                onPress={() =>
                    setGlutenFreeOnly(
                        !glutenFreeOnly
                    )
                }
            >

                <Text>
                    Sin Gluten
                </Text>

            </TouchableOpacity>

            {/* 🍔 Lista restaurantes */}
            <FlatList
                data={filteredRestaurants}
                keyExtractor={(item) =>
                    item.id.toString()
                }
                renderItem={renderRestaurant}
                contentContainerStyle={styles.list}
            />

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        padding: 16,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },

    mapButton: {
        backgroundColor: '#007AFF',
        padding: 14,
        borderRadius: 14,
        marginBottom: 18,
        alignItems: 'center',
    },

    mapButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },

    searchInput: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },

    filterTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },

    ratingButtons: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 16,
        flexWrap: 'wrap',
    },

    filterButton: {
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 12,
    },

    activeFilter: {
        backgroundColor: '#dbeafe',
        borderColor: '#60a5fa',
    },

    list: {
        paddingBottom: 20,
    },

    restaurantCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 14,
        marginBottom: 12,
        elevation: 2,
    },

    restaurantName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 6,
    },

    restaurantType: {
        fontSize: 14,
        marginBottom: 4,
    },

    restaurantRating: {
        fontSize: 14,
        color: '#444',
        marginBottom: 4,
    },

    restaurantAllergens: {
        fontSize: 13,
        color: '#666',
    },

});