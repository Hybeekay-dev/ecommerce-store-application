import {Router} from "express";
import {AuthController} from "../controllers/auth.controller";
import {AuthService} from "../services/auth.service";
import {WinstonLogger} from "../utils/logger";
import {CustomerRepository} from "../repositories/customer.repository";
import {validator} from "../middlewares/validator.middleware";
import {LoginDto} from "../utils/shared/dtos/login.dto";
import {RegisterDto} from "../utils/shared/dtos/register.dto";
import {Jwt} from "../utils/jwt";

const router = Router()

const logger = new WinstonLogger('Auth');
const customerRepository = new CustomerRepository();
const jwt = new Jwt();

const authService = new AuthService(customerRepository, logger, jwt);
const authController = new AuthController(authService);

router.post('/login', validator(LoginDto), authController.login);
router.post('/register', validator(RegisterDto), authController.register);


export default router