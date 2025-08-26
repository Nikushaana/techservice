import { IsNotEmpty, IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class UpdateIndividualDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    lastName: string;
}
