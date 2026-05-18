import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, } from 'react-native';


import { setUser } from '../../redux/slices/userSlice';
import { loginUser } from '../../services/authService';

import { getFavorites, } from '../../services/favoritesService';
import { setFavorites, } from '../../redux/slices/favoritesSlice';

import { getUserRatings, } from '../../services/ratingsService';
import { setRatings, } from '../../redux/slices/ratingsSlice';



export default function LoginForm({ onClose, }) {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    
    //  Login
    const handleLogin = async () => {

        try {

            //console.log('Intentando login...');
            const user = await loginUser(email.trim(), password)
            dispatch(setUser({ uid: user.uid, email: user.email, }));


            const favorites = await getFavorites();
            dispatch(setFavorites(favorites));


            const ratings = await getUserRatings();
            dispatch(setRatings(ratings));


            onClose();
            navigation.navigate('Search');

            //console.log( 'Navegación OK' );

        } catch (err) {

            console.log(
                'ERROR LOGIN:',
                err
            );

            setError(err.message);

        }

    };


    return (

        <View>

            <Text style={styles.title}>
                Login
            </Text>

            {/* 📧 Email */}
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                autoCapitalize="none"
            />

            {/* 🔒 Password */}
            <TextInput
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />

            {/* ❌ Error */}
            {error ? (

                <Text style={styles.error}>
                    {error}
                </Text>

            ) : null}

            {/* 🔐 Botón */}
            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
            >

                <Text style={styles.buttonText}>
                    Iniciar sesión
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