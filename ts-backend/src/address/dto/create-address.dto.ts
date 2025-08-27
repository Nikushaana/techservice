import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
    @IsOptional()
    @IsString()
    apartment_number: string;

    @IsOptional()
    @IsString()
    building_floor: string;

    @IsOptional()
    @IsString()
    building_entrance: string;

    @IsString()
    @IsNotEmpty()
    building_number: string;

    @IsString()
    @IsNotEmpty()
    street: string;

    @IsString()
    @IsNotEmpty()
    city: string;
}
