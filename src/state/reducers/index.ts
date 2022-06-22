import { combineReducers } from "redux";
import userReducer from './userReducer';
import apiReducer from "./apiReducer";
import atendimentoReducer from "./atendimentoReducer";
import formasPgtoReducer from './formasPgtoReducer';

// user: userReducer (user = o nome q vai ser usado)
//  se quiser pode deixar sem o "nome:"
const rootReducer = combineReducers({
    user: userReducer,
    apiReducer,
    atendimentoReducer,
    formasPgtoReducer
});
export default rootReducer;

export type State = ReturnType<typeof rootReducer>;