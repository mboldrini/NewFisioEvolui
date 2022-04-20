import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { View } from 'react-native';

import { Home } from '../screens/Home';
import { Search } from '../screens/Search';
import { Agenda } from '../screens/Agenda';
import { CadastrarPaciente } from '../screens/CadastrarPaciente';
import { Profile } from '../screens/Profile';

import { Ionicons } from '@expo/vector-icons';

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
        >

            <Screen 
                name="Home" 
                component={Home} 
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
                component={Search} 
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
                        // <Ionicons 
                        //     name="calendar-sharp"
                        //     size={size+10}
                        //     color={color}
                        // />
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

                            // border-radius: 50px;
                            // border: 3px solid ${({theme}) => theme.colors.secondary};
                            // margin-top: ${RFValue(-18)}px;

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
                component={Profile} 
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
