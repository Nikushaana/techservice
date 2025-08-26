import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificationCode } from 'src/verification-code/entities/verification-code.entity';
import { VerificationCodeModule } from 'src/verification-code/verification-code.module';
import { BaseUserService } from './base-user.service';

@Module({
    imports: [TypeOrmModule.forFeature([VerificationCode]), VerificationCodeModule],
    providers: [BaseUserService],
    exports: [BaseUserService],
})
export class BaseUserModule { }