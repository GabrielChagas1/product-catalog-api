import { AttributeInput } from 'src/application/dto/create-product.dto';
import { ProductStatus } from 'src/domain/product.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class ProductOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: ProductStatus,
  })
  status!: ProductStatus;

  @Column('simple-array')
  categoryIds!: string[];

  @Column('jsonb')
  attributes!: AttributeInput[];
}
