import { useState } from 'react';

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Linking,
} from 'react-native';

export default function RestaurantDetailScreen({
    route,
    navigation,
}) {

    const restaurant =
        route?.params?.restaurant;

    console.log(
        'Restaurant recibido:',
        restaurant
    );

    // 🛡️ Protección
    if (!restaurant) {

        return (
            <View style={styles.errorContainer}>

                <Text style={styles.errorText}>
                    Restaurante no encontrado
                </Text>

            </View>
        );

    }

    const [activeTab, setActiveTab] =
        useState('details');

    // 🟢 Comentarios fake
    const comments = [
        {
            id: 1,
            text: 'Muy buen sitio!',
            rating: 5,
            author: 'Juan',
            date: new Date(),
        },
        {
            id: 2,
            text: 'Servicio rápido y comida excelente',
            rating: 4,
            author: 'María',
            date: new Date(),
        },
    ];

    // 📞 Llamada
    const handleCall = () => {

        if (!restaurant.phone) {
            return;
        }

        Linking.openURL(
            `tel:${restaurant.phone}`
        );

    };

    // 🌐 Página web
    const handleWebsite = () => {

        if (!restaurant.website) {
            return;
        }

        Linking.openURL(
            restaurant.website
        );

    };

    // 💬 Render comentario
    const renderComment = (comment) => {

        const formattedDate =
            comment.date.toLocaleDateString(
                'es-ES',
                {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                }
            );

        return (
            <View
                key={comment.id}
                style={styles.comment}
            >

                <Text>
                    {comment.text}
                </Text>

                <Text style={styles.commentRating}>
                    ⭐ {comment.rating} estrellas
                </Text>

                <Text style={styles.commentAuthor}>
                    -- {comment.author}, {formattedDate}
                </Text>

                <View style={styles.divider} />

            </View>
        );
    };

    return (
        <ScrollView style={styles.container}>

            {/* 🟣 Card principal */}
            <View style={styles.card}>

                <Text style={styles.title}>
                    {restaurant.name || 'Sin nombre'}
                </Text>

                <Text style={styles.description}>
                    {
                        restaurant.description ||
                        'Sin descripción disponible'
                    }
                </Text>

                {/* 🔘 Tabs */}
                <View style={styles.tabs}>

                    <TouchableOpacity
                        onPress={() =>
                            setActiveTab('details')
                        }
                    >

                        <Text
                            style={[
                                styles.tabText,
                                activeTab === 'details' &&
                                styles.activeTab,
                            ]}
                        >
                            Detalles
                        </Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() =>
                            setActiveTab('contact')
                        }
                    >

                        <Text
                            style={[
                                styles.tabText,
                                activeTab === 'contact' &&
                                styles.activeTab,
                            ]}
                        >
                            Contacto
                        </Text>

                    </TouchableOpacity>

                </View>

                {/* 🧩 Contenido dinámico */}
                <View style={styles.tabContent}>

                    {activeTab === 'details' && (
                        <>

                            <Text>
                                ⭐ {
                                    restaurant.rating ||
                                    'Sin rating'
                                } / 5
                            </Text>

                            <Text>
                                📍 {
                                    restaurant.address ||
                                    'Dirección no disponible'
                                }
                            </Text>

                            <Text>
                                ⚠️ {
                                    restaurant.allergens?.length > 0
                                        ? restaurant.allergens.join(', ')
                                        : 'Sin alérgenos'
                                }
                            </Text>

                            {/* 📍 Ver mapa */}
                            <TouchableOpacity
                                style={styles.mapButton}
                                onPress={() => {

                                    navigation.navigate(
                                        'Map',
                                        {
                                            restaurants: [
                                                restaurant,
                                            ],
                                        }
                                    );

                                }}
                            >

                                <Text style={styles.mapButtonText}>
                                    📍 Ver en mapa
                                </Text>

                            </TouchableOpacity>

                        </>
                    )}

                    {/* ☎️ Contacto */}
                    {activeTab === 'contact' && (
                        <>

                            <Text
                                onPress={handleCall}
                                style={styles.link}
                            >
                                📞 {
                                    restaurant.phone ||
                                    'No disponible'
                                }
                            </Text>

                            <Text
                                onPress={handleWebsite}
                                style={styles.link}
                            >
                                🌐 {
                                    restaurant.website ||
                                    'No disponible'
                                }
                            </Text>

                        </>
                    )}

                </View>

                {/* ❤️ Acciones */}
                <View style={styles.actions}>

                    <Text style={styles.icon}>
                        ♡
                    </Text>

                    <Text style={styles.icon}>
                        ✎
                    </Text>

                </View>

            </View>

            {/* 🟢 Comentarios */}
            <View style={styles.card}>

                <Text style={styles.commentsTitle}>
                    Comentarios
                </Text>

                {comments.map(renderComment)}

            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 12,
        backgroundColor: '#f2f2f2',
    },

    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },

    errorText: {
        fontSize: 18,
        color: '#cc0000',
    },

    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        elevation: 3,
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },

    description: {
        textAlign: 'center',
        marginBottom: 10,
    },

    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingVertical: 8,
        marginBottom: 10,
    },

    tabText: {
        fontSize: 16,
        color: '#888',
    },

    activeTab: {
        color: '#000',
        fontWeight: 'bold',
    },

    tabContent: {
        marginBottom: 10,
    },

    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },

    icon: {
        fontSize: 22,
    },

    link: {
        color: '#007AFF',
        marginTop: 8,
    },

    mapButton: {
        marginTop: 16,
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 12,
        alignItems: 'center',
    },

    mapButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },

    commentsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },

    comment: {
        marginBottom: 12,
    },

    commentRating: {
        fontSize: 12,
        color: 'gray',
        marginTop: 4,
    },

    commentAuthor: {
        fontSize: 12,
        color: 'gray',
        marginTop: 2,
    },

    divider: {
        height: 1,
        backgroundColor: '#ddd',
        marginTop: 8,
    },

});