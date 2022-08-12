import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { PacientePerfil } from '../screens/Paciente/Perfil';
import { PacienteAtendimento } from '../screens/Paciente/Atendimento';
import { ListInfosPaciente } from '../screens/Paciente/ListInfosPaciente';

const Stack = createStackNavigator();


import styled from "styled-components/native";
import Toast from 'react-native-toast-message';
const WrapToast = styled.View`
    z-index: 1;
`;

export default function HomeStack(){
    return(
    <>
        <WrapToast>
            <Toast position={'top'}  autoHide={true} visibilityTime={6000} onPress={()=>Toast.hide()} /*config={toastConfig}*/ />
        </WrapToast>

        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false
            }}
        >   
            <Stack.Group>
                <Stack.Screen name="Home2"               component={Home}                options={{headerShown:false}} /> 
                <Stack.Screen name="PacientePerfil"      component={PacientePerfil}      options={{headerShown:false}}  />
                <Stack.Screen name="PacienteAtendimento" component={PacienteAtendimento} options={{headerShown:false}}  />
                <Stack.Screen name="ListaInfosPaciente"  component={ListInfosPaciente}   options={{headerShown:false}}  />
            </Stack.Group>
        </Stack.Navigator>
    </>
    );
};
