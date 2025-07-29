import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';

import {
  AUTH_SERVICE_TOKEN,
  IAuthService,
} from '../../domain/ports/auth-service.port';
import { IUser } from '../../../user/domain/entities/user.entity';
import { ITokens } from '../../domain/entities/tokens.entity';
import { RegistrationDto } from '../../dto/registration.dto';
import { User, Public } from '@app/decorators';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Fingerprint, IFingerprint } from 'nestjs-fingerprint';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE_TOKEN) private readonly authService: IAuthService,
  ) {}

  @Public()
  @Post('sign-up')
  async signUp(
    @Body() registrationDto: RegistrationDto,
    @Fingerprint() fp: IFingerprint,
  ): Promise<ITokens> {
    const input: IUser = {
      username: registrationDto.username,
      password: registrationDto.password,
    };

    return this.authService.signUp(input, fp);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(@User() user: IUser): Promise<ITokens> {
    return this.authService.checkPassword(user);
  }

  @Get('authenticated')
  authenticated(@User() user: IUser) {
    return user;
  }
}
