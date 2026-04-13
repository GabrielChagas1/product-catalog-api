import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddAttributeToProductDto {
  @ApiProperty()
  @IsNotEmpty()
  key!: string;

  @ApiProperty()
  @IsNotEmpty()
  value!: string;
}
