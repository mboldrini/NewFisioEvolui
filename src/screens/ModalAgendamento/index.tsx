import React, { useEffect, useState } from 'react';
import {Text} from 'react-native';
import { vars } from '../../global/variaveis/variaveis';
import { Button } from '../../components/Forms/Button/Index';
import { 
    Container,
    Header,
    WrapIcone,
    Icone,
    WrapTitulo,
    Titulo,
    Wrap,
    DataHoje,
    Calendario,

    TimeList,
    TimeItem,
    TimeItemText,

    Footer,
} from './styles';



interface Props{
    closeSelectCategory: () => void;
}

interface PropsDt{
    dt: Date;
}

export function ModalAgendamento({
    closeSelectCategory,
}: Props){

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedStringDate, setSelectedStringDate] = useState();

    function dataPadrao(){
        let now = new Date();
        setSelectedDate(now);
        setSelectedStringDate(JSON.stringify(now));
    }

    useEffect(()=>{
        if(!selectedDate){
            dataPadrao();
        }
    },[]);

    function atualizaDataEscolhida(dt: PropsDt){
        let dtEscolhida = JSON.stringify(dt);
        setSelectedStringDate(dtEscolhida);

        let dtEscolhidaDate = new Date(JSON.parse(dtEscolhida));
        setSelectedDate(dtEscolhidaDate);
    }

    const [selectedHour, setSelectedHour] = useState(null);
    const [listHours, setListHours] = useState([
        {
            hora: '08:00',
            disponivel: true
        },
        {
            hora: '09:00',
            disponivel: false
        },
        {
            hora: '10:00',
            disponivel: true
        },
        {
            hora: '11:00',
            disponivel: true
        },
        {
            hora: '12:00',
            disponivel: true
        },
        {
            hora: '13:00',
            disponivel: true
        },
        {
            hora: '14:00',
            disponivel: true
        },
      
    ]);

    useEffect(()=>{
        console.log(selectedHour);
    }, [selectedHour]);

    return(
        <Container>
            <Header>
                <WrapIcone>
                    <Icone name="chevron-down"/>
                </WrapIcone>
                <WrapTitulo>
                    <Titulo>Agendar Paciente</Titulo>
                </WrapTitulo>
            </Header>

            <Wrap>

                <Calendario
                    onDateChange={e => atualizaDataEscolhida(e)}
                    selectedStartDate={selectedDate}
                />

            </Wrap>

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
          
            <Footer>
                <Button 
                    title="Selecionar" 
                    onPress={closeSelectCategory}
                />
            </Footer>
        </Container>
    )
}