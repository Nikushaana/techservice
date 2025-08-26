import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import type { RequestInfo } from 'src/common/types/request-info';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UpdateAdminIndividualDto } from './dto/update-admin-individual.dto';
import { UpdateAdminCompanyDto } from './dto/update-admin-company.dto';
import { UpdateAdminOrderDto } from 'src/order/dto/update-admin-order.dto';
import { CreateCategoryDto } from 'src/category/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/category/dto/update-category.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  // admin

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('')
  async getAdmin(@Req() req: RequestInfo) {
    return this.adminService.getAdmin(req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch('')
  async updateAdmin(@Req() req: RequestInfo, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.updateAdmin(req.user.id, updateAdminDto);
  }

  // individuals

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('individuals')
  async getAdminIndividuals() {
    return this.adminService.getAdminIndividuals();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('individuals/:id')
  async getAdminOneIndividual(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getAdminOneIndividual(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch('individuals/:id')
  async updateAdminOneIndividual(@Param('id', ParseIntPipe) id: number, @Body() updateAdminIndividualDto: UpdateAdminIndividualDto) {
    return this.adminService.updateAdminOneIndividual(id, updateAdminIndividualDto);
  }

  // companies

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('companies')
  async getAdminCompanies() {
    return this.adminService.getAdminCompanies();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('companies/:id')
  async getAdminOneCompany(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getAdminOneCompany(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch('companies/:id')
  async updateAdminOneCompany(@Param('id', ParseIntPipe) id: number, @Body() updateAdminCompanyDto: UpdateAdminCompanyDto) {
    return this.adminService.updateAdminOneCompany(id, updateAdminCompanyDto);
  }

  // orders

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('orders')
  async getOrders() {
    return this.adminService.getOrders();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('orders/:id')
  async getOneOrder(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getOneOrder(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch('orders/:id')
  async updateOneOrder(@Param('id', ParseIntPipe) id: number, @Body() updateAdminOrderDto: UpdateAdminOrderDto) {
    return this.adminService.updateOneOrder(id, updateAdminOrderDto);
  }

  // categories

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post('category')
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.adminService.createCategory(createCategoryDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('categories')
  async getCategories() {
    return this.adminService.getCategories();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('categories/:id')
  async getOneCategory(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getOneCategory(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch('categories/:id')
  async updateOneCategory(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.adminService.updateOneCategory(id, updateCategoryDto);
  }
}
