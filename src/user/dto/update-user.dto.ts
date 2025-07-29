import { IUser } from '../domain/entities/user.entity';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto implements Partial<IUser> {
  @IsString()
  @IsOptional()
  username: string;
}
