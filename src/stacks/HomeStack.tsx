import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { PacientePerfil } from '../screens/Paciente/Perfil';
import { PacienteAtendimento } from '../screens/Paciente/Atendimento';

const Stack = createStackNavigator();

export default function HomeStack(){
    return(
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false
            }}
        >   
            <Stack.Group>
                <Stack.Screen name="Home"                component={Home}                options={{headerShown:false}} /> 
                <Stack.Screen name="PacientePerfil"      component={PacientePerfil}      options={{headerShown:false}}  />
                <Stack.Screen name="PacienteAtendimento" component={PacienteAtendimento} options={{headerShown:false}}  />
            </Stack.Group>
        </Stack.Navigator>

    );
};
