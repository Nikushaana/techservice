import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Not, Repository } from 'typeorm';
import { instanceToPlain } from 'class-transformer';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcrypt';
import { IndividualClient } from 'src/individual-client/entities/individual-client.entity';
import { UpdateAdminIndividualDto } from './dto/update-admin-individual.dto';
import { CompanyClient } from 'src/company-client/entities/company-client.entity';
import { UpdateAdminCompanyDto } from './dto/update-admin-company.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>,

    @InjectRepository(IndividualClient)
    private individualClientRepo: Repository<IndividualClient>,

    @InjectRepository(CompanyClient)
    private companyClientRepo: Repository<CompanyClient>,
  ) { }

  // admin

  async getAdmin(adminId: number) {
    const findAdmin = await this.adminRepo.findOne({
      where: { id: adminId },
    });

    if (!findAdmin) throw new NotFoundException('Admin not found');

    return instanceToPlain(findAdmin);
  }

  async updateAdmin(adminId: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminRepo.findOne({ where: { id: adminId } });
    if (!admin) throw new NotFoundException('Admin not found');

    if (updateAdminDto.email && updateAdminDto.email !== admin.email) {
      const emailExists = await this.adminRepo.findOne({
        where: { email: updateAdminDto.email, id: Not(adminId) },
      });
      if (emailExists) throw new ConflictException('Email is already in use');
    }

    if (updateAdminDto.password) {
      updateAdminDto.password = await bcrypt.hash(updateAdminDto.password, 10);
    }

    const updatedAdmin = this.adminRepo.merge(admin, updateAdminDto);

    await this.adminRepo.save(updatedAdmin);

    return {
      message: 'Admin updated successfully',
      user: instanceToPlain(updatedAdmin),
    };
  }

  // individuals

  async getAdminIndividuals() {
    const findIndividuals = await this.individualClientRepo.find({
      order: { created_at: 'DESC' },
    });

    return instanceToPlain(findIndividuals);
  }

  async getAdminOneIndividual(individualId: number) {
    const findOneIndividual = await this.individualClientRepo.findOne({
      where: { id: individualId },
    });

    if (!findOneIndividual) throw new NotFoundException('Individual not found');

    return instanceToPlain(findOneIndividual);
  }

  async updateAdminOneIndividual(individualId: number, updateAdminIndividualDto: UpdateAdminIndividualDto) {
    const findOneIndividual = await this.individualClientRepo.findOne({
      where: { id: individualId },
    });

    if (!findOneIndividual) throw new NotFoundException('Individual not found');

    if (updateAdminIndividualDto.phone && updateAdminIndividualDto.phone !== findOneIndividual.phone) {
      const phoneExists =
        (await this.individualClientRepo.findOne({
          where: { phone: updateAdminIndividualDto.phone, id: Not(individualId) },
        })) ||
        (await this.companyClientRepo.findOne({
          where: { phone: updateAdminIndividualDto.phone },
        }));

      if (phoneExists) throw new ConflictException('phone is already in use');
    }

    if (updateAdminIndividualDto.password) {
      updateAdminIndividualDto.password = await bcrypt.hash(updateAdminIndividualDto.password, 10);
    }

    const updatedAdminIndividual = this.individualClientRepo.merge(findOneIndividual, updateAdminIndividualDto);

    await this.individualClientRepo.save(updatedAdminIndividual);

    return {
      message: 'Individual updated successfully',
      user: instanceToPlain(updatedAdminIndividual),
    };
  }

  // companies

  async getAdminCompanies() {
    const findCompanies = await this.companyClientRepo.find({
      order: { created_at: 'DESC' },
    });

    return instanceToPlain(findCompanies);
  }

  async getAdminOneCompany(companyId: number) {
    const findOneCompany = await this.companyClientRepo.findOne({
      where: { id: companyId },
    });

    if (!findOneCompany) throw new NotFoundException('Company not found');

    return instanceToPlain(findOneCompany);
  }

  async updateAdminOneCompany(companyId: number, updateAdminCompanyDto: UpdateAdminCompanyDto) {
    const findOneCompany = await this.companyClientRepo.findOne({
      where: { id: companyId },
    });

    if (!findOneCompany) throw new NotFoundException('Company not found');

    if (updateAdminCompanyDto.phone && updateAdminCompanyDto.phone !== findOneCompany.phone) {
      const phoneExists =
        (await this.individualClientRepo.findOne({
          where: { phone: updateAdminCompanyDto.phone },
        })) ||
        (await this.companyClientRepo.findOne({
          where: { phone: updateAdminCompanyDto.phone, id: Not(companyId) },
        }));

      if (phoneExists) throw new ConflictException('phone is already in use');
    }

    if (updateAdminCompanyDto.password) {
      updateAdminCompanyDto.password = await bcrypt.hash(updateAdminCompanyDto.password, 10);
    }

    const updatedAdminCompany = this.companyClientRepo.merge(findOneCompany, updateAdminCompanyDto);

    await this.companyClientRepo.save(updatedAdminCompany);

    return {
      message: 'Individual updated successfully',
      user: instanceToPlain(updatedAdminCompany),
    };
  }
}
