import { atendimento } from './../action-types/index';
import { IUserType, IApiInfos, IAtendimentos } from '../action-types/index';
import { ActionType } from "../action-types";
import { Dispatch } from "redux";
import { Action } from '../actions/index';

// o conteudo aqui são funções que disparam actions

export const setUserInfos = ({user_code, name, family_name, given_name, picture, email, enabled, created_at, address, configs, personal_infos}: IUserType) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SETINFOS,
            payload: {
                user_code,
                name,
                family_name,
                given_name,
                picture,
                email,
                enabled,
                created_at,
                address, 
                configs, 
                personal_infos
            }
        })
    }
}

export const setApiInfos = ({token, date}: IApiInfos ) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SETAPITOKEN,
            payload: {
                token: token,
                date: date
            }
        })
    }
}

export const setAtendimentos = ( atendimentos : atendimento[] ) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SETATENDIMENTOS,
            payload: {
                atendimentos
            }
        })
    }
}

export const setAtualizaAtendimentos = ( atualiza: boolean ) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SETATUALIZAATENDIMENTO,
            payload: {
                atualiza: atualiza
            }
        })
    }
}

