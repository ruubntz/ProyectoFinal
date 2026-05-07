import {
  useState,
  useEffect,
} from 'react';

import {
  StyleSheet,
  View,
  Button,
  Text,
  TouchableOpacity,
} from 'react-native';

import MapView, {
  Marker,
} from 'react-native-maps';

import useLocation from '../hooks/useLocation';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import SideMenu from '../navigation/SideMenu';

// 📦 Base de datos fallback
import restaurantsData from '../data/restaurantes';

export default function MapScreen({
  navigation,
  route,
}) {

  const [menuVisible, setMenuVisible] =
    useState(false);

  const [selectedRestaurant, setSelectedRestaurant] =
    useState(null);

  const {
    location,
    errorMsg,
    loading,
    getLocation,
  } = useLocation();

  // 🍔 Restaurantes recibidos
  const restaurants =
    route?.params?.restaurants ||
    restaurantsData;

  // 🚀 Obtener ubicación
  useEffect(() => {

    getLocation();

  }, []);

  // ⏳ Esperar ubicación
  if (!location) {

    return (
      <LoadingOverlay
        text="Obteniendo ubicación..."
      />
    );

  }

  // 🗺️ Región inicial
  const mapRegion = {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  };

  // 🏠 Inicio
  const handleGoHome = () => {

    setMenuVisible(false);

    navigation.navigate('Welcome');

  };

  // 🔄 Refresh
  const handleRefresh = () => {

    setMenuVisible(false);

    getLocation();

  };

  // 🔍 Search
  const handleSearch = () => {

    setMenuVisible(false);

    navigation.navigate('Search');

  };

  // 📄 Abrir detalles
  const handleOpenDetails = () => {

    if (!selectedRestaurant) {
      return;
    }

    navigation.navigate(
      'Detail',
      {
        restaurant:
          selectedRestaurant,
      }
    );

  };

  return (
    <View style={styles.container}>

      {/* 🗺️ MAPA */}
      <MapView
        style={StyleSheet.absoluteFillObject}
        region={mapRegion}
        onPress={() => {

          setSelectedRestaurant(null);

        }}
      >

        {/* 📍 Usuario */}
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

        {/* 🍔 Restaurantes */}
        {restaurants.map((restaurant) => (

          <Marker
            key={restaurant.id}
            coordinate={{
              latitude: restaurant.latitude,
              longitude: restaurant.longitude,
            }}
            onPress={(e) => {

              e.stopPropagation();

              setSelectedRestaurant(
                restaurant
              );

            }}
          />

        ))}

      </MapView>

      {/* 💬 POPUP */}
      {selectedRestaurant && (

        <TouchableOpacity activeOpacity={1}>

          <View style={styles.restaurantBubble}>

            <Text style={styles.bubbleTitle}>
              {selectedRestaurant.name}
            </Text>

            <Text style={styles.bubbleRating}>
              ⭐ {selectedRestaurant.rating} / 5
            </Text>

            <Text style={styles.bubbleText}>
              {selectedRestaurant.address}
            </Text>

            <View style={styles.bubbleButtons}>

              <Button
                title="Detalles"
                onPress={handleOpenDetails}
              />

              <Button
                title="Cerrar"
                onPress={() =>
                  setSelectedRestaurant(null)
                }
              />

            </View>

            <View style={styles.bubbleArrow} />

          </View>

        </TouchableOpacity>

      )}

      {/* ☰ MENÚ */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() =>
          setMenuVisible(true)
        }
      >

        <Text style={styles.menuButtonText}>
          ☰
        </Text>

      </TouchableOpacity>

      <SideMenu
        visible={menuVisible}
        onClose={() =>
          setMenuVisible(false)
        }
        onGoHome={handleGoHome}
        onRefresh={handleRefresh}
        onSearch={handleSearch}
      />

      {/* ⏳ LOADING */}
      {loading && (
        <LoadingOverlay
          text="Actualizando ubicación..."
        />
      )}

      {/* ❌ ERROR */}
      {errorMsg && (
        <View style={styles.errorContainer}>

          <Text style={styles.errorText}>
            {errorMsg}
          </Text>

        </View>
      )}

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

  errorContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#ffdddd',
    padding: 12,
    borderRadius: 12,
  },

  errorText: {
    color: '#aa0000',
    textAlign: 'center',
  },

});