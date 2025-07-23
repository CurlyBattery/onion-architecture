import { Inject, Injectable } from '@nestjs/common';

import { IReviewService } from '../domain/ports/review-service.port';
import {
  IReviewRepository,
  REVIEW_REPOSITORY_TOKEN,
} from '../domain/ports/review-repository.port';
import { IReview } from '../domain/entities/review.entity';

@Injectable()
export class ReviewService implements IReviewService {
  constructor(
    @Inject(REVIEW_REPOSITORY_TOKEN)
    private readonly repository: IReviewRepository,
  ) {}

  async createReview(createReviewDto: IReview): Promise<IReview> {
    return await this.repository.save(createReviewDto);
  }

  async getReviews(): Promise<IReview[]> {
    return await this.repository.getAll();
  }

  async getReviewById(id: number): Promise<IReview> {
    return await this.repository.get(id);
  }

  async deleteReview(id: number): Promise<{ message: string }> {
    await this.repository.delete(id);
    return { message: 'Successfully deleted review' };
  }

  async updateReview(
    id: number,
    updateReviewDto: Partial<IReview>,
  ): Promise<IReview> {
    return await this.repository.update(id, updateReviewDto);
  }
}
