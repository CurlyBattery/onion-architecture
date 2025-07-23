import { IReview } from '../entities/review.entity';

export const REVIEW_SERVICE_TOKEN = 'REVIEW_SERVICE_TOKEN';

export interface IReviewService {
  createReview(createReviewDto: IReview): Promise<IReview>;
  getReviews(): Promise<IReview[]>;
  getReviewById(id: number): Promise<IReview>;
  deleteReview(id: number): void;
  updateReview(id: number, updateReviewDto: Partial<IReview>): Promise<IReview>;
}
