import { IReview } from '../entities/review.entity';

export const REVIEW_SERVICE_TOKEN = 'REVIEW_SERVICE_TOKEN';

export interface IReviewService {
  createReview(input: IReview): Promise<IReview>;
  getReviews(): Promise<IReview[]>;
  getReviewById(id: number): Promise<IReview>;
  deleteReview(id: number): void;
  updateReview(id: number, input: Partial<IReview>): Promise<IReview>;
}
