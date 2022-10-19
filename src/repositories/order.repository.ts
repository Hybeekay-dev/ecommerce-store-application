import {AppDataSource} from "../utils/data-source";
import {Order} from "../entities/order.entity";
import {OrderItem} from "../entities/order-item.entity";
import {GetOrderQueryDto} from "../utils/shared/dtos/get-order-query.dto";

export class OrderRepository{

    async create(order: Order){
        return AppDataSource.manager.save(order);
    }

    async createItem(item: OrderItem){
        return  AppDataSource.manager.save(item);
    }

    async getOne(id: number){
        const orderRepository = AppDataSource.getRepository(Order);
        return await orderRepository.findOne({where:{id}});
    }

    async getAll(customerId: number, query: GetOrderQueryDto){

        const {limit, offset, sortOrder, sortBy} = query;

        return AppDataSource.getRepository(Order)
            .createQueryBuilder(`orders`)
            .leftJoinAndMapMany(`orders.items`, OrderItem, `order_items`, `orders.id = order_items.orderId`)
            .leftJoinAndSelect(`orders.items`, ``, ``,)
            // .where(`orders.customerId = '${customerId}'`)
            .getManyAndCount()

    }
}