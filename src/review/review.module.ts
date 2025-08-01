import { Module } from '@nestjs/common';

import { ReviewController } from './infrastructure/http/review.controller';
import { REVIEW_SERVICE_TOKEN } from './domain/ports/review-service.port';
import { REVIEW_REPOSITORY_TOKEN } from './domain/ports/review-repository.port';
import { ReviewRepository } from './infrastructure/persistence/review.repository';
import { ReviewUseCase } from './application/review.usecase';
import { ReviewSearchModule } from '../review-search/review-search.module';
import { SearchModule } from '../search/search.module';

@Module({
  imports: [ReviewSearchModule, SearchModule],
  controllers: [ReviewController],
  providers: [
    {
      provide: REVIEW_SERVICE_TOKEN,
      useClass: ReviewUseCase,
    },
    {
      provide: REVIEW_REPOSITORY_TOKEN,
      useClass: ReviewRepository,
    },
  ],
  exports: [REVIEW_SERVICE_TOKEN],
})
export class ReviewModule {}
