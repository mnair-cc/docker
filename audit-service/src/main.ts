import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const natsUrl = configService.get<string>(
    'NATS_URL',
    'nats://localhost:4222',
  );
  app.connectMicroservice({
    transport: Transport.NATS,
    options: {
      servers: [natsUrl],
    },
  });
  await app.startAllMicroservices();
  await app.init();
}

bootstrap();
