import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {Loading} from '../screens/Loading/';
import MainTab from '../stacks/Maintab';
import { PacientePerfil } from '../screens/Paciente/Perfil';
import { Login } from '../screens/Login';

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
            headerShown: false
        }}
    >   
        <Stack.Screen name="Loading" component={Loading} options={{headerShown:false}} /> 
        <Stack.Screen name="MainTab" component={MainTab}/>
        <Stack.Screen name="PacientePerfil" component={PacientePerfil} />
        <Stack.Screen name="Login" component={Login} />

    </Stack.Navigator>
);
