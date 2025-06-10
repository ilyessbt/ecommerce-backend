import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

import { objectsUtil, TimeStampedItemDto } from 'src/common';
import { OrderProductDto } from './order-products.dto';

export class OrderDto extends TimeStampedItemDto {
  @ApiProperty()
  totalAmount: number;

  @ApiProperty({ type: () => [OrderProductDto] })
  products?: OrderProductDto[];

  constructor(
    order: Partial<
      Prisma.OrderGetPayload<{
        include: {
          products: {
            include: {
              product: true;
            };
          };
        };
      }>
    >,
  ) {
    super({
      ...order,
      createdAt: order.createdAt ?? undefined,
      updatedAt: order.updatedAt ?? undefined,
    });
    Object.assign(
      this,
      objectsUtil.mapObjectByAttributes(order, ['totalAmount']),
    );

    if (order.products) {
      this.products = order.products.map(
        (orderProduct) => new OrderProductDto(orderProduct),
      );
    }
  }
}
