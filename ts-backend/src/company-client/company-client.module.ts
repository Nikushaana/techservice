import { Module } from '@nestjs/common';
import { CompanyClientController } from './company-client.controller';
import { CompanyClientService } from './company-client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyClient } from './entities/company-client.entity';
import { IndividualClient } from 'src/individual-client/entities/individual-client.entity';
import { VerificationCodeModule } from 'src/verification-code/verification-code.module';
import { ChangeMainInfoModule } from 'src/common/services/change-main-info/change-main-info.module';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyClient]), ChangeMainInfoModule, VerificationCodeModule],
  controllers: [CompanyClientController],
  providers: [CompanyClientService],
})
export class CompanyClientModule { }
