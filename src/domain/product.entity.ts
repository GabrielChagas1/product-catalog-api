export enum ProductStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
}

type Attribute = {
  key: string;
  value: string;
};

export class Product {
  private _id: string;
  private _name: string;
  private _description?: string;
  private _status: ProductStatus;
  private _categoryIds: string[];
  private _attributes: Attribute[];

  constructor(params: {
    id: string;
    name: string;
    description?: string;
    status?: ProductStatus;
    categoryIds?: string[];
    attributes?: Attribute[];
  }) {
    this._id = params.id;
    this._name = params.name;
    this._description = params.description;
    this._status = params.status ?? ProductStatus.DRAFT;
    this._categoryIds = params.categoryIds ?? [];
    this._attributes = params.attributes ?? [];
  }

  // =====================
  // GETTERS
  // =====================

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get status() {
    return this._status;
  }

  get categoryIds() {
    return [...this._categoryIds];
  }

  get attributes() {
    return [...this._attributes];
  }

  // =====================
  // BEHAVIORS
  // =====================

  updateDescription(description: string) {
    this._description = description;
  }

  activate() {
    if (this._status === ProductStatus.ARCHIVED) {
      throw new Error('Archived product cannot be activated');
    }

    if (this._categoryIds.length === 0) {
      throw new Error(
        'Product must have at least one category to be activated',
      );
    }

    if (this._attributes.length === 0) {
      throw new Error(
        'Product must have at least one attribute to be activated',
      );
    }

    this._status = ProductStatus.ACTIVE;
  }

  archive() {
    this._status = ProductStatus.ARCHIVED;
  }

  addCategory(categoryId: string) {
    this.ensureNotArchived();

    if (this._categoryIds.includes(categoryId)) {
      return;
    }

    this._categoryIds.push(categoryId);
  }

  removeCategory(categoryId: string) {
    this.ensureNotArchived();

    this._categoryIds = this._categoryIds.filter((id) => id !== categoryId);
  }

  addAttribute(key: string, value: string) {
    this.ensureNotArchived();

    const exists = this._attributes.some((attr) => attr.key === key);

    if (exists) {
      throw new Error(`Attribute with key "${key}" already exists`);
    }

    this._attributes.push({ key, value });
  }

  updateAttribute(key: string, value: string) {
    this.ensureNotArchived();

    const attr = this._attributes.find((attr) => attr.key === key);

    if (!attr) {
      throw new Error(`Attribute with key "${key}" not found`);
    }

    attr.value = value;
  }

  removeAttribute(key: string) {
    this.ensureNotArchived();

    this._attributes = this._attributes.filter((attr) => attr.key !== key);
  }

  // =====================
  // PRIVATE RULES
  // =====================

  private ensureNotArchived() {
    if (this._status === ProductStatus.ARCHIVED) {
      throw new Error('Archived product cannot be modified');
    }
  }
}
