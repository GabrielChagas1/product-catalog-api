import { CreateProductUseCase } from 'src/application/use-cases/product/create-product.usecase';

describe('CreateProductUseCase', () => {
  let useCase: CreateProductUseCase;

  const repository = {
    findByName: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new CreateProductUseCase(
      repository as any,
      {
        publish: jest.fn(),
      } as any,
    );
  });

  it('should create product', async () => {
    repository.findByName.mockResolvedValue(null);

    const result = await useCase.execute({
      name: 'Product A',
      categoryIds: ['cat1'],
      attributes: [{ key: 'color', value: 'red' }],
    });

    expect(repository.save).toHaveBeenCalled();
    expect(result.name).toBe('Product A');
  });

  it('should not allow duplicate name', async () => {
    repository.findByName.mockResolvedValue({ id: '1' });

    await expect(
      useCase.execute({
        name: 'Product A',
      }),
    ).rejects.toThrow('already exists');
  });
});
