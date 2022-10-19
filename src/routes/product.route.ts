import {Router} from "express";
import {ProductController} from "../controllers/product.controller";
import {ProductService} from "../services/product.service";
import {ProductRepository} from "../repositories/product.repository";
import {WinstonLogger} from "../utils/logger";
import {validator} from "../middlewares/validator.middleware";
import {CreateProductDto} from "../utils/shared/dtos/create-product.dto";

const router = Router();

const productRepository = new ProductRepository();
const logger = new WinstonLogger('Product');

const productService = new ProductService(productRepository, logger);
const productController = new ProductController(productService)

router.get('/', productController.getAll);
router.post('/', validator(CreateProductDto), productController.create);


export default router;