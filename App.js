import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';

import { store } from './src/app/store';
import { Provider } from 'react-redux';


export default function App() {
  return (
    <>

      <Provider store={store}>

        <AppNavigator />
        <StatusBar style="auto" />

      </Provider>

    </>
  );
}