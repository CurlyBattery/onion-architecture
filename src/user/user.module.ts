import { Module } from '@nestjs/common';
import { UserController } from './infrastructure/http/user.controller';
import { UserUsecase } from './application/user.usecase';

@Module({
  controllers: [UserController],
  providers: [UserUsecase],
})
export class UserModule {}
