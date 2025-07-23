import { Module } from '@nestjs/common';

import { ReviewController } from './infrastructure/http/review.controller';
import { REVIEW_SERVICE_TOKEN } from './domain/ports/review-service.port';
import { ReviewService } from './application/review.service';
import { REVIEW_REPOSITORY_TOKEN } from './domain/ports/review-repository.port';
import { ReviewRepository } from './infrastructure/persistence/review.repository';

@Module({
  controllers: [ReviewController],
  providers: [
    {
      provide: REVIEW_SERVICE_TOKEN,
      useClass: ReviewService,
    },
    {
      provide: REVIEW_REPOSITORY_TOKEN,
      useClass: ReviewRepository,
    },
  ],
})
export class ReviewModule {}
