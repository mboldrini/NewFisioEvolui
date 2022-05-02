import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {FlatList, RefreshControl} from 'react-native';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import { State } from '../../../state';
import { 
    Container,
    WrapToast,
    ScrollView,
    WrapItens,
    LoadingIcon
} from './styles';
import { Cabecalho } from '../../../components/Cabecalho';

import { api } from '../../../global/api';
import { TipoAtendimentoList } from '../../../components/TipoAtendimentoList';

interface IListaTipos{
    id: number,
    nome: string,
    valor: number,
    descricao: string
}

export function TipoAtendimento(){
    
    const navigation = useNavigation();
    const [refreshing, setRefresh] = useState(false);

    const [loading, setLoading] = useState(true);
    
    const usrState = useSelector((state: State) => state.user);

    const [listaTipos, setListaTipos] = useState<IListaTipos[]>([]);


    async function GetListaAtendimentos(){
        await api(usrState.token).get('tipoAtendimento/all').then(res =>{

            setLoading(true);
           
            console.log("Ok?");
            console.log(res.data);

            setListaTipos(res.data);

        }).catch(err => {
            console.log("ERRO");
            console.log(err);
        });

        setLoading(false);
    }

    useEffect(()=>{
        GetListaAtendimentos();
    },[]);

    return(
        <Container>
        <WrapToast>
            <Toast position={'top'}  autoHide={true} visibilityTime={6000} onPress={()=>Toast.hide()}/>
        </WrapToast>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{ GetListaAtendimentos() }}/>}>

            <Cabecalho titulo="Tipos de Atendimentos" onPress={()=> navigation.goBack() } />

            <WrapItens>

                { listaTipos &&
                    <FlatList 
                        data={listaTipos}
                        keyExtractor={(item) => item.nome}
                        renderItem={({item}) =>(
                            <TipoAtendimentoList 
                                valor={item.valor} 
                                nome={item.nome} 
                                onPress={()=> console.log(item.nome)}  
                            />
                        )}
                    />
                }

                { loading &&
                    <LoadingIcon size="large" color="#FFFFFF"/>            
                }
             
            </WrapItens>

        </ScrollView>
        </Container>
    )
}