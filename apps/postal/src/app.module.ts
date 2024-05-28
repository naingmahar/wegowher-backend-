import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChannelModule } from './channel/channel.module';
import { OfficeModule } from './office/office.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../..', 'public'), 
      renderPath:"/chat",
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../..', 'public/channel'), 
      renderPath:"/usa",
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../..', 'public/channel'),
      renderPath:"/china",
    }),
    ChannelModule, OfficeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
