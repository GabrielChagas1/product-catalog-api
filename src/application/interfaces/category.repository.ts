import { Category } from 'src/domain/category.entity';

export interface CategoryRepository {
  findByName(name: string): Promise<any | null>;
  findById(id: string): Promise<any | null>;
  save(category: any): Promise<void>;
  findAll(): Promise<Category[]>;
}
