import { ActionType, IUserType } from './../action-types/index';
import { Action } from "../actions";

const initialState = {
    email: '',
    family_name: '',
    given_name: '',
    id: '',
    name: '',
    picture: '',
    token: '',
} as IUserType

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
        default: 
            return state;
    }
}
export default reducer;

