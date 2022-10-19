import {NextFunction, Request, RequestHandler, Response} from "express";
import {CustomerRepository} from "../repositories/customer.repository";
import {Jwt} from "../utils/jwt";
import HttpStatus from "http-status";
import {ErrorMessages} from "../utils/shared/constants/error-messages.constant";
import HttpException from "../utils/http-exception";
import {LoggerInterface} from "../utils/shared/interfaces/logger.interface";
import {WinstonLogger} from "../utils/logger";


export class AuthMiddleware{
    private readonly customerRepository: CustomerRepository;
    private readonly jwt: Jwt;
    private readonly logger: LoggerInterface;

    constructor(
        customerRepository: CustomerRepository,
        jwt: Jwt,
        logger: WinstonLogger
    ) {
        this.customerRepository = customerRepository;
        this.jwt = jwt;
        this.logger = logger;
    }

    guide: RequestHandler =  async (req: Request, res: Response, next: NextFunction) => {
        try {
            req.user = await this.validateRequest(req as { headers: { authorization: any } });
            return next();
        } catch (e) {
            next(e)
        }
    }

    /**
     * @summary This method validate request and returns authenticated user
     * @param request
     * @private
     */
    private async validateRequest(request: { headers: { authorization: any } }) {

        const token = (request.headers.authorization || "").replace(/^Bearer\s/, "")

        if(!token){
            this.logger.error(ErrorMessages.INVALID_AUTH_TOKEN_SUPPLIED)
            throw new HttpException(ErrorMessages.INVALID_AUTH_TOKEN_SUPPLIED, HttpStatus.UNAUTHORIZED);
        }


        try {
            const { email } = this.jwt.verifyToken(token);
            return await this.customerRepository.getOneByEmail(email);
        } catch (e) {
            this.logger.error(e.message)
            throw new HttpException(ErrorMessages.INVALID_AUTH_TOKEN_SUPPLIED, HttpStatus.UNAUTHORIZED);
        }
    }

}