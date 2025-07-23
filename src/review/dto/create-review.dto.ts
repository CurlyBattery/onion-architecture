import { IReview } from '../domain/entities/review.entity';

export class CreateReviewDto implements IReview {
  title: string;
  content: string;
}
