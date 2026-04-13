import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { DomainEvent } from 'src/shared/domain/events/domain-event.interface';

type Handler = (event: DomainEvent) => void;

@Injectable()
export class EventBus {
  private handlers: Record<string, Handler[]> = {};

  constructor() {
    console.log('🧠 EVENTBUS INSTANCE:', this);
  }

  publish(event: DomainEvent) {
    console.log('📤 PUBLISH EVENT:', event.type);
    console.log('HANDLERS:', this.handlers[event.type]?.length ?? 0);

    setImmediate(() => {
      const handlers = this.handlers[event.type] || [];
      handlers.forEach((h) => h(event));
    });
  }

  subscribe(eventType: string, handler: Handler) {
    if (!this.handlers[eventType]) {
      this.handlers[eventType] = [];
    }

    this.handlers[eventType].push(handler);
  }
}
