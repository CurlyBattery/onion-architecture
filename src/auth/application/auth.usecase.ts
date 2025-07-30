import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

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

@Injectable()
export class AuthUseCase implements IAuthService {
  private readonly refreshTokenExpiresIn: number;

  constructor(
    @Inject(USER_SERVICE_TOKEN) private readonly userUseCase: IUserService,
    @Inject(REFRESH_SESSION_REPOSITORY_TOKEN)
    private readonly refreshSessionRepository: IRefreshSessionRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.refreshTokenExpiresIn = this.getExpiresIn(
      this.configService.get<string>('RT_EXPIRE_IN'),
    );
  }

  async signUp(
    input: IUser,
    clientMeta: any,
    res: Response,
    fingerprint: string,
  ): Promise<ITokens> {
    const user = await this.userUseCase.createUser(input);

    return await this.issuingTokens(user, clientMeta, res, fingerprint);
  }

  async checkPassword(
    user: IUser,
    clientMeta: any,
    res: Response,
    fingerprint: string,
  ): Promise<ITokens> {
    const sessions = await this.refreshSessionRepository.getAll({
      where: {
        userId: user.id,
      },
    });
    if (sessions.length >= 5) {
      await this.refreshSessionRepository.deleteMany({
        where: {
          userId: user.id,
        },
      });
    }

    const session = await this.refreshSessionRepository.get({
      where: {
        userId_ip_ua_fingerprint: {
          userId: user.id,
          ip: clientMeta.ip,
          ua: clientMeta.userAgent,
          fingerprint,
        },
      },
    });
    if (session) {
      await this.refreshSessionRepository.delete({
        where: {
          userId_ip_ua_fingerprint: {
            userId: user.id,
            ip: clientMeta.ip,
            ua: clientMeta.userAgent,
            fingerprint,
          },
        },
      });
    }

    return await this.issuingTokens(user, clientMeta, res, fingerprint);
  }

  private async issuingTokens(
    user: IUser,
    clientMeta: any,
    res: Response,
    fingerprint: string,
  ) {
    const accessToken = await this.generateAccessToken(user);
    const refreshSession = await this.saveRefreshSession(
      user,
      clientMeta.ip,
      fingerprint,
      clientMeta.userAgent,
      this.refreshTokenExpiresIn,
    );

    res.cookie('refresh-cookie', refreshSession.refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: refreshSession.expiresIn,
      path: '/api/auth',
    });

    return { accessToken, refreshToken: refreshSession.refreshToken };
  }

  async validateUser(username: string, password: string) {
    const existsUser = await this.userUseCase.getUserByUsername(username);

    const isMatch = await bcrypt.compare(password, existsUser.password);
    return isMatch ? existsUser : null;
  }

  private async generateAccessToken(user: IUser) {
    const payload = { sub: user.id, role: user.role };
    return await this.jwtService.signAsync(payload);
  }

  private async saveRefreshSession(
    user: IUser,
    ip: string,
    fingerprint: string,
    userAgent: string,
    expiresIn: number,
  ): Promise<IRefreshSession> {
    return this.refreshSessionRepository.save({
      data: {
        userId: user.id,
        ua: userAgent,
        fingerprint: fingerprint,
        ip,
        expiresIn,
      },
    });
  }

  private getExpiresIn(stringExp: string): number {
    const time = stringExp[stringExp.length - 1];
    const num = Number(stringExp.slice(0, -1));
    switch (time) {
      case 's':
        return num * 1000;
      case 'm':
        return num * 60 * 1000;
      case 'h':
        return num * 60 * 60 * 1000;
      case 'd':
        return num * 60 * 60 * 24 * 1000;
      default:
        return 1000;
    }
  }

  refreshTokens(input: Omit<ITokens, 'accessToken'>): Promise<ITokens> {
    throw new Error('Method not implemented.');
  }

  logout(input: Omit<ITokens, 'refreshToken'>): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
