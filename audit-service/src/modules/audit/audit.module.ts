import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuditService } from './audit.service';
import { AuditController } from './audit.controller';
import { AuditLog } from './audit-log.model';

@Module({
  imports: [SequelizeModule.forFeature([AuditLog])],
  providers: [AuditService],
  controllers: [AuditController],
})
export class AuditModule {}
