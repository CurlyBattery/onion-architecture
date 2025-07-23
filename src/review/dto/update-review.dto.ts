import { IReview } from '../domain/entities/review.entity';
import { IsOptional, IsString } from 'class-validator';

export class UpdateReviewDto implements Partial<IReview> {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;
}
