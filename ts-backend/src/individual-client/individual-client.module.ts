import { Module } from '@nestjs/common';
import { IndividualClientService } from './individual-client.service';
import { IndividualClientController } from './individual-client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndividualClient } from './entities/individual-client.entity';
import { IndividualClientToken } from 'src/individual-client-token/entities/individual-client-token.entity';
import { VerificationCodeModule } from 'src/verification-code/verification-code.module';
import { BaseUserModule } from 'src/common/services/base-user/base-user.module';
import { Order } from 'src/order/entities/order.entity';
import { Category } from 'src/category/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([IndividualClient, IndividualClientToken]),
    BaseUserModule, VerificationCodeModule
  ],
  providers: [IndividualClientService],
  controllers: [IndividualClientController],
})
export class IndividualClientModule { }
