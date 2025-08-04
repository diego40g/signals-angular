import { Module } from '@nestjs/common';
import { HydrateRestController } from './hydrate-rest.controller';

@Module({
  controllers: [HydrateRestController]
})
export class HydrateRestModule {}
