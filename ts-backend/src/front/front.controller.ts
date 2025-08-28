import { Controller, Get, Query } from '@nestjs/common';
import { FrontService } from './front.service';
import { UserFilterDto } from 'src/common/services/base-user/dto/user-filter.dto';

@Controller('front')
export class FrontController {
    constructor(private readonly frontService: FrontService) { }

    @Get('categories')
    async getCategories() {
        return this.frontService.getCategories();
    }

    @Get('technicians')
    async getAdminTechnicians(@Query() userFilterDto: UserFilterDto) {
        return this.frontService.getTechnicians(userFilterDto);
    }
}
