import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import type { CategoryRepository } from 'src/application/interfaces/category.repository';

export class UpdateCategoryUseCase {
  constructor(
    @Inject('CategoryRepository')
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(id: string, input: { name?: string; parentId?: string }) {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    // validar nome duplicado
    if (input.name) {
      const existing = await this.categoryRepository.findByName(input.name);

      if (existing && existing.id !== id) {
        throw new BadRequestException('Category name already exists');
      }

      category.updateName(input.name);
    }

    // validar parent
    if (input.parentId) {
      const parent = await this.categoryRepository.findById(input.parentId);

      if (!parent) {
        throw new NotFoundException('Parent category not found');
      }

      category.setParent(input.parentId);
    }

    await this.categoryRepository.save(category);

    return {
      id: category.id,
      name: category.name,
      parentId: category.parentId,
    };
  }
}
