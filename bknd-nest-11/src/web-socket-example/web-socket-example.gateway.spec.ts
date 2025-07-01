import { Test, TestingModule } from '@nestjs/testing';
import { WebSocketExampleGateway } from './web-socket-example.gateway';

describe('WebSocketGateway', () => {
  let gateway: WebSocketExampleGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebSocketExampleGateway],
    }).compile();

    gateway = module.get<WebSocketExampleGateway>(WebSocketExampleGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
