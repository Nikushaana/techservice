import { Controller, Get } from '@nestjs/common';
import { FrontService } from './front.service';

@Controller('front')
export class FrontController {
    constructor(private readonly frontService: FrontService) { }

    @Get('categories')
    async getCategories() {
        return this.frontService.getCategories();
    }
}
