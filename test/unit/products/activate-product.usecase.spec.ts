import { ActivateProductUseCase } from 'src/application/use-cases/product/activate-product.usecase';

describe('ActivateProductUseCase', () => {
  let useCase: ActivateProductUseCase;

  const repository = {
    findById: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(() => {
    useCase = new ActivateProductUseCase(
      repository as any,
      {
        publish: jest.fn(),
      } as any,
    );
  });

  it('should activate product', async () => {
    const product = {
      activate: jest.fn(),
    };

    repository.findById.mockResolvedValue(product);

    await useCase.execute('1');

    expect(product.activate).toHaveBeenCalled();
    expect(repository.save).toHaveBeenCalled();
  });

  it('should throw if product not found', async () => {
    repository.findById.mockResolvedValue(null);

    await expect(useCase.execute('1')).rejects.toThrow();
  });
});
