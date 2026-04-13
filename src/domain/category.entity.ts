export class Category {
  private _id: string;
  private _name!: string;
  private _parentId?: string;

  constructor(params: { id: string; name: string; parentId?: string }) {
    this._id = params.id;
    this.setName(params.name);
    this._parentId = params.parentId;

    this.validateSelfParent();
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

  get parentId() {
    return this._parentId;
  }

  // =====================
  // BEHAVIORS
  // =====================

  updateName(name: string) {
    this.setName(name);
  }

  setParent(parentId?: string) {
    this._parentId = parentId;
    this.validateSelfParent();
  }

  // =====================
  // PRIVATE RULES
  // =====================

  private setName(name: string) {
    if (!name || name.trim().length === 0) {
      throw new Error('Category name cannot be empty');
    }

    this._name = name;
  }

  private validateSelfParent() {
    if (this._parentId && this._parentId === this._id) {
      throw new Error('Category cannot be parent of itself');
    }
  }
}
