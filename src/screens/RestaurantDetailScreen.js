import { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Linking,
} from 'react-native';

export default function RestaurantDetailScreen({ route, navigation }) {
    const { restaurant } = route.params;

    const [activeTab, setActiveTab] = useState('details');

    // 🟢 Comentarios simulados
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
        if (restaurant.phone) {
            Linking.openURL(`tel:${restaurant.phone}`);
        }
    };

    // 🌐 Web
    const handleWebsite = () => {
        if (restaurant.website) {
            Linking.openURL(restaurant.website);
        }
    };

    // 🔹 Render comentario
    const renderComment = (comment) => {
        const formattedDate = comment.date.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });

        return (
            <View key={comment.id} style={styles.comment}>
                <Text>{comment.text}</Text>

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

            {/* 🟣 CARD PRINCIPAL */}
            <View style={styles.card}>

                <Text style={styles.title}>{restaurant.name}</Text>

                <Text style={styles.description}>
                    {restaurant.description}
                </Text>

                {/* Tabs */}
                <View style={styles.tabs}>
                    <TouchableOpacity onPress={() => setActiveTab('details')}>
                        <Text style={[
                            styles.tabText,
                            activeTab === 'details' && styles.activeTab
                        ]}>
                            Detalles
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setActiveTab('contact')}>
                        <Text style={[
                            styles.tabText,
                            activeTab === 'contact' && styles.activeTab
                        ]}>
                            Contacto
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Contenido dinámico */}
                <View style={styles.tabContent}>

                    {activeTab === 'details' && (
                        <>
                            <Text>⭐ {restaurant.rating} / 5</Text>
                            <Text>📍 {restaurant.address}</Text>
                            <Text>⚠️ {restaurant.allergens.join(', ')}</Text>
                        </>
                    )}

                    {activeTab === 'contact' && (
                        <>
                            <Text
                                onPress={handleCall}
                                style={styles.link}
                            >
                                📞 {restaurant.phone || '123456789'}
                            </Text>

                            <Text
                                onPress={handleWebsite}
                                style={styles.link}
                            >
                                🌐 {restaurant.website || 'https://www.restaurante.com'}
                            </Text>
                        </>
                    )}

                </View>

                {/* Acciones */}
                <View style={styles.actions}>
                    <Text style={styles.icon}>♡</Text>
                    <Text style={styles.icon}>✎</Text>
                </View>
            </View>

            {/* 🟢 CARD COMENTARIOS */}
            <View style={styles.card}>
                <Text style={styles.commentsTitle}>Comentarios</Text>

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