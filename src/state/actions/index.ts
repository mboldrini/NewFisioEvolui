import { ActionType } from './../action-types/index';

type SetInfos = {
    type: ActionType.SETINFOS,
    payload: any
}


export type Action = SetInfos; // | OutraAction