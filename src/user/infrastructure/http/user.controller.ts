import { Body, Controller, Inject, Param, Patch } from '@nestjs/common';
import {
  IUserService,
  USER_SERVICE_TOKEN,
} from '../../domain/ports/user-service.port';
import { FindOneParams } from '@app/types';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { IUser } from '../../domain/entities/user.entity';

@Controller('user')
export class UserController {
  constructor(
    @Inject(USER_SERVICE_TOKEN) private readonly userService: IUserService,
  ) {}

  @Patch(':id')
  updateUser(
    @Param() { id }: FindOneParams,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const update: Partial<IUser> = {
      username: updateUserDto.username,
    };

    return this.userService.updateUser(id, update);
  }
}
