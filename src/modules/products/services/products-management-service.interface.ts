import { Prisma } from '@prisma/client';
import { CreateProductDto, ProductDto } from '../dtos';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { ProductQueryDto } from '../dtos/product-query.dto';

export interface IProductsManagementService {
  findAll(query: ProductQueryDto): Promise<ProductDto[]>;

  count(where?: Prisma.ProductWhereInput): Promise<number>;

  findOne(id: bigint): Promise<ProductDto>;

  deleteOne(id: bigint): Promise<void>;

  createOne(createProductDto: CreateProductDto): Promise<ProductDto>;

  updateOne(
    id: bigint,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductDto>;

  getBestSelling();
  getMonthlySales();
  getStockByCategory();
  getStockDeficiency();
}
