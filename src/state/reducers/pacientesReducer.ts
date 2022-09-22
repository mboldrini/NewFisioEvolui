import { setPacientes } from './../action-creators/index';
import { IPaciente } from './../action-types/index';
// interfaces com os tipos de sets
import { ActionType, IUserType } from '../action-types/index';
// interfaces q serão setadas/usadas p/ setar as infos
import { Action } from "../actions";

//Constante com as informações iniciais
const initialState = {
    atualiza: false,
    pacientes: []

} as IPaciente;

// InitialState = as infos iniciais ou os novos valores
// Action = modificadores - que ação ele deve tomar/fazer
const pacientesReducer = (state = initialState, action: Action) => {
    switch(action.type){
        case ActionType.SETPACIENTES:
            return {
                ...state,
                pacientes: action.payload.pacientes
            }
        case ActionType.SETATUALIZAPACIENTES:
            return {
                ...state,
                atualiza: action.payload.atualiza,
            };
        default: 
            return state;
    }
}
export default pacientesReducer;

