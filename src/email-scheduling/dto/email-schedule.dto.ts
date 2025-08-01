import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmailScheduleDto {
  @IsEmail()
  recipient: string;

  @IsString()
  @IsNotEmpty()
  subject: string;
}
