import { useState } from 'react';
import * as Location from 'expo-location';




export default function useLocation() {


  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const getLocation = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permiso de ubicación denegado');
        return null;
      }

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setLocation(loc.coords);
      return loc.coords;
    } catch (error) {
      console.log(error);
      setErrorMsg('Error obteniendo ubicación');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const clearLocation = () => {
    setLocation(null);
  };

  return {
    location,
    errorMsg,
    loading,
    getLocation,
    clearLocation,
  };
}