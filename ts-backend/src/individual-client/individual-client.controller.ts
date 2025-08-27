import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { IndividualClientService } from './individual-client.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import type { RequestInfo } from 'src/common/types/request-info';
import { UpdateIndividualDto } from './dto/update-individual.dto';
import { ChangePasswordDto } from 'src/common/services/base-user/dto/change-password.dto';
import { ChangeNumberDto, PhoneDto } from 'src/verification-code/dto/verification-code.dto';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';
import { UpdateUserOrderDto } from 'src/order/dto/update-user-order.dto';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';
import { UpdateAddressDto } from 'src/address/dto/update-address.dto';

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

  // order

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('individual_client')
  @Post('create-order')
  async createOrder(@Req() req: RequestInfo, @Body() createOrderDto: CreateOrderDto) {
    return this.individualClientService.createOrder(req.user.id, createOrderDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('individual_client')
  @Get('orders')
  async getOrders(@Req() req: RequestInfo) {
    return this.individualClientService.getOrders(req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('individual_client')
  @Get('orders/:id')
  async getOneOrder(@Req() req: RequestInfo, @Param('id', ParseIntPipe) id: number) {
    return this.individualClientService.getOneOrder(req.user.id, id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('individual_client')
  @Patch('orders/:id')
  async updateOneOrder(@Req() req: RequestInfo, @Param('id', ParseIntPipe) id: number, @Body() updateUserOrderDto: UpdateUserOrderDto) {
    return this.individualClientService.updateOneOrder(req.user.id, id, updateUserOrderDto);
  }

  // address

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('individual_client')
  @Post('create-address')
  async createAddress(@Req() req: RequestInfo, @Body() createAddressDto: CreateAddressDto) {
    return this.individualClientService.createAddress(req.user.id, createAddressDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('individual_client')
  @Get('addresses')
  async getAddresses(@Req() req: RequestInfo) {
    return this.individualClientService.getAddresses(req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('individual_client')
  @Get('addresses/:id')
  async getOneAddress(@Req() req: RequestInfo, @Param('id', ParseIntPipe) id: number) {
    return this.individualClientService.getOneAddress(req.user.id, id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('individual_client')
  @Patch('addresses/:id')
  async updateOneAddress(@Req() req: RequestInfo, @Param('id', ParseIntPipe) id: number, @Body() updateAddressDto: UpdateAddressDto) {
    return this.individualClientService.updateOneAddress(req.user.id, id, updateAddressDto);
  }
}
