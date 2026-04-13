import { DomainEvent } from '../domain-event.interface';

export class ProductArchivedEvent implements DomainEvent {
  type = 'ProductArchived';
  occurredAt = new Date();

  constructor(public payload: { id: string; name: string }) {}
}
