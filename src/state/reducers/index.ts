import { combineReducers } from "redux";
import userReducer from './userReducer';

// user: userReducer (user = o nome q vai ser usado)
//  se quiser pode deixar sem o "nome:"
const rootReducer = combineReducers({
    user: userReducer
});
export default rootReducer;

export type State = ReturnType<typeof rootReducer>;