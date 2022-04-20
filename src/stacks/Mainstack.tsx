import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {Loading} from '../screens/Loading/';
// import MainTab from '../stacks/Maintab';
import Rotas from '../stacks/Rotas';
import { PacientePerfil } from '../screens/Paciente/Perfil';
import { SignIn } from '../screens/Login/SignIn';
import { SignUp } from '../screens/Login/SignUp';

import { ModalLoading } from '../components/Modal/ModalLoading';

const Stack = createStackNavigator();

export default () => (
        <Stack.Navigator
            initialRouteName="SignIn"
            screenOptions={{
                headerShown: false
            }}
        >   
            <Stack.Group>
                <Stack.Screen name="Loading" component={Loading} options={{headerShown:false}} /> 
                <Stack.Screen name="MainTab" component={Rotas}/> 
                <Stack.Screen name="PacientePerfil" component={PacientePerfil} />
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
            </Stack.Group>

            {/* <Stack.Group screenOptions={{ presentation: 'modal', animationEnabled: true, }}>
                <Stack.Screen name="ModalLoading" component={ModalLoading} />
            </Stack.Group> */}

        </Stack.Navigator>

);
