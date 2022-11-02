import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../global/api";
import { State } from "../state";
import { toast } from '@backpackapp-io/react-native-toast';
import { Alert } from "react-native";
import { versaoAPP } from '../global/parametros';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IRetornoVersaoAPI{
    id: number,
    versao: string,
    liberado: boolean,
    novidades: string,
    data_publicacao: Date,
    updated_at: Date,
    created_at: Date,
}

export default function useVerificaVersao(verificaa: boolean = false){

    async function EssaFuncaoDeveSerNoLoading(){
        await AsyncStorage.setItem("versaoAPP", versaoAPP);
        await AsyncStorage.setItem("avisaAtualizar", "false");
        await AsyncStorage.setItem("bemVindoVersaoAtual", "false");
        console.log("setou os storages");
    }

    const apiState = useSelector((state: State) => state.apiReducer);

    const [ultimaVersaoSalva, setUltimaVersaoSalva] = useState(null);
    const [avisaAtualizacao, setAvisaAtualizacao] = useState<boolean>(false);
    const [bemVindoVersaoAtual, setBemVindoVersaoAtual] = useState<boolean>(false);


    const [atualizaForcado, setAtualizaForcado] = useState(false);
    const [recomendaAtualizar, setRecomendaAtualizar] = useState(false);


    const [paramsVersaoAPi, setParamsVeresaoApi] = useState<IRetornoVersaoAPI>(null);


    async function GetSavedParams(){
        /// ULTIMA Versao salva
        const rultimaVersaoSalva = await AsyncStorage.getItem("versaoAPP");
        setUltimaVersaoSalva(rultimaVersaoSalva);
        
        const ravisaAtualizacao = await AsyncStorage.getItem("avisaAtualizar");
        if(ravisaAtualizacao == "true"){
            setAvisaAtualizacao(true);
        }else{
            setAvisaAtualizacao(false);
        }
        const rbemVindo = await AsyncStorage.getItem("bemVindoVersaoAtual");
        console.log("pegou os parametros salvos!");

        VerificaAtualizacaoForcada();
    }
 
    async function GetVersaoAPI(){

        api(apiState.token).get('versao/last').then(res => {

            setParamsVeresaoApi(res.data);
            console.log("Versao da API: "+ res.data.versao);
    
        }).catch(err =>{
            console.group("useVerificaVersao");
            console.log("ERRO!");
            console.log(err.message);
            console.groupEnd();
        });
    
    }

    function VerificaAtualizacaoForcada(){
        const [atualX, atualY, atualZ, atualE] = ultimaVersaoSalva.split(".");
        // console.log(`Atual: ${atualX}|${atualY}|${atualZ}|${atualE}`); 

        const [apiX, apiY, apiZ, apiE] = paramsVersaoAPi.versao.split(".");
        // console.log(`API: ${apiX}|${apiY}|${apiZ}|${apiE}`);  

        if( apiX > atualX || apiY > atualY || apiZ > atualZ){
            // console.error("FORÇA ATUALIZAÇÃO");
            setAtualizaForcado(true);
        }
 
        VerificaRecomendaAtualizacao();
 
    }

    function VerificaRecomendaAtualizacao(){
        // console.log("                   ");
        
        if(atualizaForcado) return;

        const [salvoX, salvoY, salvoZ, salvoE] = ultimaVersaoSalva.split(".");
        // console.log(`Ultima Salva: ${salvoX}|${salvoY}|${salvoZ}|${salvoE}`); 

        const [apiX, apiY, apiZ, apiE] = paramsVersaoAPi.versao.split(".");
        // console.log(`API: ${apiX}|${apiY}|${apiZ}|${apiE}`);  

        if(apiE > salvoE){
            // console.log("recomendamos a atualização do app!");
            setRecomendaAtualizar(true);
        }

        if(paramsVersaoAPi.versao == versaoAPP){
            AsyncStorage.setItem("versaoAPP", versaoAPP);
            console.log("ESTÁ NA MESMA VERSÃO DE APP DA API!");
        }

    }

    useEffect(()=>{
     //   EssaFuncaoDeveSerNoLoading();
        GetVersaoAPI();
        GetSavedParams();

    },[]);

    return {
        forcaUpdate: atualizaForcado,
        recomendaUpdate: recomendaAtualizar,
    }


}

