import { Module } from '@nestjs/common';

import { DataAccessModule } from './modules/data-access';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [DataAccessModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
