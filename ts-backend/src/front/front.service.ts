import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FrontService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepo: Repository<Category>,
    ) { }

    async getCategories() {
        const categories = await this.categoryRepo.find({
            where: { status: true },
            order: { created_at: 'DESC' },
        });

        return categories;
    }
}
