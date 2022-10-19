import {ProductService} from "../services/product.service";
import {NextFunction, Request, RequestHandler, Response} from "express";
import {CreateProductDto} from "../utils/shared/dtos/create-product.dto";
import {ResponseDto} from "../utils/shared/dtos/response.dto";
import {ResponseStatus} from "../utils/shared/interfaces/response.interface";
import {SuccessMessages} from "../utils/shared/constants/success-messages.constant";
import HttpStatus from "http-status";

/**
 * @summary Contains all request handler for Product service
 */
export class ProductController{
    private readonly productService: ProductService;

    constructor(
        productService: ProductService
    ) {
        this.productService = productService
    }

    /**
     * @summary Fetch all product controller
     * @api {get} api/v1/products
     * @param req
     * @param res
     * @param next
     * @return {Response}
     */
    getAll: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await this.productService.getAll();
            const resObj = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.PRODUCT_CREATED, response);
            return res.status(HttpStatus.OK).send(resObj);
        }catch (e) {
            return next(e)
        }
    }

    /**
     * @summary Crete product controller
     * @api {post} api/v1/products
     * @param req
     * @param res
     * @param next
     * @return {Response}
     */
    create: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
         try {
             const response = await this.productService.create(req.body as CreateProductDto);
             const resObj = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.PRODUCT_CREATED, response);
             return res.status(HttpStatus.OK).send(resObj);
         }catch (e) {
             return next(e)
         }
    }

}