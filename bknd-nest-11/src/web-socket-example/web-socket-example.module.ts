import { Module } from '@nestjs/common';
import { WebSocketExampleGateway } from './web-socket-example.gateway';

@Module({
    providers: [WebSocketExampleGateway],
})
export class WebSocketExampleModule {}
