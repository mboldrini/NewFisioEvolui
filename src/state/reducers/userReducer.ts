// interfaces com os tipos de sets
import { ActionType, IUserType } from '../action-types/index';
// interfaces q serão setadas/usadas p/ setar as infos
import { Action } from "../actions";

//Constante com as informações iniciais
const initialState = {
    email: '',
    family_name: '',
    given_name: '',
    id: '',
    name: '',
    picture: '',
    token: '',
    api:{
        token: '',
        date: '',
    }
} as IUserType

// InitialState = as infos iniciais ou os novos valores
// Action = modificadores - que ação ele deve tomar/fazer
const reducer = (state = initialState, action: Action) => {
    switch(action.type){
        case ActionType.SETINFOS:
            return {
                ...state,
                email: action.payload.infos.email,
                family_name: action.payload.infos.family_name,
                given_name: action.payload.infos.given_name,
                id: action.payload.infos.id,
                name: action.payload.infos.name,
                picture: action.payload.infos.picture,
                token: action.payload.infos.token
            }
        case ActionType.SETAPITOKEN:
            return {
                ...state,
                api:{
                    token: action.payload.token,
                    date: action.payload.date
                }
            }
        case ActionType.SETID:
            return {
                ...state,
                id: action.payload.id
            }
        default: 
            return state;
    }
}
export default reducer;

