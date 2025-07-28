import { Module } from '@nestjs/common';
import { UserController } from './infrastructure/http/user.controller';
import { UserUseCase } from './application/user-use-case.service';
import { USER_SERVICE_TOKEN } from './domain/ports/user-service.port';
import { USER_REPOSITORY_TOKEN } from './domain/ports/user-repository.port';
import { UserRepository } from './infrastructure/persistence/user.repository';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: USER_SERVICE_TOKEN,
      useClass: UserUseCase,
    },
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
