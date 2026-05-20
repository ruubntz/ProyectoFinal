import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation, } from '@react-navigation/native';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, } from 'react-native';


import { setUser, } from '../../redux/slices/userSlice';
import { registerUser, } from '../../services/authService';





export default function RegisterForm({ onClose, }) {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword,] = useState('');
    const [error, setError] = useState('');


    //  Registro
    const handleRegister = async () => {

        //  Validar passwords
        if (password !== confirmPassword) {

            setError('Las contraseñas no coinciden');
            return;

        }

        try {

            const user = await registerUser(email.trim(), password);

            // Redux
            dispatch(setUser({ uid: user.uid, email: user.email, }));

            // Cerrar modal
            onClose();

            // Navegar
            navigation.navigate('Search');

        } catch (err) {

            console.log(err);
            setError(err.message);

        }

    };

    return (

        <View>

            <Text style={styles.title}>
                Registro
            </Text>

            {/* 📧 Email */}
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
            />

            {/* 🔒 Password */}
            <TextInput
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />

            {/* 🔒 Confirm password */}
            <TextInput
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChangeText={
                    setConfirmPassword
                }
                secureTextEntry
                style={styles.input}
            />

            {/* ❌ Error */}
            {error ? (

                <Text style={styles.error}>
                    {error}
                </Text>

            ) : null}

            {/* 📝 Botón */}
            <TouchableOpacity
                style={styles.button}
                onPress={handleRegister}
            >

                <Text style={styles.buttonText}>
                    Crear cuenta
                </Text>

            </TouchableOpacity>

        </View>

    );

}

const styles = StyleSheet.create({

    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 12,
        marginBottom: 12,
    },

    button: {
        backgroundColor: '#007AFF',
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },

    error: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },

});