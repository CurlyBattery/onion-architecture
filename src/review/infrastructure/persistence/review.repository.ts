import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { IReviewRepository } from '../../domain/ports/review-repository.port';
import { IReview } from '../../domain/entities/review.entity';
import { Prisma } from 'generated/prisma';
import { DefaultArgs } from 'generated/prisma/runtime/library';
import { IReviewView } from 'src/review/domain/entities/review-view.entity';

@Injectable()
export class ReviewRepository implements IReviewRepository {
  constructor(private readonly prisma: PrismaService) {}

  get(params: {
    where: Prisma.ReviewWhereUniqueInput;
    select?: Prisma.ReviewSelect<DefaultArgs>;
    include?: Prisma.ReviewInclude;
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
    data: Prisma.ReviewUncheckedCreateInput;
    select?: Prisma.ReviewSelect<DefaultArgs>;
    include?: Prisma.ReviewInclude;
  }): Promise<IReview> {
    const { data, select, include } = params;
    return this.prisma.review.create({
      data,
      ...(select ? { select } : include ? { include } : {}),
    });
  }
  update(params: {
    where: Prisma.ReviewWhereUniqueInput;
    data: Prisma.ReviewUpdateInput;
    select?: Prisma.ReviewSelect<DefaultArgs>;
    include?: Prisma.ReviewInclude;
  }): Promise<IReview> {
    const { where, data, select, include } = params;
    return this.prisma.review.update({
      where,
      data,
      ...(select ? { select } : include ? { include } : {}),
    });
  }
  getAll(params: {
    select?: Prisma.ReviewSelect<DefaultArgs>;
    include?: Prisma.ReviewInclude;
    take?: number;
    where?: Prisma.ReviewWhereInput;
  }): Promise<IReview[]> {
    const { where, select, include, take } = params;
    return this.prisma.review.findMany({
      where,
      take,
      ...(include ? { include } : {}),
    });
  }

  getUniqueViews(params: {
    where: Prisma.ReviewViewWhereUniqueInput;
    select?: Prisma.ReviewViewSelect<DefaultArgs>;
    include?: Prisma.ReviewViewInclude<DefaultArgs>;
  }) {
    const { select, include, where } = params;
    return this.prisma.reviewView.findUnique({
      where,
      ...(select ? { select } : include ? { include } : {}),
    });
  }

  saveView(params: {
    data: Prisma.ReviewViewUncheckedCreateInput;
  }): Promise<IReviewView> {
    const { data } = params;
    return this.prisma.reviewView.create({
      data,
    });
  }
}
