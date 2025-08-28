import { Module } from '@nestjs/common';
import { TechnicianService } from './technician.service';
import { TechnicianController } from './technician.controller';
import { BaseUserModule } from 'src/common/services/base-user/base-user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Technician } from './entities/technician.entity';
import { VerificationCodeModule } from 'src/verification-code/verification-code.module';
import { AdminToken } from 'src/admin-token/entities/admin-token.entity';
import { IndividualClientToken } from 'src/individual-client-token/entities/individual-client-token.entity';
import { CompanyClientToken } from 'src/company-client-token/entities/company-client-token.entity';
import { TechnicianToken } from 'src/technician-token/entities/technician-token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Technician, AdminToken,
      IndividualClientToken,
      CompanyClientToken,
      TechnicianToken]),
    BaseUserModule, VerificationCodeModule
  ],
  providers: [TechnicianService],
  controllers: [TechnicianController]
})
export class TechnicianModule { }
