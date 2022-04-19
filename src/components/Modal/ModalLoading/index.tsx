import { FontAwesome5 } from '@expo/vector-icons';
import { Text, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';

import LottieView from 'lottie-react-native';

import {
    Container,
    Mensagem,
    Bloco,
} from './styles';

interface Iinfos{
    mensagem?: string;
    tipo: "erro" | "loading" | "info" | "ok";
}
// Received Props on This Modal
interface Props{
    visible: boolean;
    infos: Iinfos;
}


export function ModalLoading({ visible, infos }: Props){
    return(
        <Modal visible={visible} style={{marginTop: 150, backgroundColor: '#00ff'}}>
        <Container>
            { infos.tipo == 'loading' &&
                <Bloco tipo={infos.tipo}>
                    <LottieView
                        source={require('../../../assets/loadingAnimado250.json')}
                        autoSize={false}
                        autoPlay
                        loop
                    />
                </Bloco>
            }
            { infos.tipo == 'ok' &&
                <Bloco tipo={infos.tipo}>
                    <LottieView
                        source={require('../../../assets/sucesso150.json')}
                        autoSize={false}
                        autoPlay
                        loop
                    />
                </Bloco>
            }
            { infos.tipo == 'erro' &&
                <Bloco tipo={infos.tipo}>
                    <LottieView
                        source={require('../../../assets/erro.json')}
                        autoSize={false}
                        autoPlay
                        loop
                    />
                </Bloco>
            }
            { infos.tipo == 'info' &&
                <Bloco tipo={infos.tipo}>
                    <LottieView
                        source={require('../../../assets/info1024.json')}
                        autoSize={false}
                        autoPlay
                        loop
                    />
                </Bloco>
            }


            { !infos.mensagem && infos.tipo == 'loading' && <Mensagem tipo={infos.tipo}>Carregando Informações...</Mensagem> }
            { !infos.mensagem && infos.tipo == 'ok'      && <Mensagem tipo={infos.tipo}>Informação cadastrada</Mensagem> }
            { !infos.mensagem && infos.tipo == 'erro'    && <Mensagem tipo={infos.tipo}>Ops! ocorreu um erro.</Mensagem> }
            { !infos.mensagem && infos.tipo == 'info'    && <Mensagem tipo={infos.tipo}>Atenção!</Mensagem> }
            { infos.mensagem  && <Mensagem tipo={infos.tipo}>{ infos.mensagem }</Mensagem> }

        </Container>
        </Modal>
    )
}