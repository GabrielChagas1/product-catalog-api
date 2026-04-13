import { randomUUID } from 'crypto';
import { CreateProductInput } from 'src/application/dto/create-product.dto';
import { Product } from 'src/domain/product.entity';
import type { ProductRepository } from 'src/application/interfaces/product.repository';
import { EventBus } from 'src/shared/infrastructure/messaging/event-bus';
import { ProductCreatedEvent } from 'src/shared/domain/events/product/product-created.event';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';

export class CreateProductUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(input: CreateProductInput) {
    const existing = await this.productRepository.findByName(input.name);

    if (existing) {
      throw new BadRequestException('Product already exists');
    }

    const product = new Product({
      id: randomUUID(),
      name: input.name,
      description: input.description,
      categoryIds: input.categoryIds,
      attributes: input.attributes,
    });

    this.eventBus.publish(
      new ProductCreatedEvent({
        id: product.id,
        name: product.name,
      }),
    );

    await this.productRepository.save(product);

    return product;
  }
}
