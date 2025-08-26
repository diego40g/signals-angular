import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebSocketExampleModule } from './web-socket-example/web-socket-example.module';
import { HydrateRestModule } from './hydrate-rest/hydrate-rest.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [WebSocketExampleModule, HydrateRestModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
