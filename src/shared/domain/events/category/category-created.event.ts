import { DomainEvent } from '../domain-event.interface';

export class CategoryCreatedEvent implements DomainEvent {
  type = 'CategoryCreated';
  occurredAt = new Date();

  constructor(public payload: { id: string; name: string }) {}
}
