
interface IAddress{
    address: string,
    number: number,
    city: string,
    district: string,
    state: string,
    country: string
}

interface IInfos{
    description?: string;
    professional_mail?: string;
    celphone: string;
    second_celphone?: string;
    website?: string;
    instagram?: string;
    twitter?: string;
    tiktok?: string;
};

export interface IUserBasicInfos{
    magic_code: string;
    user_code: string,
    name: string,
    family_name: string,
    given_name?: string,
    picture: string,
    email: string,
    address: IAddress,
    infos: IInfos
}

export interface IUserParamsInfos{
    id: string;
    email: string,
    family_name: string,
    given_name: string,
    name: string;
    picture: string;
}