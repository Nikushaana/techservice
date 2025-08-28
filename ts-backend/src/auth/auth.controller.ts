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
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { RegisterAdminDto } from './dto/register-admin.dto';
import {
  PhoneDto,
  ResetPasswordDto,
  VerifyCodeDto,
} from 'src/verification-code/dto/verification-code.dto';
import { RegisterCompanyClientDto } from './dto/register-company-client.dto';
import { RegisterIndividualClientOrTechnicianDto } from './dto/register-individual-client-or-technician.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { TokenValidationGuard } from './guards/token-validation.guard';

@Controller('auth/admin')
export class AdminAuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async registerAdmin(@Body() dto: RegisterAdminDto) {
    return this.authService.adminRegister(dto);
  }

  @Post('login')
  async AdminLogin(@Body() loginAdminDto: LoginAdminDto) {
    return this.authService.adminLogin(loginAdminDto);
  }

  @UseGuards(TokenValidationGuard, RolesGuard)
  @Roles('admin')
  @Delete('logout')
  async AdminLogout(@Headers('authorization') authHeader: string) {
    return this.authService.adminLogout(authHeader);
  }
}

@Controller('auth/individual')
export class IndividualAuthController {
  constructor(private readonly authService: AuthService) { }

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
    @Body() registerIndividualClientOrTechnicianDto: RegisterIndividualClientOrTechnicianDto,
  ) {
    return this.authService.register(registerIndividualClientOrTechnicianDto, 'individual');
  }

  @Post('login')
  async IndividualLogin(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto, 'individual');
  }

  @UseGuards(TokenValidationGuard, RolesGuard)
  @Roles('individual')
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
  constructor(private readonly authService: AuthService) { }

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
  async CompanyLogin(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto, 'company');
  }

  @UseGuards(TokenValidationGuard, RolesGuard)
  @Roles('company')
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

@Controller('auth/technician')
export class TechnicianAuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(TokenValidationGuard, RolesGuard)
  @Roles('admin')
  @Post('send-register-code')
  async TechnicianSendRegisterCode(@Body() phoneDto: PhoneDto) {
    return this.authService.sendRegisterCode(phoneDto);
  }

  @UseGuards(TokenValidationGuard, RolesGuard)
  @Roles('admin')
  @Post('verify-register-code')
  async TechnicianVerifyRegisterCode(@Body() verifyCodeDto: VerifyCodeDto) {
    return this.authService.verifyRegisterCode(verifyCodeDto);
  }

  @UseGuards(TokenValidationGuard, RolesGuard)
  @Roles('admin')
  @Post('register')
  async TechnicianRegister(
    @Body() registerIndividualClientOrTechnicianDto: RegisterIndividualClientOrTechnicianDto,
  ) {
    return this.authService.register(registerIndividualClientOrTechnicianDto, 'technician');
  }

  @Post('login')
  async TechnicianLogin(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto, 'technician');
  }

  @UseGuards(TokenValidationGuard, RolesGuard)
  @Roles('technician')
  @Delete('logout')
  async TechnicianLogout(@Headers('authorization') authHeader: string) {
    return this.authService.logout(authHeader, 'technician');
  }

  @Post('send-reset-password-code')
  async TechnicianSendResetPasswordCode(@Body() phoneDto: PhoneDto) {
    return this.authService.sendResetPasswordCode(phoneDto, 'technician');
  }

  @Post('reset-password')
  async TechnicianResetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto, 'technician');
  }
}
