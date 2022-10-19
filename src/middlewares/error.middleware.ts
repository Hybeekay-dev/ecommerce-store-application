import HttpException from "../utils/http-exception";
import {NextFunction, Request, Response} from "express";
import httpStatus from "http-status";
import {ResponseDto} from "../utils/shared/dtos/response.dto";
import {ResponseStatus} from "../utils/shared/interfaces/response.interface";

const ErrorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    const status = error.status || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || 'Something went wrong';
    const resObj = new ResponseDto(ResponseStatus.ERROR, message);
    res.status(status).send(resObj);
    return next();
}

export default ErrorMiddleware;