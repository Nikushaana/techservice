import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import type { RequestInfo } from 'src/common/types/request-info';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UpdateAdminCompanyDto } from './dto/update-admin-company.dto';
import { UpdateAdminOrderDto } from 'src/order/dto/update-admin-order.dto';
import { CreateCategoryDto } from 'src/category/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/category/dto/update-category.dto';
import { UpdateAdminIndividualOrTechnicianDto } from './dto/update-admin-individual-or-technician.dto';
import { UserFilterDto } from 'src/common/services/base-user/dto/user-filter.dto';
import { TokenValidationGuard } from 'src/auth/guards/token-validation.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  // admin

  @UseGuards(TokenValidationGuard, RolesGuard)
  @Roles('admin')
  @Get('')
  async getAdmin(@Req() req: RequestInfo) {
    return this.adminService.getAdmin(req.user.id);
  }

  @UseGuards(TokenValidationGuard, RolesGuard)
  @Roles('admin')
  @Patch('')
  async updateAdmin(@Req() req: RequestInfo, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.updateAdmin(req.user.id, updateAdminDto);
  }

  // individuals

  @UseGuards(TokenValidationGuard, RolesGuard)
  @Roles('admin')
  @Get('individuals')
  async getAdminIndividuals() {
    return this.adminService.getAdminIndividuals();
  }

  @UseGuards(TokenValidationGuard, RolesGuard)
  @Roles('admin')
  @Get('individuals/:id')
  async getAdminOneIndividual(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getAdminOneIndividual(id);
  }

  @UseGuards(TokenValidationGuard, RolesGuard)
  @Roles('admin')
  @Patch('individuals/:id')
  async updateAdminOneIndividual(@Param('id', ParseIntPipe) id: number, @Body() updateAdminIndividualOrTechnicianDto: UpdateAdminIndividualOrTechnicianDto) {
    return this.adminService.updateAdminOneIndividual(id, updateAdminIndividualOrTechnicianDto);
  }

  // companies

  @UseGuards(TokenValidationGuard, RolesGuard)
  @Roles('admin')
  @Get('companies')
  async getAdminCompanies() {
    return this.adminService.getAdminCompanies();
  }

  @UseGuards(TokenValidationGuard, RolesGuard)
  @Roles('admin')
  @Get('companies/:id')
  async getAdminOneCompany(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getAdminOneCompany(id);
  }

  @UseGuards(TokenValidationGuard, RolesGuard)
  @Roles('admin')
  @Patch('companies/:id')
  async updateAdminOneCompany(@Param('id', ParseIntPipe) id: number, @Body() updateAdminCompanyDto: UpdateAdminCompanyDto) {
    return this.adminService.updateAdminOneCompany(id, updateAdminCompanyDto);
  }

  // technicians

  @UseGuards(TokenValidationGuard, RolesGuard)
  @Roles('admin')
  @Get('technicians')
  async getAdminTechnicians(@Query() userFilterDto: UserFilterDto) {
    return this.adminService.getAdminTechnicians(userFilterDto);
  }

  @UseGuards(TokenValidationGuard, RolesGuard)
  @Roles('admin')
  @Get('technicians/:id')
  async getAdminOneTechnician(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getAdminOneTechnician(id);
  }

  @UseGuards(TokenValidationGuard, RolesGuard)
  @Roles('admin')
  @Patch('technicians/:id')
  async updateAdminOneTechnician(@Param('id', ParseIntPipe) id: number, @Body() updateAdminIndividualOrTechnicianDto: UpdateAdminIndividualOrTechnicianDto) {
    return this.adminService.updateAdminOneTechnician(id, updateAdminIndividualOrTechnicianDto);
  }

  // orders

  @UseGuards(TokenValidationGuard, RolesGuard)
  @Roles('admin')
  @Get('orders')
  async getOrders() {
    return this.adminService.getOrders();
  }

  @UseGuards(TokenValidationGuard, RolesGuard)
  @Roles('admin')
  @Get('orders/:id')
  async getOneOrder(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getOneOrder(id);
  }

  @UseGuards(TokenValidationGuard, RolesGuard)
  @Roles('admin')
  @Patch('orders/:id')
  async updateOneOrder(@Param('id', ParseIntPipe) id: number, @Body() updateAdminOrderDto: UpdateAdminOrderDto) {
    return this.adminService.updateOneOrder(id, updateAdminOrderDto);
  }

  // categories

  @UseGuards(TokenValidationGuard, RolesGuard)
  @Roles('admin')
  @Post('category')
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.adminService.createCategory(createCategoryDto);
  }

  @UseGuards(TokenValidationGuard, RolesGuard)
  @Roles('admin')
  @Get('categories')
  async getCategories() {
    return this.adminService.getCategories();
  }

  @UseGuards(TokenValidationGuard, RolesGuard)
  @Roles('admin')
  @Get('categories/:id')
  async getOneCategory(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getOneCategory(id);
  }

  @UseGuards(TokenValidationGuard, RolesGuard)
  @Roles('admin')
  @Patch('categories/:id')
  async updateOneCategory(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.adminService.updateOneCategory(id, updateCategoryDto);
  }

  // addresses

  @UseGuards(TokenValidationGuard, RolesGuard)
  @Roles('admin')
  @Get('addresses')
  async getAddresses() {
    return this.adminService.getAddresses();
  }

  @UseGuards(TokenValidationGuard, RolesGuard)
  @Roles('admin')
  @Get('addresses/:id')
  async getUserAddresses(@Param('id', ParseIntPipe) id: number, @Query('role') role: 'individual' | 'company') {
    return this.adminService.getUserAddresses(id, role);
  }
}
