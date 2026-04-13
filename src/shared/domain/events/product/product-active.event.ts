import { DomainEvent } from '../domain-event.interface';

export class ProductActiveEvent implements DomainEvent {
  type = 'ProductActive';
  occurredAt = new Date();

  constructor(public payload: { id: string; name: string }) {}
}
