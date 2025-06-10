import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

import { objectsUtil, TimeStampedItemDto } from 'src/common';
import { ProductDto } from 'src/modules/products';

export class CategoryDto extends TimeStampedItemDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ type: () => [ProductDto] })
  products?: ProductDto[];

  constructor(
    category: Partial<
      Prisma.CategoryGetPayload<{
        include: {
          products: true;
        };
      }>
    >,
  ) {
    super({
      ...category,
      createdAt: category.createdAt ?? undefined,
      updatedAt: category.updatedAt ?? undefined,
    });
    Object.assign(this, objectsUtil.mapObjectByAttributes(category, ['name']));

    if (category.products) {
      this.products = category.products.map(
        (product) => new ProductDto(product),
      );
    }
  }
}
