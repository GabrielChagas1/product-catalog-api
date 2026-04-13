import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import type { ProductRepository } from 'src/application/interfaces/product.repository';
import { ProductUpdatedAttributeEvent } from 'src/shared/domain/events/product/product-update-attribute.usecase';
import { EventBus } from 'src/shared/infrastructure/messaging/event-bus';

export class UpdateAttributeProductUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(productId: string, input: { key: string; value: string }) {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new Error('Product not found');
    }

    product.updateAttribute(input.key, input.value);

    this.eventBus.publish(
      new ProductUpdatedAttributeEvent({
        id: product.id,
        name: product.name,
      }),
    );

    await this.productRepository.save(product);

    return product;
  }
}
