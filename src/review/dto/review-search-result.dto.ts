import { ReviewSearchBody } from './review-search-body.dto';

export interface ReviewSearchResult {
  hits: {
    total: number;
    hits: Array<{
      _source: ReviewSearchBody;
    }>;
  };
}
