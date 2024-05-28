import { Module } from '@nestjs/common';
import { OfficeController } from './office.controller';
import { OfficeService } from './office.service';
import { Office } from './office';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CLASSIFIER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'post_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [OfficeController],
  providers: [OfficeService, Office]
})
export class OfficeModule {}
