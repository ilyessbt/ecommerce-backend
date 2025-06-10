import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

import { OrderDto } from './order.dto';
import { objectsUtil, TimeStampedItemDto } from 'src/common';
import { ProductDto } from 'src/modules/products';

export class OrderProductDto extends TimeStampedItemDto {
  @ApiProperty()
  quantity: number;

  @ApiProperty()
  price: number;

  @ApiProperty({ type: () => ProductDto })
  product?: ProductDto;

  @ApiProperty({ type: () => OrderDto })
  order?: OrderDto;

  constructor(
    orderProduct: Partial<
      Prisma.OrderProductGetPayload<{
        include: {
          product: true;
          order: true;
        };
      }>
    >,
  ) {
    super(orderProduct);
    Object.assign(
      this,
      objectsUtil.mapObjectByAttributes(orderProduct, ['quantity', 'price']),
    );

    if (orderProduct.product) {
      this.product = new ProductDto(orderProduct.product);
    }

    if (orderProduct.order) {
      this.order = new OrderDto(orderProduct.order);
    }
  }
}
