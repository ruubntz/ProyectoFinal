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
      <Text style={styles.title}>NearBites</Text>

      <View style={styles.logoBox}>
        <Text style={styles.logoText}>LOGO</Text>
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
    width: 180,
    height: 180,
    borderRadius: 12,
    backgroundColor: '#d9eef7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 6,
  },
});