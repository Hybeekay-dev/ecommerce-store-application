import {OrderRepository} from "../repositories/order.repository";
import {LoggerInterface} from "../utils/shared/interfaces/logger.interface";
import {WinstonLogger} from "../utils/logger";
import {CreateOrderDto} from "../utils/shared/dtos/create-order.dto";
import {ProductRepository} from "../repositories/product.repository";
import {ErrorMessages} from "../utils/shared/constants/error-messages.constant";
import HttpException from "../utils/http-exception";
import HttpStatus from "http-status";
import {Order} from "../entities/order.entity";
import {CustomerRepository} from "../repositories/customer.repository";
import {OrderItem} from "../entities/order-item.entity";
import {GetOrderQueryDto} from "../utils/shared/dtos/get-order-query.dto";

/**
 * @summary Contains all the logic for customer orders
 */
export class OrderService{
    private readonly orderRepository: OrderRepository;
    private readonly productRepository: ProductRepository;
    private readonly customerRepository: CustomerRepository;
    private readonly logger: LoggerInterface;

    constructor(
        orderRepository: OrderRepository,
        productRepository: ProductRepository,
        customerRepository: CustomerRepository,
        logger: WinstonLogger
    ){
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.customerRepository = customerRepository;
        this.logger = logger;
    }


    async getAll(customerId: number, query: GetOrderQueryDto){
        try{
            return await this.orderRepository.getAll(customerId, query)
        }catch (e) {
            this.logger.error(e.message);
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    /**
     * @summary Create order service
     * @param customerId
     * @param body
     * @return {Order}
     */
    async create(customerId: number, body: CreateOrderDto){
        const {productId, quantity} = body

        const customer = await this.customerRepository.getOneById(customerId);


        const product = await this.productRepository.getOneById(productId);

        if(!product){
            this.logger.error(ErrorMessages.PRODUCT_NOT_FOUND);
            throw new HttpException(ErrorMessages.PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        try{
            const order = new Order();

            order.customer = customer
            order.totalAmount = product.price;

            const newOrder = await this.orderRepository.create(order);

            //go ahead to create item
            const item = new OrderItem();

            item.order = newOrder;
            item.product = product;
            item.quantity = quantity;
            item.price = product.price

            await this.orderRepository.createItem(item);

            return await this.orderRepository.getOne(newOrder.id);



        }catch (e) {
            this.logger.error(e.message);
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(customerId: number, orderId: number | any, body: CreateOrderDto){
        const {productId, quantity} = body

        const customer = await this.customerRepository.getOneById(customerId);


        const product = await this.productRepository.getOneById(productId);

        if(!product){
            this.logger.error(ErrorMessages.PRODUCT_NOT_FOUND);
            throw new HttpException(ErrorMessages.PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        const order = await this.orderRepository.getOne(orderId);

        if(!order){
            this.logger.error(ErrorMessages.ORDER_NOT_FOUND);
            throw new HttpException(ErrorMessages.ORDER_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        const orderItem = await this.orderRepository.getOrderItem(orderId, product.id);

        if (orderItem){
            orderItem.quantity = quantity
            await this.orderRepository.updateOrderItem(orderItem);
        }else{
            const item = new OrderItem();

            item.order = order;
            item.product = product;
            item.price = product.price;
            item.quantity = quantity;

            await this.orderRepository.updateOrderItem(item);
        }
        // Get order items and update the total amount of order
       const items = await this.orderRepository.getItems(orderId);


        let totalOrderAmount = 0;

        for(let item of items){
            totalOrderAmount += Number(item.quantity) * Number(item.product.price)
        }

        order.totalAmount = totalOrderAmount;
        await this.orderRepository.create(order);

        return await this.orderRepository.getOne(orderId);


    }
}