import { ApiProperty } from '@nestjs/swagger';
import { objectsUtil } from '../utils/objects.util';

export class TimeStampedItemDto {
  @ApiProperty()
  id: bigint;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(input: Partial<TimeStampedItemDto>) {
    Object.assign(
      this,
      objectsUtil.mapObjectByAttributes(input, [
        'id',
        'createdAt',
        'updatedAt',
      ]),
    );
  }
}
