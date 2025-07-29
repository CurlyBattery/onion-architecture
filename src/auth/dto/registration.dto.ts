import { IsNotEmpty, IsString, MinLength, Validate } from 'class-validator';
import { IsMatchPasswords } from '@app/decorators';

export class RegistrationDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Validate(IsMatchPasswords)
  repeatPassword: string;
}
