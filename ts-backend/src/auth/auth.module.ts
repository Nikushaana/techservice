import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/admin/entities/admin.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AdminToken } from 'src/admin-token/entities/admin-token.entity';
import { IndividualClient } from 'src/individual-client/entities/individual-client.entity';
import { IndividualClientToken } from 'src/individual-client-token/entities/individual-client-token.entity';
import { VerificationCode } from 'src/verification-code/entities/verification-code.entity';
import {
  AdminAuthController,
  CompanyAuthController,
  IndividualAuthController,
} from './auth.controller';
import { CompanyClient } from 'src/company-client/entities/company-client.entity';
import { CompanyClientToken } from 'src/company-client-token/entities/company-client-token.entity';
import { VerificationCodeModule } from 'src/verification-code/verification-code.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Admin,
      AdminToken,
      IndividualClient,
      IndividualClientToken,
      CompanyClient,
      CompanyClientToken,
      VerificationCode,
    ]),
    VerificationCodeModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '1d',
        },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [
    AdminAuthController,
    IndividualAuthController,
    CompanyAuthController,
  ],
})
export class AuthModule {}
