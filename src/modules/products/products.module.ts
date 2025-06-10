import { Module } from '@nestjs/common';
import { ProductsManagementController } from './controllers/product-management.controller';
import { ProductsManagementService } from './services';

@Module({
  controllers: [ProductsManagementController],
  providers: [ProductsManagementService],
})
export class ProductsModule {}
