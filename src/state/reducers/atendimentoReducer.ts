import { IAtendimentos, atendimento } from './../action-types/index';
// interfaces com os tipos de sets
import { ActionType, IUserType } from '../action-types/index';
// interfaces q serão setadas/usadas p/ setar as infos
import { Action } from "../actions";

//Constante com as informações iniciais
const initialState = {
    atualiza: false,
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
            return {
                ...state,
                atendimentos: action.payload.atendimentos
            }
        case ActionType.SETATUALIZAATENDIMENTO:
            return {
                ...state,
                atualiza: action.payload.atualiza,
            };
        default: 
            return state;
    }
}
export default atendimentoReducer;

