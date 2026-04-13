import { DomainEvent } from '../domain-event.interface';

export class ProductUpdatedEvent implements DomainEvent {
  type = 'ProductUpdated';
  occurredAt = new Date();

  constructor(public payload: { id: string; name: string }) {}
}
