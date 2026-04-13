import { CategoryRepository } from 'src/application/interfaces/category.repository';
import { Repository } from 'typeorm';
import { CategoryOrmEntity } from '../entities/category.orm-entity';
import { Category } from 'src/domain/category.entity';
import { CategoryMapper } from '../mappers/category.mapper';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';

export class TypeOrmCategoryRepository implements CategoryRepository {
  constructor(
    @InjectRepository(CategoryOrmEntity)
    private readonly repository: Repository<CategoryOrmEntity>,
  ) {}

  async findByName(name: string): Promise<Category | null> {
    const orm = await this.repository.findOne({ where: { name } });

    if (!orm) return null;

    return CategoryMapper.toDomain(orm);
  }

  async findById(id: string): Promise<Category | null> {
    const orm = await this.repository.findOne({ where: { id } });

    if (!orm) return null;

    return CategoryMapper.toDomain(orm);
  }

  async save(category: Category): Promise<void> {
    const orm = CategoryMapper.toOrm(category);
    await this.repository.save(orm);
  }

  async findAll(): Promise<Category[]> {
    const list = await this.repository.find();
    return list.map(CategoryMapper.toDomain);
  }
}
