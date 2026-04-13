import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLogOrmEntity } from 'src/infrastructure/persistence/typeorm/entities/audit-log.orm-entity';
import { AuditConsumer } from './audit.consumer';
import { TypeOrmAuditRepository } from 'src/infrastructure/persistence/typeorm/repositories/typeorm-audit.repository';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([AuditLogOrmEntity]), SharedModule],
  providers: [TypeOrmAuditRepository, AuditConsumer],
  exports: [AuditConsumer],
})
export class AuditModule {}
