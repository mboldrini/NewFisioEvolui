// interfaces com os tipos de sets
import { ActionType, IUserType } from '../action-types/index';
// interfaces q serão setadas/usadas p/ setar as infos
import { Action } from "../actions";

//Constante com as informações iniciais
const initialState = {
    user_code: '',
    name: '',
    family_name: '',
    given_name: '',
    picture: '',
    email: '',
    enabled: true,
    created_at: '',
    address: {
        address: '',
        number: 0,
        city: '',
        district: '',
        state: '',
        country: ''
    },
    configs: {
        start_workHour: '',
        end_workHour: '',
        allow_retroactiveDate: false,
        allow_notifications: false,
        schedule_startDay: false,
        user_premium: false,
        premium_type: 0,
        premium_until: ''
    },
    personal_infos:{
        description: '.',
        professional_mail: '',
        celphone: '',
        second_celphone: '.',
        website: '',
        instagram: '',
        twitter: '',
        tiktok: ''
    },
} as IUserType

// InitialState = as infos iniciais ou os novos valores
// Action = modificadores - que ação ele deve tomar/fazer
const reducer = (state = initialState, action: Action) => {
    switch(action.type){
        case ActionType.SETINFOS:
            return {
                ...state,
                user_code: action.payload.user_code,
                name: action.payload.name,
                family_name: action.payload.family_name,
                given_name: action.payload.given_name,
                picture: action.payload.picture,
                email: action.payload.email,
                enabled: action.payload.enabled,
                created_at: action.payload.created_at,
                address: action.payload.address,
                configs: action.payload.configs,
                personal_infos: action.payload.personal_infos
            }
        case ActionType.SETCONFIGS:
            return{
                ...state,
                configs: {
                    start_workHour: action.payload.start_workHour,
                    end_workHour: action.payload.end_workHour,
                    allow_retroactiveDate: action.payload.allow_retroactiveDate,
                    allow_notifications: action.payload.allow_notifications,
                    schedule_startDay: action.payload.schedule_startDay,
                    user_premium: action.payload.user_premium,
                    premium_type: action.payload.premium_type,
                    premium_until: action.payload.premium_until
                }
            }
        default: 
            return state;
    }
}
export default reducer;

