import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

// /// REDUX
import { useSelector } from 'react-redux';
import { State } from '../../../state';

import { 
    Container,
    WrapCentral,
    Texto1,
    Bold,

} from './styles';
import { Cabecalho } from '../../../components/Cabecalho';
import { SafeAreaView } from 'react-native-safe-area-context';
import { versaoAPP } from '../../../global/parametros';

export function SobreAPP(){
    
    const navigation = useNavigation();
    const route = useRoute();
    const [refreshing, setRefresh] = useState(false);

    const userState = useSelector((state: State) => state.user);

    return(
<SafeAreaView style={{flex: 1, backgroundColor: '#63C2D1'}}>
    <Container >
 
        <Cabecalho titulo="Sobre o APP" onPress={()=> navigation.goBack() } />


        <WrapCentral>

            <Texto1>Olá, <Bold>{userState.name}</Bold>!</Texto1>
            <Texto1>Seja bem vindo(a) ao Fisio Evolui, versão {versaoAPP} - Beta</Texto1>
            <Texto1>Esse aplicativo foi desenvolvido para ajudar os profissionais da Área de Fisioterapia, como o APP ainda está em desenvolvimento,
                ainda temos correções e ajustes a serem feitos, caso você tenha algum tipo de problema ao utilizar o APP, ou até mesmo tenha ideias e/ou sujestões,
                entre em contato pelo email: <Bold>suporte@fisioevolui.com.br</Bold>
            </Texto1>
            <Texto1></Texto1>
      
        </WrapCentral>
      
           
           

    </Container>
</SafeAreaView>
    )
}