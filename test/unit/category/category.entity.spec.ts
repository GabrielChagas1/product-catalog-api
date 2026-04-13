import { Category } from 'src/domain/category.entity';

describe('Category Entity', () => {
  it('should create a valid category', () => {
    const category = new Category({
      id: '1',
      name: 'Electronics',
    });

    expect(category.name).toBe('Electronics');
  });

  it('should not allow empty name', () => {
    expect(() => {
      new Category({
        id: '1',
        name: '',
      });
    }).toThrow('Category name cannot be empty');
  });

  it('should not allow self parent', () => {
    expect(() => {
      new Category({
        id: '1',
        name: 'Test',
        parentId: '1',
      });
    }).toThrow('Category cannot be parent of itself');
  });

  it('should update name', () => {
    const category = new Category({
      id: '1',
      name: 'Old',
    });

    category.updateName('New');

    expect(category.name).toBe('New');
  });
});
