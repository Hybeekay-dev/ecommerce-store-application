import {Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {OrderItem} from "./order-item.entity";

@Entity('products')
export class Product{

    @PrimaryColumn()
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column("decimal", { precision: 13, scale: 2 })
    price: number;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

    @OneToMany(() => OrderItem, (item) => item.product)
    items: OrderItem[];

}