export enum ActionType{
    SETINFOS = "setInfos"
}

export interface IUserType{
    email: string,
    family_name: string,
    given_name: string;
    id: string,
    name: string,
    picture: string;
}