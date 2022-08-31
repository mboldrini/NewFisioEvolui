import React, {useEffect, useState}from 'react';
import {RefreshControl} from 'react-native';
import {useNavigation, useRoute } from '@react-navigation/native';
import { 
    Container,
    /// Cabeçalho
    ContainerCabecalho,
    WrapLeft,
    IconeLeft,
    IconeRight,
    WrapTitle,
    Titulo,
    /// MENU
    ViewBtn,
    AreaMenu,
    BtnMenuList,
    TituloMenu,
    IconeMenu,
    /// Resto
    WrapLoadingPctInfos,
    LoadingIcon,
    ///FORM
    Form,
    Fields,
    WrapCentro,
    Iscrol
} from './styles';
// API
import { api } from '../../../global/api';
// REDUX
import { useSelector } from 'react-redux';
import { State } from '../../../state';
// Imports
import { SafeAreaView } from 'react-native-safe-area-context';
import { Modal } from 'react-native-ui-lib';
import { parametrosDoTipo } from '../ListInfosPaciente/Interfaces';
import { format } from 'date-fns';
import { InputForm } from '../../../components/Forms/InputForm';
import Toast from 'react-native-toast-message';
/// FORM
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
/// FOOTER's
import { Footer_CreatedAt } from '../../../components/Footers/Footer_CreatedAt';
import { Footer_Modal } from '../../../components/Footers/Footer_Modal';
import { CabecalhoMenu } from '../../../components/CabecalhoMenu';


interface IRouteInfos{
    id: number,
    tipo: string,
    id_paciente: number,
    status: 'editar' | 'novo';
}

interface IDefaultFormInfos{
    about: string,
    client_id: number,
    comments: string,
    created_at: string,
    date: string,
    id: number,
    updated_at: string,
}


const schema = Yup.object().shape({
    descricao: Yup.string().required("Descrição é obrigatório"),
    observacoes: Yup.string().optional(),
 
});

export function EditPacienteInfos(){
    
    const navigation = useNavigation();
    const [refreshing, setRefresh] = useState(false);

    /// Route Params
    const route = useRoute();
    const { id, id_paciente, tipo, status } = route.params as IRouteInfos;
    /// Redux
    const apiState = useSelector((state: State) => state.apiReducer);

    const [loading, setLoading] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);

    const [formInfos, setFormInfos] = useState<IDefaultFormInfos>(null);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(()=>{
        if(id){
            GetDefaultInfos(id, tipo);
        }
    }, [id]);

    async function GetDefaultInfos(id: number, tipo: string){
        let url = '';

        if(tipo != "agendamentos"){
            url = parametrosDoTipo[tipo].urlRead + id +"&"+ id_paciente;
        }else{
            url = parametrosDoTipo[tipo].urlRead + id +"&"+ format(new Date(), 'yyyy-M-dd') ;
        }

        console.log("URL: " + url);

        setLoading(true);
   
        await api(apiState.token).get(url).then(res =>{

            setFormInfos(res.data);
            setLoading(false);


        }).catch(err =>{

            console.log("erro ao obter informações");
            console.log(err.data);
            Toast.show({
                type: 'error',
                text1: '⚠️ Ops! erro ao obter as informações',
            });

        });

    }

    useEffect(()=>{
        if(formInfos?.about){
            reset({
                descricao: formInfos.about,
                observacoes: formInfos.comments
            });
        }
    },[formInfos]);

    const [menuEscolhido, setMenuEscolhido] = useState(null);

    useEffect(()=>{
        console.log("Menu Escolhido: "+ menuEscolhido);
    },[menuEscolhido]);


    const listaMenuPerfil = [
        { title: 'Criar '+ parametrosDoTipo[tipo].title, slug:'diagnosticoClinico', icone: 'plus', }, 
        { title: 'Excluir', slug:'queixaPrincipal', icone: 'trash', }, 

    ]


    return(
<Container>
    <SafeAreaView style={{flex: 1}}>
        <Iscrol 
            refreshControl={<RefreshControl refreshing={refreshing} 
            onRefresh={()=>{ GetDefaultInfos(id, tipo) }}/>} 
            contentContainerStyle={{ flex: 1 }}
        >

            {/* <ContainerCabecalho >
                <WrapLeft>
                    <IconeLeft name="chevron-left" onPress={() => navigation.goBack() }/>
                    <WrapTitle>
                        <Titulo>{ parametrosDoTipo[tipo].title }</Titulo>
                    </WrapTitle>
                </WrapLeft>

                <IconeRight name="cog" onPress={() => setMenuVisible(true) } />

                <Modal transparent visible={menuVisible} style={{position: 'absolute'}}>
                    <SafeAreaView style={{flex: 1, zIndex: -2}} onTouchEnd={() => setMenuVisible(false)}>
                        <AreaMenu style={{zIndex: 3}}>
                            <BtnMenuList onPress={() => console.log(parametrosDoTipo[tipo].title) } >
                                <IconeMenu name={ parametrosDoTipo[tipo].icone } />
                                <TituloMenu>Criar {parametrosDoTipo[tipo].title}</TituloMenu>
                            </BtnMenuList>
                        </AreaMenu>
                    </SafeAreaView>
                </Modal>
                
            </ContainerCabecalho> */}

            <CabecalhoMenu
                titulo={ parametrosDoTipo[tipo].title }
                onPress={()=> console.log("left")}
                setMenuEscolhido={setMenuEscolhido}
                menuList={listaMenuPerfil}
            />


            { loading == true && 
                <WrapLoadingPctInfos>
                    <LoadingIcon size="large" color="#FFFFFF"/>  
                </WrapLoadingPctInfos>
            }


            { !loading && formInfos?.created_at &&
            <>
                <Form>
                    <Fields>
    
                        <InputForm 
                            name="descricao"
                            control={control}
                            placeholder="Descrição"
                            autoCapitalize="words"
                            autoCorrect={false}
                            multiline={true}
                            numberOfLines={4}
                            error={errors.descricao && errors.descricao.message}
                        />

                        <InputForm 
                            name="observacoes"
                            control={control}
                            placeholder="Observações"
                            autoCapitalize="words"
                            autoCorrect={false}
                            multiline={true}
                            numberOfLines={4}
                            error={errors.observacoes && errors.observacoes.message}
                        />
                            
                    </Fields>

                    <Footer_CreatedAt created_at={formInfos?.created_at} updated_at={formInfos?.updated_at}/>
             
                </Form>


                <Footer_Modal onPressOk={()=> console.log("OK")} onPressCancel={()=> navigation.goBack() } />

            </>
            } 

        
              



        </Iscrol>
    </SafeAreaView>
</Container>
    )
}