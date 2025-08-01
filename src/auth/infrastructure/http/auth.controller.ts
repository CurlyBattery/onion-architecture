import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import {
  AUTH_SERVICE_TOKEN,
  IAuthService,
} from '../../domain/ports/auth-service.port';
import { IUser } from '../../../user/domain/entities/user.entity';
import { ITokens } from '../../domain/entities/tokens.entity';
import { RegistrationDto } from '../../dto/registration.dto';
import {
  User,
  Public,
  ClientMetadata,
  IClientMetadata,
  Cookie,
} from '@app/decorators';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import {
  REFRESH_TOKEN_COOKIE_NAME,
  RefreshGuard,
} from '../guards/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE_TOKEN) private readonly authUseCase: IAuthService,
  ) {}

  @Public()
  @Post('sign-up')
  async signUp(
    @Body() registrationDto: RegistrationDto,
    @ClientMetadata() clientMeta: IClientMetadata,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ITokens> {
    const input: IUser = {
      username: registrationDto.username,
      password: registrationDto.password,
      email: registrationDto.email,
    };
    const { accessToken, refreshToken } = await this.authUseCase.signUp(
      input,
      clientMeta,
      registrationDto.fingerprint,
      registrationDto.isReceiveLetters,
    );

    const { name, value, options } =
      this.authUseCase.getRefreshTokenCookie(refreshToken);

    res.cookie(name, value, options);

    return { accessToken, refreshToken };
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(
    @User() user: IUser,
    @ClientMetadata() clientMeta: IClientMetadata,
    @Res({ passthrough: true }) res: Response,
    @Body() loginDto: { fingerprint: string },
  ): Promise<ITokens> {
    const { accessToken, refreshToken } = await this.authUseCase.checkPassword(
      user,
      clientMeta,
      loginDto.fingerprint,
    );

    const { name, value, options } =
      this.authUseCase.getRefreshTokenCookie(refreshToken);

    res.cookie(name, value, options);

    return { accessToken, refreshToken };
  }

  @Get('authenticated')
  authenticated(@User() user: IUser) {
    return user;
  }

  @Public()
  @UseGuards(RefreshGuard)
  @Post('refresh')
  async refreshTokens(
    @Cookie(REFRESH_TOKEN_COOKIE_NAME) refreshToken: string,
    @ClientMetadata() clientMeta: IClientMetadata,
    @Res({ passthrough: true }) res: Response,
    @Body() loginDto: { fingerprint: string },
  ) {
    const refreshSession = await this.authUseCase.refreshTokens(
      { refreshToken },
      clientMeta,
      loginDto.fingerprint,
    );

    const { name, value, options } = this.authUseCase.getRefreshTokenCookie(
      refreshSession.refreshToken,
    );

    res.cookie(name, value, options);

    return {
      accessToken: refreshSession.accessToken,
      refreshToken: refreshSession.refreshToken,
    };
  }

  @Post('log-out')
  logout(@Cookie(REFRESH_TOKEN_COOKIE_NAME) refreshToken: string) {
    return this.authUseCase.logout({ refreshToken });
  }
}
