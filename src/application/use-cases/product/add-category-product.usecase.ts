import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import type { ProductRepository } from 'src/application/interfaces/product.repository';
import { ProductAddedCategoryEvent } from 'src/shared/domain/events/product/product-add-category.event';
import { EventBus } from 'src/shared/infrastructure/messaging/event-bus';

export class AddCategoryUseCase {
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

    product.addCategory(categoryId);

    this.eventBus.publish(
      new ProductAddedCategoryEvent({
        id: product.id,
        name: product.name,
      }),
    );

    await this.productRepository.save(product);

    return product;
  }
}
