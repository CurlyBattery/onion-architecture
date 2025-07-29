import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import {
  IUserService,
  USER_SERVICE_TOKEN,
} from '../../user/domain/ports/user-service.port';
import { IAuthService } from '../domain/ports/auth-service.port';
import { IUser } from 'src/user/domain/entities/user.entity';
import { ITokens } from '../domain/entities/tokens.entity';

@Injectable()
export class AuthUseCase implements IAuthService {
  constructor(
    @Inject(USER_SERVICE_TOKEN) private readonly userUseCase: IUserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(input: IUser): Promise<ITokens> {
    const user = await this.userUseCase.createUser(input);

    const accessToken = await this.generateAt(user);
    return { accessToken, refreshToken: 'wg' };
  }

  async checkPassword(input: IUser): Promise<ITokens> {
    const accessToken = await this.generateAt(input);
    return { accessToken, refreshToken: 'gw' };
  }

  async validateUser(username: string, password: string) {
    const existsUser = await this.userUseCase.getUserByUsername(username);

    if (await this.isComparePasswords(password, existsUser.password)) {
      return existsUser;
    }
    return null;
  }

  private async isComparePasswords(
    inputPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compareSync(inputPassword, hashedPassword);
  }

  private async generateAt(user: IUser) {
    const payload = { sub: user.id, role: user.role };
    return await this.jwtService.signAsync(payload);
  }

  authenticated(input: Omit<ITokens, 'refreshToken'>): Promise<IUser> {
    throw new Error('Method not implemented.');
  }

  refreshTokens(input: Omit<ITokens, 'accessToken'>): Promise<ITokens> {
    throw new Error('Method not implemented.');
  }

  logout(input: Omit<ITokens, 'refreshToken'>): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
