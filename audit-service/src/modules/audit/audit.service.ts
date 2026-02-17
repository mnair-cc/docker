import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuditLog } from './audit-log.model';

@Injectable()
export class AuditService {
  constructor(
    @InjectModel(AuditLog)
    private auditLogModel: typeof AuditLog,
  ) {}

  async logLogin(data: any) {
    const { userId, username, action, timestamp } = data;
    await this.auditLogModel.create({
      userId,
      username,
      action,
      timestamp,
    });
  }
}
