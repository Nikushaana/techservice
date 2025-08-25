import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { IndividualClient } from 'src/individual-client/entities/individual-client.entity';
import { CompanyClient } from 'src/company-client/entities/company-client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, IndividualClient, CompanyClient])],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule { }
