import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    TextInput,
} from 'react-native';

export default function CommentModal({

    visible,
    onClose,
    onSubmit,

    author,
    setAuthor,

    commentText,
    setCommentText,

    rating,
    setRating,

}) {

    return (

        <Modal
            visible={visible}
            animationType="slide"
            transparent
        >

            <View style={styles.modalOverlay}>

                <View style={styles.modalContent}>

                    <Text style={styles.modalTitle}>
                        Añadir comentario
                    </Text>

                    {/* ⭐ Rating */}
                    <View style={styles.ratingContainer}>

                        {[1, 2, 3, 4, 5].map((star) => (

                            <TouchableOpacity
                                key={star}
                                onPress={() =>
                                    setRating(star)
                                }
                            >

                                <Text style={styles.star}>

                                    {star <= rating
                                        ? '⭐'
                                        : '☆'}

                                </Text>

                            </TouchableOpacity>

                        ))}

                    </View>

                    <Text style={styles.ratingText}>

                        {
                            rating === 1
                                ? 'Muy malo'
                                : rating === 2
                                ? 'Malo'
                                : rating === 3
                                ? 'Normal'
                                : rating === 4
                                ? 'Muy bueno'
                                : 'Excelente'
                        }

                    </Text>

                    {/* 👤 Autor */}
                    <TextInput
                        placeholder="Autor"
                        value={author}
                        onChangeText={setAuthor}
                        style={styles.input}
                    />

                    {/* 💬 Comentario */}
                    <TextInput
                        placeholder="Comentario"
                        value={commentText}
                        onChangeText={setCommentText}
                        multiline
                        style={[
                            styles.input,
                            styles.commentInput,
                        ]}
                    />

                    {/* 🔘 Botones */}
                    <View style={styles.modalButtons}>

                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={onClose}
                        >

                            <Text>
                                Cancelar
                            </Text>

                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={onSubmit}
                        >

                            <Text style={styles.submitText}>
                                Enviar
                            </Text>

                        </TouchableOpacity>

                    </View>

                </View>

            </View>

        </Modal>

    );
}

const styles = StyleSheet.create({

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: 20,
    },

    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
    },

    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },

    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 12,
    },

    star: {
        fontSize: 34,
        marginHorizontal: 4,
    },

    ratingText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 18,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 12,
        marginBottom: 12,
    },

    commentInput: {
        minHeight: 90,
        textAlignVertical: 'top',
    },

    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },

    cancelButton: {
        padding: 12,
    },

    submitButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
    },

    submitText: {
        color: '#fff',
        fontWeight: 'bold',
    },

});