import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';

export const getPostgresConfig = (
  configService: ConfigService,
): SequelizeModuleOptions => ({
  host: configService.get<string>('DB_HOST'),
  port: parseInt(configService.get<string>('DB_PORT') || '', 10),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASS'),
  database: configService.get<string>('DB_NAME'),
  dialect: 'postgres',
  autoLoadModels: true,
  synchronize: true,
});
