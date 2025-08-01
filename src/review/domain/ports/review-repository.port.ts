import { IReview } from '../entities/review.entity';
import { IRepository } from '@app/interfaces';
import { Prisma } from 'generated/prisma';
import { IReviewView } from '../entities/review-view.entity';

export const REVIEW_REPOSITORY_TOKEN = 'REVIEW_REPOSITORY_TOKEN';

export interface IReviewRepository
  extends IRepository<
    IReview,
    Prisma.ReviewWhereInput,
    Prisma.ReviewWhereUniqueInput,
    Prisma.ReviewSelect,
    Prisma.ReviewInclude,
    Prisma.ReviewUncheckedCreateInput,
    Prisma.ReviewUpdateInput
  > {
  getUniqueViews(params: {
    where: Prisma.ReviewViewWhereUniqueInput;
    select?: Prisma.ReviewViewSelect;
    include?: Prisma.ReviewViewInclude;
  }): Promise<IReviewView>;

  saveView(params: {
    data: Prisma.ReviewViewUncheckedCreateInput;
  }): Promise<IReviewView>;
}
