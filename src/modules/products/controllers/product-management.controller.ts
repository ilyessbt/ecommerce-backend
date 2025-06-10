import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  IProductsManagementService,
  ProductsManagementService,
} from '../services';
import { API_PATH_PREFIXES } from 'src/modules/configs';
import { BigIntPipe, Resource } from 'src/common';
import { CreateProductDto, ProductDto } from '../dtos';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { ProductQueryDto } from '../dtos/product-query.dto';

@ApiTags('Products management')
@Controller(`${API_PATH_PREFIXES.ADMIN_PANEL}/${Resource.PRODUCTS}`)
export class ProductsManagementController {
  constructor(
    @Inject(ProductsManagementService)
    private readonly productManagementService: IProductsManagementService,
  ) {}
  @Get()
  findAll(@Query() query: ProductQueryDto) {
    return this.productManagementService.findAll(query);
  }

  @Get('best-selling')
  bestSelling() {
    return this.productManagementService.getBestSelling();
  }

  @Get('monthly-sales')
  monthlySales() {
    return this.productManagementService.getMonthlySales();
  }

  @Get('stock-by-category')
  stockByCategory() {
    return this.productManagementService.getStockByCategory();
  }

  @Get('low-stock')
  lowStock() {
    return this.productManagementService.getStockDeficiency();
  }
  @Get('count')
  async count(): Promise<number> {
    return this.productManagementService.count();
  }

  @Get(':id')
  async getOne(@Param('id', BigIntPipe) id: bigint): Promise<ProductDto> {
    return this.productManagementService.findOne(id);
  }

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductDto> {
    return this.productManagementService.createOne(createProductDto);
  }

  @Put(':id')
  async update(
    @Param('id', BigIntPipe) id: bigint,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductDto> {
    return this.productManagementService.updateOne(id, updateProductDto);
  }

  @Delete(':id')
  async delete(@Param('id', BigIntPipe) id: bigint): Promise<void> {
    return this.productManagementService.deleteOne(id);
  }
}
