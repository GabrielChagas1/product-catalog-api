import { randomUUID } from 'crypto';
import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { CreateCategoryInput } from 'src/application/dto/create-category.dto';
import type { CategoryRepository } from 'src/application/interfaces/category.repository';
import { Category } from 'src/domain/category.entity';
import { EventBus } from 'src/shared/infrastructure/messaging/event-bus';
import { CategoryCreatedEvent } from 'src/shared/domain/events/category/category-created.event';

export class CreateCategoryUseCase {
  constructor(
    @Inject('CategoryRepository')
    private readonly categoryRepository: CategoryRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(input: CreateCategoryInput) {
    const existing = await this.categoryRepository.findByName(input.name);

    if (existing) {
      throw new BadRequestException('Category with this name already exists');
    }

    if (input.parentId) {
      const parent = await this.categoryRepository.findById(input.parentId);

      if (!parent) {
        throw new NotFoundException('Parent category not found');
      }
    }

    const category = new Category({
      id: randomUUID(),
      name: input.name,
      parentId: input.parentId,
    });
    await this.categoryRepository.save(category);

    this.eventBus.publish(
      new CategoryCreatedEvent({
        id: category.id,
        name: category.name,
      }),
    );

    return {
      id: category.id,
      name: category.name,
      parentId: category.parentId,
    };
  }
}
