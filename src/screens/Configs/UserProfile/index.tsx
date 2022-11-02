import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert, RefreshControl, ScrollView } from 'react-native';
import { toast } from '@backpackapp-io/react-native-toast';

// /// REDUX
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators, State } from '../../../state';

import { 
    Container,
    WrapCentral,
    WrapItens,
    LoadingIcon,

    Wrap,
    
    ContentCreated,
    WrapCreated,
    TitleCreated,
    DateCreated,
    WrapFooterCadastro,
    WrapExpandTitle,
    ExpandableTitle,

    WrapGroup,
    Title,
    Spacer
 


} from './styles';
import { Cabecalho } from '../../../components/Cabecalho';

import { api } from '../../../global/api';
/// Input's
// import { InputForm } from '../../../components/Forms/InputForm';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button } from '../../../components/Buttons/Button/Index';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { InputMasked } from '../../../components/Forms/InputMasked';
// import { InputFake } from '../../../components/Forms/InputFake';
import { PacienteHeader } from '../../../components/PacienteHeader';
import { WrapInfosProfile } from '../../../components/Wraps/WrapInfosProfile';
import { CabecalhoMenu } from '../../../components/CabecalhoMenu';
import { InputForm } from '../../../components/Forms/InputForm';
import { InputMasked } from '../../../components/Forms/InputMasked';

interface IRouteParam{
    id?: number;
}

interface IPayment{
    id: number;
    paymentMethod_name: string;
    description: string;
    paymentMethod_id: number;
    updated_at: string;
    created_at: string;
}

interface IUserInfos{
    celphone: string;
    created_at: Date;
    description: string;
    instagram: string;
    professional_mail: string;
    second_celphone:string;
    tiktok: string;
    twitter: string;
    updated_at: Date;
    website: string;
}

const schema = Yup.object().shape({
    formaPagamento: Yup.string().required("Nome é obrigatório"),
    descricao: Yup.string().optional(),
});

export function UserProfile(){
    
    const navigation = useNavigation();
    const route = useRoute();
    const [refreshing, setRefresh] = useState(false);

    const [loading, setLoading] = useState(true);

    /// Redux
    const apiState = useSelector((state: State) => state.apiReducer);
    const usrState = useSelector((state: State) => state.user);


    /// Informações do usuário
    const [userInfos, setUserInfos] = useState<IUserInfos>(null);

    /// Menu do Cabeçalho
    const [menuEscolhido, setMenuEscolhido] = useState(null);
    const listaMenuPerfil = [
        { title: 'Editar Informações', slug:'editar', icone: 'edit', }, 
    ]

    /// Vai Editar ou Não
    const [editInfos, setEditInfos] = useState(false);

    /// Formulário de Edição
    const { control, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) });

    
    async function GetPacienteInfos(){
        console.group("GetPacienteInfos");

        await api(apiState.token).get('/users/infos' ).then(res => {

            console.log(res.data);

            setUserInfos(res.data);

            setLoading(false);

        }).catch(err => {
            console.log(err);

            toast.error('Ops! Erro ao obter as informações do perfil.', {duration: 3000, icon: '❌'});

        });

        console.groupEnd();
    }

    useEffect(()=>{
        GetPacienteInfos();
    },[]);

    useEffect(()=>{
        console.log("MenuEscolhido: "+ menuEscolhido);
        if(menuEscolhido == 'editar'){
            setEditInfos(!editInfos);
            setMenuEscolhido(null);
        }
    },[menuEscolhido]);


    return(
<SafeAreaView style={{flex: 1, backgroundColor: '#63C2D1'}}>
    <Container >
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{ GetPacienteInfos(); }}/> } 
         contentContainerStyle={{flexGrow: 1}}>

        <CabecalhoMenu titulo='Meu Perfil' onPress={()=> navigation.goBack() } setMenuEscolhido={setMenuEscolhido} menuList={listaMenuPerfil} />

        <WrapCentral>

            <WrapItens>
                { loading && <LoadingIcon size="large" color="#FFFFFF"/> }
            </WrapItens>

            { !loading && userInfos?.professional_mail && !editInfos &&
            <Wrap>

                <PacienteHeader iconeTipo="hospital" tipo='Fisioterapeuta' nome={usrState.name} />

                <WrapGroup>
                    <Title>Informações Pessoais / Contato</Title>

                    <Spacer/>

                    <WrapInfosProfile icone='envelope' title='Email' info={userInfos.professional_mail } />

                    <WrapInfosProfile icone='whatsapp' title='Celular / Whatsapp' info={userInfos.celphone } />

                    <WrapInfosProfile icone='phone-square' title='Celular' info={userInfos.second_celphone } />

                    <WrapInfosProfile icone='id-card' title='Website' info={userInfos.website } />

                    <WrapInfosProfile icone='instagram' title='Instagram' info={ userInfos.instagram } />

                    <WrapInfosProfile icone='twitter' title='Twitter' info={ userInfos.twitter } />

                    <WrapInfosProfile icone='tiktok' title='Tiktok' info={ userInfos.tiktok } />

                </WrapGroup>

            </Wrap>
            }

            { !loading && editInfos &&
            <Wrap>

                <InputForm name="email" control={control} placeholder="Email" autoCorrect={false}
                    error={errors.email && errors.email.message}
                />

                <InputMasked
                    name="whatsapp"
                    control={control}
                    placeholder="Whatsapp/Celular"
                    error={errors.whatsapp && errors.whatsapp.message}
                    type="cel-phone"
                    options={{
                        maskType: 'BRL',
                        withDDD: true,
                        dddMask: '(99) '
                    }}
                />

                <InputMasked
                    name="celular"
                    control={control}
                    placeholder="Celular"
                    error={errors.celular && errors.celular.message}
                    type="cel-phone"
                    options={{
                        maskType: 'BRL',
                        withDDD: true,
                        dddMask: '(99) '
                    }}
                />

                <InputForm name="website" control={control} placeholder="Website" autoCorrect={false}
                    error={errors.website && errors.website.message}
                />

                <InputForm name="instagram" control={control} placeholder="Instagram" autoCorrect={false}
                    error={errors.instagram && errors.instagram.message}
                />


                <InputForm name="twitter" control={control} placeholder="Twitter" autoCorrect={false}
                    error={errors.twitter && errors.twitter.message}
                />
                
                <InputForm name="tiktok" control={control} placeholder="Tiktok" autoCorrect={false}
                    error={errors.tiktok && errors.tiktok.message}
                />

            </Wrap>
            }

            { !loading && editInfos &&
            <WrapFooterCadastro>
                <Button 
                    title="Salvar" 
                    // onPress={handleSubmit((d) =>  HandleRegister(d as any) )}
                    onPress={()=> { console.log("ué")}}
                    type="ok"
                />
            </WrapFooterCadastro>
            } 
           
           

        </WrapCentral>
        </ScrollView>
    </Container>
</SafeAreaView>
    )
}