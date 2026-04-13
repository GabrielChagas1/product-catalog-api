import { Category } from 'src/domain/category.entity';
import { CategoryOrmEntity } from '../entities/category.orm-entity';

export class CategoryMapper {
  static toDomain(orm: CategoryOrmEntity): Category {
    return new Category({
      id: orm.id,
      name: orm.name,
      parentId: orm.parentId,
    });
  }

  static toOrm(domain: Category): CategoryOrmEntity {
    const orm = new CategoryOrmEntity();
    orm.id = domain.id;
    orm.name = domain.name;
    orm.parentId = domain.parentId;
    return orm;
  }
}
