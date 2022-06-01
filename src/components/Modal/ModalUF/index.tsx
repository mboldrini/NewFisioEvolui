import React from 'react';
import { Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Cabecalho } from '../../Cabecalho';
import { Button } from '../../Buttons/Button/Index';
import Modal from 'react-native-modal';
import { 
    Container,
    Wrap,
    Category,
    Name,
    Separator,
    Footer,
} from './styles';
import { UF_list } from '../../../global/DTO/UFs';


interface ICategory{
    key: number;
    name: string;
}

interface Props{
    setCategory: ( ativo: ICategory )=> void;
    statusAtual: ICategory,
    isVisible: boolean;
    setIsVisible: () => void;
}

export function ModalUF({ setCategory, statusAtual, isVisible, setIsVisible }: Props ){

    function handleCategorySelect(category: ICategory){
        setCategory(category);
    }


    return(
        <Modal isVisible={isVisible} animationIn='slideInUp' animationOut='slideOutDown' animationInTiming={700}  style={{width: '100%', margin: 0}} >
            <Container>

                <Cabecalho titulo="UF" onPress={()=> setIsVisible() } arrowSide="chevron-down" />

                <Wrap>

                    { <FlatList 
                        data={UF_list}
                        keyExtractor={(item) => item.name}
                        renderItem={({item}) =>(
                            <Category onPress={() => handleCategorySelect(item) } isActive={ statusAtual.key == item.key ? true : false } >
                                <Name>{item.name}</Name>
                            </Category>
                        )}
                        ItemSeparatorComponent={() => <Separator />}
                    /> }

                    <Footer>
                        <Button title="Selecionar" onPress={ setIsVisible } />
                    </Footer>

                </Wrap>
            </Container>
        </Modal>
    )
}