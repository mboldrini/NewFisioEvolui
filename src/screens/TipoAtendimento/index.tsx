import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {RefreshControl} from 'react-native';
import Toast from 'react-native-toast-message';
import { 
    Container,
    WrapToast,
    ScrollView,
} from './styles';
import { Cabecalho } from '../../components/Cabecalho';

export function TipoAtendimento(){
    
    const navigation = useNavigation();
    const [refreshing, setRefresh] = useState(false);

    return(
        <Container>
          <WrapToast>
                <Toast position={'top'}  autoHide={true} visibilityTime={6000} onPress={()=>Toast.hide()}/>
            </WrapToast>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{ console.log("ff") }}/>}>

            <Cabecalho titulo="Tipos de Atendimentos" onPress={()=> navigation.goBack() } />

        </ScrollView>
        </Container>
    )
}