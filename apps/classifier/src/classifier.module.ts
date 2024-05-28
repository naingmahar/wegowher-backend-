import { Module } from '@nestjs/common';
import { ClassifierController } from './classifier.controller';
import { ClassifierService } from './classifier.service';
import { KeyGen } from './res/keygen.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { dataBaseConfig } from './res/database.config';
import { Message } from './res/message.entity';

@Module({
  imports: [
    SequelizeModule.forRoot(dataBaseConfig),
    SequelizeModule.forFeature([KeyGen,Message])
  ],
  controllers: [ClassifierController],
  providers: [ClassifierService],
})
export class ClassifierModule {}
