import { IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class UpdateIndividualDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    lastName: string;
}
