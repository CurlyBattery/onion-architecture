import { IReview } from '../entities/review.entity';

export const REVIEW_SERVICE_TOKEN = 'REVIEW_SERVICE_TOKEN';

export interface IReviewService {
  createReview(createReviewDto: IReview): Promise<IReview>;
  getReviews(): Promise<IReview[]>;
}
