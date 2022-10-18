import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { PacientePerfil } from '../screens/Paciente/Perfil';
import { PacienteAtendimento } from '../screens/Paciente/Atendimento';
import { ListInfosPaciente } from '../screens/Paciente/ListInfosPaciente';
import { EditPacienteInfos } from '../screens/Paciente/EditPacienteInfos';
import { EditarPaciente } from '../screens/Paciente/PerfilEdit'; 

import { Toasts } from '@backpackapp-io/react-native-toast';

const Stack = createStackNavigator();

export default function HomeStack(){
    return(
    <>
        <Toasts />

        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }} >   
            <Stack.Group>
                <Stack.Screen name="Home2"               component={Home}                options={{headerShown:false}} /> 
                <Stack.Screen name="PacientePerfil"      component={PacientePerfil}      options={{headerShown:false}}  />
                <Stack.Screen name="PacienteAtendimento" component={PacienteAtendimento} options={{headerShown:false}}  />
                <Stack.Screen name="ListaInfosPaciente"  component={ListInfosPaciente}   options={{headerShown:false}}  />
                <Stack.Screen name="EditPacienteInfos"   component={EditPacienteInfos}   options={{headerShown:false}}  />
                <Stack.Screen name="EditarPaciente"      component={EditarPaciente}      options={{headerShown:false}}  />
            </Stack.Group>
        </Stack.Navigator>

    </>
    );
};
