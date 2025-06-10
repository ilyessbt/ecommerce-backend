import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { objectsUtil, TimeStampedItemDto } from 'src/common';
import { CategoryDto } from 'src/modules/categories';
import { OrderProductDto } from 'src/modules/orders/dtos/order-products.dto';

export class ProductDto extends TimeStampedItemDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  stock: number;

  @ApiProperty()
  category?: CategoryDto;

  @ApiProperty()
  orderProducts?: OrderProductDto[];

  constructor(
    product: Partial<
      Prisma.ProductGetPayload<{
        include: {
          category: true;
          orders: {
            include: {
              order: true;
            };
          };
        };
      }>
    >,
  ) {
    super({
      ...product,
      createdAt: product.createdAt ?? undefined,
      updatedAt: product.updatedAt ?? undefined,
    });
    Object.assign(
      this,
      objectsUtil.mapObjectByAttributes(product, [
        'name',
        'description',
        'price',
        'stock',
      ]),
    );

    if (product.category) {
      this.category = new CategoryDto(product.category);
    }

    if (product.orders) {
      this.orderProducts = product.orders.map(
        (orderProduct) => new OrderProductDto(orderProduct),
      );
    }
  }
}
