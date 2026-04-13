import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class AddCategoryToProductDto {
  @ApiProperty()
  @IsUUID()
  categoryId!: string;
}
