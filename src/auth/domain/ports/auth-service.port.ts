import { CookieOptions, Response } from 'express';

import { IUser } from '../../../user/domain/entities/user.entity';
import { ITokens } from '../entities/tokens.entity';
import { IClientMetadata } from '@app/decorators';

export const AUTH_SERVICE_TOKEN = 'AUTH_SERVICE_TOKEN';

export interface IAuthService {
  signUp(
    input: IUser,
    clientMeta: IClientMetadata,
    fingerprint: string,
    isReceiveLetters: boolean,
  ): Promise<ITokens>;
  checkPassword(
    input: IUser,
    clientMeta: IClientMetadata,
    fingerprint: string,
  ): Promise<ITokens>;
  validateUser(username: string, password: string): Promise<IUser>;
  refreshTokens(
    input: Omit<ITokens, 'accessToken'>,
    clientMeta: IClientMetadata,
    fingerprint: string,
  ): Promise<ITokens>;
  logout(input: Omit<ITokens, 'accessToken'>): Promise<{ message: string }>;
  validateToken(input: Omit<ITokens, 'accessToken'>): Promise<boolean>;
  getRefreshTokenCookie(refreshToken: string): {
    name: string;
    value: string;
    options: CookieOptions;
  };
}
