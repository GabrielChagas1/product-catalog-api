import { DomainEvent } from '../domain-event.interface';

export class ProductAddedAttributeEvent implements DomainEvent {
  type = 'ProductAddedAttribute';
  occurredAt = new Date();

  constructor(public payload: { id: string; name: string }) {}
}
