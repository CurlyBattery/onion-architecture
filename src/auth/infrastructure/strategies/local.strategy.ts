import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import {
  AUTH_SERVICE_TOKEN,
  IAuthService,
} from '../../domain/ports/auth-service.port';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AUTH_SERVICE_TOKEN) private readonly authService: IAuthService,
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new BadRequestException('Username or password not valid');
    }
    return user;
  }
}
