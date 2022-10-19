import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn
} from "typeorm";
import {Order} from "./order.entity";
import bcrypt from "bcrypt";

@Entity('customers')
export class Customer{

    @PrimaryColumn()
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Order, (order) => order.customer)
    orders: Order[]

    @BeforeInsert()
    encryptPassword(){
        const salt =  bcrypt.genSaltSync(10);
        this.password =  bcrypt.hashSync(this.password, salt);
    }
}