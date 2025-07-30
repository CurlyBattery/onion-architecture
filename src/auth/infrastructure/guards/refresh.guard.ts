import {
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  AUTH_SERVICE_TOKEN,
  IAuthService,
} from '../../domain/ports/auth-service.port';
export const REFRESH_TOKEN_COOKIE_NAME = 'refresh-cookie';

@Injectable()
export class RefreshGuard extends AuthGuard('refresh') {
  constructor(
    @Inject(AUTH_SERVICE_TOKEN) private readonly authService: IAuthService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const refreshToken = request.cookies[REFRESH_TOKEN_COOKIE_NAME];
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh session expired');
    }

    const isValidRefreshToken = await this.authService.validateToken({
      refreshToken,
    });
    if (!isValidRefreshToken) {
      throw new UnauthorizedException('Refresh token is not valid');
    }

    return true;
  }
}
