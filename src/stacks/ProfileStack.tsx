import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Profile } from '../screens/Configs/Profile';
import { ConfiguracoesPessoais } from '../screens/Configs/ConfiguracoesPessoais';
import { ListarFormasPagamento } from '../screens/Configs/FormasPagamento/ListarFormasPagamento';
import { FormaPagamento } from '../screens/Configs/FormasPagamento/FormaPagamento';
import { ListarTiposAtendimento } from '../screens/Configs/TiposAtendimento/ListarTiposAtendimento';
import { SobreAPP } from '../screens/Configs/SobreApp';

import { Toasts } from '@backpackapp-io/react-native-toast';

const Stack = createStackNavigator();

import { DiaHoraTrabalho } from '../screens/Configs/DiaHoraTrabalho';

export default function ProfileStack(){
    return(
    <>
        <Toasts />
       
        <Stack.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }} >   
            <Stack.Group>
                <Stack.Screen name="Profile" component={Profile} options={{headerShown:false}} /> 
                <Stack.Screen name="ConfiguracoesPessoais" component={ConfiguracoesPessoais} options={{headerShown:false}} /> 

                <Stack.Screen name="ListarFormasPagamento" component={ListarFormasPagamento} options={{headerShown:false}} /> 
                <Stack.Screen name="FormaPagamento" component={FormaPagamento} options={{headerShown:false}} /> 

                <Stack.Screen name="ListarTiposAtendimento" component={ListarTiposAtendimento} options={{headerShown:false}} /> 

                <Stack.Screen name="DiaHoraTrabalho" component={DiaHoraTrabalho} options={{headerShown:false}} /> 

                <Stack.Screen name="SobreAPP" component={SobreAPP} options={{headerShown:false}} /> 
            </Stack.Group>
        </Stack.Navigator>
    </>
    );
};
