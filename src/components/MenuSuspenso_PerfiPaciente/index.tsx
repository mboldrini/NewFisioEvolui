import React from 'react';
import { Text } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon, Modal, TouchableOpacity } from 'react-native-ui-lib';
import {useEffect, useState}from 'react';
import { 
    ViewBtn,
    AreaMenu,
    BtnMenuList,
    TituloMenu,
    IconeMenu
} from './styles';
import { View } from 'react-native-animatable';

// interface Props extends RectButtonProps{
//     titulo: string,
//     onPress: () => void;
//     onPressIcon?: 'chevron-up' | 'chevron-right' | 'chevron-down' | 'chevron-left';
//     onPressSecond?: () => void;
//     onPressSecondIcon?: string;
// }

export function MenuSuspensoPaciente(){

    const options = [
        {
            title: 'Diagnóstico Clínico',
            icon: 'grid',
            action: () => alert("Diagnóstico Clínico")
        }, 
        {
            title: 'Queixa Principal',
            icon: 'grid',
            action: () => alert("Queixa Principal")
        }, 
        {
            title: 'HDA',
            icon: 'grid',
            action: () => alert("HDA")
        },
        {
            title: 'HPP',
            icon: 'grid',
            action: () => alert("HPP")
        },
        {
            title: 'Avaliação Física',
            icon: 'grid',
            action: () => alert("Avaliação Física")
        },
        {
            title: 'Avaliação Respiratória',
            icon: 'grid',
            action: () => alert("Avaliação Respiratória")
        },
        {
            title: 'Diagnóstico Funcional',
            icon: 'grid',
            action: () => alert("Diagnóstico Funcional")
        },
        {
            title: 'Objetivos/Metas',
            icon: 'grid',
            action: () => alert("Objetivos/Metas")
        },
        {
            title: 'Evoluções',
            icon: 'grid',
            action: () => alert("Evoluções")
        },
        {
            title: 'Orientações',
            icon: 'grid',
            action: () => alert("Orientações")
        },
        {
            title: 'Agendamentos',
            icon: 'grid',
            action: () => alert("Agendamentos")
        },
    ]

    const [visible, setVisible] = useState(false)

    return(
        <>
            <ViewBtn onPress={()=> setVisible(true)}>
                <Icon name="flus-circle-outline" />
            </ViewBtn>
            <Modal transparent visible={visible} style={{position: 'absolute'}}>
                <SafeAreaView style={{flex: 1, zIndex: -2}} onTouchEnd={() => setVisible(false)}>
                    <AreaMenu style={{zIndex: 3}}>
                        {options.map((op, i) => (
                            <BtnMenuList key={i} onPress={() => alert(op.title) } lastItem={ i === options.length -1 }>
                                <IconeMenu name="list-ul" />
                                <TituloMenu>{ op.title }</TituloMenu>
                            </BtnMenuList>
                        ))}
                    </AreaMenu>
                </SafeAreaView>
            </Modal>
        </>
    )
}