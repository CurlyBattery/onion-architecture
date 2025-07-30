import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { RegistrationDto } from '../../../src/auth/dto/registration.dto';

@ValidatorConstraint({ async: false })
export class IsMatchPasswords implements ValidatorConstraintInterface {
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    const obj = validationArguments.object as RegistrationDto;
    return value === obj.password;
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return 'Passwords do not match';
  }
}
