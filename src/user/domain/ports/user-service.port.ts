import { IUser } from '../entities/user.entity';

export const USER_SERVICE_TOKEN = 'USER_SERVICE_TOKEN';

export interface IUserService {
  createUser(input: IUser): Promise<IUser>;
  getUserById(id: number): Promise<IUser>;
  getUserByUsername(email: string): Promise<IUser>;
  deleteUser(id: number): Promise<{ message: string }>;
  updateUser(id: number, input: Partial<IUser>): Promise<IUser>;
}
