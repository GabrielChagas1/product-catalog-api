import { Product } from 'src/domain/product.entity';
import { ProductOrmEntity } from '../entities/product.orm-entity';

export class ProductMapper {
  static toDomain(orm: ProductOrmEntity): Product {
    return new Product({
      id: orm.id,
      name: orm.name,
      description: orm.description,
      status: orm.status,
      categoryIds: orm.categoryIds ?? [],
      attributes: orm.attributes ?? [],
    });
  }

  static toOrm(domain: Product): ProductOrmEntity {
    const orm = new ProductOrmEntity();

    orm.id = domain.id;
    orm.name = domain.name;
    orm.description = domain.description;
    orm.status = domain.status;
    orm.categoryIds = domain.categoryIds;
    orm.attributes = domain.attributes;

    return orm;
  }
}
