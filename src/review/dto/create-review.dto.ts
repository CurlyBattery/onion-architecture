import { IReview } from '../domain/entities/review.entity';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReviewDto implements IReview {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
