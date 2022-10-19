import {ResponseInterface, ResponseStatus} from "../interfaces/response.interface";

export class ResponseDto implements ResponseInterface{
    data: any;
    message: string;
    status: ResponseStatus;

    constructor(status: string, message: string, data: any = null) {
        this.status = <ResponseStatus>status;
        this.message = message;
        this.data = data;
    }
}