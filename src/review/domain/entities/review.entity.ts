import { IUser } from '../../../user/domain/entities/user.entity';

export interface IReview {
  id?: number;
  title: string;
  content: string;
  userId: number;
  user?: IUser;
}
