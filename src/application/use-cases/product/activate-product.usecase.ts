import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import type { ProductRepository } from 'src/application/interfaces/product.repository';
import { ProductActiveEvent } from 'src/shared/domain/events/product/product-active.event';
import { EventBus } from '../../../shared/infrastructure/messaging/event-bus';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';

export class ActivateProductUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(productId: string) {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    product.activate();

    this.eventBus.publish(
      new ProductActiveEvent({
        id: product.id,
        name: product.name,
      }),
    );

    await this.productRepository.save(product);

    return product;
  }
}
