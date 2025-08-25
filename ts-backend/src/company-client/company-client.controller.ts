import { Body, Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CompanyClientService } from './company-client.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import type { RequestInfo } from 'src/common/types/request-info';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ChangeNumberDto, PhoneDto } from 'src/verification-code/dto/verification-code.dto';
import { ChangePasswordDto } from 'src/common/services/change-main-info/dto/change-password.dto';

@Controller('company')
export class CompanyClientController {
  constructor(private readonly companyClientService: CompanyClientService) { }

  // company

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('company_client')
  @Get('')
  async getIndividual(@Req() req: RequestInfo) {
    return this.companyClientService.getCompany(req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('company_client')
  @Patch('')
  async updateCompany(@Req() req: RequestInfo, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyClientService.updateCompany(req.user.id, updateCompanyDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('company_client')
  @Patch('change-password')
  async changePassword(@Req() req: RequestInfo, @Body() changePasswordDto: ChangePasswordDto) {
    return this.companyClientService.changePassword(req.user.id, changePasswordDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('company_client')
  @Post('send-change-number-code')
  async sendChangeNumberCode(@Body() phoneDto: PhoneDto) {
    return this.companyClientService.sendChangeNumberCode(phoneDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('company_client')
  @Post('change-number')
  async changeNumber(@Req() req: RequestInfo, @Body() changeNumberDto: ChangeNumberDto) {
    return this.companyClientService.changeNumber(req.user.id, changeNumberDto);
  }
}
