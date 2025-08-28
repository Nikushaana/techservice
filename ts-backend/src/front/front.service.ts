import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { Category } from 'src/category/entities/category.entity';
import { BaseUserService } from 'src/common/services/base-user/base-user.service';
import { UserFilterDto } from 'src/common/services/base-user/dto/user-filter.dto';
import { Technician } from 'src/technician/entities/technician.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FrontService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepo: Repository<Category>,

        @InjectRepository(Technician)
        private technicianRepo: Repository<Technician>,

        private readonly baseUserService: BaseUserService,
    ) { }

    async getCategories() {
        const categories = await this.categoryRepo.find({
            where: { status: true },
            order: { created_at: 'DESC' },
        });

        return categories;
    }

    // front filters all active technicians

    async getTechnicians(userFilterDto: UserFilterDto) {
        const findTechnicians = await this.baseUserService.getUsers(this.technicianRepo, userFilterDto);

        return instanceToPlain(findTechnicians, { groups: ['front'] });
    }
}
