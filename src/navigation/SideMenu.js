import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default function SideMenu({
  visible,
  onClose,
  onGoHome,
  onRefresh,
  onSearch,
}) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.sidebar}>
        <Text style={styles.title}>NearBites</Text>

        <View style={styles.button}>
          <Button title="Volver al inicio" onPress={onGoHome} />
        </View>

        <View style={styles.spacer} />

        <Text style={styles.menuText}>Menú Opciones</Text>

        <View style={styles.bottomButtons}>
          <View style={styles.button}>
            <Button title="Refresh" onPress={onRefresh} />
          </View>

          <View style={styles.button}>
            <Button title="Buscar" onPress={onSearch} />
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.closeArea} onPress={onClose} />
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
    marginBottom: 20,
  },
  menuText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 40,
  },
  button: {
    marginVertical: 8,
  },
  spacer: {
    height: 60,
  },
  bottomButtons: {
    marginTop: 'auto',
    marginBottom: 30,
  },
});