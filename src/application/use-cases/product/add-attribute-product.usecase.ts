import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import type { ProductRepository } from 'src/application/interfaces/product.repository';
import { ProductAddedAttributeEvent } from 'src/shared/domain/events/product/product-add-attribute.event';
import { EventBus } from 'src/shared/infrastructure/messaging/event-bus';

export class AddAttributeUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(productId: string, input: { key: string; value: string }) {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    product.addAttribute(input.key, input.value);

    this.eventBus.publish(
      new ProductAddedAttributeEvent({
        id: product.id,
        name: product.name,
      }),
    );

    await this.productRepository.save(product);

    return product;
  }
}
