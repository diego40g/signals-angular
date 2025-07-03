import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebSocketExampleModule } from './web-socket-example/web-socket-example.module';

@Module({
  imports: [WebSocketExampleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
