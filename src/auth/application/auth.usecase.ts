import { Inject, Injectable } from '@nestjs/common';
import {
  IUserService,
  USER_SERVICE_TOKEN,
} from '../../user/domain/ports/user-service.port';
import { IAuthService } from '../domain/ports/auth-service.port';
import { IUser } from 'src/user/domain/entities/user.entity';
import { ITokens } from '../domain/entities/tokens.entity';
import { JwtService } from '@nestjs/jwt';

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

  private async generateAt(user: IUser) {
    const payload = { sub: user.id, role: user.role };
    return await this.jwtService.signAsync(payload);
  }

  signIn(input: IUser): Promise<ITokens> {
    throw new Error('Method not implemented.');
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
