import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {FlatList, RefreshControl, ScrollView} from 'react-native';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import { State } from '../../../../state';
import { 
    Container,
    WrapToast,
    // ScrollView,
    WrapCentral,
    WrapItens,
    LoadingIcon,
    WrapSemAtendimentos,
    AvisoSemAtendimentos,
    WrapBtnCadastro
} from './styles';
import { Cabecalho } from '../../../../components/Cabecalho';

import { api } from '../../../../global/api';
import { TipoAtendimentoList } from '../../../../components/TipoAtendimentoList';
import { Button } from '../../../../components/Buttons/Button/Index';

interface IListaTipos{
    id: number,
    nome: string,
    valor: number,
    descricao: string
}

export function ListarTiposAtendimentos(){
    
    const navigation = useNavigation();
    const [refreshing, setRefresh] = useState(false);

    const [loading, setLoading] = useState(true);
    
    const usrState = useSelector((state: State) => state.user);

    const [listaTipos, setListaTipos] = useState<IListaTipos[]>([]);


    async function GetListaAtendimentos(){

        setListaTipos([]);
        setLoading(true);
       
        await api(usrState.token).get('tipoAtendimento/all').then(res =>{

            console.log("Ok?");
            console.log(res.data);

            setListaTipos(res.data);

        }).catch(err => {
            console.log("ERRO");
            console.log(err);
            Toast.show({
                type: 'error',
                text1: '⚠️ Erro ao obter lista de atendimentos',
            });
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

        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{ GetListaAtendimentos() }}/> } 
         contentContainerStyle={{flexGrow: 1}}>

            <Cabecalho titulo="Tipos de Atendimentos" onPress={()=> navigation.goBack() } />

            <WrapCentral>

            <WrapItens>

                { listaTipos &&
                    <FlatList 
                        data={listaTipos}
                        keyExtractor={(item) => item.nome}
                        renderItem={({item}) =>(
                            <TipoAtendimentoList 
                                valor={item.valor} 
                                nome={item.nome} 
                                onPress={()=> navigation.navigate('TipoAtendimento' as never, { id: item.id } as never) }  
                            />
                        )}
                    />
                }

                { loading &&
                    <LoadingIcon size="large" color="#FFFFFF"/>            
                }

                { !loading && listaTipos.length < 1 &&
                    <WrapSemAtendimentos>
                        <AvisoSemAtendimentos>Nenhum atendimento cadastrado</AvisoSemAtendimentos>
                    </WrapSemAtendimentos>
                }

            </WrapItens>
            
            <WrapBtnCadastro>
                <Button 
                    title="Cadastrar Atendimento" 
                    onPress={()=> navigation.navigate('TipoAtendimento' as never, { id: null } as never ) }
                    type="ok"
                />
            </WrapBtnCadastro>

            </WrapCentral>
        </ScrollView>
        </Container>
    )
}