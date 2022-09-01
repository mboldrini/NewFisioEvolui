import React, {useEffect, useState}from 'react';
import {Alert, RefreshControl, Keyboard, Text} from 'react-native';
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
    Iscrol,
    WrapDataEscolhida,
    TextoDataEscolhida
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
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';



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
    about: Yup.string().required("Descrição é obrigatório"),
    comments: Yup.string().optional(),
});

import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from '../../../components/Buttons/Button/Index';
import { View } from 'react-native-animatable';
import { Button_Field } from '../../../components/Buttons/Button_Field/Index';

export function EditPacienteInfos(){

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(schema)
    });
    
    const navigation = useNavigation();
    const [refreshing, setRefresh] = useState(false);

    /// Route Params
    const route = useRoute();
    const { id, id_paciente, tipo, status } = route.params as IRouteInfos;
    /// Redux
    const apiState = useSelector((state: State) => state.apiReducer);
    /// Loading
    const [loading, setLoading] = useState(false);
    /// MENU
    const [menuEscolhido, setMenuEscolhido] = useState(null);
    const listaMenuPerfil = [ { title: 'Excluir', slug:'excluir', icone: 'trash' } ]

    const [formInfos, setFormInfos] = useState<IDefaultFormInfos>(null);
 
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

    async function DeleteItem() {
        let url = '';

        if(tipo != "agendamentos"){
            url = parametrosDoTipo[tipo].urlDelete + id +"&"+ id_paciente;
        }else{
            url = parametrosDoTipo[tipo].urlDelete + id +"&"+ format(new Date(), 'yyyy-M-dd') ;
        }

        console.log("URL DELETE: " + url);

        setLoading(true);
   
        await api(apiState.token).delete(url).then(res =>{

            navigation.goBack();

        }).catch(err =>{

            console.log("erro ao excluir registro");
            console.log(err.data);

            Toast.show({
                type: 'error',
                text1: '⚠️ Ops! erro ao excluir o registro!',
            });

        });
    }

    function HandleSaveItem(formInfos: any){
        let url = '';

        if(tipo != "agendamentos"){
            if(status == 'editar'){
                url = parametrosDoTipo[tipo].urlUpdate + id +"&"+ id_paciente;
                UpdateItem(url, formInfos);
                return;
            }else if(status == 'novo'){
                url = parametrosDoTipo[tipo].urlCreate;
                CreateItem(url, formInfos);
                return;
            }
        }else{
         //  url = parametrosDoTipo[tipo].urlDelete + id +"&"+ format(new Date(), 'yyyy-M-dd') ;
         alert("ALTETRA A URL DE AGENDAMENTOS");
        }
    }

    async function UpdateItem(url: string, formInfos: any){
        console.log("vai atualizar! " + tipo);

        console.log(formInfos);

        let params = {
            about: formInfos.about,
            comments: formInfos.comments,
            //date:
        }
        
        setLoading(true);
   
        await api(apiState.token).patch(url, params).then(res =>{

            Toast.show({
                type: 'success',
                text1: '😀 Informações Salvas!',
            });

            setLoading(false);

            setTimeout(()=>{
                navigation.goBack();
            }, 1500);

        }).catch(err =>{

            console.log("erro ao salvar informações! registro");
            console.log(err.data);

            setLoading(false);

            Toast.show({
                type: 'error',
                text1: '⚠️ Ops! erro ao salvar as informações.',
            });

        });
    }

    async function CreateItem(url: string, formData: any){

    }

    useEffect(()=>{
        if(formInfos?.about){
            reset({
                about: formInfos.about,
                comments: formInfos.comments
            });
        }
    },[formInfos]);

    useEffect(()=>{
        if(menuEscolhido == 'excluir'){
            Alert.alert(
                "Realmente deseja excluir esse item?",
                parametrosDoTipo[tipo].title,
                [
                    { text: "Excluir", onPress: () => DeleteItem() },
                    { text: "Cancelar", style: "cancel" }
                ]
            )
        }
    },[menuEscolhido]);




    

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
  


  

    useEffect(()=>{
        console.log("Date: " + date);
    },[date]);
    useEffect(()=>{
        console.log("show: " + show);
    },[show]);



    return(
<TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ height: '100%' }}>
    <Container> 
        <SafeAreaView style={{flex: 1}}> 
            <Iscrol refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{ GetDefaultInfos(id, tipo) }}/>}  contentContainerStyle={{flexGrow:1}}>



            <CabecalhoMenu titulo={ parametrosDoTipo[tipo].title } onPress={()=> navigation.goBack() } setMenuEscolhido={setMenuEscolhido} menuList={listaMenuPerfil} />


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
                            name="about"
                            control={control}
                            placeholder="Descrição"
                            autoCapitalize="words"
                            autoCorrect={false}
                            multiline={true}
                            numberOfLines={4}
                            error={errors.about && errors.about.message}
                        />

                        <InputForm 
                            name="comments"
                            control={control}
                            placeholder="Observações"
                            autoCapitalize="words"
                            autoCorrect={false}
                            multiline={true}
                            numberOfLines={4}
                            error={errors.comments && errors.comments.message}
                        />

                    </Fields>

               
                    
                    <WrapDataEscolhida>
                        <TextoDataEscolhida>Data Escolhida:</TextoDataEscolhida>
                        <Button_Field onPress={()=>{setShow(true)}} title={ format(date, 'dd/MM/yyyy') } />
                    </WrapDataEscolhida>

                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={'date'}
                            onChange={(event, selectedDate) => { setShow(false); setDate(selectedDate)}}
                        />
                    )}
          

                    <Footer_CreatedAt created_at={formInfos?.created_at} updated_at={formInfos?.updated_at}/>


                </Form>



                
      



                <Footer_Modal onPressOk={handleSubmit((d) =>  HandleSaveItem(d as any) ) } onPressCancel={()=> navigation.goBack() } />

            </>
            } 





            </Iscrol>
        </SafeAreaView>
    </Container>
 </TouchableWithoutFeedback>
    )
}