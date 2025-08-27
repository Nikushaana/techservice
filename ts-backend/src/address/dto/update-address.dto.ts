import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAddressDto {
    @IsOptional()
    @IsString()
    apartment_number: string;

    @IsOptional()
    @IsString()
    building_floor: string;

    @IsOptional()
    @IsString()
    building_entrance: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    building_number: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    street: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    city: string;
}
