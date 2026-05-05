import { useState } from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity, Modal } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

import useLocation from '../hooks/useLocation';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import SideMenu from '../navigation/SideMenu';

export default function MapScreen({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(false);

  const {
    location,
    errorMsg,
    loading,
    getLocation,
  } = useLocation();

  const fakeRestaurant = location
  ? {
      name: 'Restaurante NearBites',
      rating: 4.5,
      address: 'Calle Ejemplo 24',
      allergens: ['Gluten', 'Lactosa', 'Frutos secos'],
      description:
        'Restaurante simulado para pruebas. Más adelante estos datos vendrán desde Firebase.',
      latitude: location.latitude + 0.001,
      longitude: location.longitude + 0.001,
    }
  : null;

  const handleGoHome = () => {
    setMenuVisible(false);
    navigation.navigate('Welcome');
  };

  const handleRefresh = () => {
    setMenuVisible(false);
    getLocation();
  };

  const handleSearch = () => {
    setMenuVisible(false);
    console.log('Buscar restaurantes');
  };

  if (!location) {
    return (
      <View style={styles.centered}>
        <Text style={styles.text}>
          Pulsa el botón para obtener tu ubicación
        </Text>

        <Button title="Obtener ubicación" onPress={getLocation} />

        <View style={styles.buttonContainer}>
          <Button title="Volver" onPress={() => navigation.goBack()} />
        </View>

        {loading && <LoadingOverlay text="Obteniendo ubicación..." />}

        {errorMsg && (
          <Text style={styles.errorText}>
            {errorMsg}
          </Text>
        )}
      </View>
    );
  }

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
        onPress={() => {
            
            setBubbleVisible(false);
            
        }}
        >
        <Marker
            coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
            }}
            >
            <View style={styles.userMarker}>
                <View style={styles.userInnerDot} />
            </View>
        </Marker>

    {fakeRestaurant && (
        <Marker
            coordinate={{
            latitude: fakeRestaurant.latitude,
            longitude: fakeRestaurant.longitude,
            }}
            onPress={(e) => {
            e.stopPropagation();
            console.log('Restaurante pulsado:', fakeRestaurant);
            setBubbleVisible(true);
            }}
        />
        )}
      </MapView>

      {bubbleVisible && fakeRestaurant && (
        <TouchableOpacity activeOpacity={1}>
        <View style={styles.restaurantBubble}>
            <Text style={styles.bubbleTitle}>{fakeRestaurant.name}</Text>

            <Text style={styles.bubbleRating}>
            ⭐ {fakeRestaurant.rating} / 5
            </Text>

            <Text style={styles.bubbleText}>
            {fakeRestaurant.address}
            </Text>

            <View style={styles.bubbleButtons}>
            <Button
                title="Detalles"
                onPress={() => setDetailsVisible(true)}
            />

            <Button
                title="Cerrar"
                onPress={() => setBubbleVisible(false)}
            />
            </View>

            <View style={styles.bubbleArrow} />
        </View>
        </TouchableOpacity>
        )}

      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setMenuVisible(true)}
      >
        <Text style={styles.menuButtonText}>☰</Text>
      </TouchableOpacity>

      <SideMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onGoHome={handleGoHome}
        onRefresh={handleRefresh}
        onSearch={handleSearch}
      />

      <Modal
        visible={detailsVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setDetailsVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {fakeRestaurant.name}
            </Text>

            <Text style={styles.modalRating}>
              ⭐ Puntuación: {fakeRestaurant.rating} / 5
            </Text>

            <Text style={styles.modalText}>
              📍 Dirección: {fakeRestaurant.address}
            </Text>

            <Text style={styles.modalText}>
              ⚠️ Alérgenos: {fakeRestaurant.allergens.join(', ')}
            </Text>

            <Text style={styles.modalDescription}>
              {fakeRestaurant.description}
            </Text>

            <View style={styles.modalButton}>
              <Button
                title="Cerrar"
                onPress={() => setDetailsVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>

      {loading && <LoadingOverlay text="Actualizando ubicación..." />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  restaurantBubble: {
  position: 'absolute',
  top: 120,
  left: 35,
  right: 35,
  backgroundColor: '#fff',
  padding: 14,
  borderRadius: 16,
  borderWidth: 1,
  borderColor: '#ddd',
  zIndex: 6,
  elevation: 6,
},
bubbleTitle: {
  fontSize: 17,
  fontWeight: 'bold',
  marginBottom: 6,
},
bubbleRating: {
  fontSize: 15,
  marginBottom: 6,
},
bubbleText: {
  fontSize: 14,
  marginBottom: 10,
},
bubbleButtons: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: 8,
},
bubbleArrow: {
  position: 'absolute',
  bottom: -10,
  left: 40,
  width: 20,
  height: 20,
  backgroundColor: '#fff',
  transform: [{ rotate: '45deg' }],
  borderRightWidth: 1,
  borderBottomWidth: 1,
  borderColor: '#ddd',
},
  centered: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginBottom: 10,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 10,
    width: '100%',
  },
  menuButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
    elevation: 5,
  },
  menuButtonText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  calloutContainer: {
    width: 220,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  calloutRating: {
    fontSize: 14,
    marginBottom: 6,
  },
  calloutText: {
    fontSize: 13,
    marginBottom: 10,
  },
  detailsButton: {
    backgroundColor: '#222',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalRating: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 15,
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 16,
    lineHeight: 20,
  },
  modalButton: {
    marginTop: 8,
  },
    userMarker: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#3498db',
    borderWidth: 3,
    borderColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    },

    userInnerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ffffff',
    },
});
