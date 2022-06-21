import { IAtendimentos, atendimento } from './../action-types/index';
// interfaces com os tipos de sets
import { ActionType, IUserType } from '../action-types/index';
// interfaces q serão setadas/usadas p/ setar as infos
import { Action } from "../actions";

//Constante com as informações iniciais
const initialState = {
    atendimentos: [
    {
        id: 0,
        name: '',
        description: '',
        duration: '',
        price: '',
        created_at: '',
        updated_at: '',
    }
]

} as IAtendimentos;

// InitialState = as infos iniciais ou os novos valores
// Action = modificadores - que ação ele deve tomar/fazer
const atendimentoReducer = (state = initialState, action: Action) => {
    switch(action.type){
        case ActionType.SETATENDIMENTOS:
            console.log("action.payload");
            console.log(action.payload);
            return {
                ...state,
                atendimentos: action.payload.atendimentos
            }
        default: 
            return state;
    }
}
export default atendimentoReducer;

