import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import type { ProductRepository } from 'src/application/interfaces/product.repository';
import { ProductArchivedEvent } from 'src/shared/domain/events/product/product-archive.event';
import { EventBus } from 'src/shared/infrastructure/messaging/event-bus';

export class ArchiveProductUseCase {
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

    product.archive();

    this.eventBus.publish(
      new ProductArchivedEvent({
        id: product.id,
        name: product.name,
      }),
    );

    await this.productRepository.save(product);

    return product;
  }
}
