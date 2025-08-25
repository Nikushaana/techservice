import { Body, Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { IndividualClientService } from './individual-client.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import type { RequestInfo } from 'src/common/types/request-info';
import { UpdateIndividualDto } from './dto/update-individual.dto';
import { ChangePasswordDto } from 'src/common/services/change-main-info/dto/change-password.dto';
import { ChangeNumberDto, PhoneDto } from 'src/verification-code/dto/verification-code.dto';

@Controller('individual')
export class IndividualClientController {
  constructor(
    private readonly individualClientService: IndividualClientService,
  ) { }

  // individual

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('individual_client')
  @Get('')
  async getIndividual(@Req() req: RequestInfo) {
    return this.individualClientService.getIndividual(req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('individual_client')
  @Patch('')
  async updateIndividual(@Req() req: RequestInfo, @Body() updateIndividualDto: UpdateIndividualDto) {
    return this.individualClientService.updateIndividual(req.user.id, updateIndividualDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('individual_client')
  @Patch('change-password')
  async changePassword(@Req() req: RequestInfo, @Body() changePasswordDto: ChangePasswordDto) {
    return this.individualClientService.changePassword(req.user.id, changePasswordDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('individual_client')
  @Post('send-change-number-code')
  async sendChangeNumberCode(@Body() phoneDto: PhoneDto) {
    return this.individualClientService.sendChangeNumberCode(phoneDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('individual_client')
  @Post('change-number')
  async changeNumber(@Req() req: RequestInfo, @Body() changeNumberDto: ChangeNumberDto) {
    return this.individualClientService.changeNumber(req.user.id, changeNumberDto);
  }
}
