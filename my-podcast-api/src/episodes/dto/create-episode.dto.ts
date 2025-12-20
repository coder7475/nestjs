import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEpisodeDto {
  @IsString()
  name: string;

  @IsNumber()
  duration: number;

  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @IsDate()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Type(() => Date)
  @IsOptional()
  releaseDate?: Date;
}
