import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Profile } from '../screens/Configs/Profile';
import { ListarTiposAtendimentos } from '../screens/Configs/TiposAtendimentos/ListarTiposAtendimentos';
import { TipoAtendimento } from '../screens/Configs/TiposAtendimentos/TipoAtendimento';
import { ConfiguracoesPessoais } from '../screens/Configs/ConfiguracoesPessoais';


const Stack = createStackNavigator();

export default function ProfileStack(){
    return(
        <Stack.Navigator
            initialRouteName="Profile"
            screenOptions={{
                headerShown: false
            }}
        >   
            <Stack.Group>
                <Stack.Screen name="Profile" component={Profile} options={{headerShown:false}} /> 
                <Stack.Screen name="ListarTiposAtendimentos" component={ListarTiposAtendimentos} options={{headerShown:false}} /> 
                <Stack.Screen name="TipoAtendimento" component={TipoAtendimento} options={{headerShown:false}} /> 
                <Stack.Screen name="ConfiguracoesPessoais" component={ConfiguracoesPessoais} options={{headerShown:false}} /> 
            </Stack.Group>
        </Stack.Navigator>

    );
};
