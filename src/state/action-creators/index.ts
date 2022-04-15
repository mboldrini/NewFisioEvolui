import { IUserType, IApiInfos } from '../action-types/index';
import { ActionType } from "../action-types";
import { Dispatch } from "redux";
import { Action } from '../actions/index';

// o conteudo aqui são funções que disparam actions

export const setUserInfos = ({email, family_name, given_name, id, name, picture, token}: IUserType) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SETINFOS,
            payload: {
                infos: {
                    email, 
                    family_name,
                    given_name,
                    id,
                    name,
                    picture,
                    token
                }
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

