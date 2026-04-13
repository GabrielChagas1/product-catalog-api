import { Global, Module } from '@nestjs/common';
import { EventBus } from './infrastructure/messaging/event-bus';

@Global()
@Module({
  providers: [EventBus],
  exports: [EventBus],
})
export class SharedModule {}
