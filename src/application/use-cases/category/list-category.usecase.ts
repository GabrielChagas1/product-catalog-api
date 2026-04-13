import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import type { CategoryRepository } from 'src/application/interfaces/category.repository';

export class ListCategoriesUseCase {
  constructor(
    @Inject('CategoryRepository')
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute() {
    const categories = await this.categoryRepository.findAll();

    return categories.map((c) => ({
      id: c.id,
      name: c.name,
      parentId: c.parentId,
    }));
  }
}
