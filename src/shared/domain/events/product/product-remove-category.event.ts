import { DomainEvent } from '../domain-event.interface';

export class ProductRemovedCategoryEvent implements DomainEvent {
  type = 'ProductRemovedCategory';
  occurredAt = new Date();

  constructor(public payload: { id: string; name: string }) {}
}
