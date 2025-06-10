import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { ParseInt } from '../decorators';
import { numbersConstant } from '../constants';

export class PaginationByPageQueryDto {
  @ApiProperty()
  @IsNumber()
  @ParseInt()
  @IsNotEmpty()
  @Min(1)
  @Max(numbersConstant.MAXIMUM_INTEGER)
  page: number;
}

export class PaginationByLimitQueryDto extends PaginationByPageQueryDto {
  @ApiProperty()
  @IsNumber()
  @ParseInt()
  @IsNotEmpty()
  @Min(1)
  @Max(200)
  limit: number;
}

export class PaginatedDto<T = unknown> {
  items: T[];
  meta: {
    totalCount: number;
    totalPages: number;
    page: number;
  };

  constructor(input: Partial<PaginatedDto<T>>) {
    Object.assign(this, input);
  }
}
