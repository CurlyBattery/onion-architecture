import { IReview } from '../../../review/domain/entities/review.entity';
import { ReviewSearchBody } from '../../../review/dto/review-search-body.dto';

export const REVIEW_SEARCH_SERVICE_TOKEN = 'REVIEW_SEARCH_SERVICE_TOKEN';

export interface IReviewSearchService {
  indexReview(review: Omit<IReview, 'user' | 'views'>): any;
  search(text: string): Promise<ReviewSearchBody[]>;
  remove(reviewId: number): Promise<void>;
}
