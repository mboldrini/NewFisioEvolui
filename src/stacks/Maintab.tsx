import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CustomTabBar from '../components/CustomTabBar';

const {Navigator, Screen} = createBottomTabNavigator();

import { Home } from '../screens/Home';
import { Search } from '../screens/Search';
import { Appointments } from '../screens/Appointments';
import { CadastrarPaciente } from '../screens/CadastrarPaciente';
import { Profile } from '../screens/Profile';

export default () => (
    <Navigator
        screenOptions={{
            headerShown: false
        }}
        tabBar={
            props=><CustomTabBar {...props} /> 
        }
    >
        <Screen name="CadastrarPaciente" component={CadastrarPaciente} />

        <Screen name="Home" component={Home} />
        <Screen name="Search" component={Search} />
        <Screen name="Appointments" component={Appointments} />
        <Screen name="Profile" component={Profile} />

    </Navigator>
);
