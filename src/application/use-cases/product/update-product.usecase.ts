import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import type { ProductRepository } from 'src/application/interfaces/product.repository';
import { ProductUpdatedEvent } from 'src/shared/domain/events/product/product-update.usecase';
import { EventBus } from 'src/shared/infrastructure/messaging/event-bus';

export class UpdateProductUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(input: {
    productId: string;
    name?: string;
    description?: string;
  }) {
    const product = await this.productRepository.findById(input.productId);

    if (!product) {
      throw new Error('Product not found');
    }

    if (input.name && input.name !== product.name) {
      if (product.status === 'ARCHIVED') {
        throw new Error('Cannot change name when product is archived');
      }

      const existing = await this.productRepository.findByName(input.name);

      if (existing) {
        throw new Error('Product with this name already exists');
      }

      (product as any)._name = input.name;
    }

    if (input.description !== undefined) {
      product.updateDescription(input.description);

      this.eventBus.publish(
        new ProductUpdatedEvent({
          id: product.id,
          name: product.name,
        }),
      );
    }

    await this.productRepository.save(product);

    return product;
  }
}
