// import {
//   Controller,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Get,
//   Inject,
// } from '@nestjs/common';
// import { ApiTags } from '@nestjs/swagger';
// import { CreateCategoryUseCase } from 'src/application/use-cases/category/create-category.usecase';
// import { GetCategoryUseCase } from 'src/application/use-cases/category/get-category.usecase';
// import { UpdateCategoryUseCase } from 'src/application/use-cases/category/update-category.usecase';
// import { UpdateCategoryRequest } from './dto/update-category.request';
// import { CreateCategoryRequest } from './dto/create-category.request';
// import { ListCategoriesUseCase } from 'src/application/use-cases/category/list-category.usecase';

// @ApiTags('Categories')
// @Controller('categories')
// export class CategoryController {
//   constructor(
//     @Inject(CreateCategoryUseCase)
//     private readonly createCategoryUseCase: CreateCategoryUseCase,

//     @Inject(UpdateCategoryUseCase)
//     private readonly updateCategoryUseCase: UpdateCategoryUseCase,

//     @Inject(GetCategoryUseCase)
//     private readonly getCategoryUseCase: GetCategoryUseCase,

//     @Inject(ListCategoriesUseCase)
//     private readonly listCategoriesUseCase: ListCategoriesUseCase,
//   ) {}

//   @Post()
//   create(@Body() body: CreateCategoryRequest) {
//     return this.createCategoryUseCase.execute(body);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() body: UpdateCategoryRequest) {
//     return this.updateCategoryUseCase.execute(id, body);
//   }

//   @Get(':id')
//   get(@Param('id') id: string) {
//     return this.getCategoryUseCase.execute(id);
//   }

//   @Get()
//   list() {
//     return this.listCategoriesUseCase.execute();
//   }
// }

import { Controller, Post, Body, Patch, Param, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CreateCategoryUseCase } from 'src/application/use-cases/category/create-category.usecase';
import { GetCategoryUseCase } from 'src/application/use-cases/category/get-category.usecase';
import { UpdateCategoryUseCase } from 'src/application/use-cases/category/update-category.usecase';
import { ListCategoriesUseCase } from 'src/application/use-cases/category/list-category.usecase';

import { CreateCategoryRequest } from './dto/category/create-category.request';
import { UpdateCategoryRequest } from './dto/category/update-category.request';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly getCategoryUseCase: GetCategoryUseCase,
    private readonly listCategoriesUseCase: ListCategoriesUseCase,
  ) {}

  // =========================
  // CREATE CATEGORY
  // =========================
  @Post()
  @ApiOperation({ summary: 'Create category' })
  @ApiResponse({ status: 201, description: 'Category created' })
  create(@Body() body: CreateCategoryRequest) {
    return this.createCategoryUseCase.execute(body);
  }

  // =========================
  // UPDATE CATEGORY
  // =========================
  @Patch(':id')
  @ApiOperation({ summary: 'Update category' })
  @ApiResponse({ status: 200, description: 'Category updated' })
  update(@Param('id') id: string, @Body() body: UpdateCategoryRequest) {
    return this.updateCategoryUseCase.execute(id, body);
  }

  // =========================
  // GET CATEGORY
  // =========================
  @Get(':id')
  @ApiOperation({ summary: 'Get category by id' })
  @ApiResponse({ status: 200, description: 'Category found' })
  get(@Param('id') id: string) {
    return this.getCategoryUseCase.execute(id);
  }

  // =========================
  // LIST CATEGORIES
  // =========================
  @Get()
  @ApiOperation({ summary: 'List categories' })
  @ApiResponse({ status: 200, description: 'Categories list' })
  list() {
    return this.listCategoriesUseCase.execute();
  }
}
