import { Module } from '@nestjs/common';
import { HydrateRestController } from './hydrate-rest.controller';
import { ProductsService } from './services/products/products.service';
import { UsersService } from './services/users/users.service';
import { ProductsController } from './controller/products/products.controller';
import { UsersController } from './controller/users/users.controller';

@Module({
  controllers: [HydrateRestController, ProductsController, UsersController],
  providers: [ProductsService, UsersService]
})
export class HydrateRestModule {}
