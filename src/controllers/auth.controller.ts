import {NextFunction, Request, RequestHandler, Response} from "express";
import {AuthService} from "../services/auth.service";
import {ResponseDto} from "../utils/shared/dtos/response.dto";
import {ResponseStatus} from "../utils/shared/interfaces/response.interface";
import {SuccessMessages} from "../utils/shared/constants/success-messages.constant";
import {RegisterDto} from "../utils/shared/dtos/register.dto";
import HttpStatus from "http-status";
import {LoginDto} from "../utils/shared/dtos/login.dto";

/**
 * @summary Contains request handler for authentication service.
 */
export class AuthController{
    private readonly authService: AuthService


    constructor(authService: AuthService) {
        this.authService = authService;
    }


    /**
     * @summary 'Authenticates customer'
     * @api {post} api/v1/auth/login
     * @param req {Request}
     * @param res {Response}
     * @param next {NextFunction}
     * @return {Response}
     * */

    // @ts-ignore
    login: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await this.authService.login(req.body as LoginDto);
            const resObj = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.LOGIN_SUCCESS, response);
            res.status(HttpStatus.OK).send(resObj);
        }catch (e) {
            next(e);
        }
    }


    /**
     * @summary 'Register new customer'
     * @api {post} api/v1/auth/register
     * @param req {Request}
     * @param res {Response}
     * @param next {NextFunction}
     * @return {Response}
     * */
    // @ts-ignore
    register: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const response = await this.authService.register(req.body as RegisterDto);
            const respObj = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.REGISTER_SUCCESS, response);
            return res.status(HttpStatus.OK).send(respObj);
        }catch (e) {
            next(e);
        }
    }
}