import { IsBoolean, IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class UpdateAdminIndividualDto {
    @IsOptional()
    @Matches(/^5[0-9]{8}$/, {
        message: 'Phone number must start with 5 and be 9 digits long',
    })
    phone: string;

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    lastName: string;

    @IsOptional()
    @IsBoolean()
    status: boolean;

    @IsOptional()
    @IsString()
    @MinLength(6)
    password: string;
}
