import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AuditService } from './audit.service';

@Controller()
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @EventPattern('user.login')
  async handleUserLogin(@Payload() data: any) {
    await this.auditService.logLogin(data);
  }
}
