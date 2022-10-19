import {LoggerInterface} from "../utils/shared/interfaces/logger.interface";
import {WinstonLogger} from "../utils/logger";
import {ProductRepository} from "../repositories/product.repository";
import {CreateProductDto} from "../utils/shared/dtos/create-product.dto";
import {ErrorMessages} from "../utils/shared/constants/error-messages.constant";
import HttpException from "../utils/http-exception";
import HttpStatus from "http-status";
import {Product} from "../entities/product.entity";

/**
 * @summary Contains all the logic pertaining to Products
 */
export class ProductService{
    private readonly productRepository: ProductRepository;
    private readonly logger: LoggerInterface;

    constructor(
        productRepository: ProductRepository,
        logger: WinstonLogger
    ) {
        this.productRepository = productRepository;
        this.logger = logger;
    }

    /**
     * @summary Create product serve
     * @param body {CreateProductDto}
     * @throws {HttpStatus}
     * @return {Product}
     */
    async create(body: CreateProductDto){
        const {name, price} = body;

        const product = await this.productRepository.getOneByName(name);

        if(product){
            this.logger.error(ErrorMessages.PRODUCT_WITH_NAME_EXIST);
            throw new HttpException(ErrorMessages.PRODUCT_WITH_NAME_EXIST, HttpStatus.CONFLICT);
        }

        try{
            const product = new Product();
            product.name = body.name;
            product.price = body.price;

            return await this.productRepository.create(product);
        }catch (e) {
            this.logger.error(e.message);
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @summary Get all products
     * @return {Product}
     */
    async getAll(){
        try{
            return await this.productRepository.geAll();
        }catch (e) {
            this.logger.error(e.message);
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}