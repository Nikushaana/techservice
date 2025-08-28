import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginAdminDto } from './dto/login-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from 'src/admin/entities/admin.entity';
import * as bcrypt from 'bcrypt';
import { instanceToPlain } from 'class-transformer';
import { AdminToken } from 'src/admin-token/entities/admin-token.entity';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { IndividualClient } from 'src/individual-client/entities/individual-client.entity';
import { VerificationCode } from 'src/verification-code/entities/verification-code.entity';
import { IndividualClientToken } from 'src/individual-client-token/entities/individual-client-token.entity';
import {
  PhoneDto,
  ResetPasswordDto,
  VerifyCodeDto,
} from 'src/verification-code/dto/verification-code.dto';
import { RegisterCompanyClientDto } from './dto/register-company-client.dto';
import { CompanyClient } from 'src/company-client/entities/company-client.entity';
import { CompanyClientToken } from 'src/company-client-token/entities/company-client-token.entity';
import { VerificationCodeService } from 'src/verification-code/verification-code.service';
import { RegisterIndividualClientOrTechnicianDto } from './dto/register-individual-client-or-technician.dto';
import { Technician } from 'src/technician/entities/technician.entity';
import { TechnicianToken } from 'src/technician-token/entities/technician-token.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,

    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>,

    @InjectRepository(AdminToken)
    private adminTokenRepo: Repository<AdminToken>,

    @InjectRepository(IndividualClient)
    private individualClientRepo: Repository<IndividualClient>,

    @InjectRepository(IndividualClientToken)
    private individualClientTokenRepo: Repository<IndividualClientToken>,

    @InjectRepository(CompanyClient)
    private companyClientRepo: Repository<CompanyClient>,

    @InjectRepository(CompanyClientToken)
    private companyClientTokenRepo: Repository<CompanyClientToken>,

    @InjectRepository(Technician)
    private technicianRepo: Repository<Technician>,

    @InjectRepository(TechnicianToken)
    private technicianTokenRepo: Repository<TechnicianToken>,

    @InjectRepository(VerificationCode)
    private VerificationCodeRepo: Repository<VerificationCode>,

    private readonly verificationCodeService: VerificationCodeService,
  ) { }

  signToken(payload: any): string {
    return this.jwtService.sign(payload);
  }

  // send and verify sent code

  async sendRegisterCode(phoneDto: PhoneDto) {
    const result = await this.verificationCodeService.sendCode(phoneDto, 'register');

    return { message: `Code ${result.code} sent to ${result.phone}` };
  }

  async verifyRegisterCode(verifyCodeDto: VerifyCodeDto) {
    return this.verificationCodeService.verifyCode(verifyCodeDto, 'register');
  }

  // admin

  async adminRegister(dto: RegisterAdminDto) {
    const existing = await this.adminRepo.findOne({
      where: { email: dto.email },
    });

    if (existing) throw new ConflictException('Email is already in use');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const admin = this.adminRepo.create({ ...dto, password: hashedPassword });

    await this.adminRepo.save(admin);

    return { message: 'Admin registered successfully', admin };
  }

  async adminLogin(loginAdminDto: LoginAdminDto) {
    const admin = await this.adminRepo.findOne({
      where: { email: loginAdminDto.email },
    });

    if (!admin) throw new UnauthorizedException('Invalid credintials');

    const isMatch = await bcrypt.compare(
      loginAdminDto.password,
      admin.password,
    );

    if (!isMatch) throw new UnauthorizedException('Invalid credintials');

    const payload = { id: admin.id, role: 'admin' };
    const token = this.signToken(payload);

    let adminToken = await this.adminTokenRepo.findOne({
      where: { admin: { id: admin.id } },
    });

    if (adminToken) {
      adminToken.token = token;
      await this.adminTokenRepo.save(adminToken);
    } else {
      adminToken = this.adminTokenRepo.create({ admin: admin, token });
      await this.adminTokenRepo.save(adminToken);
    }

    return {
      message: 'Admin logged in successfully',
      token,
      admin: instanceToPlain(admin),
    };
  }

  async adminLogout(authHeader: string) {
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    const result = await this.adminTokenRepo.delete({ token });

    if (result.affected === 0) {
      throw new NotFoundException('Token not found in database');
    }

    return { message: 'Admin logged out successfully' };
  }

  // individual and company clients

  async register(
    registerDto: RegisterIndividualClientOrTechnicianDto | RegisterCompanyClientDto,
    role: 'individual' | 'company' | 'technician',
  ) {
    const codeEntry = await this.VerificationCodeRepo.findOne({
      where: { phone: registerDto.phone, verified: true, type: 'register' },
    });
    if (!codeEntry) throw new BadRequestException('Phone not verified');

    const exists =
      (await this.individualClientRepo.findOne({
        where: { phone: registerDto.phone },
      }))
      ||
      (await this.companyClientRepo.findOne({
        where: { phone: registerDto.phone },
      }))
      ||
      (await this.technicianRepo.findOne({
        where: { phone: registerDto.phone },
      }))
      ;

    if (exists) throw new BadRequestException('User already registered');

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const repo: Repository<IndividualClient | CompanyClient | Technician> =
      role === 'individual'
        ? this.individualClientRepo
        : role === 'company' ? this.companyClientRepo
          : this.technicianRepo;

    const user = repo.create({ ...registerDto, password: hashedPassword });
    await repo.save(user);

    await this.VerificationCodeRepo.delete({ phone: registerDto.phone, type: 'register' });

    return {
      message: `${role} registered successfully`,
      user: instanceToPlain(user),
    };
  }

  async login(loginUserDto: LoginUserDto, role: 'individual' | 'company' | 'technician') {
    const repo =
      role === 'individual'
        ? this.individualClientRepo
        : role === 'company' ? this.companyClientRepo
          : this.technicianRepo;

    const user = await repo.findOne({ where: { phone: loginUserDto.phone } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(loginUserDto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { id: user.id, role };
    const token = this.signToken(payload);

    if (role === 'individual') {
      let clientToken = await this.individualClientTokenRepo.findOne({
        where: { individualClient: { id: user.id } },
      });
      if (clientToken) {
        clientToken.token = token;
      } else {
        clientToken = this.individualClientTokenRepo.create({
          individualClient: user,
          token,
        });
      }
      await this.individualClientTokenRepo.save(clientToken);
    } else if (role === 'company') {
      let clientToken = await this.companyClientTokenRepo.findOne({
        where: { companyClient: { id: user.id } },
      });
      if (clientToken) {
        clientToken.token = token;
      } else {
        clientToken = this.companyClientTokenRepo.create({
          companyClient: user,
          token,
        });
      }
      await this.companyClientTokenRepo.save(clientToken);
    } else {
      let technicianToken = await this.technicianTokenRepo.findOne({
        where: { technician: { id: user.id } },
      });
      if (technicianToken) {
        technicianToken.token = token;
      } else {
        technicianToken = this.technicianTokenRepo.create({
          technician: user,
          token,
        });
      }
      await this.technicianTokenRepo.save(technicianToken);
    }

    return {
      message: `${role} logged in successfully`,
      token,
      client: instanceToPlain(user),
    };
  }

  async logout(authHeader: string, role: 'individual' | 'company' | 'technician') {
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    const result =
      role === 'individual'
        ? await this.individualClientTokenRepo.delete({ token })
        : role === 'company' ? await this.companyClientTokenRepo.delete({ token })
          : await this.technicianTokenRepo.delete({ token });

    if (result.affected === 0) {
      throw new NotFoundException('Token not found in database');
    }

    return { message: `${role} logged out successfully` };
  }

  async sendResetPasswordCode(phoneDto: PhoneDto, role: 'individual' | 'company' | 'technician') {
    const result = await this.verificationCodeService.sendCode(phoneDto, 'reset-password', role);
    return { message: `Code ${result.code} sent to ${result.phone}` };
  }

  async resetPassword(
    resetPasswordDto: ResetPasswordDto,
    role: 'individual' | 'company' | 'technician',
  ) {
    await this.verificationCodeService.verifyCode(
      { phone: resetPasswordDto.phone, code: resetPasswordDto.code },
      'reset-password',
    );

    const hashedPassword = await bcrypt.hash(resetPasswordDto.password, 10);

    const user =
      role === 'individual'
        ? await this.individualClientRepo.findOne({
          where: { phone: resetPasswordDto.phone },
        })
        : role === 'company' ? await this.companyClientRepo.findOne({
          where: { phone: resetPasswordDto.phone },
        })
          : await this.technicianRepo.findOne({
            where: { phone: resetPasswordDto.phone },
          });

    if (!user) throw new BadRequestException(`${role} not found`);

    user.password = hashedPassword;
    if (role === 'individual') {
      await this.individualClientRepo.save(user);
    } else if (role === 'company') {
      await this.companyClientRepo.save(user);
    } else {
      await this.technicianRepo.save(user);
    }

    await this.VerificationCodeRepo.delete({ phone: resetPasswordDto.phone, type: 'reset-password' });

    return {
      message: `${role} password reset successfully`,
      client: instanceToPlain(user),
    };
  }
}
