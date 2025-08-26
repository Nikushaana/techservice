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
    return this.baseUserService.getUser(companyId, this.companyClientRepo);
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
}
