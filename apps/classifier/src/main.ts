import { NestFactory } from '@nestjs/core';
import { ClassifierModule } from './classifier.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ClassifierModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'post_queue',
        queueOptions: {
          durable: false,
        },
        noAck:true
      },
    },
  );
  await app.listen();
}
bootstrap();
