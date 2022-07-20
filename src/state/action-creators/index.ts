import { atendimento, IPgtos, IConfigs } from './../action-types/index';
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

export const setUserConfigs = ({ start_workHour, end_workHour, allow_retroactiveDate, allow_notifications, schedule_startDay, user_premium, premium_type, premium_until }: IConfigs) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SETCONFIGS,
            payload: {
                start_workHour, 
                end_workHour, 
                allow_retroactiveDate, 
                allow_notifications, 
                schedule_startDay, 
                user_premium, 
                premium_type,
                premium_until
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

export const setFormasPgto = ( pagamentos : IPgtos[] ) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SETFORMASPGTO,
            payload: {
                pagamentos
            }
        })
    }
}
export const setUpdateFormasPgto = ( atualiza: boolean ) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SETUPDATEFORMASPGTO,
            payload: {
                atualiza: atualiza
            }
        })
    }
}

