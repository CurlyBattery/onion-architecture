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
import { User, Public, ClientMetadata, IClientMetadata } from '@app/decorators';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE_TOKEN) private readonly authService: IAuthService,
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
    };
    const { accessToken, refreshToken } = await this.authService.signUp(
      input,
      clientMeta,
      res,
      registrationDto.fingerprint,
    );

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
    return this.authService.checkPassword(
      user,
      clientMeta,
      res,
      loginDto.fingerprint,
    );
  }

  @Get('authenticated')
  authenticated(@User() user: IUser) {
    return user;
  }
}
