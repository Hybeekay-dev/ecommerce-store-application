import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./product.entity";
import {Order} from "./order.entity";


@Entity('order_items')
export class OrderItem{

    @PrimaryColumn()
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "decimal"})
    price: number | string;

    @Column({type: "integer"})
    quantity: number;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Product, (product) => product.items)
    @JoinColumn({name: "productId"})
    product: Product;

    @Column({name: "productId"})
    productId: number;

    @ManyToOne(() => Order, (order) => order.items)
    @JoinColumn({name: "orderId"})
    order: Order;

    @JoinColumn({name: "orderId"})
    orderId: number;

}