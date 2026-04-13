import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddAttributeUseCase } from 'src/application/use-cases/product/add-attribute-product.usecase';
import { ActivateProductUseCase } from 'src/application/use-cases/product/activate-product.usecase';
import { ProductOrmEntity } from 'src/infrastructure/persistence/typeorm/entities/product.orm-entity';
import { SharedModule } from 'src/shared/shared.module';
import { AddCategoryUseCase } from 'src/application/use-cases/product/add-category-product.usecase';
import { ArchiveProductUseCase } from 'src/application/use-cases/product/archive-product.usecase';
import { CreateProductUseCase } from 'src/application/use-cases/product/create-product.usecase';
import { TypeOrmProductRepository } from 'src/infrastructure/persistence/typeorm/repositories/typeorm-product.repository';
import { ListProductsUseCase } from 'src/application/use-cases/product/list-product.usecase';
import { ProductController } from 'src/presentation/product.controller';
import { UpdateProductUseCase } from 'src/application/use-cases/product/update-product.usecase';
import { RemoveAttributeUseCase } from 'src/application/use-cases/product/remove-attribute-product.usecase';
import { UpdateAttributeProductUseCase } from 'src/application/use-cases/product/update-attribute-product.usecase';
import { RemoveCategoryUseCase } from 'src/application/use-cases/product/remove-category-product.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([ProductOrmEntity]), SharedModule],

  controllers: [ProductController],

  providers: [
    TypeOrmProductRepository,
    CreateProductUseCase,
    UpdateProductUseCase,
    ActivateProductUseCase,
    ArchiveProductUseCase,
    ListProductsUseCase,
    AddCategoryUseCase,
    RemoveCategoryUseCase,
    AddAttributeUseCase,
    UpdateAttributeProductUseCase,
    RemoveAttributeUseCase,
    {
      provide: 'ProductRepository',
      useClass: TypeOrmProductRepository,
    },
  ],

  exports: ['ProductRepository'],
})
export class ProductModule {}
