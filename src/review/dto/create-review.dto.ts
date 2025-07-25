import { IReview } from '../domain/entities/review.entity';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReviewDto implements Omit<IReview, 'userId'> {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
