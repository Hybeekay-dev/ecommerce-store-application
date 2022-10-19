export interface ResponseInterface{
    status: ResponseStatus,
    message: string,
    data: any
}

export enum ResponseStatus{
    SUCCESS = "success",
    ERROR = "error"
}