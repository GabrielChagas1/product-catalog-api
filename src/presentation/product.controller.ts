import {
  Body,
  Controller,
  Param,
  Post,
  Patch,
  Delete,
  Get,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CreateProductUseCase } from 'src/application/use-cases/product/create-product.usecase';
import { UpdateProductUseCase } from 'src/application/use-cases/product/update-product.usecase';
import { ActivateProductUseCase } from 'src/application/use-cases/product/activate-product.usecase';
import { ArchiveProductUseCase } from 'src/application/use-cases/product/archive-product.usecase';
import { ListProductsUseCase } from 'src/application/use-cases/product/list-product.usecase';

import { AddCategoryUseCase } from 'src/application/use-cases/product/add-category-product.usecase';
import { RemoveCategoryUseCase } from 'src/application/use-cases/product/remove-category-product.usecase';

import { AddAttributeUseCase } from 'src/application/use-cases/product/add-attribute-product.usecase';
import { UpdateAttributeProductUseCase } from 'src/application/use-cases/product/update-attribute-product.usecase';
import { RemoveAttributeUseCase } from 'src/application/use-cases/product/remove-attribute-product.usecase';
import { CreateProductDto } from './dto/product/create-product.request';
import { UpdateProductDto } from './dto/product/update-category.request';
import { AddCategoryToProductDto } from './dto/category/add-category-to-product.dto';
import { AddAttributeToProductDto } from './dto/category/add-attribute-to-product.dto';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(
    private readonly createProduct: CreateProductUseCase,
    private readonly updateProduct: UpdateProductUseCase,
    private readonly activateProduct: ActivateProductUseCase,
    private readonly archiveProduct: ArchiveProductUseCase,
    private readonly listProducts: ListProductsUseCase,

    private readonly addCategory: AddCategoryUseCase,
    private readonly removeCategory: RemoveCategoryUseCase,

    private readonly addAttribute: AddAttributeUseCase,
    private readonly updateAttribute: UpdateAttributeProductUseCase,
    private readonly removeAttribute: RemoveAttributeUseCase,
  ) {}

  // =========================
  // CREATE PRODUCT
  // =========================
  @Post()
  @ApiOperation({ summary: 'Create product' })
  @ApiResponse({ status: 201 })
  async create(@Body() body: CreateProductDto) {
    return this.createProduct.execute(body);
  }

  // =========================
  // UPDATE PRODUCT
  // =========================
  @Patch(':id')
  @ApiOperation({ summary: 'Update product' })
  @ApiResponse({ status: 200 })
  async update(@Param('id') id: string, @Body() body: UpdateProductDto) {
    return this.updateProduct.execute({
      productId: id,
      ...body,
    });
  }

  // =========================
  // ACTIVATE PRODUCT
  // =========================
  @Patch(':id/activate')
  @ApiOperation({ summary: 'Activate product' })
  async activate(@Param('id') id: string) {
    return this.activateProduct.execute(id);
  }

  // =========================
  // ARCHIVE PRODUCT
  // =========================
  @Patch(':id/archive')
  @ApiOperation({ summary: 'Archive product' })
  async archive(@Param('id') id: string) {
    return this.archiveProduct.execute(id);
  }

  // =========================
  // LIST PRODUCTS
  // =========================
  @Get()
  @ApiOperation({ summary: 'List products' })
  async list() {
    return this.listProducts.execute();
  }

  // =========================
  // ADD CATEGORY
  // =========================
  @Post(':id/categories')
  @ApiOperation({ summary: 'Add category to product' })
  async addCategoryToProduct(
    @Param('id') id: string,
    @Body() body: AddCategoryToProductDto,
  ) {
    return this.addCategory.execute(id, body.categoryId);
  }

  // =========================
  // REMOVE CATEGORY
  // =========================
  @Delete(':id/categories/:categoryId')
  @ApiOperation({ summary: 'Remove category from product' })
  async removeCategoryProduct(
    @Param('id') id: string,
    @Param('categoryId') categoryId: string,
  ) {
    return this.removeCategory.execute(id, categoryId);
  }

  // =========================
  // ADD ATTRIBUTE
  // =========================
  @Post(':id/attributes')
  @ApiOperation({ summary: 'Add attribute to product' })
  async addAttributeProduct(
    @Param('id') id: string,
    @Body() body: AddAttributeToProductDto,
  ) {
    return this.addAttribute.execute(id, body);
  }

  // =========================
  // UPDATE ATTRIBUTE
  // =========================
  @Patch(':id/attributes')
  @ApiOperation({ summary: 'Update attribute' })
  async updateAttributeProduct(
    @Param('id') id: string,
    @Body() body: AddAttributeToProductDto,
  ) {
    return this.updateAttribute.execute(id, body);
  }

  // =========================
  // REMOVE ATTRIBUTE
  // =========================
  @Delete(':id/attributes/:key')
  @ApiOperation({ summary: 'Remove attribute' })
  async removeAttributeProduct(
    @Param('id') id: string,
    @Param('key') key: string,
  ) {
    return this.removeAttribute.execute(id, key);
  }
}
