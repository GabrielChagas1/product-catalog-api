import { DomainEvent } from '../domain-event.interface';

export class ProductCreatedEvent implements DomainEvent {
  type = 'ProductCreated';
  occurredAt = new Date();

  constructor(public payload: { id: string; name: string }) {}
}
