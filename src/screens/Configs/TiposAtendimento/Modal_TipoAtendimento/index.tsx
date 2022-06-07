import React, {useState} from 'react';
/// Modal Parts
import Modal from 'react-native-modal';
import { Cabecalho_Modal } from '../../../../components/Cabecalho_Modal';
import { Footer_Modal } from '../../../../components/Footers/Footer_Modal';
/// CSS Parts
import { 
    Container,
    Body,
    Form,
    WrapDuracao,
    BotaoDuracao,
    TempoDuracao,
    ImageIcon,
    WrapLoading,
    LoadingIcon
} from './styles';
/// Forms
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
/// Select Button
import { Select } from '../../../../components/Forms/Select';
/// Forms Inputs
import { InputForm } from '../../../../components/Forms/InputForm';
import { InputMasked } from '../../../../components/Forms/InputMasked';
/// Timer Picker
import { TimePickerModal } from 'react-native-paper-dates'
/// Avisos
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';
///Redux
import { useSelector } from 'react-redux';
import { State } from '../../../../state';
import { api } from '../../../../global/api';
/// Talvez substituir isso aqui
import { Modal_ListarFormasPagamento } from '../../FormasPagamento/Modal_ListarFormasPagamento';


interface Props{
    visible: boolean;
    closeModal: () => void;
    id?: number
}

interface IInfosAtend{
  name: string,
  description?: string,
  duration: string,
  price: number,
  paymentMethod_id: number
}

const schema = Yup.object().shape({
  nome: Yup.string().required("Nome é obrigatório"),
  descricao: Yup.string().optional(),
  valor: Yup.string().optional(),
});

export function Modal_TipoAtendimento({ visible, closeModal, id }: Props){
    /// Form
    const { control, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) });
    /// Redux
    const apiState = useSelector((state: State) => state.apiReducer);

    /// Loading e 2º modal
    const [loading, setLoading] = useState(false);
    const [ showModalFormaPgto, setShowModalFormaPgto ] = useState(false);

    /// Infos
    const [visible2, setVisible2] = React.useState(false);
    const [ hora, setHora ] = useState('00:30');
    const [formaPagamento, setFormaPagamento] = useState({key: -1, name: 'Forma de Pagamento'});

  
    const onConfirm = React.useCallback(
      ({ hours, minutes }) => {
        setVisible2(false);
        SetaHoras(hours, minutes);
      },
      [setVisible2]
    );
    
    function SetaHoras(hora: number, minuto: number){
      let hour = ''+ hora;
      let minute = ''+ minuto;
      if(hora < 10 ){
        hour = "0"+ hora;
      }
      if( minuto < 9 ){
        if(minuto < 1){
          minute = 10 +"";
        }else{
          minute = "0"+ minuto;
        }
      }
      setHora(hour +':'+ minute);
    }

    function HandleTipoAtendimento(formInfos: any){

      if(formaPagamento.key == -1){
        Alert.alert( "Ops!", "Você precisa escolher uma forma de pagamento", [ { text: "OK" } ] );
        return;
      }

      if(formInfos.valor == "R$0,00"){
        Alert.alert( "Ops!", "Você precisa informar o valor", [ { text: "OK" } ] );
        return;
      }

      let formatedPrice = parseFloat(formInfos.valor.replace("R$", "").replace(".", "").replace(",", "."));

      let infos = {
        name: formInfos.nome,
        description: formInfos.descricao,
        duration: hora,
        price: formatedPrice,
        paymentMethod_id: formaPagamento.key
      }
      console.log(infos);
      CriarTipoAtendimento(infos);

    }

    async function CriarTipoAtendimento(infos: IInfosAtend){
      setLoading(true);
     
      await api(apiState.token).post('servicesTypes', infos).then(res =>{

          Toast.show({
            type: 'success',
            text1: '😃 Atendimento cadastrado com sucesso!',
            text2: 'uhull!'
          });

          reset({
            nome: '',
            descricao: '',
            valor: ''
          });
          setFormaPagamento({key: -1, name: 'Forma de Pagamento'});

          closeModal();

      }).catch(err => {
          console.log("ERRO");
          console.log(err);
          Toast.show({
              type: 'error',
              text1: '⚠️ Erro ao obter lista de formas de pagamento',
          });
          closeModal()
      });

      setLoading(false);
    }


  return(
    <Modal isVisible={visible} animationIn='slideInUp' animationOut='slideOutDown' animationInTiming={700} style={{width: '100%', margin: 0}}>
        <Container>

          <Cabecalho_Modal  titulo='Tipo de Atendimento' onPress={()=> closeModal()} />

          { !loading &&

            <Body>
     
              <Form>
                <InputForm 
                    name="nome"
                    control={control}
                    placeholder="Nome"
                    autoCapitalize="words"
                    autoCorrect={false}
                    error={errors.nome && errors.nome.message}
                />

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

                <Select 
                  title={ formaPagamento.name }
                  isActive={ formaPagamento.key }
                  onPress={()=>{ setShowModalFormaPgto(true) }}
                /> 

                <WrapDuracao>
                  <BotaoDuracao>
                    <ImageIcon source={require('../../../../assets/stopwatch.png')}/>
                    <TempoDuracao onPress={()=> setVisible2(true)  }>{ hora }</TempoDuracao>
                  </BotaoDuracao>

                  <InputMasked 
                      name="valor"
                      control={control}
                      placeholder="Valor do Atendimento"
                      autoCapitalize="words"
                      autoCorrect={false}
                      type={'money'}
                      error={errors.valor && errors.valor.message}
                  />
                </WrapDuracao>

              </Form>

              <Footer_Modal onPressOk={handleSubmit((d) => HandleTipoAtendimento(d as any) ) } onPressCancel={()=> { closeModal() }}/>

            </Body>
          }

          { loading &&
            <WrapLoading>
              <LoadingIcon size="large" color="#FFFFFF"/>   
            </WrapLoading>
          }

            <TimePickerModal
              visible={visible2}
              onDismiss={()=> {setVisible2(false) } }
              onConfirm={onConfirm}
              hours={0} // default: current hours
              minutes={30} // default: current minutes
              label="Selecione a Duração" // optional, default 'Select time'
              cancelLabel="Cancelar" // optional, default: 'Cancel'
              confirmLabel="Ok" // optional, default: 'Ok'
              animationType="fade" // optional, default is 'none'
              locale={'pt-BR'} // optional, default is automically detected by your system
            />

            <Modal_ListarFormasPagamento 
              visible={showModalFormaPgto} 
              closeModal={()=> { setShowModalFormaPgto (false) }} 
              setFormasPgto={setFormaPagamento} 
            />

        </Container>
    </Modal>
  )
}