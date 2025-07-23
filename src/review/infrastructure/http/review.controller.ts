import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import {
  IReviewService,
  REVIEW_SERVICE_TOKEN,
} from '../../domain/ports/review-service.port';
import { CreateReviewDto } from '../../dto/create-review.dto';

@Controller('review')
export class ReviewController {
  constructor(
    @Inject(REVIEW_SERVICE_TOKEN)
    private readonly reviewService: IReviewService,
  ) {}

  @Post()
  createReview(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.createReview(createReviewDto);
  }

  @Get()
  getReviews() {
    return this.reviewService.getReviews();
  }
}
