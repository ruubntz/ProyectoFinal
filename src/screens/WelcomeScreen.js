import { useState } from 'react';

import {
  View,
  Button,
  StyleSheet,
  Image,
} from 'react-native';

import AuthModal from '../components/auth/authModal';

import { useEffect } from 'react';

import {
  useDispatch,
} from 'react-redux';

import {
  setRestaurants,
} from '../redux/slices/restaurantsSlice';

import {
  getRestaurants,
} from '../services/restaurantService';



export default function WelcomeScreen({
  navigation,
}) {

  const dispatch =
    useDispatch();

  useEffect(() => {

    const loadRestaurants =
      async () => {

        const restaurants =
          await getRestaurants();

        dispatch(
          setRestaurants(
            restaurants
          )
        );

        //console.log('Restaurants loaded:', restaurants );

      };

    loadRestaurants();

  }, []);

  // 🔐 Modal auth
  const [
    showAuthModal,
    setShowAuthModal,
  ] = useState(false);

  // 👤 Invitado
  const handleGuestAccess = () => {

    navigation.navigate('Search');

  };

  // 🔐 Abrir auth
  const handleOpenAuth = () => {

    setShowAuthModal(true);

  };

  // ❌ Cerrar auth
  const handleCloseAuth = () => {

    setShowAuthModal(false);

  };

  return (

    <View style={styles.container}>

      {/* 🖼️ Logo */}
      <View style={styles.logoBox}>

        <Image
          source={require('../../assets/NearBites.png')}
          style={styles.logo}
          resizeMode="contain"
        />

      </View>

      {/* 🔐 Login */}
      <View style={styles.buttonContainer}>

        <Button
          title="Iniciar sesión"
          onPress={handleOpenAuth}
        />

      </View>

      {/* 👤 Invitado */}
      <View style={styles.buttonContainer}>

        <Button
          title="Continuar como invitado"
          onPress={handleGuestAccess}
        />

      </View>

      {/* 🔐 Modal auth */}
      <AuthModal
        visible={showAuthModal}
        onClose={handleCloseAuth}
      />

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  logoBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: 300,
    height: 300,
  },

  buttonContainer: {
    width: '100%',
    marginVertical: 6,
  },

});