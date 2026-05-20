import { signOut, } from 'firebase/auth';
import { auth, } from '../services/firebase';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';



export default function SideMenu({ visible, onClose, onGoHome, onSearch, }) {

  if (!visible) { return null; }

  //  Logout / Salir
  const handleLogout = async () => {

    try {

      //  Usuario logeado
      if (auth.currentUser) {

        await signOut(auth);

      }

      //  Volver al inicio
      onGoHome();

    } catch (error) {

      console.log(
        'ERROR LOGOUT:',
        error
      );

    }

  };

  return (

    <View style={styles.overlay}>

      {/* 📦 Sidebar */}
      <View style={styles.sidebar}>

        {/* 🟣 Title */}
        <Text style={styles.title}>
          NearBites
        </Text>

        {/* 🔘 Center buttons */}
        <View style={styles.centerButtons}>

          {/* 🔍 Buscar */}
          <TouchableOpacity
            style={styles.menuButton}
            onPress={onSearch}
          >

            <Text style={styles.menuButtonText}>
              Volver a búsqueda
            </Text>

          </TouchableOpacity>

          {/* 🚪 Logout / Salir */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >

            <Text style={styles.logoutButtonText}>
              Salir
            </Text>

          </TouchableOpacity>

        </View>

      </View>

      {/* ❌ Close area */}
      <TouchableOpacity
        style={styles.closeArea}
        onPress={onClose}
      />

    </View>

  );

}

const styles = StyleSheet.create({

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    zIndex: 10,
  },

  sidebar: {
    width: 260,
    height: '100%',
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 16,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },

  closeArea: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  centerButtons: {
    flex: 1,
    justifyContent: 'center',
  },

  menuButton: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },

  menuButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  logoutButton: {
    backgroundColor: '#ff3b30',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

});