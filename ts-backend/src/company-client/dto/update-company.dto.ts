import { IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class UpdateCompanyDto {
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
}
