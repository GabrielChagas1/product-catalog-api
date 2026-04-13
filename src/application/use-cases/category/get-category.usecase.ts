import { Inject, NotFoundException } from '@nestjs/common';
import type { CategoryRepository } from 'src/application/interfaces/category.repository';

export class GetCategoryUseCase {
  constructor(
    @Inject('CategoryRepository')
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(id: string) {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return {
      id: category.id,
      name: category.name,
      parentId: category.parentId,
    };
  }
}
