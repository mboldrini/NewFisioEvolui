import { IFormasPgto } from './../action-types/index';
import { IAtendimentos, atendimento } from '../action-types/index';
// interfaces com os tipos de sets
import { ActionType, IUserType } from '../action-types/index';
// interfaces q serão setadas/usadas p/ setar as infos
import { Action } from "../actions";

//Constante com as informações iniciais
const initialState = {
    atualiza: false,
    pagamentos: [
    {
        id: 0,
        description: '',
        paymentMethod_id: 0,
        paymentMethod_name: '',
        created_at: '',
        updated_at: ''
    }
]

} as IFormasPgto;

// InitialState = as infos iniciais ou os novos valores
// Action = modificadores - que ação ele deve tomar/fazer
const formasPgtoReducer = (state = initialState, action: Action) => {
    switch(action.type){
        case ActionType.SETFORMASPGTO:
            return {
                ...state,
                pagamentos: action.payload.pagamentos
            }
        default: 
            return state;
    }
}
export default formasPgtoReducer;

