import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CustomTabBar from '../components/CustomTabBar';

const {Navigator, Screen} = createBottomTabNavigator();

import { Home } from '../screens/Home';
import { Search } from '../screens/Search';
import { Agenda } from '../screens/Agenda';
import { CadastrarPaciente } from '../screens/CadastrarPaciente';
import { Profile } from '../screens/Profile';



import { PacientePerfil } from '../screens/Paciente/Perfil';

export default () => (
    <Navigator
        screenOptions={{
            headerShown: false
        }}
        tabBar={
            props=><CustomTabBar {...props} /> 
        }
    >

        <Screen name="Search" component={PacientePerfil} />

        <Screen name="Agenda" component={Agenda} />
        <Screen name="Home" component={Home} />
        <Screen name="CadastrarPaciente" component={CadastrarPaciente} />
        <Screen name="Profile" component={Profile} />


    </Navigator>
);
