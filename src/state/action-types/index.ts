export enum ActionType{
    SETINFOS = "setInfos",
    SETEMAIL = "setEmail",
    SETID = "setId",
    SETAPITOKEN = "setApiToken"
}

export interface IUserType{
    email: string,
    family_name: string,
    given_name: string;
    id: string,
    name: string,
    picture: string;
    token: string;
    api:{
        token: string,
        date: string,
    }
}

export interface IApiInfos{
    token: string;
    date: string;
}