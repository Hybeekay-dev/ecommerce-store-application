import {NextFunction, Request, RequestHandler, Response} from "express";
import {ResponseDto} from "../utils/shared/dtos/response.dto";
import * as HttpStatus from "http-status";
import {ResponseStatus} from "../utils/shared/interfaces/response.interface";
import {SuccessMessages} from "../utils/shared/constants/success-messages.constant";

export class HomeController{

    /**
     * @summary 'Application index'
     * @param req {Request}
     * @param res {Response}
     * @param next {NextFunction}
     * @returns {Response}
     */
    index: RequestHandler = (req: Request, res:Response, next: NextFunction ) => {
        const respObj = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.WELCOME_MESSAGE);
        res.status(HttpStatus.OK).send(respObj);
    }
}