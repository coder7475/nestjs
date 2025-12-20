import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class IsPositivePipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const val = Number.parseInt(value, 10);

    if (Number.isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }

    if (val <= 0) {
      throw new BadRequestException('Number must be positive');
    }

    return val;
  }
}
