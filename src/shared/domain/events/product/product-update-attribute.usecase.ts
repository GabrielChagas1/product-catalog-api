import { DomainEvent } from '../domain-event.interface';

export class ProductUpdatedAttributeEvent implements DomainEvent {
  type = 'ProductUpdatedAttribute';
  occurredAt = new Date();

  constructor(public payload: { id: string; name: string }) {}
}
