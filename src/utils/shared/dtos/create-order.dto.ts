import {IsDefined, IsNotEmpty, IsNumber} from "class-validator";

export class CreateOrderDto{

    @IsNumber()
    @IsDefined()
    @IsNotEmpty()
    productId: number;

    @IsNumber()
    @IsDefined()
    @IsNotEmpty()
    quantity: number;
}