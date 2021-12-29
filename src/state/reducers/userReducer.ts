import { ActionType } from './../action-types/index';
import { Action } from "../actions";

const initialState = {
    name: ''
}

const reducer = (state = initialState, action: Action) => {
    switch(action.type){
        case ActionType.SETINFOS:
            return {
                ...state,
                name: action.payload
            };
        default: 
            return state;
    }
}
export default reducer;

