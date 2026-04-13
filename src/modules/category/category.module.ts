import { Module } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { CategoryOrmEntity } from 'src/infrastructure/persistence/typeorm/entities/category.orm-entity';
import { TypeOrmCategoryRepository } from 'src/infrastructure/persistence/typeorm/repositories/typeorm-category.repository';
import { CategoryController } from 'src/presentation/category.controller';
import { EventBus } from 'src/shared/infrastructure/messaging/event-bus';
import { SharedModule } from 'src/shared/shared.module';
import { CreateCategoryUseCase } from 'src/application/use-cases/category/create-category.usecase';
import { GetCategoryUseCase } from 'src/application/use-cases/category/get-category.usecase';
import { ListCategoriesUseCase } from 'src/application/use-cases/category/list-category.usecase';
import { UpdateCategoryUseCase } from 'src/application/use-cases/category/update-category.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryOrmEntity]), SharedModule],
  providers: [
    CreateCategoryUseCase,
    UpdateCategoryUseCase,
    GetCategoryUseCase,
    ListCategoriesUseCase,
    {
      provide: 'CategoryRepository',
      useClass: TypeOrmCategoryRepository,
    },
  ],
  exports: ['CategoryRepository'],
  controllers: [CategoryController],
})
export class CategoryModule {}
