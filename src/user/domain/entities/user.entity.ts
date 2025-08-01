import { IReview } from '../../../review/domain/entities/review.entity';
import { Role } from '../../../../generated/prisma';

export interface IUser {
  id?: number;
  username: string;
  email: string;
  password: string;
  role?: Role;
  reviews?: IReview[];
}
