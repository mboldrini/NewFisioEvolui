import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {Loading} from '../screens/Loading/';
import MainTab from '../stacks/Maintab';
import { PacientePerfil } from '../screens/Paciente/Perfil';
import { SignIn } from '../screens/Login/SignIn';
import { SignUp } from '../screens/Login/SignUp';

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{
            headerShown: false
        }}
    >   
        <Stack.Screen name="Loading" component={Loading} options={{headerShown:false}} /> 
        <Stack.Screen name="MainTab" component={MainTab}/>
        <Stack.Screen name="PacientePerfil" component={PacientePerfil} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />

    </Stack.Navigator>
);
