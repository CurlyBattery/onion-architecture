import { Controller } from '@nestjs/common';
import { UserUsecase } from '../../application/user.usecase';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserUsecase) {}
}
