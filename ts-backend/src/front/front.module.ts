import { Module } from '@nestjs/common';
import { FrontService } from './front.service';
import { FrontController } from './front.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Technician } from 'src/technician/entities/technician.entity';
import { BaseUserModule } from 'src/common/services/base-user/base-user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Technician]), BaseUserModule],
  providers: [FrontService],
  controllers: [FrontController]
})
export class FrontModule { }
