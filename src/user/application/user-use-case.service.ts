import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from '../domain/ports/user-service.port';
import { IUser } from '../domain/entities/user.entity';
import {
  IUserRepository,
  USER_REPOSITORY_TOKEN,
} from '../domain/ports/user-repository.port';

@Injectable()
export class UserUseCase implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN) private readonly repository: IUserRepository,
  ) {}

  async createUser(input: IUser): Promise<IUser> {
    throw new Error('Method not implemented.');
  }
  getUserById(id: number): Promise<IUser> {
    throw new Error('Method not implemented.');
  }
  getUserByEmail(email: string): Promise<IUser> {
    throw new Error('Method not implemented.');
  }
  deleteUser(id: number): void {
    throw new Error('Method not implemented.');
  }
  updateUser(id: number, input: Partial<IUser>): Promise<IUser> {
    throw new Error('Method not implemented.');
  }
}
