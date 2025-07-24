import { Inject, Injectable } from '@nestjs/common';

import { IReviewService } from '../domain/ports/review-service.port';
import {
  IReviewRepository,
  REVIEW_REPOSITORY_TOKEN,
} from '../domain/ports/review-repository.port';
import { IReview } from '../domain/entities/review.entity';
import { ReviewNotFoundException } from '../domain/exceptions/review-not-found.exception';
import { ReviewConflictException } from '../domain/exceptions/review-conflict.exception';

@Injectable()
export class ReviewUseCase implements IReviewService {
  constructor(
    @Inject(REVIEW_REPOSITORY_TOKEN)
    private readonly repository: IReviewRepository,
  ) {}

  async createReview(input: IReview): Promise<IReview> {
    const existsReview = await this.repository.get({
      where: { title: input.title },
    });
    if (existsReview) {
      throw new ReviewConflictException();
    }
    return await this.repository.save({ data: input });
  }

  async getReviews(): Promise<IReview[]> {
    return await this.repository.getAll({});
  }

  async getReviewById(id: number): Promise<IReview> {
    const review = await this.repository.get({ where: { id } });
    if (!review) {
      throw new ReviewNotFoundException();
    }
    return review;
  }

  async deleteReview(id: number): Promise<{ message: string }> {
    const review = await this.repository.get({ where: { id } });
    if (!review) {
      throw new ReviewNotFoundException();
    }
    await this.repository.delete({ where: { id } });
    return { message: 'Successfully deleted review' };
  }

  async updateReview(id: number, input: Partial<IReview>): Promise<IReview> {
    const review = await this.repository.get({ where: { id } });
    if (!review) {
      throw new ReviewNotFoundException();
    }
    return await this.repository.update({ where: { id }, data: input });
  }
}
