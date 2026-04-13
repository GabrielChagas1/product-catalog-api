import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import type { ProductRepository } from 'src/application/interfaces/product.repository';

export class ListProductsUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  async execute() {
    return this.productRepository.findAll();
  }
}
