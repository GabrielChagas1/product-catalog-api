import { UpdateProductUseCase } from 'src/application/use-cases/product/update-product.usecase';

describe('UpdateProductUseCase', () => {
  let useCase: UpdateProductUseCase;

  const repository = {
    findById: jest.fn(),
    findByName: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new UpdateProductUseCase(
      repository as any,
      {
        publish: jest.fn(),
      } as any,
    );
  });

  it('should update product name when valid', async () => {
    const product = {
      name: 'Old',
      status: 'DRAFT',
    };

    repository.findById.mockResolvedValue(product);
    repository.findByName.mockResolvedValue(null);

    await useCase.execute({
      productId: '1',
      name: 'New Name',
    });

    expect(repository.save).toHaveBeenCalled();
  });

  it('should not allow duplicate product name', async () => {
    const product = {
      name: 'Old',
      status: 'DRAFT',
    };

    repository.findById.mockResolvedValue(product);
    repository.findByName.mockResolvedValue({ id: '2' });

    await expect(
      useCase.execute({
        productId: '1',
        name: 'Duplicate',
      }),
    ).rejects.toThrow('Product with this name already exists');
  });

  it('should update description even if product is archived', async () => {
    const product = {
      name: 'Old',
      status: 'ARCHIVED',
      updateDescription: jest.fn(),
    };

    repository.findById.mockResolvedValue(product);

    await useCase.execute({
      productId: '1',
      description: 'new desc',
    });

    expect(product.updateDescription).toHaveBeenCalled();
  });

  it('should block name update when product is archived', async () => {
    const product = {
      name: 'Old',
      status: 'ARCHIVED',
    };

    repository.findById.mockResolvedValue(product);

    await expect(
      useCase.execute({
        productId: '1',
        name: 'New',
      }),
    ).rejects.toThrow('Cannot change name when product is archived');
  });
});
