import { Test, TestingModule } from '@nestjs/testing';
import { HydrateRestController } from './hydrate-rest.controller';

describe('HydrateRestController', () => {
  let controller: HydrateRestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HydrateRestController],
    }).compile();

    controller = module.get<HydrateRestController>(HydrateRestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
