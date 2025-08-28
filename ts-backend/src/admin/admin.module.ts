import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { IndividualClient } from 'src/individual-client/entities/individual-client.entity';
import { CompanyClient } from 'src/company-client/entities/company-client.entity';
import { Order } from 'src/order/entities/order.entity';
import { Category } from 'src/category/entities/category.entity';
import { BaseUserModule } from 'src/common/services/base-user/base-user.module';
import { Address } from 'src/address/entities/address.entity';
import { Technician } from 'src/technician/entities/technician.entity';
import { CompanyClientToken } from 'src/company-client-token/entities/company-client-token.entity';
import { IndividualClientToken } from 'src/individual-client-token/entities/individual-client-token.entity';
import { TechnicianToken } from 'src/technician-token/entities/technician-token.entity';
import { AdminToken } from 'src/admin-token/entities/admin-token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, AdminToken, IndividualClient, IndividualClientToken, CompanyClient, CompanyClientToken, Technician, TechnicianToken, Order, Category, Address]), BaseUserModule],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule { }
