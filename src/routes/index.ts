import {Router} from "express";
import {HomeController} from "../controllers/home.controller";
import AuthRoute from "./auth.route";
import ProductRoute from "./product.route";
import OrderRoute from "./order.route";
import {AuthMiddleware} from "../middlewares/auth.middleware";
import {CustomerRepository} from "../repositories/customer.repository";
import {Jwt} from "../utils/jwt";
import {WinstonLogger} from "../utils/logger";

const router = Router();
const homeController = new HomeController();

const customerRepository = new CustomerRepository();
const jwt = new Jwt();
const logger = new WinstonLogger('Authentication');
const authMiddleware = new AuthMiddleware(customerRepository, jwt, logger);



router.get('/', homeController.index);
router.use('/auth', AuthRoute);
router.use('/products', ProductRoute);

/**
 *  Authenticated Routes
 */
router.use(authMiddleware.guide);
router.use('/orders', OrderRoute);


export default router;