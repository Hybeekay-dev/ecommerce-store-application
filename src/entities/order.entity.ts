import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn
} from "typeorm";
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

    @Column("decimal", { precision: 13, scale: 2 })
    totalAmount: number;

    @Column({type: "enum", enum: Status, default: Status.PENDING})
    status: string;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Customer, (customer) => customer.orders, {lazy: true})
    @JoinColumn({name: 'customerId'})
    customer: Customer | null;

    @Column({name: 'customerId'})
    customerId: number

    @OneToMany(() => OrderItem, (item) => item.order)
    items: OrderItem[];

}