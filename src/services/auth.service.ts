import {WinstonLogger} from "../utils/logger";
import {LoggerInterface} from "../utils/shared/interfaces/logger.interface";
import {RegisterDto} from "../utils/shared/dtos/register.dto";
import {CustomerRepository} from "../repositories/customer.repository";
import HttpException from "../utils/http-exception";
import {ErrorMessages} from "../utils/shared/constants/error-messages.constant";
import HttpStatus from "http-status";
import {Customer} from "../entities/customer.entity";
import {LoginDto} from "../utils/shared/dtos/login.dto";
import bcrypt from "bcrypt";
import {Jwt} from "../utils/jwt";


/**
 * @summary 'Auth service contains all the logic that authenticates customers'
 */
export class AuthService{
    private customerRepository: CustomerRepository
    private readonly logger: LoggerInterface;
    private readonly jwt: Jwt;

    constructor(
        customerRepository: CustomerRepository,
        logger: WinstonLogger,
        jwt: Jwt
    ) {
        this.customerRepository = customerRepository
        this.logger = logger;
        this.jwt = jwt;
    }



    async login (body: LoginDto){
        const {email, password} = body

        const user = await this.customerRepository.getOneByEmail(email);

        if(!user){
            this.logger.error(ErrorMessages.INVALID_LOGIN);
            throw new HttpException(ErrorMessages.INVALID_LOGIN, HttpStatus.UNAUTHORIZED);
        }

        const passwordCorrect = bcrypt.compareSync(password, user.password);

        if(!passwordCorrect){
            this.logger.error(ErrorMessages.INVALID_LOGIN);
            throw new HttpException(ErrorMessages.INVALID_LOGIN, HttpStatus.UNAUTHORIZED);
        }

        const token = this.jwt.signPayload({ email });

        return {token}

    }

    /**
     * @summary Customer registration
     * @param body {RegisterDto}
     * @return {void}
     */
    async register(body: RegisterDto){

        const {email, name, password} = body;

        const user = await this.customerRepository.getOneByEmail(email);

        console.log(email, user)

        if (user){
            this.logger.error(ErrorMessages.CUSTOMER_EXIST);
            throw new HttpException(ErrorMessages.CUSTOMER_EXIST, HttpStatus.CONFLICT);
        }

        try{
            const customer = new Customer();
            customer.email = email;
            customer.name = name;
            customer.password = password;

             await this.customerRepository.create(customer);

            return;
        }catch (e) {
            this.logger.error(e.message);
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}