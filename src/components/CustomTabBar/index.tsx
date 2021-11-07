import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import{
    Container,
    TabArea,
    TabItem,
    Icon,
    IconCenter,
    TabItemCenter
} from './styles';


export default ({state, navigation}) => {

    const goTo = (screenName) => {
        navigation.navigate(screenName);
    }

    return(
        <TabArea>

            <TabItem onPress={()=>goTo('Home')}>
                <Icon name="home" style={{opacity: state.index===1 ? 1 : 0.5}}/>
            </TabItem> 
            
            <TabItem onPress={()=>goTo('Search')}>
                <Icon name="search-sharp" style={{opacity: state.index===2 ? 1 : 0.5}}/>
            </TabItem> 

            <TabItemCenter onPress={()=>goTo('Agenda')}>
                <IconCenter name="calendar-sharp" />
            </TabItemCenter> 
         
            <TabItem onPress={()=>goTo('CadastrarPaciente')}>
                <Icon name="person-add-sharp" style={{opacity: state.index===3 ? 1 : 0.5}}/>
            </TabItem> 
            
            <TabItem onPress={()=>goTo('Profile')}>
                <Icon name="apps" style={{opacity: state.index===4 ? 1 : 0.5}}/>
            </TabItem> 
            
        </TabArea>
    );
}

{/* <TabItem style={style.TabItem} onPress={() => { goTo('Home') }}>
<Icon name="home" size={28} style={{opacity: state.index===0? 1 : 0.5, color: '#FFFFFF'}} />
</TabItem> */}