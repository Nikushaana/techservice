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
import { ChangeMainInfoService } from 'src/common/services/change-main-info/change-main-info.service';
import { ChangePasswordDto } from 'src/common/services/change-main-info/dto/change-password.dto';

@Injectable()
export class CompanyClientService {
  constructor(
    @InjectRepository(CompanyClient)
    private companyClientRepo: Repository<CompanyClient>,

    private readonly changeMainInfoService: ChangeMainInfoService,

    private readonly verificationCodeService: VerificationCodeService,
  ) { }

  // company

  async getCompany(companyId: number) {
    const findCompany = await this.companyClientRepo.findOne({
      where: { id: companyId },
    });

    if (!findCompany) throw new NotFoundException('Company client not found');

    return instanceToPlain(findCompany);
  }

  async updateCompany(companyId: number, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.companyClientRepo.findOne({ where: { id: companyId } });
    if (!company) throw new NotFoundException('Company not found');

    const updatedCompany = this.companyClientRepo.merge(company, updateCompanyDto);

    await this.companyClientRepo.save(updatedCompany);

    return {
      message: 'Company updated successfully',
      user: instanceToPlain(updatedCompany),
    };
  }

  async changePassword(companyId: number, changePasswordDto: ChangePasswordDto) {
    return this.changeMainInfoService.changePassword(this.companyClientRepo, companyId, changePasswordDto);
  }

  // send and verify sent code

  async sendChangeNumberCode(phoneDto: PhoneDto) {
    const result = await this.verificationCodeService.sendCode(phoneDto, 'change-number', 'company');

    return { message: `Code ${result.code} sent to ${result.phone}` };
  }

  async changeNumber(companyId: number, changeNumberDto: ChangeNumberDto) {
    return this.changeMainInfoService.changeNumber(this.companyClientRepo, companyId, changeNumberDto);
  }
}
