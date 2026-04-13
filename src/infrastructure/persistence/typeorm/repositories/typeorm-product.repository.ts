import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductOrmEntity } from '../entities/product.orm-entity';
import { Product } from 'src/domain/product.entity';
import { ProductMapper } from '../mappers/product.mapper';
import { ProductRepository } from 'src/application/interfaces/product.repository';

export class TypeOrmProductRepository implements ProductRepository {
  constructor(
    @InjectRepository(ProductOrmEntity)
    private readonly repository: Repository<ProductOrmEntity>,
  ) {}

  async findByName(name: string): Promise<Product | null> {
    const orm = await this.repository.findOne({ where: { name } });

    if (!orm) return null;

    return ProductMapper.toDomain(orm);
  }

  async findById(id: string): Promise<Product | null> {
    const orm = await this.repository.findOne({ where: { id } });

    if (!orm) return null;

    return ProductMapper.toDomain(orm);
  }

  async save(product: Product): Promise<void> {
    const orm = ProductMapper.toOrm(product);
    await this.repository.save(orm);
  }

  async findAll(): Promise<Product[]> {
    const list = await this.repository.find();
    return list.map(ProductMapper.toDomain);
  }
}
