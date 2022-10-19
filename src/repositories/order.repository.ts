import {AppDataSource} from "../utils/data-source";
import {Order} from "../entities/order.entity";
import {OrderItem} from "../entities/order-item.entity";
import {GetOrderQueryDto} from "../utils/shared/dtos/get-order-query.dto";
import {Customer} from "../entities/customer.entity";

/**
 * @summary Order repository
 */
export class OrderRepository{

    async create(order: Order){
        return AppDataSource.manager.save(order);
    }

    async createItem(item: OrderItem){
        return  AppDataSource.manager.save(item);
    }

    async getAll(customerId: number, query: GetOrderQueryDto){

        const {limit, offset, fromAmount, toAmount, sort} = query;


        const builder = AppDataSource.getRepository(Order)
            .createQueryBuilder(`orders`)
            // .leftJoinAndMapMany(`orders.items`, OrderItem, `order_items`, `orders.id = order_items.orderId`)
            .where(`orders.customerId = '${customerId}'`)

        if(fromAmount){
            builder.andWhere(`orders.totalAmount >= '${fromAmount}'`)
        }

        if(toAmount){
            builder.andWhere(`orders.totalAmount <= '${toAmount}'`)
        }

        const [orders, count] = await builder
            .orderBy(`orders.totalAmount`, sort || "ASC")
            .addOrderBy(`orders.id`, 'DESC')
            .limit(limit || 5)
            .offset(offset || 0)
            .getManyAndCount();

        return {orders, count}

    }

    async getOne(id: number){
        const orderRepository = AppDataSource.getRepository(Order);
        return await orderRepository.findOne({where:{id}, relations: {items: true}});
    }

    async getItems(orderId: number){
        const orderRepository = AppDataSource.getRepository(OrderItem);
        return orderRepository.find({where:{orderId}, relations: {product: true}});
    }

    async getOrderItem(orderId: number, productId: number){
        const orderRepository = AppDataSource.getRepository(OrderItem);
        return await orderRepository.findOne({where:{orderId, productId}});
    }

    async updateOrderItem(item: OrderItem){
        return AppDataSource.manager.save(item);
    }

}