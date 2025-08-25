import { Module } from '@nestjs/common';
import { ChangeMainInfoService } from './change-main-info.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificationCode } from 'src/verification-code/entities/verification-code.entity';
import { VerificationCodeModule } from 'src/verification-code/verification-code.module';

@Module({
    imports: [TypeOrmModule.forFeature([VerificationCode]), VerificationCodeModule],
    providers: [ChangeMainInfoService],
    exports: [ChangeMainInfoService],
})
export class ChangeMainInfoModule { }