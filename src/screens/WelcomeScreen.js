import { View, Text, Button, StyleSheet, Image } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  const handleGuestAccess = () => {
    navigation.navigate('Map');
  };

  const handleLogin = () => {
    console.log('Aquí abriremos el modal de login más adelante');
  };

  return (
    <View style={styles.container}>

      <View style={styles.logoBox}>
        <Image 
            source={require('../../assets/NearBites.png')} 
            style={styles.logo}
            resizeMode="contain"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Iniciar sesión" onPress={handleLogin} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Continuar como invitado" onPress={handleGuestAccess} />
      </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
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