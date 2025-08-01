import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { IsMatchPasswords } from '@app/decorators';

export class RegistrationDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Validate(IsMatchPasswords)
  repeatPassword: string;

  @IsString()
  @IsNotEmpty()
  fingerprint: string;

  @IsBoolean()
  @IsNotEmpty()
  isReceiveLetters: boolean;
}
