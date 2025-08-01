import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

import { IReview } from '../review/domain/entities/review.entity';
import { ReviewSearchResult } from '../review/dto/review-search-result.dto';
import { ReviewSearchBody } from '../review/dto/review-search-body.dto';

@Injectable()
export class ReviewSearchService {
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
}
