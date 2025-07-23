import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CreateReviewDto } from './dto';
import { IReviewService, REVIEW_SERVICE_TOKEN } from './interfaces';

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
