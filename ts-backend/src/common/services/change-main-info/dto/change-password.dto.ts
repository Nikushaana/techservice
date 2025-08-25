import { IsOptional, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
    @IsOptional()
    @IsString()
    oldPassword: string;

    @IsOptional()
    @IsString()
    @MinLength(6)
    newPassword: string;
}
