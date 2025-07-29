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
import {
  IRefreshSessionRepository,
  REFRESH_SESSION_REPOSITORY_TOKEN,
} from '../domain/ports/refresh-session-repository.port';
import { IRefreshSession } from '../domain/entities/refresh-session.entity';
import { IFingerprint } from 'nestjs-fingerprint';

@Injectable()
export class AuthUseCase implements IAuthService {
  constructor(
    @Inject(USER_SERVICE_TOKEN) private readonly userUseCase: IUserService,
    @Inject(REFRESH_SESSION_REPOSITORY_TOKEN)
    private readonly refreshSessionRepository: IRefreshSessionRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(input: IUser, fp: IFingerprint): Promise<ITokens> {
    const user = await this.userUseCase.createUser(input);

    const accessToken = await this.generateAccessToken(user);
    const { refreshToken } = await this.saveRefreshSession(
      user,
      fp.ipAddress.value,
      fp,
      fp.userAgent.browser.family,
    );
    return { accessToken, refreshToken };
  }

  async checkPassword(input: IUser): Promise<ITokens> {
    const accessToken = await this.generateAccessToken(input);
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
    return await bcrypt.compare(inputPassword, hashedPassword);
  }

  private async generateAccessToken(user: IUser) {
    const payload = { sub: user.id, role: user.role };
    return await this.jwtService.signAsync(payload);
  }

  private async saveRefreshSession(
    user: IUser,
    ip: string,
    fingerprint: IFingerprint,
    userAgent: string,
    // expiresIn: string,
  ): Promise<IRefreshSession> {
    return this.refreshSessionRepository.save({
      data: {
        userId: user.id,
        ua: userAgent,
        fingerprint: JSON.stringify(fingerprint),
        ip,
        expiresIn: 12,
      },
    });
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
