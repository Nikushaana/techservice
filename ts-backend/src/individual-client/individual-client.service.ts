import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IndividualClient } from './entities/individual-client.entity';
import { Not, Repository } from 'typeorm';
import { instanceToPlain } from 'class-transformer';
import { UpdateIndividualDto } from './dto/update-individual.dto';
import { ChangeMainInfoService } from 'src/common/services/change-main-info/change-main-info.service';
import { ChangePasswordDto } from 'src/common/services/change-main-info/dto/change-password.dto';
import { ChangeNumberDto, PhoneDto } from 'src/verification-code/dto/verification-code.dto';
import { VerificationCodeService } from 'src/verification-code/verification-code.service';

@Injectable()
export class IndividualClientService {
  constructor(
    @InjectRepository(IndividualClient)
    private individualClientRepo: Repository<IndividualClient>,

    private readonly changeMainInfoService: ChangeMainInfoService,

    private readonly verificationCodeService: VerificationCodeService,
  ) { }

  async getIndividual(individualId: number) {
    const findIndividual = await this.individualClientRepo.findOne({
      where: { id: individualId },
    });

    if (!findIndividual)
      throw new NotFoundException('Individual client not found');

    return instanceToPlain(findIndividual);
  }

  async updateIndividual(individualId: number, updateIndividualDto: UpdateIndividualDto) {
    const individual = await this.individualClientRepo.findOne({ where: { id: individualId } });
    if (!individual) throw new NotFoundException('Company not found');

    const updatedIndividual = this.individualClientRepo.merge(individual, updateIndividualDto);

    await this.individualClientRepo.save(updatedIndividual);

    return {
      message: 'Individual updated successfully',
      user: instanceToPlain(updatedIndividual),
    };
  }

  async changePassword(individualId: number, changePasswordDto: ChangePasswordDto) {
    return this.changeMainInfoService.changePassword(this.individualClientRepo, individualId, changePasswordDto);
  }

  // send and verify sent code
  
    async sendChangeNumberCode(phoneDto: PhoneDto) {
      const result = await this.verificationCodeService.sendCode(phoneDto, 'change-number', 'individual');
  
      return { message: `Code ${result.code} sent to ${result.phone}` };
    }
  
    async changeNumber(individualId: number, changeNumberDto: ChangeNumberDto) {
      return this.changeMainInfoService.changeNumber(this.individualClientRepo, individualId, changeNumberDto);
    }
}
