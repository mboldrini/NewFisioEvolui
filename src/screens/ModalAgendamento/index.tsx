import React, { useEffect, useState } from 'react';
import {Text, Alert} from 'react-native';
import { 
    Container,
    Body,
    Header,
    WrapIcone,
    Icone,
    WrapTitulo,
    Titulo,
    Wrap,
    Calendario,
    TimeList,
    TimeItem,
    TimeItemText,
    Footer,
    WrapBtn
} from './styles';
import { ButtonSimple } from '../../components/Buttons/ButtonSimple/Index';

interface Props{
    closeSelectCategory: () => void;
    setAgendamento: () => void;
    dataEscolhida?: PropsDt;
    setAgendamentoExcluir?: () => void;
}

interface PropsDt{
    id: number;
    dataEscolhida: Date;
    horaEscolhida: string;
    tipoAgendamento: number;
}

export function ModalAgendamento({
    closeSelectCategory,
    dataEscolhida,
    setAgendamento,
    setAgendamentoExcluir,
}: Props){

    const [selectedDate, setSelectedDate] = useState();
    const [selectedHour, setSelectedHour] = useState(null);

    const [listHours, setListHours] = useState();

    useEffect(()=>{
        if(!selectedDate && !dataEscolhida){
            let dateNow = new Date();
            setSelectedDate(dateNow);
        }
        if(dataEscolhida){
            setSelectedDate(null);
            let dtEscolhida = JSON.stringify(dataEscolhida.dataEscolhida);
            let dtEscolhidaDate = new Date(JSON.parse(dtEscolhida));
            setSelectedDate(dtEscolhidaDate);
            setSelectedHour(dataEscolhida.horaEscolhida);
        } 
    },[]);

    function temDtPrevia(){
        if(dataEscolhida){
            return true;
        }else{
            return false;
        }
    }

    function handleData(dt: Date){
        let dtEscolhida = JSON.stringify(dt);
        let dtEscolhidaDate = new Date(JSON.parse(dtEscolhida));
        setSelectedDate(dtEscolhidaDate);
    }

    function listaHorasDisponiveis(){
        setListHours(null);

        let horarios: { hora: string, disponivel: boolean }[] = [
            { hora: '08:00', disponivel: true},
            { hora: '09:00', disponivel: false },
            { hora: '10:00', disponivel: true },
            { hora: '11:00', disponivel: true },
            { hora: '12:00', disponivel: true },
            { hora: '13:00', disponivel: true },
            { hora: '14:00', disponivel: true },
        ];

        setListHours(horarios);
    }

    useEffect(()=>{
        listaHorasDisponiveis();
    },[selectedDate]);
    
    function validaData(){
        if(!selectedHour){
            Alert.alert(
                "Ops!",
                "Você precisa escolher um horário",
                [
                    { text: "OK" }
                ]
            );
            return;
        }
        if(!selectedDate){
            Alert.alert(
                "Ops!",
                "Você precisa escolher uma data",
                [
                    { text: "OK" }
                ]
            );
            return;
        }

        let novoAgendamento = {
            dataAgendada: selectedDate,
            horaAgendada: selectedHour,
            tipoAgendamento: 0
        }
        setAgendamento( novoAgendamento );
        closeSelectCategory();
    }

    function excluiAgendamento(id: number){
        setAgendamentoExcluir(id);
        closeSelectCategory
    }


    return(
        <Container>
            <Body>
            <Header isActive={ temDtPrevia() }>
                <WrapIcone>
                    <Icone name="chevron-down" onPress={closeSelectCategory}/>
                </WrapIcone>
                <WrapTitulo>
                    <Titulo>Agendar Paciente</Titulo>
                </WrapTitulo>
                {   dataEscolhida && 
                    <WrapIcone>
                        <Icone name="trash-alt" onPress={()=>{ excluiAgendamento(dataEscolhida.id) } }/>
                    </WrapIcone>
                }
            </Header>

            <Wrap>
                <Calendario
                    onDateChange={e => handleData(e)}
                    selectedStartDate={selectedDate}
                />
            </Wrap>

            { listHours &&
                <Wrap>
                    <TimeList>
                        {listHours.map((item, key)=>(
                            <TimeItem 
                                escolhido={item.hora == selectedHour}
                                ativo={item.disponivel}
                                key={key}
                                onPress={()=>{
                                    if(item.disponivel == true){
                                        setSelectedHour(item.hora)
                                    }  
                                }}
                            >
                                <TimeItemText
                                    escolhido={item.hora == selectedHour}
                                    ativo={item.disponivel}
                                >
                                    {item.hora}
                                </TimeItemText>
                            </TimeItem>
                        ))} 
                    </TimeList>
                </Wrap>
            }
            </Body>
            <Footer>
                <WrapBtn>
                    <ButtonSimple
                        title="Agendar Horario" 
                        onPress={()=>{validaData()}}
                        type="default"
                    />
                </WrapBtn>

                <ButtonSimple
                    title="Cancelar" 
                    onPress={closeSelectCategory}
                    type="cancel"
                />
            </Footer>
        </Container>
    )
}