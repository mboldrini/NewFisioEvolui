import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Search } from '../screens/Search';


const Stack = createStackNavigator();


import styled from "styled-components/native";
import Toast from 'react-native-toast-message';
import { toastConfig } from '../global/toastConfig';
const WrapToast = styled.View`
    z-index: 1;
`;



export default function SearchStack(){
    return(
    <>
        <WrapToast>
            <Toast position={'top'}  autoHide={true} visibilityTime={6000} onPress={()=>Toast.hide()} config={toastConfig} />
        </WrapToast>

        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }} >   
            <Stack.Group>
                <Stack.Screen name="Search" component={Search} options={{headerShown:false}} /> 
            </Stack.Group>
        </Stack.Navigator>

    </>
    );
};
