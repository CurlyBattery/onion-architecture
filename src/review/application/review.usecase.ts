import { Inject, Injectable } from '@nestjs/common';

import { IReviewService } from '../domain/ports/review-service.port';
import {
  IReviewRepository,
  REVIEW_REPOSITORY_TOKEN,
} from '../domain/ports/review-repository.port';
import { IReview } from '../domain/entities/review.entity';
import { ReviewNotFoundException } from '../domain/exceptions/review-not-found.exception';
import { ReviewConflictException } from '../domain/exceptions/review-conflict.exception';
import { ReviewSearchService } from '../../review-search/review-search.service';

@Injectable()
export class ReviewUseCase implements IReviewService {
  constructor(
    @Inject(REVIEW_REPOSITORY_TOKEN)
    private readonly repository: IReviewRepository,
    private readonly reviewsSearchService: ReviewSearchService,
  ) {}

  async viewReview(reviewId: number, userId: number): Promise<IReview> {
    const existingView = await this.repository.getUniqueViews({
      where: { reviewId_userId: { reviewId, userId } },
    });

    if (!existingView) {
      await this.repository.saveView({
        data: {
          reviewId,
          userId,
        },
      });
    }

    return await this.repository.get({
      where: { id: reviewId },
      include: {
        likes: true,
        views: true,
      },
    });
  }

  async getPopularRecords(): Promise<IReview[]> {
    const reviews = await this.repository.getAll({
      include: {
        views: true,
      },
    });

    const filtered = reviews
      .map((review) => ({
        ...review,
        viewsCount: review.views.length,
      }))
      .filter((review) => review.viewsCount > 10)
      .sort((a, b) => b.viewsCount - a.viewsCount)
      .slice(0, 10);

    return filtered;
  }

  async createReview(input: Omit<IReview, 'views'>): Promise<IReview> {
    const existsReview = await this.repository.get({
      where: { title: input.title },
    });
    if (existsReview) {
      throw new ReviewConflictException();
    }
    const newReview = await this.repository.save({ data: input });
    await this.reviewsSearchService.indexReview(newReview);
    return newReview;
  }

  async getReviews(): Promise<IReview[]> {
    const reviews = await this.repository.getAll({
      include: {
        _count: true,
      },
    });
    return reviews;
  }

  async searchForReviews(text: string): Promise<IReview[]> {
    const results = await this.reviewsSearchService.search(text);
    const ids = results.map((result) => result.id);
    if (!ids.length) {
      return [];
    }
    const reviews = await this.repository.getAll({
      where: { id: { in: ids } },
    });
    return reviews;
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

  async updateReview(
    id: number,
    input: Partial<Omit<IReview, 'userId' | 'user' | 'views'>>,
  ): Promise<IReview> {
    const review = await this.repository.get({ where: { id } });
    if (!review) {
      throw new ReviewNotFoundException();
    }
    if (input.title) {
      const existsReview = await this.repository.get({
        where: { title: input.title },
      });
      if (existsReview) {
        throw new ReviewConflictException();
      }
    }
    return await this.repository.update({ where: { id }, data: input });
  }
}
