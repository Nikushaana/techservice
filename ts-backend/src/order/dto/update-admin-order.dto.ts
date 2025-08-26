import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from 'src/common/types/order-status.enum';

export class UpdateAdminOrderDto {
    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    categoryId: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    brand: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    model: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    address: string;

    @IsOptional()
    @IsEnum(OrderStatus)
    status: OrderStatus
}
