import { IReview } from '../entities/review.entity';
import { IRepository } from '@app/interfaces';

export const REVIEW_REPOSITORY_TOKEN = 'REVIEW_REPOSITORY_TOKEN';

export interface IReviewRepository extends IRepository<IReview> {}
