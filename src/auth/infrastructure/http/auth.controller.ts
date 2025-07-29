import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  AUTH_SERVICE_TOKEN,
  IAuthService,
} from '../../domain/ports/auth-service.port';
import { IUser } from '../../../user/domain/entities/user.entity';
import { ITokens } from '../../domain/entities/tokens.entity';
import { RegistrationDto } from '../../dto/registration.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE_TOKEN) private readonly authService: IAuthService,
  ) {}

  @Post('sign-up')
  async signUp(@Body() registrationDto: RegistrationDto): Promise<ITokens> {
    const input: IUser = {
      username: registrationDto.username,
      password: registrationDto.password,
    };

    return this.authService.signUp(input);
  }
}
