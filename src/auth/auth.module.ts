import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './infrastructure/http/auth.controller';
import { AuthUseCase } from './application/auth.usecase';
import { AUTH_SERVICE_TOKEN } from './domain/ports/auth-service.port';
import { UserModule } from '../user/user.module';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './infrastructure/strategies/local.strategy';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './infrastructure/guards/jwt-auth.guard';
import { RefreshSessionRepository } from './infrastructure/persistence/refresh-session.repository';
import { USER_REPOSITORY_TOKEN } from '../user/domain/ports/user-repository.port';
import { REFRESH_SESSION_REPOSITORY_TOKEN } from './domain/ports/refresh-session-repository.port';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('AT_SECRET'),
        signOptions: {
          expiresIn: config.get<string>('AT_EXPIRE_IN'),
        },
      }),
      inject: [ConfigService],
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: AUTH_SERVICE_TOKEN,
      useClass: AuthUseCase,
    },
    {
      provide: REFRESH_SESSION_REPOSITORY_TOKEN,
      useClass: RefreshSessionRepository,
    },
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
