import { Product, ProductStatus } from 'src/domain/product.entity';

describe('Product Entity', () => {
  let product: Product;

  beforeEach(() => {
    product = new Product({
      id: '1',
      name: 'Product A',
      categoryIds: ['cat1'],
      attributes: [{ key: 'color', value: 'red' }],
    });
  });

  it('should activate product when valid', () => {
    product.activate();

    expect(product.status).toBe(ProductStatus.ACTIVE);
  });

  it('should not activate product without categories', () => {
    const p = new Product({
      id: '1',
      name: 'Product A',
      categoryIds: [],
      attributes: [{ key: 'color', value: 'red' }],
    });

    expect(() => p.activate()).toThrow(
      'Product must have at least one category to be activated',
    );
  });

  it('should not activate product without attributes', () => {
    const p = new Product({
      id: '1',
      name: 'Product A',
      categoryIds: ['cat1'],
      attributes: [],
    });

    expect(() => p.activate()).toThrow(
      'Product must have at least one attribute to be activated',
    );
  });

  it('should archive product', () => {
    product.archive();

    expect(product.status).toBe(ProductStatus.ARCHIVED);
  });

  it('should allow updating description even when archived', () => {
    product.archive();

    product.updateDescription('new description');

    expect(product.description).toBe('new description');
  });

  it('should not allow adding category when archived', () => {
    product.archive();

    expect(() => product.addCategory('cat2')).toThrow(
      'Archived product cannot be modified',
    );
  });

  it('should not allow adding attribute when archived', () => {
    product.archive();

    expect(() => product.addAttribute('size', 'M')).toThrow(
      'Archived product cannot be modified',
    );
  });

  it('should not allow removing category when archived', () => {
    product.archive();

    expect(() => product.removeCategory('cat1')).toThrow();
  });
});
