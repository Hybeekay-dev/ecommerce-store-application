import {Router} from "express";
import {OrderController} from "../controllers/order.controller";
import {OrderService} from "../services/order.service";
import {OrderRepository} from "../repositories/order.repository";
import {ProductRepository} from "../repositories/product.repository";
import {CustomerRepository} from "../repositories/customer.repository";
import {WinstonLogger} from "../utils/logger";
import {validator} from "../middlewares/validator.middleware";
import {CreateOrderDto} from "../utils/shared/dtos/create-order.dto";

const router = Router();

const orderRepository = new OrderRepository();
const productRepository = new ProductRepository();
const customerRepository = new CustomerRepository();
const logger = new WinstonLogger('Order');

const orderService = new OrderService(orderRepository, productRepository, customerRepository, logger);
const orderController = new OrderController(orderService);

router.get('/', orderController.getAll);
router.post('/', validator(CreateOrderDto), orderController.create);
router.post('/:orderId/items', validator(CreateOrderDto), orderController.update);


export default router;