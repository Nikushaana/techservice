import { Module } from '@nestjs/common';
import { VerificationCodeService } from './verification-code.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndividualClient } from 'src/individual-client/entities/individual-client.entity';
import { CompanyClient } from 'src/company-client/entities/company-client.entity';
import { VerificationCode } from './entities/verification-code.entity';

@Module({
    imports: [TypeOrmModule.forFeature([IndividualClient, CompanyClient, VerificationCode])],
    providers: [VerificationCodeService],
    exports: [VerificationCodeService],
})
export class VerificationCodeModule { }