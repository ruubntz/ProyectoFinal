import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useState } from 'react';





export default function App() {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);



  const getLocation = async () => {
  
  
    try {
      setLoading(true);
      setErrorMsg(null);

      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("STATUS:", status);

      if (status !== 'granted') {
        setErrorMsg('Permiso de ubicación denegado');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      console.log("LOCATION:", loc);

      setLocation(loc.coords);
    } catch (error) {
      console.log(error);
      setErrorMsg('Error obteniendo ubicación');
    } finally {
      setLoading(false);
    }
  };

  // Pantalla inicial
  if (!location) {
    return (
      <View style={styles.centered}>
        <Text style={{ marginBottom: 10 }}>
          Pulsa el botón para obtener tu ubicación
        </Text>

        <Button title="Obtener ubicación" onPress={getLocation} />

        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={{ marginTop: 10, color: '#fff' }}>
              Obteniendo ubicación...
            </Text>
          </View>
        )}

        {errorMsg && (
          <Text style={{ color: 'red', marginTop: 10 }}>
            {errorMsg}
          </Text>
        )}
      </View>
    );
  }

  // Mapa
  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="Estás aquí"
        />
      </MapView>

      {/* Botón volver */}
      <View style={styles.mapButtonContainer}>
        <Button title=" Volver al inicio" onPress={() => setLocation(null)} />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  mapButtonContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
  },
});