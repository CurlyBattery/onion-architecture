import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './infrastructure/http/auth.controller';
import { AuthUseCase } from './application/auth.usecase';
import { AUTH_SERVICE_TOKEN } from './domain/ports/auth-service.port';
import { UserModule } from '../user/user.module';
import { ConfigService } from '@nestjs/config';

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
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: AUTH_SERVICE_TOKEN,
      useClass: AuthUseCase,
    },
  ],
})
export class AuthModule {}
