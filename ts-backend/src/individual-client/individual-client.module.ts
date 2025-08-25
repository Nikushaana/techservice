import { Module } from '@nestjs/common';
import { IndividualClientService } from './individual-client.service';
import { IndividualClientController } from './individual-client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndividualClient } from './entities/individual-client.entity';
import { IndividualClientToken } from 'src/individual-client-token/entities/individual-client-token.entity';
import { ChangeMainInfoModule } from 'src/common/services/change-main-info/change-main-info.module';
import { VerificationCodeModule } from 'src/verification-code/verification-code.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([IndividualClient, IndividualClientToken]),
    ChangeMainInfoModule, VerificationCodeModule
  ],
  providers: [IndividualClientService],
  controllers: [IndividualClientController],
})
export class IndividualClientModule { }
