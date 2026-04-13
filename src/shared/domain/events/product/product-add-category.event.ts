import { DomainEvent } from '../domain-event.interface';

export class ProductAddedCategoryEvent implements DomainEvent {
  type = 'ProductAddedCategory';
  occurredAt = new Date();

  constructor(public payload: { id: string; name: string }) {}
}
