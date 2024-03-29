import React from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';


import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  Poppins_300Light,
} from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme';
import MainStack from './src/stacks/Mainstack';

import { Provider } from 'react-redux';
import {store, persistor} from './src/state';
import { PersistGate } from 'redux-persist/integration/react';

export default () => {
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if(!fontsLoaded){
    return <AppLoading/>
  }


  return (
  <ThemeProvider theme={theme}>
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainStack/>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  </ThemeProvider>
  );
}


