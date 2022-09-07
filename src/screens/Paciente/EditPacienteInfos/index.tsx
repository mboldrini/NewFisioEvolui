import React, {useEffect, useState}from 'react';
import {Alert, RefreshControl, Keyboard, Text} from 'react-native';
import {useNavigation, useRoute } from '@react-navigation/native';
import { 
    Container,
    /// Resto
    WrapLoadingPctInfos,
    LoadingIcon,
    ///FORM
    Form,
    Fields,
    Iscrol,
    WrapDataEscolhida,
    TextoDataEscolhida,
    TitleGroup,
    Title,
    WrapList
} from './styles';
// API
import { api } from '../../../global/api';
// REDUX
import { useSelector } from 'react-redux';
import { State } from '../../../state';
// Imports
import { SafeAreaView } from 'react-native-safe-area-context';
import { parametrosDoTipo } from '../ListInfosPaciente/Interfaces';
import { format } from 'date-fns';
import { InputForm } from '../../../components/Forms/InputForm';
import Toast from 'react-native-toast-message';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button_Field } from '../../../components/Buttons/Button_Field/Index';
import { Select } from '../../../components/Forms/Select';
import { List_TipoAgendamento } from '../../../components/List_Items/TipoAgendamento';
import { IRouteInfos, IDefaultFormInfos, IInfos, IStatusAgendamento, IEditAppointment } from './interfaces';
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { List_TipoPagamento } from '../../../components/List_Items/TiposDePagamentos';
import { tiposDeAtendimentos } from '../../../global/variaveis/globais';
import IApointment from '../../../global/DTO/Apointment';
import { ModalAgendamento } from '../../../components/Modal/ModalAgendamento';
/// FORM
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
/// FOOTER's
import { Footer_CreatedAt } from '../../../components/Footers/Footer_CreatedAt';
import { Footer_Modal } from '../../../components/Footers/Footer_Modal';
import { CabecalhoMenu } from '../../../components/CabecalhoMenu';
import { FlatList, ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';

const schema = Yup.object().shape({
    about: Yup.string().required("Descrição é obrigatório"),
    comments: Yup.string().optional(),
});

const schemaAgendamento = Yup.object().shape({
    evolucao: Yup.string().optional(),
    comentarios: Yup.string().optional(),
});

export function EditPacienteInfos(){

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(schema)
    });

    const {
        control: controlAgendamento,
        handleSubmit: handleAgendamento,
        formState: { errors: errorsAgendamento },
        reset: resetAgendamento
    } = useForm({
        resolver: yupResolver(schemaAgendamento)
    });

    
    const navigation = useNavigation();
    const [refreshing, setRefresh] = useState(false);

    /// Route Params
    const route = useRoute();
    const { id, id_paciente, tipo, status } = route.params as IRouteInfos;
    /// Redux
    const apiState = useSelector((state: State) => state.apiReducer);
    const atendimentosState = useSelector((state: State) => state.atendimentoReducer); 

    /// Loading
    const [loading, setLoading] = useState(true);
    /// MENU
    const [menuEscolhido, setMenuEscolhido] = useState(null);
    const listaMenuPerfil = [ { title: 'Excluir', slug:'excluir', icone: 'trash' } ]

    const [infos, setInfos] = useState<IInfos>(null);

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    ///Tipo de Atendimento/Serviço
    const [tipoAtendimento, setTipoAtendimento] = useState<IStatusAgendamento>({key: -1, title: 'Não Escolhido'});

    ///Status do Agendamento
    const [statusAgendamento, setStatusAgendamento] = useState<IStatusAgendamento>({key: 1, title: 'Não Atendido'});
    
    ///Agendamento
    const [agendamentoVisible, setAgendamentoVisible] = useState(false);/// Exibe o modal do agendamento
    const [agendamento, setAgendamento] = useState<IEditAppointment>(null);/// O AGENDAMENTO Q VEM DA API
    const [agendamentoAgendado, setAgendamentoAgendado] = useState<IApointment>(null);/// Agendamento AGENDADO
    const [tituloAgendamento, setTituloAgendamento] = useState({key: -1, title: "Não Agendado"});// Exibe o titulo do select de agendamento
  

    async function GetDefaultInfos(id: number, tipo: string){
        console.group("GetDefaultInfos");

        setLoading(true);

        let url = '';

        if(tipo != "agendamentos"){
            url = parametrosDoTipo[tipo].urlRead + id +"&"+ id_paciente;
        }else{
            url = parametrosDoTipo[tipo].urlRead + id +"&"+ id_paciente ;
        }

        console.log("URL: " + url);

        await api(apiState.token).get(url).then(res =>{

            if( tipo != "agendamentos" ){
                setInfos(res.data);
                setLoading(false);
            }else{

                console.log("Obteve as infos do agendamento!");

                console.log(res.data);
                setAgendamento(res.data);

                setLoading(false);
            }
       

        }).catch(err =>{

            console.log("erro ao obter informações");
            console.log(err.data);
            console.log(err);

            Toast.show({
                type: 'error',
                text1: '⚠️ Ops! erro ao obter as informações',
            });

        });

        console.groupEnd();
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

            Toast.show({
                type: 'success',
                text1: 'Registro Excluido! '+ parametrosDoTipo[tipo].title,
            });

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

    function HandleSaveItem(formInfos: IDefaultFormInfos){
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
        }
    }

    async function UpdateItem(url: string, formInfos: any){
        console.log("vai atualizar! " + tipo);

        let params = {
            about: formInfos.about,
            comments: formInfos.comments,
            date: infos.date
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

            console.log("erro ao salvar informações!");
            console.log(err.data);

            setLoading(false);

            Toast.show({
                type: 'error',
                text1: '⚠️ Ops! erro ao salvar as informações.',
            });

        });
    }

    async function CreateItem(url: string, formInfos: IDefaultFormInfos){
        console.log("vai CRIAR! " + tipo);

        let params = {
            about: formInfos?.about,
            comments: formInfos?.comments,
            date: infos.date,
            client_id: id_paciente
        }

        setLoading(true);
   
        await api(apiState.token).post(url, params).then(res =>{

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

    /// Parte do AGENDAMENTO
    function HandleSaveAgendamento(formInfos: any){
        if(status == 'novo'){
            console.log("CRIA UM AGENDAMENTO");
            CreateAgendamento(formInfos);
        }
    }

    async function CreateAgendamento(formInfos: any){
        console.group("CreateAgendamento");

        console.log("vai CRIAR! " + tipo);

        console.log(formInfos);

        let params = {
            client_id: id_paciente,
            serviceType_id: tipoAtendimento.key,
            description: formInfos.evolucao? formInfos.evolucao : ' ',
            comments: formInfos.comentarios ? formInfos.comentarios : ' ',
            status: statusAgendamento.key,
            type: agendamentoAgendado.type,
            date_scheduled: agendamentoAgendado.date_scheduled,
            start_hour: agendamentoAgendado.start_hour
        }
        console.log(params);
        console.log(parametrosDoTipo[tipo].urlCreate);

        setLoading(true);
   
        await api(apiState.token).post(parametrosDoTipo[tipo].urlCreate, params).then(res =>{

            Toast.show({
                type: 'success',
                text1: '😀 Agendamento Salvo!',
            });

            setLoading(false);

            setTimeout(()=>{
                navigation.goBack();
            }, 1500);

        }).catch(err =>{

            console.log("erro ao salvar agendamento! registro");
            console.log(err.data);

            setLoading(false);

            Toast.show({
                type: 'error',
                text1: '⚠️ Ops! erro ao salvar as informações.',
            });

        });

        console.groupEnd();
    }


    function SetaDefaultInfos(){
        setTipoAtendimento({key: agendamento.serviceType_id, title: agendamento?.serviceType_name});
        setStatusAgendamento({key: agendamento.status, title: tiposDeAtendimentos[agendamento.status].title });

        const dt = format( new Date(agendamento.date_scheduled) , "dd/MM/yyyy");
        const tipo = agendamento.type == 1 ? " - Avaliação" : "";
        setTituloAgendamento({key: 1, title: dt +" - "+ agendamento.start_hour + tipo });

        resetAgendamento({
            evolucao: agendamento.description,
            comentarios: agendamento.comments,
        });
    }


    useEffect(()=>{
        console.log("Tipo: "+ tipo);
        if(id && status != "novo"){
            GetDefaultInfos(id, tipo);            
        }else if(status == "novo" && tipo != "agendamentos"){
            setInfos({
                about: null,
                client_id: id_paciente,
                comments: null,
                created_at: format(new Date(), 'yyyy-MM-dd' ),
                date: format(new Date(), 'yyyy-MM-dd' ),
                id: null,
                updated_at: format(new Date(), 'yyyy-MM-dd' ),
            });
            setLoading(false);
        }else if(tipo == "agendamentos" && status == "novo"){
            setLoading(false);
        }
    }, [id]);

    useEffect(()=>{
        if(infos?.about){
            reset({
                about: infos.about,
                comments: infos.comments
            });
            setDate( new Date(infos.date) );
        }
    },[infos]);

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

    useEffect(()=>{
        if(agendamento && status == "novo"){

            const dt = format( new Date(agendamento.date_scheduled) , "dd/MM/yyyy");
            const tipo = agendamento.type == 1 ? " - Avaliação" : "";
            setTituloAgendamento({key: 1, title: dt +" - "+ agendamento.start_hour + tipo });

        }if(tipo == "agendamentos" && status == "editar" && agendamento?.serviceType_id){
            console.log("seta campos?");
            SetaDefaultInfos();
        }
    },[agendamento]);

    useEffect(()=>{
        if(statusAgendamento.key != 2){
            resetAgendamento({
                evolucao: ''
            })
        }
    },[statusAgendamento]);



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


            { !loading && tipo != "agendamentos" &&
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
                        <Button_Field onPress={()=>{setShow(true)}} title={ format( new Date(infos.date), 'dd/MM/yyyy') } />
                    </WrapDataEscolhida>

                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={'date'}
                            onChange={(event, selectedDate) => { setShow(false); 
                                setInfos({
                                    ...infos,
                                    date: format(selectedDate, 'yyyy-MM-dd') + "T04:00:00.000Z"
                                });
                                setDate(selectedDate)}}
                        />
                    )}

                    {!loading &&
                        <Footer_CreatedAt created_at={infos?.created_at} updated_at={infos?.updated_at}/>
                    }

                </Form>


                <Footer_Modal onPressOk={handleSubmit((d) =>  HandleSaveItem(d as any) ) } onPressCancel={()=> navigation.goBack() } />

            </>
            } 

            {!loading && tipo == "agendamentos" &&
            <>
            <Form>
                <Fields>

                    <TitleGroup><Title>Tipo de Atendimento</Title></TitleGroup>

                    <Select title={tipoAtendimento.title} isActive={0} onPress={()=>{ SheetManager.show("modalTiposAtendimentos") }} />


                    { tipoAtendimento.key != -1 &&
                    <>
                        <TitleGroup><Title>Data Hora do Atendimento</Title></TitleGroup>
                        <Select title={tituloAgendamento.title} isActive={0} onPress={()=>{ setAgendamentoVisible(true) }} />
                    </>
                    }

                    { tipoAtendimento.key != -1 &&
                    <>
                        <TitleGroup><Title>Status do Atendimento</Title></TitleGroup>
                        <Select title={statusAgendamento.title} isActive={0} onPress={()=>{ SheetManager.show("modalTipoAgendamento") }} />
                    </>
                    }

                    { tipoAtendimento.key != -1 &&
                    <>
                    
                        <TitleGroup><Title>Sobre o Atendimento</Title></TitleGroup>

                        { statusAgendamento.key == 2 &&
                            <InputForm 
                                name="evolucao"
                                control={controlAgendamento}
                                placeholder="Evolução"
                                autoCapitalize="words"
                                autoCorrect={false}
                                multiline={true}
                                numberOfLines={4}
                                error={errorsAgendamento.evolucao && errorsAgendamento.evolucao.message}
                            />
                        }

                        <InputForm 
                            name="comentarios"
                            control={controlAgendamento}
                            placeholder="Comentários/Sobre"
                            autoCapitalize="words"
                            autoCorrect={false}
                            multiline={true}
                            numberOfLines={4}
                            error={errorsAgendamento.comentarios && errorsAgendamento.comentarios.message}
                        />
                    
                    </>
                    }

                </Fields>
            </Form>

            <Footer_Modal onPressOk={handleAgendamento((d) =>  HandleSaveAgendamento(d as any) ) } onPressCancel={()=> navigation.goBack() } />

            </>
            }


                {/* Tipo de AGENDAMENTO */}
                <ActionSheet id="modalTipoAgendamento" initialOffsetFromBottom={1} gestureEnabled={true} headerAlwaysVisible={true} elevation={3} extraScroll={3}  containerStyle={{backgroundColor: '#63C2D1'}} >
                    <ScrollView nestedScrollEnabled={true} >
                        <FlatList 
                            data={tiposDeAtendimentos}
                            keyExtractor={(item) => item.id +"-"}
                            renderItem={({item}) =>(
                                <List_TipoAgendamento id={item.id} 
                                onPress={()=> {
                                    setStatusAgendamento({key: item.id , title: item.title }) 
                                    SheetManager.hide("modalTipoAgendamento")  
                                }} />
                            )}
                        />
                    </ScrollView>
                </ActionSheet>
      
                  <ActionSheet id="modalTiposAtendimentos" initialOffsetFromBottom={1} gestureEnabled={true} headerAlwaysVisible={true} elevation={3} extraScroll={3}  containerStyle={{backgroundColor: '#63C2D1'}} >
                      <ScrollView nestedScrollEnabled={true} >
                          <FlatList 
                              data={atendimentosState.atendimentos}
                              keyExtractor={(item) => item.name}
                              renderItem={({item}) =>(
                                  <WrapList>
                                      <List_TipoPagamento 
                                          paymentMethod_name={item.name} 
                                          description={item.description} 
                                          onPress={()=>{ 
                                              setTipoAtendimento({key: item.id , title: item.name })
                                              SheetManager.hide("modalTiposAtendimentos")  
                                          }} 
                                      />
                                  </WrapList>
                              )}
                          />
                      </ScrollView>
                  </ActionSheet>
      

                <ModalAgendamento 
                    isVisible={agendamentoVisible} 
                    setIsVisible={()=> setAgendamentoVisible(false) }
                    setSelectedApointment={setAgendamentoAgendado}
                    idServiceType={tipoAtendimento.key}
                />



            </Iscrol>
        </SafeAreaView>
    </Container>
 </TouchableWithoutFeedback>
    )
}