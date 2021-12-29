import { ActionType } from "../action-types";
import { Dispatch } from "react";
import { Action } from '../actions/index';

export const setUserInfos = (name: string) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SETINFOS,
            payload: name
        })
    }
}

