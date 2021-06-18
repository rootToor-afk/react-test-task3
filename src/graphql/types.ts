export enum QueryTypes {
    GET_COUNTRY = "GET_COUNTRY",
    GET_CONTINENT = "GET_CONTINENT"
}

export interface ILanguage {
    code?: string,
    name?: string,
    native?: string,
    trl?: boolean
}
export interface ICountry {
    name?: string,
    code?: string,
    country?: string,
    currency?: string,
    emoji?: string,
    languages?: ILanguage[]
}


export interface IinitLazyQueryParams {
    type: QueryTypes
}
export interface IGetCountryResponse {
    country: ICountry
}

export interface IContinentCountry {
    countries: ICountry[]
}
export interface IGetContinentResponse {
    continent: IContinentCountry
}
export interface IResponseData extends IGetCountryResponse, IGetContinentResponse { }

export interface InitLazyQueryResponse {
    queryGetter: Function,
    data: Partial<IResponseData>,
    loading?: boolean,
}
