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
import { Footer_Modal } from '../../../components/Footers/Footer_Modal';

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
    second_celphone:string;
    created_at: Date;
    description: string;
    instagram: string;
    professional_mail: string;
    tiktok: string;
    twitter: string;
    updated_at: Date;
    website: string;
}

const schema = Yup.object().shape({
    email: Yup.string().email().required('Email de contato é obrigatório'),
    celphone: Yup.string().required('Telefone é obrigatório'),
    second_celphone: Yup.string().optional(),
    website: Yup.string().optional(),
    instagram: Yup.string().optional(),
    twitter: Yup.string().optional(),
    tiktok: Yup.string().optional(),
});

// "professional_mail": "equipeviciobr@gmail.com",
// "celphone": "99999999999",
// "second_celphone": "00000000000",
// "website": ".",
// "instagram": ".",
// "twitter": ".",
// "tiktok": ".",

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

    
    async function GetUserInfos(){
        console.group("GetUserInfos");

        await api(apiState.token).get('/users/infos' ).then(res => {

            console.log(res.data);

            setUserInfos(res.data);

            setLoading(false);

        }).catch(err => {
            console.log(err.message); 

            toast.error('Ops! Erro ao obter as informações do perfil.', {duration: 3000, icon: '❌'});

        });

        console.groupEnd();
    }

    async function AtualizaInfos(d: any){

        setLoading(true);

        const infos = {
            "description": ".",
            "professional_mail": d.email,
            "celphone": d.celphone,
            "second_celphone": d.second_celphone,
            "website": d.website,
            "instagram": d.instagram,
            "twitter": d.twitter,
            "tiktok": d.tiktok,
        }

        console.log(infos);

        await api(apiState.token).patch('/users/infos', infos).then(res => {
            console.log('SALVOU!');

            setLoading(false);
            setMenuEscolhido('editar');

            toast.success('Informações salvas!', {duration: 3000});

        }).catch(err => {
            console.log(err.message);
            console.log('ERRO AO SALVAR INFORMAÇÕES');

            toast.error('Ops! Erro ao salvar informações', {duration: 3000, icon: '❌'});
        })

        console.log(infos);
    }

    useEffect(()=>{
        GetUserInfos();
    },[]);

    useEffect(()=>{
        if(menuEscolhido == 'editar'){
            setEditInfos(!editInfos);
            setMenuEscolhido(null);
            GetUserInfos();
        }
    },[menuEscolhido]);

    useEffect(()=>{
        if(userInfos?.celphone){
            reset({
                email: userInfos.professional_mail,
                celphone: userInfos.celphone,
                second_celphone: userInfos.second_celphone,
                website: userInfos.website,
                instagram: userInfos.instagram,
                twitter: userInfos.twitter,
                tiktok: userInfos.tiktok,
            });
        }
    },[userInfos]);

    useEffect(()=>{
        if(Object.keys(errors).length > 0){
            toast.error('Ops! faltou preencher algum campo obrigatório', {duration: 3000, icon: '❕'});
        }
    },[errors]);

    return(
<SafeAreaView style={{flex: 1, backgroundColor: '#63C2D1'}}>
    <Container >
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{ GetUserInfos(); }}/> } 
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
                    name="celphone"
                    control={control}
                    placeholder="Whatsapp/Celular"
                    error={errors.celphone && errors.celphone.message}
                    type="cel-phone"
                    options={{
                        maskType: 'BRL',
                        withDDD: true,
                        dddMask: '(99) '
                    }}
                />

                <InputMasked
                    name="second_celphone"
                    control={control}
                    placeholder="Celular"
                    error={errors.second_celphone && errors.second_celphone.message}
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
                <Footer_Modal
                    onPressOk={handleSubmit((d) =>  AtualizaInfos(d as any) )}
                    onPressCancel={()=> { setMenuEscolhido('editar') } }
                />
            } 
           
           

        </WrapCentral>
        </ScrollView>
    </Container>
</SafeAreaView>
    )
}