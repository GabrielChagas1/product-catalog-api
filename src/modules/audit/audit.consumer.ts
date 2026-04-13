import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventBus } from 'src/shared/infrastructure/messaging/event-bus';
import { TypeOrmAuditRepository } from 'src/infrastructure/persistence/typeorm/repositories/typeorm-audit.repository';

@Injectable()
export class AuditConsumer implements OnModuleInit {
  constructor(
    private readonly eventBus: EventBus,
    private readonly auditRepository: TypeOrmAuditRepository,
  ) {}

  onModuleInit() {
    console.log('🔥 AUDIT CONSUMER INIT');

    this.eventBus.subscribe('CategoryCreated', (event) => this.handle(event));
    this.eventBus.subscribe('ProductActive', (event) => this.handle(event));
    this.eventBus.subscribe('ProductAddedAttribute', (event) =>
      this.handle(event),
    );
    this.eventBus.subscribe('ProductAddedCategory', (event) =>
      this.handle(event),
    );
    this.eventBus.subscribe('ProductArchived', (event) => this.handle(event));
    this.eventBus.subscribe('ProductCreated', (event) => this.handle(event));
    this.eventBus.subscribe('ProductRemovedAttribute', (event) =>
      this.handle(event),
    );
    this.eventBus.subscribe('ProductRemovedCategory', (event) =>
      this.handle(event),
    );
    this.eventBus.subscribe('ProductUpdatedAttribute', (event) =>
      this.handle(event),
    );
    this.eventBus.subscribe('ProductUpdated', (event) => this.handle(event));

    console.log('📌 SUBSCRIBED');
  }

  async handle(event: any) {
    console.log('AUDIT RECEIVED', event);

    await this.auditRepository.save({
      id: crypto.randomUUID(),
      type: event.type,
      payload: event.payload,
      occurredAt: new Date(),
    });
  }
}
