import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { REVIEW_REPOSITORY_TOKEN, REVIEW_SERVICE_TOKEN } from './interfaces';
import { ReviewRepository } from './review.repository';

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
