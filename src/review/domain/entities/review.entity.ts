import { IUser } from '../../../user/domain/entities/user.entity';
import { IReviewView } from './review-view.entity';

export interface IReview {
  id?: number;
  title: string;
  content: string;
  userId: number;
  user?: IUser;
  views?: IReviewView[];
}
