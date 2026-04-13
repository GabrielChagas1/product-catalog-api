import { Inject, NotFoundException } from '@nestjs/common';
import type { ProductRepository } from 'src/application/interfaces/product.repository';
import { ProductRemovedCategoryEvent } from 'src/shared/domain/events/product/product-remove-category.event';
import { EventBus } from 'src/shared/infrastructure/messaging/event-bus';

export class RemoveCategoryUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(productId: string, categoryId: string) {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    product.removeCategory(categoryId);

    this.eventBus.publish(
      new ProductRemovedCategoryEvent({
        id: product.id,
        name: product.name,
      }),
    );

    await this.productRepository.save(product);

    return product;
  }
}
