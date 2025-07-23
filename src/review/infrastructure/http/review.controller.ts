import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  IReviewService,
  REVIEW_SERVICE_TOKEN,
} from '../../domain/ports/review-service.port';
import { CreateReviewDto } from '../../dto/create-review.dto';
import { FindOneParams } from '@app/types';
import { UpdateReviewDto } from '../../dto/update-review.dto';

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

  @Get(':id')
  getReviewById(@Param() { id }: FindOneParams) {
    return this.reviewService.getReviewById(id);
  }

  @Delete(':id')
  deleteReview(@Param() { id }: FindOneParams) {
    return this.reviewService.deleteReview(id);
  }

  @Patch(':id')
  updateReview(
    @Param() { id }: FindOneParams,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewService.updateReview(id, updateReviewDto);
  }
}
