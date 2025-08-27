import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { ChangePasswordDto } from '../base-user/dto/change-password.dto';
import { ChangeNumberDto } from 'src/verification-code/dto/verification-code.dto';
import { instanceToPlain } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { VerificationCode } from 'src/verification-code/entities/verification-code.entity';
import { VerificationCodeService } from 'src/verification-code/verification-code.service';
import { UpdateCompanyDto } from 'src/company-client/dto/update-company.dto';
import { UpdateIndividualDto } from 'src/individual-client/dto/update-individual.dto';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';
import { Category } from 'src/category/entities/category.entity';
import { Order } from 'src/order/entities/order.entity';
import { UpdateUserOrderDto } from 'src/order/dto/update-user-order.dto';
import { Address } from 'src/address/entities/address.entity';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';
import { UpdateAddressDto } from 'src/address/dto/update-address.dto';

interface WithIdAndPassword {
    id: number;
    password: string;
}

interface WithIdAndPhone {
    id: number;
    phone: string;
}

@Injectable()
export class BaseUserService {
    constructor(
        @InjectRepository(VerificationCode)
        private VerificationCodeRepo: Repository<VerificationCode>,

        @InjectRepository(Category)
        private readonly categoryRepo: Repository<Category>,

        @InjectRepository(Order)
        private readonly orderRepo: Repository<Order>,

        @InjectRepository(Address)
        private readonly addressRepo: Repository<Address>,

        private readonly verificationCodeService: VerificationCodeService,
    ) { }

    async changePassword<T extends WithIdAndPassword>(
        repo: Repository<T>,
        userId: number,
        changePasswordDto: ChangePasswordDto,
    ) {
        const user = await repo.findOneBy({ id: userId } as any);
        if (!user) throw new BadRequestException('User not found');

        const isMatch = await bcrypt.compare(changePasswordDto.oldPassword, user.password);
        if (!isMatch) throw new BadRequestException('Old password is incorrect');

        user.password = await bcrypt.hash(changePasswordDto.newPassword, 10);
        await repo.save(user);

        return { message: 'Password updated successfully' };
    }

    async changeNumber<T extends WithIdAndPhone>(
        repo: Repository<T>,
        userId: number,
        changeNumberDto: ChangeNumberDto,
    ) {
        await this.verificationCodeService.verifyCode({ phone: changeNumberDto.newPhone, code: changeNumberDto.code }, 'change-number');

        const user = await repo.findOneBy({ id: userId } as any);
        if (!user) throw new BadRequestException('User not found');

        user.phone = changeNumberDto.newPhone;
        await repo.save(user);

        await this.VerificationCodeRepo.delete({ phone: changeNumberDto.newPhone, type: 'change-number' });

        return {
            message: `user phone number changed successfully`,
            client: instanceToPlain(user),
        };
    }

    // registered user services

    async getUser(userId: number, repo: any) {
        const findUser = await repo.findOne({
            where: { id: userId },
        });

        if (!findUser) throw new NotFoundException('User not found');

        return findUser;
    }

    async updateUser(userId: number, repo: any, updateUserDto: UpdateCompanyDto | UpdateIndividualDto) {
        const user = await this.getUser(userId, repo)

        const updatedUser = repo.merge(user, updateUserDto);

        await repo.save(updatedUser);

        return {
            message: 'user updated successfully',
            user: instanceToPlain(updatedUser),
        };
    }

    // about orders

    async createOrder(userId: number, repo: any, createOrderDto: CreateOrderDto) {
        const user = await this.getUser(userId, repo)

        if (!user.status) {
            throw new BadRequestException('Inactive user cannot create orders');
        }

        const category = await this.categoryRepo.findOne({ where: { id: createOrderDto.categoryId, status: true } });
        if (!category) throw new NotFoundException('Category not found');

        const relationKey = "companyName" in user ? "company" : "individual";

        const address = await this.addressRepo.findOne({ where: { id: createOrderDto.addressId, [relationKey]: { id: userId } } });
        if (!address) throw new NotFoundException('Address not found');

        const order = this.orderRepo.create({
            ...createOrderDto,
            category,
            address
        });

        if ("companyName" in user) {
            order.company = user;
        } else {
            order.individual = user;
        }

        await this.orderRepo.save(order);

        return { message: `Order created successfully`, order: instanceToPlain(order) };
    }

