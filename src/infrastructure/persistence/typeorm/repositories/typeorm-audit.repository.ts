import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLogOrmEntity } from '../entities/audit-log.orm-entity';

@Injectable()
export class TypeOrmAuditRepository {
  constructor(
    @InjectRepository(AuditLogOrmEntity)
    private readonly repo: Repository<AuditLogOrmEntity>,
  ) {}

  async save(data: Partial<AuditLogOrmEntity>) {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }
}
