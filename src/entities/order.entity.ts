import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {OrderItem} from "./order-item.entity";
import {Customer} from "./customer.entity";

export enum Status{
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED",
}

@Entity('orders')
export class Order{

    @PrimaryColumn()
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "decimal"})
    totalAmount: number | string;

    @Column({type: "enum", enum: Status, default: Status.PENDING})
    status: string;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Customer, (customer) => customer.orders)
    customer: Customer | null;

    @OneToMany(() => OrderItem, (item) => item.order)
    items: OrderItem[];

}