    async getOrders(userId: number, repo: any) {
        const user = await this.getUser(userId, repo)

        const relationKey = "companyName" in user ? "company" : "individual";

        const orders = await this.orderRepo.find({
            where: { [relationKey]: { id: userId } },
            order: { created_at: 'DESC' },
        });

        return orders;
    }

    async getOneOrder(userId: number, id: number, repo: any) {
        const user = await this.getUser(userId, repo)

        const relationKey = "companyName" in user ? "company" : "individual";

        const order = await this.orderRepo.findOne({
            where: { [relationKey]: { id: userId }, id },
        });
        if (!order) throw new NotFoundException('Order not found');

        return order
    }

    async updateOneOrder(userId: number, id: number, repo: any, updateUserOrderDto: UpdateUserOrderDto) {
        const user = await this.getUser(userId, repo)

        const relationKey = "companyName" in user ? "company" : "individual";

        const order = await this.orderRepo.findOne({
            where: { [relationKey]: { id: userId }, id },
        });
        if (!order) throw new NotFoundException('Order not found');

        if (order.status !== 'pending') {
            throw new BadRequestException('Only pending orders can be updated');
        }

        if (updateUserOrderDto.categoryId) {
            const category = await this.categoryRepo.findOne({
                where: { id: updateUserOrderDto.categoryId, status: true },
            });
            if (!category) throw new NotFoundException('Category not found');
            order.category = category;
        }

        if (updateUserOrderDto.addressId) {
            const address = await this.addressRepo.findOne({
                where: { id: updateUserOrderDto.addressId, [relationKey]: { id: userId } },
            });
            if (!address) throw new NotFoundException('Address not found');
            order.address = address;
        }

        const { categoryId, addressId, ...rest } = updateUserOrderDto;
        this.orderRepo.merge(order, rest);
        await this.orderRepo.save(order);

        return {
            message: 'Order updated successfully',
            order,
        };
    }

    // about address

    async createAddress(userId: number, repo: any, createAddressDto: CreateAddressDto) {
        const user = await repo.findOne({ where: { id: userId } });
        if (!user) throw new BadRequestException('User not found');

        const address = this.addressRepo.create({
            ...createAddressDto
        });

        if ("companyName" in user) {
            address.company = user;
        } else {
            address.individual = user;
        }

        await this.addressRepo.save(address);

        return { message: `Address created successfully`, address: instanceToPlain(address) };
    }

    async getAddresses(userId: number, repo: any) {
        const user = await this.getUser(userId, repo)

        const relationKey = "companyName" in user ? "company" : "individual";

        const address = await this.addressRepo.find({
            where: { [relationKey]: { id: userId } },
            order: { created_at: 'DESC' },
        });

        return address;
    }

    async getOneAddress(userId: number, id: number, repo: any) {
        const user = await this.getUser(userId, repo)

        const relationKey = "companyName" in user ? "company" : "individual";

        const address = await this.addressRepo.findOne({
            where: { [relationKey]: { id: userId }, id },
        });
        if (!address) throw new NotFoundException('Address not found');

        return address
    }

    async updateOneAddress(userId: number, id: number, repo: any, updateAddressDto: UpdateAddressDto) {
        const user = await this.getUser(userId, repo)

        const relationKey = "companyName" in user ? "company" : "individual";

        const address = await this.addressRepo.findOne({
            where: { [relationKey]: { id: userId }, id },
        });
        if (!address) throw new NotFoundException('Address  not found');

        const usedInOrders = await this.orderRepo.count({
            where: [
                { [relationKey]: { id: userId }, address: { id } },
            ],
        });

        if (usedInOrders > 0) {
            throw new BadRequestException('Address cannot be updated because it is used in an order');
        }

        this.addressRepo.merge(address, updateAddressDto);
        await this.addressRepo.save(address);

        return {
            message: 'Address  updated successfully',
            address,
        };
    }

}