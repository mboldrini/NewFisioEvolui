import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RefreshControl, ScrollView} from 'react-native';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import { State } from '../../../state';
import { 
    Container,
    WrapToast,
    WrapCentral,
    LoadingIcon,
    WrapTitle,
    Title,
    
    InfosGroup,
    WrapBtns,
    WrpBtn,
    Button,
    Icone,
    BtnText,
} from './styles';
import { Cabecalho } from '../../../components/Cabecalho';


export function ConfiguracoesPessoais(){
    
    const navigation = useNavigation();
    const [refreshing, setRefresh] = useState(false);

    const [loading, setLoading] = useState(true);
    
    const usrState = useSelector((state: State) => state.user);


    return(
<Container>
    <WrapToast>
            <Toast position={'top'}  autoHide={true} visibilityTime={6000} onPress={()=>Toast.hide()}/>
    </WrapToast>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{ console.log("ff") }}/> } 
         contentContainerStyle={{flexGrow: 1}}>

        <Cabecalho titulo="Configurações do APP" onPress={()=> navigation.goBack() } />

        <WrapCentral>

            <InfosGroup>
                <WrapTitle>
                    <Title>Horarios de Atendimento</Title>
                </WrapTitle>

                <WrapBtns>
                    <WrpBtn>
                        <Button>
                            <Icone name="hourglass-start"/>
                            <BtnText>08:00 AM</BtnText>
                        </Button>
                    </WrpBtn>
                    <WrpBtn>
                        <Button>
                            <Icone name="hourglass-end"/>
                            <BtnText>18:00 PM</BtnText>
                        </Button>
                    </WrpBtn>
                </WrapBtns>
            </InfosGroup>

            <InfosGroup>
                <WrapTitle>
                    <Title>Tempo de Atendimento</Title>
                </WrapTitle>

                <WrpBtn>
                    <Button>
                        <Icone name="clock"/>
                        <BtnText>00:45m</BtnText>
                    </Button>
                </WrpBtn>
            </InfosGroup>

            <InfosGroup>
                <WrapTitle>
                    <Title>Tempo de Deslocamento</Title>
                </WrapTitle>

                <WrpBtn>
                    <Button>
                        <Icone name="car"/>
                        <BtnText>00:15m</BtnText>
                    </Button>
                </WrpBtn>
            </InfosGroup>


        </WrapCentral>
    </ScrollView>
</Container>
    )
}