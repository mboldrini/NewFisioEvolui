import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Profile } from '../screens/Configs/Profile';
import { ConfiguracoesPessoais } from '../screens/Configs/ConfiguracoesPessoais';
import { ListarFormasPagamento } from '../screens/Configs/FormasPagamento/ListarFormasPagamento';
import { FormaPagamento } from '../screens/Configs/FormasPagamento/FormaPagamento';
import { ListarTiposAtendimento } from '../screens/Configs/TiposAtendimento/ListarTiposAtendimento';


const Stack = createStackNavigator();


import styled from "styled-components/native";
import Toast from 'react-native-toast-message';
import { DiaHoraTrabalho } from '../screens/Configs/DiaHoraTrabalho';
// import { View, Text } from 'react-native';

const WrapToast = styled.View`
    z-index: 1;
`;

// const toastConfig = {
//     'success': (internalState: any) => (
//       <View style={{ borderLeftColor: 'pink' }}>
//         <Text>{internalState.text1}</Text>
//       </View>  
//     )
//   }


export default function ProfileStack(){
    return(
    <>

        <WrapToast>
            <Toast position={'top'}  autoHide={true} visibilityTime={6000} onPress={()=>Toast.hide()} /*config={toastConfig}*/ />
        </WrapToast>

        <Stack.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }} >   
            <Stack.Group>
                <Stack.Screen name="Profile" component={Profile} options={{headerShown:false}} /> 
                <Stack.Screen name="ConfiguracoesPessoais" component={ConfiguracoesPessoais} options={{headerShown:false}} /> 

                <Stack.Screen name="ListarFormasPagamento" component={ListarFormasPagamento} options={{headerShown:false}} /> 
                <Stack.Screen name="FormaPagamento" component={FormaPagamento} options={{headerShown:false}} /> 

                <Stack.Screen name="ListarTiposAtendimento" component={ListarTiposAtendimento} options={{headerShown:false}} /> 

                <Stack.Screen name="DiaHoraTrabalho" component={DiaHoraTrabalho} options={{headerShown:false}} /> 
            </Stack.Group>
        </Stack.Navigator>
    </>
    );
};
