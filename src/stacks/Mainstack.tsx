import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {Loading} from '../screens/Loading/';
import MainTab from '../stacks/Maintab';

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator
        initialRouteName="MainTab"
        screenOptions={{
            headerShown: false
        }}
    >   
        <Stack.Screen name="Loading" component={Loading} options={{headerShown:false}} /> 
        <Stack.Screen name="MainTab" component={MainTab}/>

    </Stack.Navigator>
);
