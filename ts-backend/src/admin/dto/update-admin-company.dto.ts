import { IsBoolean, IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class UpdateAdminCompanyDto {
    @IsOptional()
    @Matches(/^5[0-9]{8}$/, {
        message: 'Phone number must start with 5 and be 9 digits long',
    })
    phone: string;

    @IsOptional()
    @IsString()
    companyAgentName: string;

    @IsOptional()
    @IsString()
    companyAgentLastName: string;

    @IsOptional()
    @IsString()
    companyName: string;

    @IsOptional()
    @IsString()
    companyIdentificationCode: string;

    @IsOptional()
    @IsBoolean()
    status: boolean;

    @IsOptional()
    @IsString()
    @MinLength(6)
    password: string;
}
