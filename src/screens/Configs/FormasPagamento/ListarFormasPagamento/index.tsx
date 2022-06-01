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
    WrapBtnCadastro,

    TipoPagamentoList,
    WrapText,
    NomeTipoPagamento,
    Descricao,

    WrapIcone,
    Icone
} from './styles';
import { Cabecalho } from '../../../../components/Cabecalho';

import { api } from '../../../../global/api';
import { RoundButton } from '../../../../components/Buttons/RoundButton/Index';

interface IListaTipos{
    id: number,
    paymentMethod_name: string,
    description: string,
    paymentMethod_id: number,
    created_at: string,
    updated_at: string,    
}

export function ListarFormasPagamento(){
    
    const navigation = useNavigation();
    const [refreshing, setRefresh] = useState(false);

    const [loading, setLoading] = useState(true);
    
    const usrState = useSelector((state: State) => state.user);
    const apiState = useSelector((state: State) => state.apiReducer);

    const [listaTipos, setListaTipos] = useState<IListaTipos[]>([]);


    async function GetListaAtendimentos(){

        setListaTipos([]);
        setLoading(true);
       
        await api(apiState.token).get('paymentmethod/user/all').then(res =>{

            console.log("Ok?");
            console.log(res.data);

            setListaTipos(res.data);

        }).catch(err => {
            console.log("ERRO");
            console.log(err);
            Toast.show({
                type: 'error',
                text1: '⚠️ Erro ao obter lista de formas de pagamento',
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

        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{ console.log("Deu refresh") /*GetListaAtendimentos()*/ }}/> } 
         contentContainerStyle={{flexGrow: 1}}>

            <Cabecalho titulo="Formas de Pagamento" onPress={()=> navigation.goBack() } />

            <WrapCentral>

            <WrapItens>

                { listaTipos &&
                    <FlatList 
                        data={listaTipos}
                        keyExtractor={(item) => item.paymentMethod_name}
                        renderItem={({item}) =>(
                            <TipoPagamentoList>
                                <WrapText>
                                    <NomeTipoPagamento numberOfLines={1} ellipsizeMode="tail">{ item.paymentMethod_name }</NomeTipoPagamento>
                                    <Descricao numberOfLines={1} ellipsizeMode="tail" >{ item.description }</Descricao>
                                </WrapText>
                                <WrapIcone onPress={()=> console.log(item.paymentMethod_name)}>
                                    <Icone name="ellipsis-v"/>
                                </WrapIcone>
                            </TipoPagamentoList>
                        )}
                    />
                }

                { loading &&
                    <LoadingIcon size="large" color="#FFFFFF"/>            
                }

                { !loading && listaTipos.length < 1 &&
                    <WrapSemAtendimentos>
                        <AvisoSemAtendimentos>Nenhuma forma de pagamento cadastrada </AvisoSemAtendimentos>
                    </WrapSemAtendimentos>
                }

            </WrapItens>
            
            <WrapBtnCadastro>
                <RoundButton 
                    onPress={()=> console.log("FF") /*navigation.navigate('TipoAtendimento' as never, { id: null } as never )*/ }
                    type="ok"
                />
            </WrapBtnCadastro>

            </WrapCentral>
        </ScrollView>
        </Container>
    )
}