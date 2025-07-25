import { IReview } from '../entities/review.entity';
import { IRepository } from '@app/interfaces';
import { Prisma } from 'generated/prisma';

export const REVIEW_REPOSITORY_TOKEN = 'REVIEW_REPOSITORY_TOKEN';

export interface IReviewRepository
  extends IRepository<
    IReview,
    Prisma.ReviewWhereUniqueInput,
    Prisma.ReviewSelect,
    any,
    Prisma.ReviewUncheckedCreateInput,
    Prisma.ReviewUpdateInput
  > {}
