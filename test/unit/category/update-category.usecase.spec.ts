import { UpdateCategoryUseCase } from 'src/application/use-cases/category/update-category.usecase';

describe('UpdateCategoryUseCase', () => {
  let repo: any;
  let useCase: UpdateCategoryUseCase;

  beforeEach(() => {
    repo = {
      findById: jest.fn(),
      findByName: jest.fn(),
      save: jest.fn(),
    };

    useCase = new UpdateCategoryUseCase(repo);
  });

  it('should update category name', async () => {
    const category = {
      id: '1',
      name: 'Old',
      updateName: jest.fn(),
      setParent: jest.fn(),
    };

    repo.findById.mockResolvedValue(category);
    repo.findByName.mockResolvedValue(null);

    const result = await useCase.execute('1', { name: 'New' });

    expect(category.updateName).toHaveBeenCalledWith('New');
    expect(repo.save).toHaveBeenCalled();
    expect(result.name).toBe('Old'); // ou adapte conforme seu retorno real
  });

  it('should not update if category does not exist', async () => {
    repo.findById.mockResolvedValue(null);

    await expect(useCase.execute('1', { name: 'Test' })).rejects.toThrow();
  });
});
