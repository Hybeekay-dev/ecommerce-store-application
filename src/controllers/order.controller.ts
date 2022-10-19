import {NextFunction, Request, RequestHandler, Response} from "express";
import {OrderService} from "../services/order.service";
import {CreateOrderDto} from "../utils/shared/dtos/create-order.dto";
import {ResponseDto} from "../utils/shared/dtos/response.dto";
import {ResponseStatus} from "../utils/shared/interfaces/response.interface";
import {SuccessMessages} from "../utils/shared/constants/success-messages.constant";
import HttpStatus from "http-status";
import {GetOrderQueryDto} from "../utils/shared/dtos/get-order-query.dto";

/**
 * @summary Contains request handlers for  orders service
 */
export class OrderController{
    private readonly orderService: OrderService;

    constructor(
        orderService: OrderService
    ) {
        this.orderService = orderService;
    }

    /**
     * @summary Handles retrieving customers orders
     * @api {get} /api/v1/orders
     * @param req
     * @param res
     * @param next
     * @return {Response}
     */
    getAll: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const customerId = req.user.id;
            const response = await this.orderService.getAll(customerId, req.query as unknown as GetOrderQueryDto);
            const resObj = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.ORDER_RETRIEVED, response);
            return res.status(HttpStatus.OK).send(resObj);
        }catch (e){
            return next(e)
        }
    }

    /**
     * @summary Create new record for customer order
     * @api {post} /api/v1/orders
     * @param req
     * @param res
     * @param next
     * @return {Response}
     */
    create: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const customerId = req.user.id;
            const response = await this.orderService.create(customerId, req.body as CreateOrderDto);
            const resObj = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.ORDER_CREATED);
            return res.status(HttpStatus.OK).send(resObj);
        }catch (e){
            return next(e)
        }
    }

    /**
     * @summary Add items to customer order
     * @api {post} /api/v1/orders/:orderId/items
     * @param req
     * @param res
     * @param next
     * @return {Response}
     */
    update: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const customerId = req.user.id;
            const orderId = req.params.orderId;
            const response = await this.orderService.update(customerId, orderId, req.body as CreateOrderDto);
            const resObj = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.ITEM_ADDED, response);
            return res.status(HttpStatus.OK).send(resObj);
        }catch (e) {
            return next(e)
        }
    }
}