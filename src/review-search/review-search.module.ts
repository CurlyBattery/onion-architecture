import { Module } from '@nestjs/common';
import { ReviewSearchService } from './review-search.service';
import { SearchModule } from '../search/search.module';

@Module({
  imports: [SearchModule],
  providers: [ReviewSearchService],
  exports: [ReviewSearchService],
})
export class ReviewSearchModule {}
