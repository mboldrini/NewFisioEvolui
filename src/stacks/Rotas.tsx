import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { View } from 'react-native';

import { Agenda } from '../screens/Agenda';
import { CadastrarPaciente } from '../screens/CadastrarPaciente';

import { Ionicons } from '@expo/vector-icons';

import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';
import SearchStack from './SearchStatck';

const {Navigator, Screen} = createBottomTabNavigator();

export default function Rotas(){
    return(
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarActiveTintColor: '#FFFFFF',
                tabBarInactiveTintColor: '#a6d6df',
                tabBarShowLabel: false,
                tabBarStyle:{
                    backgroundColor: '#4EADBE',
                    height: 60,
                }                
            }}    
            initialRouteName="Search"       
        >

            <Screen 
                name="Home" 
                component={HomeStack} 
                options={{
                    tabBarIcon: (({size, color}) => (
                        <Ionicons 
                            name="home"
                            size={size}
                            color={color}
                        />                      
                    ))
                }}
            />
            
            <Screen 
                name="Search" 
                component={SearchStack} 
                options={{
                    tabBarIcon: (({size, color}) => (
                        <Ionicons 
                            name="search-sharp"
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />

            <Screen 
                name="Agenda" 
                component={Agenda} 
                options={{
                    tabBarIcon: (({size, color}) => (
                        <View style={{
                            height: 65,
                            width: 65,
                            borderRadius: 50,
                            backgroundColor: '#ffffff',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 3,
                            borderColor: '#4EADBE',
                            marginTop: -18
                        }}>
                          <Ionicons 
                            name="calendar-sharp"
                            size={size+8}
                            color={'#4EADBE'}
                        />
                        </View>
                        
                    ))
                }}
            />

            <Screen 
                name="CadastrarPaciente" 
                component={CadastrarPaciente} 
                options={{
                    tabBarIcon: (({size, color}) => (
                        <Ionicons 
                            name="person-add-sharp"
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />

            <Screen 
                name="Profile" 
                component={ProfileStack} 
                options={{
                    tabBarIcon: (({size, color}) => (
                        <Ionicons 
                            name="apps"
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />
        </Navigator>

    );
}
