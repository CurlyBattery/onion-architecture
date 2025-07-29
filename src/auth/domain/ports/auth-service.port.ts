import { IUser } from '../../../user/domain/entities/user.entity';
import { ITokens } from '../entities/tokens.entity';

export const AUTH_SERVICE_TOKEN = 'AUTH_SERVICE_TOKEN';

export interface IAuthService {
  signUp(input: IUser): Promise<ITokens>;
  signIn(input: IUser): Promise<ITokens>;
  authenticated(input: Omit<ITokens, 'refreshToken'>): Promise<IUser>;
  refreshTokens(input: Omit<ITokens, 'accessToken'>): Promise<ITokens>;
  logout(input: Omit<ITokens, 'refreshToken'>): Promise<void>;
}
