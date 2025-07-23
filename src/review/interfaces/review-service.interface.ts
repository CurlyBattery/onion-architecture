import { IReview } from './review.inteface';

export const REVIEW_SERVICE_TOKEN = 'REVIEW_SERVICE_TOKEN';
export const REVIEW_REPOSITORY_TOKEN = 'REVIEW_REPOSITORY_TOKEN';

export interface IReviewService {
  createReview(createReviewDto: IReview): Promise<IReview>;
  getReviews(): Promise<IReview[]>;
}
