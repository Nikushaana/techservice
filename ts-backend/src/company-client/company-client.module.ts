import { Module } from '@nestjs/common';
import { CompanyClientController } from './company-client.controller';
import { CompanyClientService } from './company-client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyClient } from './entities/company-client.entity';
import { VerificationCodeModule } from 'src/verification-code/verification-code.module';
import { BaseUserModule } from 'src/common/services/base-user/base-user.module';
import { TechnicianToken } from 'src/technician-token/entities/technician-token.entity';
import { CompanyClientToken } from 'src/company-client-token/entities/company-client-token.entity';
import { IndividualClientToken } from 'src/individual-client-token/entities/individual-client-token.entity';
import { AdminToken } from 'src/admin-token/entities/admin-token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyClient, AdminToken,
    IndividualClientToken,
    CompanyClientToken,
    TechnicianToken]), BaseUserModule, VerificationCodeModule],
  controllers: [CompanyClientController],
  providers: [CompanyClientService],
})
export class CompanyClientModule { }
