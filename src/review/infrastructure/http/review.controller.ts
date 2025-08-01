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
import { IReview } from '../../domain/entities/review.entity';
import { User } from '@app/decorators';
import { IUser } from '../../../user/domain/entities/user.entity';

@Controller('review')
export class ReviewController {
  constructor(
    @Inject(REVIEW_SERVICE_TOKEN)
    private readonly reviewService: IReviewService,
  ) {}

  @Post()
  createReview(
    @Body() createReviewDto: CreateReviewDto,
    @User('userId') userId: number,
  ) {
    const review: IReview = {
      title: createReviewDto.title,
      content: createReviewDto.content,
      userId,
    };

    return this.reviewService.createReview(review);
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
    const update: Partial<IReview> = {
      title: updateReviewDto.title,
      content: updateReviewDto.content,
    };

    return this.reviewService.updateReview(id, update);
  }

  @Get(':id/view')
  viewReview(@Param('id') id: number, @User('userId') userId: number) {
    return this.reviewService.viewReview(Number(id), userId);
  }
}
