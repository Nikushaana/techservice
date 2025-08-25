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
import { RegisterIndividualClientDto } from './dto/register-individual-client.dto';
import { IndividualClient } from 'src/individual-client/entities/individual-client.entity';
import { VerificationCode } from 'src/verification-code/entities/verification-code.entity';
import { LoginClientDto } from './dto/login-client.dto';
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
    registerDto: RegisterIndividualClientDto | RegisterCompanyClientDto,
    role: 'individual' | 'company',
  ) {
    const codeEntry = await this.VerificationCodeRepo.findOne({
      where: { phone: registerDto.phone, verified: true, type: 'register' },
    });
    if (!codeEntry) throw new BadRequestException('Phone not verified');

    const exists =
      (await this.individualClientRepo.findOne({
        where: { phone: registerDto.phone },
      })) ||
      (await this.companyClientRepo.findOne({
        where: { phone: registerDto.phone },
      }));

    if (exists) throw new BadRequestException('Client already registered');

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const repo: Repository<IndividualClient | CompanyClient> =
      role === 'individual'
        ? this.individualClientRepo
        : this.companyClientRepo;

    const client = repo.create({ ...registerDto, password: hashedPassword });
    await repo.save(client);

    await this.VerificationCodeRepo.delete({ phone: registerDto.phone, type: 'register' });

    return {
      message: `${role} client registered successfully`,
      client: instanceToPlain(client),
    };
  }

  async login(loginDto: LoginClientDto, role: 'individual' | 'company') {
    const repo =
      role === 'individual'
        ? this.individualClientRepo
        : this.companyClientRepo;

    const client = await repo.findOne({ where: { phone: loginDto.phone } });
    if (!client) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(loginDto.password, client.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { id: client.id, role: `${role}_client` };
    const token = this.signToken(payload);

    if (role === 'individual') {
      let clientToken = await this.individualClientTokenRepo.findOne({
        where: { individualClient: { id: client.id } },
      });
      if (clientToken) {
        clientToken.token = token;
      } else {
        clientToken = this.individualClientTokenRepo.create({
          individualClient: client,
          token,
        });
      }
      await this.individualClientTokenRepo.save(clientToken);
    } else {
      let clientToken = await this.companyClientTokenRepo.findOne({
        where: { companyClient: { id: client.id } },
      });
      if (clientToken) {
        clientToken.token = token;
      } else {
        clientToken = this.companyClientTokenRepo.create({
          companyClient: client,
          token,
        });
      }
      await this.companyClientTokenRepo.save(clientToken);
    }

    return {
      message: `${role} client logged in successfully`,
      token,
      client: instanceToPlain(client),
    };
  }

  async logout(authHeader: string, role: 'individual' | 'company') {
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
        : await this.companyClientTokenRepo.delete({ token });

    if (result.affected === 0) {
      throw new NotFoundException('Token not found in database');
    }

    return { message: `${role} client logged out successfully` };
  }

  async sendResetPasswordCode(phoneDto: PhoneDto, role: 'individual' | 'company') {
    const result = await this.verificationCodeService.sendCode(phoneDto, 'reset-password', role);
    return { message: `Code ${result.code} sent to ${result.phone}` };
  }

  async resetPassword(
    resetPasswordDto: ResetPasswordDto,
    role: 'individual' | 'company',
  ) {
    await this.verificationCodeService.verifyCode(
    { phone: resetPasswordDto.phone, code: resetPasswordDto.code },
    'reset-password',
  );

    const hashedPassword = await bcrypt.hash(resetPasswordDto.password, 10);

    const client =
      role === 'individual'
        ? await this.individualClientRepo.findOne({
          where: { phone: resetPasswordDto.phone },
        })
        : await this.companyClientRepo.findOne({
          where: { phone: resetPasswordDto.phone },
        });

    if (!client) throw new BadRequestException(`${role} client not found`);

    client.password = hashedPassword;
    if (role === 'individual') {
      await this.individualClientRepo.save(client);
    } else {
      await this.companyClientRepo.save(client);
    }

    await this.VerificationCodeRepo.delete({ phone: resetPasswordDto.phone, type: 'reset-password' });

    return {
      message: `${role} client password reset successfully`,
      client: instanceToPlain(client),
    };
  }
}
