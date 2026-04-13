import { DomainEvent } from '../domain-event.interface';

export class ProductRemovedAttributeEvent implements DomainEvent {
  type = 'ProductRemovedAttribute';
  occurredAt = new Date();

  constructor(public payload: { id: string; name: string }) {}
}
