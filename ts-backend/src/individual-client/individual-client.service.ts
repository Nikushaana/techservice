import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IndividualClient } from './entities/individual-client.entity';
import { Not, Repository } from 'typeorm';
import { instanceToPlain } from 'class-transformer';
import { UpdateIndividualDto } from './dto/update-individual.dto';
import { ChangePasswordDto } from 'src/common/services/base-user/dto/change-password.dto';
import { ChangeNumberDto, PhoneDto } from 'src/verification-code/dto/verification-code.dto';
import { VerificationCodeService } from 'src/verification-code/verification-code.service';
import { BaseUserService } from 'src/common/services/base-user/base-user.service';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';
import { Order } from 'src/order/entities/order.entity';
import { UpdateIndividualOrderDto } from 'src/order/dto/update-individual-order.dto';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class IndividualClientService {
  constructor(
    @InjectRepository(IndividualClient)
    private individualClientRepo: Repository<IndividualClient>,

    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,

    private readonly baseUserService: BaseUserService,

    private readonly verificationCodeService: VerificationCodeService,
  ) { }

  // individual

  async getIndividual(individualId: number) {
    return this.baseUserService.getUser(individualId, this.individualClientRepo);
  }

  async updateIndividual(individualId: number, updateIndividualDto: UpdateIndividualDto) {
    return this.baseUserService.updateUser(individualId, this.individualClientRepo, updateIndividualDto);
  }

  async changePassword(individualId: number, changePasswordDto: ChangePasswordDto) {
    return this.baseUserService.changePassword(this.individualClientRepo, individualId, changePasswordDto);
  }

  // send and verify sent code

  async sendChangeNumberCode(phoneDto: PhoneDto) {
    const result = await this.verificationCodeService.sendCode(phoneDto, 'change-number', 'individual');

    return { message: `Code ${result.code} sent to ${result.phone}` };
  }

  async changeNumber(individualId: number, changeNumberDto: ChangeNumberDto) {
    return this.baseUserService.changeNumber(this.individualClientRepo, individualId, changeNumberDto);
  }

  // create order

  async createOrder(individualId: number, createOrderDto: CreateOrderDto) {
    const individual = await this.individualClientRepo.findOne({ where: { id: individualId } });
    if (!individual) throw new BadRequestException('Individual not found');

    if (!individual.status) {
      throw new BadRequestException('Inactive individual cannot create orders');
    }

    const category = await this.categoryRepo.findOne({ where: { id: createOrderDto.categoryId, status: true } });
    if (!category) throw new NotFoundException('Category not found');

    const order = this.orderRepo.create({
      ...createOrderDto,
      individual,
      category
    });

    await this.orderRepo.save(order);

    return { message: `Order created successfully`, order: instanceToPlain(order) };
  }

  async getOrders(individualId: number) {
    const individual = await this.individualClientRepo.findOne({ where: { id: individualId } });
    if (!individual) throw new BadRequestException('Individual not found');

    const orders = await this.orderRepo.find({
      where: { individual: { id: individualId } },
      order: { created_at: 'DESC' },
    });

    return orders;
  }

  async getOneOrder(individualId: number, id: number) {
    const individual = await this.individualClientRepo.findOne({ where: { id: individualId } });
    if (!individual) throw new BadRequestException('Individual not found');

    const order = await this.orderRepo.findOne({
      where: { individual: { id: individualId }, id },
    });
    if (!order) throw new NotFoundException('Order not found');

    return order
  }

  async updateOneOrder(individualId: number, id: number, updateIndividualOrderDto: UpdateIndividualOrderDto) {
    const individual = await this.individualClientRepo.findOne({ where: { id: individualId } });
    if (!individual) throw new BadRequestException('Individual not found');

    const order = await this.orderRepo.findOne({
      where: { individual: { id: individualId }, id },
    });
    if (!order) throw new NotFoundException('Order not found');

    if (order.status !== 'pending') {
      throw new BadRequestException('Only pending orders can be updated');
    }

    this.orderRepo.merge(order, updateIndividualOrderDto);
    await this.orderRepo.save(order);

    return {
      message: 'Order updated successfully',
      order,
    };
  }
}
