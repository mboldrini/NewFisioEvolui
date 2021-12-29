import { IUserType } from './../action-types/index';
import { ActionType } from "../action-types";
import { Dispatch } from "react";
import { Action } from '../actions/index';

export const setUserInfos = ({email, family_name, given_name, id, name, picture}: IUserType) => {
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
                    picture
                }
            }
        })
    }
}

