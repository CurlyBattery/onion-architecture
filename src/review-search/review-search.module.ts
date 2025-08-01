import { Module } from '@nestjs/common';
import { SearchModule } from '../search/search.module';
import { ReviewSearchService } from './application/review-search.service';
import { REVIEW_SEARCH_SERVICE_TOKEN } from './domain/ports/review-search-service.port';

@Module({
  imports: [SearchModule],
  providers: [
    {
      provide: REVIEW_SEARCH_SERVICE_TOKEN,
      useClass: ReviewSearchService,
    },
  ],
  exports: [REVIEW_SEARCH_SERVICE_TOKEN],
})
export class ReviewSearchModule {}
