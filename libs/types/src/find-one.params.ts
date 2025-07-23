import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindOneParams {
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  id: number;
}
