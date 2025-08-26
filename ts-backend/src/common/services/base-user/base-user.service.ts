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

    // registered user servs

    async getUser(userId: number, repo: any) {
        const findUser = await repo.findOne({
            where: { id: userId },
        });

        if (!findUser) throw new NotFoundException('User client not found');

        return instanceToPlain(findUser);
    }

    async updateUser(userId: number, repo: any, updateUserDto: UpdateCompanyDto | UpdateIndividualDto) {
        const user = await repo.findOne({ where: { id: userId } });
        if (!user) throw new NotFoundException('user not found');

        const updatedUser = repo.merge(user, updateUserDto);

        await repo.save(updatedUser);

        return {
            message: 'user updated successfully',
            user: instanceToPlain(updatedUser),
        };
    }
}