import { Inject, Injectable } from '@nestjs/common';

import { IReview, IReviewService, REVIEW_REPOSITORY_TOKEN } from './interfaces';
import { IRepository } from '@app/interfaces';

@Injectable()
export class ReviewService implements IReviewService {
  constructor(
    @Inject(REVIEW_REPOSITORY_TOKEN)
    private readonly repository: IRepository<IReview>,
  ) {}

  async createReview(createReviewDto: IReview): Promise<IReview> {
    return await this.repository.save(createReviewDto);
  }

  async getReviews(): Promise<IReview[]> {
    return await this.repository.getAll();
  }
}
