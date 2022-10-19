import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export enum SortOrder {
    DESC = 'DESC',
    ASC = 'ASC',
}

export enum SortFields {
    AMOUNT = 'totalAmount',
    CREATED_DATE = 'createdAt',
    UPDATED_DATE = 'updatedAt',
}

export class GetOrderQueryDto{
    @IsOptional()
    @IsNumber()
    limit: number;

    @IsOptional()
    @IsNumber()
    offset: number;

    @IsOptional()
    @IsNumber()
    fromAmount: string;

    @IsOptional()
    @IsNumber()
    toAmount: string;

    @IsOptional()
    @IsEnum(SortOrder)
    sort: SortOrder
}