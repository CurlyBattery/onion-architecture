import { Prisma } from '../../../../generated/prisma';

import { IUser } from '../entities/user.entity';
import { IRepository } from '@app/interfaces';

export const USER_REPOSITORY_TOKEN = 'USER_REPOSITORY_TOKEN';

export interface IUserRepository
  extends IRepository<
    IUser,
    Prisma.UserWhereUniqueInput,
    Prisma.UserSelect,
    Prisma.UserInclude,
    Prisma.UserUncheckedCreateInput,
    Prisma.UserUpdateInput
  > {}
