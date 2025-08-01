import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

import { IReview } from '../../review/domain/entities/review.entity';
import { ReviewSearchBody } from '../../review/dto/review-search-body.dto';
import { IReviewSearchService } from '../domain/ports/review-search-service.port';

@Injectable()
export class ReviewSearchService implements IReviewSearchService {
  index = 'reviews';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexReview(review: Omit<IReview, 'views' | 'user'>) {
    return this.elasticsearchService.index<ReviewSearchBody>({
      index: this.index,
      document: {
        id: review.id,
        title: review.title,
        content: review.content,
        userId: review.userId.toString(),
      },
    });
  }

  async search(text: string): Promise<ReviewSearchBody[]> {
    const { hits } = await this.elasticsearchService.search<ReviewSearchBody>({
      index: this.index,
      query: {
        bool: {
          should: [
            {
              wildcard: {
                title: {
                  value: `*${text.toLowerCase()}*`,
                },
              },
            },
            {
              wildcard: {
                content: {
                  value: `*${text.toLowerCase()}*`,
                },
              },
            },
          ],
        },
      },
    });

    return hits.hits.map((hit) => hit._source);
  }

  async remove(reviewId: number): Promise<void> {
    await this.elasticsearchService.deleteByQuery({
      index: this.index,
      query: {
        match: {
          id: reviewId,
        },
      },
    });
  }
}
