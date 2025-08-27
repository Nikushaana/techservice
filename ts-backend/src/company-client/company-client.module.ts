import { Module } from '@nestjs/common';
import { CompanyClientController } from './company-client.controller';
import { CompanyClientService } from './company-client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyClient } from './entities/company-client.entity';
import { IndividualClient } from 'src/individual-client/entities/individual-client.entity';
import { VerificationCodeModule } from 'src/verification-code/verification-code.module';
import { BaseUserModule } from 'src/common/services/base-user/base-user.module';
import { Order } from 'src/order/entities/order.entity';
import { Category } from 'src/category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyClient]), BaseUserModule, VerificationCodeModule],
  controllers: [CompanyClientController],
  providers: [CompanyClientService],
})
export class CompanyClientModule { }
