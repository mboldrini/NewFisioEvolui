import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RefreshControl, ScrollView} from 'react-native';
/// Redux e States
import { useSelector } from 'react-redux';
import { State } from '../../../state';
/// Estetica
import { Cabecalho } from '../../../components/Cabecalho';
import { Button } from '../../../components/Buttons/Button/Index';
import { 
    Container,
    Wrap,
    BtnList,
    TituloList,
    WrapHoras,
    TextoBtn,
    WrapFooterCadastro,
    LoadingIcon,
 
} from './styles';
/// API
import { api } from '../../../global/api';

export function ConfiguracoesPessoais(){
    
    const navigation = useNavigation();
    const [refreshing, setRefresh] = useState(false);

    const [loading, setLoading] = useState(false);
    
    const usrState = useSelector((state: State) => state.user);

    ///Reducer
    const apiState = useSelector((state: State) => state.apiReducer);

    async function GetConfigs(){

        setLoading(true);
       
        await api(apiState.token).get('users/configs').then(res =>{
            
            console.log('Ok');
            console.log(res.data);       

        }).catch(err => {
            console.log("ERRO");
            console.log(err);
        });

        setLoading(false);
    }

    useEffect(()=>{
        GetConfigs();
    },[]);

    return(
<Container>
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{ console.log("ff") }}/> } contentContainerStyle={{flexGrow: 1}}>

        <Cabecalho titulo="Configurações do APP" onPress={()=> navigation.goBack() } />


        { loading &&
            <LoadingIcon size="large" color="#FFFFFF"/>            
        }

        { !loading &&
            <Wrap>

                <BtnList>
                    <TituloList>Início dos Atendimentos:</TituloList>
                    <WrapHoras>
                        <TextoBtn>
                            08:00 AM
                        </TextoBtn>
                    </WrapHoras>
                </BtnList>

                <BtnList>
                    <TituloList>Fim dos Atendimentos:</TituloList>
                    <WrapHoras>
                        <TextoBtn>18:00 PM</TextoBtn>
                    </WrapHoras>
                </BtnList>

                <BtnList>
                    <TituloList>Agendamento Retroativo:</TituloList>
                    <WrapHoras bool={false}>
                        <TextoBtn>Não</TextoBtn>
                    </WrapHoras>
                </BtnList>
                
                <BtnList>
                    <TituloList>Exibir notificaçõoes:</TituloList>
                    <WrapHoras bool={true}>
                        <TextoBtn>Sim</TextoBtn>
                    </WrapHoras>
                </BtnList>

                <BtnList>
                    <TituloList>Agendamentos ao início do dia:</TituloList>
                    <WrapHoras bool={true}>
                        <TextoBtn>Sim</TextoBtn>
                    </WrapHoras>
                </BtnList>
            
            </Wrap>
        }

        { !loading &&
            <WrapFooterCadastro>
                <Button 
                    title="Atualizar Informações" 
                    onPress={ () => { console.log('FF') }}
                    type="ok"
                />
            </WrapFooterCadastro>
        }
        
    </ScrollView>
</Container>
    )
}