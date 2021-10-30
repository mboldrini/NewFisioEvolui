import React from 'react';
import AppLoading from 'expo-app-loading';
import {ThemeProvider} from 'styled-components';
import {NavigationContainer} from '@react-navigation/native';

import theme from './src/global/styles/theme';

import { Loading } from './src/screens/Loading';

import MainStack from './src/stacks/Mainstack';

export default () => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <MainStack/>
      </NavigationContainer>
      </ThemeProvider>
  );
}


