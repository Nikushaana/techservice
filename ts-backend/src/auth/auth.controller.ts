import {
  Body,
  Controller,
  Delete,
  Headers,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAdminDto } from './dto/login-admin.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { RegisterIndividualClientDto } from './dto/register-individual-client.dto';
import {
  PhoneDto,
  ResetPasswordDto,
  VerifyCodeDto,
} from 'src/verification-code/dto/verification-code.dto';
import { RegisterCompanyClientDto } from './dto/register-company-client.dto';
import { LoginClientDto } from './dto/login-client.dto';

@Controller('auth/admin')
export class AdminAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerAdmin(@Body() dto: RegisterAdminDto) {
    return this.authService.adminRegister(dto);
  }

  @Post('login')
  async AdminLogin(@Body() loginAdminDto: LoginAdminDto) {
    return this.authService.adminLogin(loginAdminDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete('logout')
  async AdminLogout(@Headers('authorization') authHeader: string) {
    return this.authService.adminLogout(authHeader);
  }
}

@Controller('auth/individual')
export class IndividualAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-register-code')
  async IndividualSendRegisterCode(@Body() phoneDto: PhoneDto) {
    return this.authService.sendRegisterCode(phoneDto);
  }

  @Post('verify-register-code')
  async IndividualVerifyRegisterCode(@Body() verifyCodeDto: VerifyCodeDto) {
    return this.authService.verifyRegisterCode(verifyCodeDto);
  }

  @Post('register')
  async IndividualRegister(
    @Body() registerIndividualClientDto: RegisterIndividualClientDto,
  ) {
    return this.authService.register(registerIndividualClientDto, 'individual');
  }

  @Post('login')
  async IndividualLogin(@Body() loginClientDto: LoginClientDto) {
    return this.authService.login(loginClientDto, 'individual');
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('individual_client')
  @Delete('logout')
  async IndividualLogout(@Headers('authorization') authHeader: string) {
    return this.authService.logout(authHeader, 'individual');
  }

  @Post('send-reset-password-code')
  async IndividualSendResetPasswordCode(@Body() phoneDto: PhoneDto) {
    return this.authService.sendResetPasswordCode(phoneDto, 'individual');
  }

  @Post('reset-password')
  async IndividualResetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto, 'individual');
  }
}

@Controller('auth/company')
export class CompanyAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-register-code')
  async CompanySendRegisterCode(@Body() phoneDto: PhoneDto) {
    return this.authService.sendRegisterCode(phoneDto);
  }

  @Post('verify-register-code')
  async CompanyVerifyRegisterCode(@Body() verifyCodeDto: VerifyCodeDto) {
    return this.authService.verifyRegisterCode(verifyCodeDto);
  }

  @Post('register')
  async CompanyRegister(
    @Body() registerCompanyClientDto: RegisterCompanyClientDto,
  ) {
    return this.authService.register(registerCompanyClientDto, 'company');
  }

  @Post('login')
  async CompanyLogin(@Body() loginClientDto: LoginClientDto) {
    return this.authService.login(loginClientDto, 'company');
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('company_client')
  @Delete('logout')
  async CompanyLogout(@Headers('authorization') authHeader: string) {
    return this.authService.logout(authHeader, 'company');
  }

  @Post('send-reset-password-code')
  async CompanySendResetPasswordCode(@Body() phoneDto: PhoneDto) {
    return this.authService.sendResetPasswordCode(phoneDto, 'company');
  }

  @Post('reset-password')
  async CompanyResetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto, 'company');
  }
}
