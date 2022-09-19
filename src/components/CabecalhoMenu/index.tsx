import React, {useEffect, useState}from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { 
    ContainerCabecalho,
    WrapLeft,
    WrapIcon,
    IconeLeft,
    IconeRight,
    WrapTitle,
    Titulo,
    AreaMenu,
    BtnMenuList,
    IconeMenu,
    TituloMenu
} from './styles';
import { Modal } from 'react-native-ui-lib';
import { SafeAreaView } from 'react-native-safe-area-context';

interface IMenuList{
    icone: string,
    slug: string,
    title: string,
}

interface Props extends RectButtonProps{
    titulo: string,
    onPress: () => void;
    onPressIcon?: 'chevron-up' | 'chevron-right' | 'chevron-down' | 'chevron-left';
    setMenuEscolhido?: (menu: string) => void;
    menuList?: IMenuList[];
}

export function CabecalhoMenu({titulo, onPress, onPressIcon = 'chevron-left', setMenuEscolhido, menuList, ...rest}: Props){

    const [menuVisible, setMenuVisible] = useState(false);

    return(
        <ContainerCabecalho >
            <WrapLeft>
                <IconeLeft name="chevron-left"  onPress={onPress}/>
                <WrapTitle>
                    <Titulo>{ titulo }</Titulo>
                </WrapTitle>
            </WrapLeft>

            {menuList &&
                <IconeRight name="cog" onPress={() => setMenuVisible(true) } />
            }

            {menuList &&
            <Modal transparent visible={menuVisible} style={{position: 'absolute'}}>
                <SafeAreaView style={{flex: 1, zIndex: -2}} onTouchEnd={() => setMenuVisible(false)}>
                    <AreaMenu style={{zIndex: 3}}>
                        {menuList.map((op, i) => (
                            <BtnMenuList key={i}  onPress={()=> setMenuEscolhido(op.slug)} lastItem={ i === menuList.length -1 }>
                                <IconeMenu name={op.icone} tipo={op.icone}/>
                                <TituloMenu>{ op.title }</TituloMenu>
                            </BtnMenuList>
                        ))}
                    </AreaMenu>
                </SafeAreaView>
            </Modal>
            }
        </ContainerCabecalho>
    )
}