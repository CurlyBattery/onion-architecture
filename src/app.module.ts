import { Module } from '@nestjs/common';
import {
  PrismaModule,
  providePrismaClientExceptionFilter,
} from 'nestjs-prisma';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';

import { ReviewModule } from './review/review.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { NestjsFingerprintModule } from 'nestjs-fingerprint';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    ReviewModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        AT_SECRET: Joi.string().required(),
        AT_EXPIRE_IN: Joi.string().required(),
      }),
    }),
    NestjsFingerprintModule.forRoot({
      params: ['headers', 'userAgent', 'ipAddress'],
      cookieOptions: {
        httpOnly: true,
      },
    }),
  ],
  providers: [providePrismaClientExceptionFilter()],
})
export class AppModule {}
