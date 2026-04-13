import { Inject, NotFoundException } from '@nestjs/common';
import type { ProductRepository } from 'src/application/interfaces/product.repository';
import { ProductRemovedAttributeEvent } from 'src/shared/domain/events/product/product-remove-attribute.event';
import { EventBus } from 'src/shared/infrastructure/messaging/event-bus';

export class RemoveAttributeUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(productId: string, key: string) {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    product.removeAttribute(key);

    this.eventBus.publish(
      new ProductRemovedAttributeEvent({
        id: product.id,
        name: product.name,
      }),
    );

    await this.productRepository.save(product);

    return product;
  }
}
