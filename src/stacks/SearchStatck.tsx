import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Toasts } from '@backpackapp-io/react-native-toast';
import { Search } from '../screens/Search';

const Stack = createStackNavigator();

export default function SearchStack(){
    return(
    <>
        <Toasts /> 

        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }} >   
            <Stack.Group>
                <Stack.Screen name="Search" component={Search} options={{headerShown:false}} /> 
            </Stack.Group>
        </Stack.Navigator>

    </>
    );
};
