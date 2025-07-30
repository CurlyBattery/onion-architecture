import { IRepository } from '@app/interfaces';
import { Prisma } from '../../../../generated/prisma';
import { IRefreshSession } from '../entities/refresh-session.entity';

export const REFRESH_SESSION_REPOSITORY_TOKEN =
  'REFRESH_TOKEN_REPOSITORY_TOKEN';

export interface IRefreshSessionRepository
  extends IRepository<
    IRefreshSession,
    Prisma.RefreshSessionWhereInput,
    Prisma.RefreshSessionWhereUniqueInput,
    Prisma.RefreshSessionSelect,
    Prisma.RefreshSessionInclude,
    Prisma.RefreshSessionUncheckedCreateInput,
    Prisma.RefreshSessionUpdateInput
  > {}
