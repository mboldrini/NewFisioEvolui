// interfaces com os tipos de sets
import { ActionType, IUserType, IApiInfos } from '../action-types/index';
// interfaces q serão setadas/usadas p/ setar as infos
import { Action } from "../actions";

//Constante com as informações iniciais
const initialState = {
    token: '',
    date: '',
} as IApiInfos

// InitialState = as infos iniciais ou os novos valores
// Action = modificadores - que ação ele deve tomar/fazer
const apiReducer = (state = initialState, action: Action) => {
    switch(action.type){
        case ActionType.SETAPITOKEN:
            return {
                ...state,
                token: action.payload.token,
                date: action.payload.date
            }
        default: 
            console.warn("apiReducer DEFAULT");
            return state;
    }
}
export default apiReducer;

