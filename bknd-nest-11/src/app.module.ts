import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebSocketExampleModule } from './web-socket-example/web-socket-example.module';
import { HydrateRestModule } from './hydrate-rest/hydrate-rest.module';

@Module({
  imports: [WebSocketExampleModule, HydrateRestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
