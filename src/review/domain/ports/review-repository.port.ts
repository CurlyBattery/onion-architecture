import { IReview } from '../entities/review.entity';
import { IRepository } from '@app/interfaces';
import { Prisma } from 'generated/prisma';

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
  > {}
