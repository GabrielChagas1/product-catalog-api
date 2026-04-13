export type AttributeInput = {
  key: string;
  value: string;
};

export type CreateProductInput = {
  name: string;
  description?: string;
  categoryIds?: string[];
  attributes?: AttributeInput[];
};
