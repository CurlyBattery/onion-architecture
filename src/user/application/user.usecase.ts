import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

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

  async createUser(input: Omit<IUser, 'reviews'>): Promise<IUser> {
    const existingUser = await this.repository.get({
      where: { username: input.username },
    });
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashPassword = bcrypt.hashSync(input.password, 10);

    return await this.repository.save({
      data: { ...input, password: hashPassword },
    });
  }

  async getUserById(id: number): Promise<IUser> {
    const user = await this.repository.get({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getUserByUsername(username: string): Promise<IUser> {
    const user = await this.repository.get({ where: { username } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async deleteUser(id: number): Promise<{ message: string }> {
    const user = await this.repository.get({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.repository.delete({ where: { id } });
    return { message: 'Successfully deleted user' };
  }

  async updateUser(
    id: number,
    input: Partial<Omit<IUser, 'reviews'>>,
  ): Promise<IUser> {
    const user = await this.repository.get({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (input.username) {
      const existsUser = await this.repository.get({
        where: { username: input.username },
      });
      if (existsUser) {
        throw new ConflictException('User already exists');
      }
    }
    return await this.repository.update({ where: { id }, data: input });
  }
}
