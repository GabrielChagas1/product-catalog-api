import { Product } from 'src/domain/product.entity';

export interface ProductRepository {
  findByName(name: string): Promise<Product | null>;
  findById(id: string): Promise<Product | null>;
  save(product: Product): Promise<void>;
  findAll(): Promise<Product[]>;
}
