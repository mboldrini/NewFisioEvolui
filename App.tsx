import React from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  Poppins_300Light,
} from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme';
import MainStack from './src/stacks/Mainstack';

import { AuthProvider } from './src/hooks/auth';

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

        <AuthProvider> 
          <MainStack/>
        </AuthProvider>

      </NavigationContainer>
    </ThemeProvider>
  );
}


