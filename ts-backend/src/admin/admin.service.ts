import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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
import { Order } from 'src/order/entities/order.entity';
import { UpdateAdminOrderDto } from 'src/order/dto/update-admin-order.dto';
import { CreateCategoryDto } from 'src/category/dto/create-category.dto';
import { Category } from 'src/category/entities/category.entity';
import { UpdateCategoryDto } from 'src/category/dto/update-category.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>,

    @InjectRepository(IndividualClient)
    private individualClientRepo: Repository<IndividualClient>,

    @InjectRepository(CompanyClient)
    private companyClientRepo: Repository<CompanyClient>,

    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
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

  // orders

  async getOrders() {
    const orders = await this.orderRepo.find({
      order: { created_at: 'DESC' },
      relations: ['individual', 'company'],
    });

    return instanceToPlain(orders);
  }

  async getOneOrder(id: number) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['individual', 'company'],
    });
    if (!order) throw new NotFoundException('Order not found');

    return instanceToPlain(order)
  }

  async updateOneOrder(id: number, updateAdminOrderDto: UpdateAdminOrderDto) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['individual', 'company'],
    });
    if (!order) throw new NotFoundException('Order not found');

    this.orderRepo.merge(order, updateAdminOrderDto);
    await this.orderRepo.save(order);

    return {
      message: 'Order updated successfully',
      order: instanceToPlain(order),
    };
  }

  // categories

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const existing = await this.categoryRepo.findOne({ where: { name: createCategoryDto.name } });
    if (existing) throw new BadRequestException('Category already exists');

    const category = this.categoryRepo.create(createCategoryDto);
    await this.categoryRepo.save(category);

    return { message: `Category  created successfully`, category };
  }

  async getCategories() {
    const categories = await this.categoryRepo.find({
      order: { created_at: 'DESC' },
    });

    return categories;
  }

  async getOneCategory(id: number) {
    const category = await this.categoryRepo.findOne({
      where: { id },
    });
    if (!category) throw new NotFoundException('Category not found');

    return category
  }

  async updateOneCategory(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepo.findOne({
      where: { id },
    });
    if (!category) throw new NotFoundException('Category not found');

    this.categoryRepo.merge(category, updateCategoryDto);
    await this.categoryRepo.save(category);

    return {
      message: 'Category updated successfully',
      category,
    };
  }
}
