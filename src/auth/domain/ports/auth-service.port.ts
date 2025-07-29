import { IUser } from '../../../user/domain/entities/user.entity';
import { ITokens } from '../entities/tokens.entity';
import { IFingerprint } from 'nestjs-fingerprint';

export const AUTH_SERVICE_TOKEN = 'AUTH_SERVICE_TOKEN';

export interface IAuthService {
  signUp(input: IUser, fp: IFingerprint): Promise<ITokens>;
  checkPassword(input: IUser): Promise<ITokens>;
  authenticated(input: Omit<ITokens, 'refreshToken'>): Promise<IUser>;
  validateUser(username: string, password: string): Promise<IUser>;
  refreshTokens(input: Omit<ITokens, 'accessToken'>): Promise<ITokens>;
  logout(input: Omit<ITokens, 'refreshToken'>): Promise<void>;
}
