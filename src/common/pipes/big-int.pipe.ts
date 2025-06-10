import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class BigIntPipe implements PipeTransform<string, bigint> {
  transform(value: string, metadata: ArgumentMetadata): bigint {
    try {
      return BigInt(value);
    } catch (error) {
      throw new BadRequestException(
        `Validation failed: ${metadata.type} should be a valid BigInt.`
      );
    }
  }
}
