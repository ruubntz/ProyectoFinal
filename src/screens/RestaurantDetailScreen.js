import { useState } from 'react';
import { useSelector, useDispatch, } from 'react-redux';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, } from 'react-native';

import { toggleFavorite, } from '../redux/slices/favoritesSlice';
import { addFavorite, removeFavorite, } from '../services/favoritesService';

import { saveRating, } from '../services/ratingsService';
import { setRating, } from '../redux/slices/ratingsSlice';

import CommentModal from '../components/restaurant/CommentModal';
import { saveComment, getComments, } from '../services/commentsService';
import { addComment, setComments, deleteComment, } from '../redux/slices/commentsSlice';
import { deleteComment as deleteCommentFirebase,} from '../services/commentsService';

import { auth, } from '../services/firebase';





export default function RestaurantDetailScreen({ route, navigation, }) {

    const restaurant = route?.params?.restaurant;

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

    const dispatch = useDispatch();

    // ❤️ Favoritos
    const favorites = useSelector(state => state.favorites.favorites);

    const isFavorite = favorites.includes(restaurant.id);

    // 💬 Comentarios Redux
    const comments = useSelector(state => state.comments.comments);

    const restaurantComments = comments.filter(comment => comment.restaurantId === restaurant.id);

    // 🔘 Tabs
    const [activeTab, setActiveTab] = useState('details');

    // 💬 Modal comentario
    const [showCommentForm, setShowCommentForm,] = useState(false);

    const [author, setAuthor] = useState('');

    const [commentText, setCommentText,] = useState('');

    const [rating, setLocalRating] = useState(5);

    // 📞 Llamada
    const handleCall = () => {

        if (!restaurant.phone) {
            return;
        }

        Linking.openURL(
            `tel:${restaurant.phone}`
        );

    };

    // 🌐 Web
    const handleWebsite = () => {

        if (!restaurant.website) {
            return;
        }

        Linking.openURL(
            restaurant.website
        );

    };

    // ♻️ Reset formulario
    const resetCommentForm = () => {

        setAuthor('');
        setCommentText('');
        setLocalRating(5);

    };

    // 💾 Enviar comentario
    const handleSubmitComment = async () => {

        try {

            await saveComment({

                restaurantId:
                    restaurant.id,

                author,

                text:
                    commentText,

                rating,

                date:
                    new Date().toISOString(),

            });

            const updatedComments =
                await getComments();

            dispatch(
                setComments(
                    updatedComments
                )
            );

            dispatch(

                setRating({

                    restaurantId:
                        restaurant.id,

                    rating,

                })

            );

            await saveRating(
                restaurant.id,
                rating
            );

            resetCommentForm();

            setShowCommentForm(false);

        } catch (error) {

            console.log(
                'ERROR SUBMIT COMMENT:',
                error
            );

        }

    };

    // ❌ Cerrar modal
    const handleCloseModal = () => {

        resetCommentForm();

        setShowCommentForm(false);

    };

    // 💬 Render comentario
    const renderComment = (comment) => {

        const formattedDate =
            new Date(comment.date)
                .toLocaleDateString(
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

                {
                    auth.currentUser?.uid ===
                    comment.userId && (

                        <TouchableOpacity
                            onPress={async () => {

                                await deleteCommentFirebase(
                                    comment.id
                                );

                                const updatedComments =
                                    await getComments();

                                dispatch(
                                    setComments(
                                        updatedComments
                                    )
                                );

                            }}
                        >

                            <Text style={styles.deleteText}>
                                🗑️ Eliminar
                            </Text>

                        </TouchableOpacity>

                    )
                }

                <View style={styles.divider} />

            </View>

        );

    };

    return (

        <ScrollView style={styles.container}>

            {/* 🟣 Card principal */}
            <View style={styles.card}>

                <Text style={styles.title}>
                    {restaurant.name}
                </Text>

                <Text style={styles.description}>
                    {
                        restaurant.description
                    }
                </Text>

                {/* 🔘 Tabs */}
                <View style={styles.tabs}>

                    <TouchableOpacity
                        onPress={() =>
                            setActiveTab(
                                'details'
                            )
                        }
                    >

                        <Text
                            style={[
                                styles.tabText,

                                activeTab ===
                                'details' &&

                                styles.activeTab,
                            ]}
                        >
                            Detalles
                        </Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() =>
                            setActiveTab(
                                'contact'
                            )
                        }
                    >

                        <Text
                            style={[
                                styles.tabText,

                                activeTab ===
                                'contact' &&

                                styles.activeTab,
                            ]}
                        >
                            Contacto
                        </Text>

                    </TouchableOpacity>

                </View>

                {/* 🧩 Contenido */}
                <View style={styles.tabContent}>

                    {activeTab ===
                        'details' && (

                            <>

                                <Text>
                                    ⭐ {restaurant.rating} / 5
                                </Text>

                                <Text>
                                    📍 {restaurant.address}
                                </Text>

                                <Text>

                                    ⚠️ {

                                        restaurant.allergens
                                            ?.length > 0

                                            ? restaurant
                                                .allergens
                                                .join(', ')

                                            : 'Sin alérgenos'
                                    }

                                </Text>

                                {/* 📍 Mapa */}
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

                                    <Text
                                        style={
                                            styles.mapButtonText
                                        }
                                    >
                                        📍 Ver en mapa
                                    </Text>

                                </TouchableOpacity>

                            </>

                        )}

                    {/* ☎️ Contacto */}
                    {activeTab ===
                        'contact' && (

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

                    {/* ❤️ Favorito */}
                    <TouchableOpacity
                        onPress={async () => {

                            dispatch(
                                toggleFavorite(
                                    restaurant.id
                                )
                            );

                            if (isFavorite) {

                                await removeFavorite(
                                    restaurant.id
                                );

                            }
                            else {

                                await addFavorite(
                                    restaurant.id
                                );

                            }

                        }}
                    >

                        <Text style={styles.icon}>

                            {
                                isFavorite
                                    ? '❤️'
                                    : '🤍'
                            }

                        </Text>

                    </TouchableOpacity>

                    {/* ✏️ Comentario */}
                    <TouchableOpacity
                        onPress={() =>
                            setShowCommentForm(true)
                        }
                    >

                        <Text style={styles.icon}>
                            ✎
                        </Text>

                    </TouchableOpacity>

                </View>

            </View>

            {/* 💬 Comentarios */}
            <View style={styles.card}>

                <Text style={styles.commentsTitle}>
                    Comentarios
                </Text>

                {restaurantComments.map(
                    renderComment
                )}

            </View>

            {/* 💬 Modal */}
            <CommentModal

                visible={showCommentForm}

                onClose={handleCloseModal}

                onSubmit={handleSubmitComment}

                author={author}
                setAuthor={setAuthor}

                commentText={commentText}
                setCommentText={setCommentText}

                rating={rating}
                setRating={setLocalRating}

            />

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
    deleteText: {
        color: 'red',
        marginTop: 6,
        fontSize: 12,
        textAlign: 'right',
    },

});