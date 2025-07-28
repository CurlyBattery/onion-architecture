import { Controller, Inject } from '@nestjs/common';
import { UserUseCase } from '../../application/user-use-case.service';
import { USER_SERVICE_TOKEN } from '../../domain/ports/user-service.port';

@Controller('user')
export class UserController {
  constructor(
    @Inject(USER_SERVICE_TOKEN) private readonly userService: UserUseCase,
  ) {}
}
