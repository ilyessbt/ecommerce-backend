import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/data-access';
import { IProductsManagementService } from './products-management-service.interface';
import { CreateProductDto, ProductDto } from '../dtos';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { Prisma } from '@prisma/client';
import { ProductQueryDto } from '../dtos/product-query.dto';

@Injectable()
export class ProductsManagementService implements IProductsManagementService {
  constructor(private readonly prismaService: PrismaService) {}

  async count(where?: Prisma.ProductWhereInput) {
    return this.prismaService.product.count({ where });
  }

  async findOne(id: bigint): Promise<ProductDto> {
    const product = await this.prismaService.product.findUnique({
      where: { id },
      include: {
        category: true,
        orders: {
          include: {
            order: true,
          },
        },
      },
    });
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    return new ProductDto(product);
  }

  async deleteOne(id: bigint): Promise<void> {
    await this.prismaService.product.delete({
      where: { id },
    });
  }

  async createOne(createProductDto: CreateProductDto): Promise<ProductDto> {
    const categoryExists = await this.prismaService.category.findUnique({
      where: { id: createProductDto.categoryId },
    });
    if (!categoryExists) {
      throw new Error(
        `Category with id ${createProductDto.categoryId} does not exist`,
      );
    }
    const product = await this.prismaService.product.create({
      data: {
        ...createProductDto,
        categoryId: categoryExists.id,
      },
      include: {
        category: true,
      },
    });
    return new ProductDto(product);
  }

  async updateOne(
    id: bigint,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductDto> {
    const categoryExists = await this.prismaService.category.findUnique({
      where: { id: updateProductDto.categoryId },
    });
    if (!categoryExists) {
      throw new Error(
        `Category with id ${updateProductDto.categoryId} does not exist`,
      );
    }
    const product = await this.prismaService.product.update({
      where: { id },
      data: {
        ...updateProductDto,
        categoryId: categoryExists.id,
      },
      include: {
        category: true,
      },
    });
    return new ProductDto(product);
  }

  async findAll(query: ProductQueryDto): Promise<ProductDto[]> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      category,
      name,
    } = query;
    const products = await this.prismaService.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
      where: {
        name: name ? { contains: name, mode: 'insensitive' } : undefined,
        categoryId: category ? +category : undefined,
      },
      include: { category: true },
    });
    return products.map((product) => new ProductDto(product));
  }

  async getBestSelling() {
    return this.prismaService.orderProduct.groupBy({
      by: ['productId'],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 5,
    });
  }

  async getMonthlySales() {
    return this.prismaService
      .$queryRaw`SELECT to_char(o."createdAt", 'YYYY-MM') as month, sum(op.quantity * p.price) as total
      FROM "Order" o
      JOIN "OrderProduct" op ON o.id = op."orderId"
      JOIN "Product" p ON p.id = op."productId"
      GROUP BY month
      ORDER BY month;`;
  }

  async getStockByCategory() {
    return this.prismaService
      .$queryRaw`SELECT c.name as category, sum(p.stock) as total
    FROM "Category" c
    JOIN "Product" p ON c.id = p."categoryId"
    GROUP BY c.name;`;
  }

  async getStockDeficiency() {
    return this.prismaService.product.findMany({
      where: { stock: { lt: 5 } },
      orderBy: { stock: 'asc' },
    });
  }
}
