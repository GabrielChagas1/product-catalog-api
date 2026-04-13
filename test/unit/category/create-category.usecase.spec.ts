import { CreateCategoryUseCase } from 'src/application/use-cases/category/create-category.usecase';

describe('CreateCategoryUseCase', () => {
  let repo: any;
  let useCase: CreateCategoryUseCase;

  beforeEach(() => {
    repo = {
      findByName: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
    };

    useCase = new CreateCategoryUseCase(repo, {
      publish: jest.fn(),
    } as any);
  });

  it('should create a category successfully', async () => {
    repo.findByName.mockResolvedValue(null);

    const result = await useCase.execute({
      name: 'Electronics',
    });

    expect(result.name).toBe('Electronics');
    expect(repo.save).toHaveBeenCalled();
  });

  it('should not allow duplicate name', async () => {
    repo.findByName.mockResolvedValue({ id: '1' });

    await expect(useCase.execute({ name: 'Electronics' })).rejects.toThrow();
  });

  it('should validate parent category', async () => {
    repo.findByName.mockResolvedValue(null);
    repo.findById.mockResolvedValue(null);

    await expect(
      useCase.execute({
        name: 'Phones',
        parentId: 'invalid-id',
      }),
    ).rejects.toThrow();
  });

  it('should publish event when category is created', async () => {
    const eventBus = {
      publish: jest.fn(),
    };

    const repo = {
      findByName: jest.fn().mockResolvedValue(null),
      findById: jest.fn(),
      save: jest.fn(),
    };

    const useCase = new CreateCategoryUseCase(repo as any, eventBus as any);

    await useCase.execute({ name: 'Electronics' });

    expect(eventBus.publish).toHaveBeenCalled();
  });
});
