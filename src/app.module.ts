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
import { EmailModule } from './email/email.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EmailSchedulingModule } from './email-scheduling/email-scheduling.module';

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
        RT_EXPIRE_IN: Joi.string().required(),
        EMAIL_SERVICE: Joi.string().required(),
        EMAIL_USER: Joi.string().required(),
        EMAIL_PASSWORD: Joi.string().required(),
      }),
    }),
    EmailModule,
    ScheduleModule.forRoot(),
    EmailSchedulingModule,
  ],
  providers: [providePrismaClientExceptionFilter()],
})
export class AppModule {}
