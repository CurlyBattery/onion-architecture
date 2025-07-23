import { IReview } from '../interfaces';

export class CreateReviewDto implements Partial<IReview> {
  title: string;
  content: string;
}
