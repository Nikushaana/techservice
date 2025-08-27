import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyClient } from './entities/company-client.entity';
import { Not, Repository } from 'typeorm';
import { instanceToPlain } from 'class-transformer';
import { UpdateCompanyDto } from './dto/update-company.dto';
import * as bcrypt from 'bcrypt';
import { IndividualClient } from 'src/individual-client/entities/individual-client.entity';
import { ChangeNumberDto, PhoneDto, VerifyCodeDto } from 'src/verification-code/dto/verification-code.dto';
import { VerificationCodeService } from 'src/verification-code/verification-code.service';
import { VerificationCode } from 'src/verification-code/entities/verification-code.entity';
import { ChangePasswordDto } from 'src/common/services/base-user/dto/change-password.dto';
import { BaseUserService } from 'src/common/services/base-user/base-user.service';
import { Category } from 'src/category/entities/category.entity';
import { Order } from 'src/order/entities/order.entity';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';
import { UpdateUserOrderDto } from 'src/order/dto/update-user-order.dto';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';
import { UpdateAddressDto } from 'src/address/dto/update-address.dto';

@Injectable()
export class CompanyClientService {
  constructor(
    @InjectRepository(CompanyClient)
    private companyClientRepo: Repository<CompanyClient>,

    private readonly baseUserService: BaseUserService,

    private readonly verificationCodeService: VerificationCodeService,
  ) { }

  // company

  async getCompany(companyId: number) {
    const findCompany = await this.baseUserService.getUser(companyId, this.companyClientRepo);

    return instanceToPlain(findCompany);
  }

  async updateCompany(companyId: number, updateCompanyDto: UpdateCompanyDto) {
    return this.baseUserService.updateUser(companyId, this.companyClientRepo, updateCompanyDto);
  }

  async changePassword(companyId: number, changePasswordDto: ChangePasswordDto) {
    return this.baseUserService.changePassword(this.companyClientRepo, companyId, changePasswordDto);
  }

  // send and verify sent code

  async sendChangeNumberCode(phoneDto: PhoneDto) {
    const result = await this.verificationCodeService.sendCode(phoneDto, 'change-number', 'company');

    return { message: `Code ${result.code} sent to ${result.phone}` };
  }

  async changeNumber(companyId: number, changeNumberDto: ChangeNumberDto) {
    return this.baseUserService.changeNumber(this.companyClientRepo, companyId, changeNumberDto);
  }

  // create order

  async createOrder(companyId: number, createOrderDto: CreateOrderDto) {
    return this.baseUserService.createOrder(companyId, this.companyClientRepo, createOrderDto);
  }

  async getOrders(companyId: number) {
    return this.baseUserService.getOrders(companyId, this.companyClientRepo);
  }

  async getOneOrder(companyId: number, id: number) {
    return this.baseUserService.getOneOrder(companyId, id, this.companyClientRepo);
  }

  async updateOneOrder(companyId: number, id: number, updateUserOrderDto: UpdateUserOrderDto) {
    return this.baseUserService.updateOneOrder(companyId, id, this.companyClientRepo, updateUserOrderDto);
  }

  // create address

  async createAddress(companyId: number, createAddressDto: CreateAddressDto) {
    return this.baseUserService.createAddress(companyId, this.companyClientRepo, createAddressDto);
  }

  async getAddresses(companyId: number) {
    return this.baseUserService.getAddresses(companyId, this.companyClientRepo);
  }

  async getOneAddress(companyId: number, id: number) {
    return this.baseUserService.getOneAddress(companyId, id, this.companyClientRepo);
  }

  async updateOneAddress(companyId: number, id: number, updateAddressDto: UpdateAddressDto) {
    return this.baseUserService.updateOneAddress(companyId, id, this.companyClientRepo, updateAddressDto);
  }
}
