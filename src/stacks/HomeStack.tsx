import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { PacientePerfil } from '../screens/Paciente/Perfil';

const Stack = createStackNavigator();

export default function HomeStack(){
    return(
        <Stack.Navigator
            initialRouteName="SignIn"
            screenOptions={{
                headerShown: false
            }}
        >   
            <Stack.Group>
                <Stack.Screen name="Home"           component={Home}           options={{headerShown:false}} /> 
                <Stack.Screen name="PacientePerfil" component={PacientePerfil} options={{headerShown:false}}  />
            </Stack.Group>
        </Stack.Navigator>

    );
};
