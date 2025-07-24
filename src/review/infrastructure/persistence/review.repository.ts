import { Injectable } from '@nestjs/common';

import { IReviewRepository } from '../../domain/ports/review-repository.port';
import { PrismaService } from '../../../prisma/prisma.service';
import { IReview } from '../../domain/entities/review.entity';
import { Prisma } from 'generated/prisma';
import { DefaultArgs } from 'generated/prisma/runtime/library';

@Injectable()
export class ReviewRepository implements IReviewRepository {
  constructor(private readonly prisma: PrismaService) {}

  get(params: {
    where: Prisma.ReviewWhereUniqueInput;
    select?: Prisma.ReviewSelect<DefaultArgs>;
    include?: any;
  }): Promise<IReview> {
    const { where, select } = params;
    return this.prisma.review.findUnique({
      where,
      select,
    });
  }
  async delete(params: {
    where: Prisma.ReviewWhereUniqueInput;
  }): Promise<void> {
    const { where } = params;
    await this.prisma.review.delete({
      where,
    });
  }
  save(params: {
    data: Prisma.ReviewCreateInput;
    select?: Prisma.ReviewSelect<DefaultArgs>;
    include?: any;
  }): Promise<IReview> {
    const { data, select } = params;
    return this.prisma.review.create({
      data,
      select,
    });
  }
  update(params: {
    where: Prisma.ReviewWhereUniqueInput;
    data: Prisma.ReviewUpdateInput;
    select?: Prisma.ReviewSelect<DefaultArgs>;
    include?: any;
  }): Promise<IReview> {
    const { where, data, select } = params;
    return this.prisma.review.update({
      where,
      data,
      select,
    });
  }
  getAll(params: {
    select?: Prisma.ReviewSelect<DefaultArgs>;
    include?: any;
  }): Promise<IReview[]> {
    const { select } = params;
    return this.prisma.review.findMany({
      select,
    });
  }
}
