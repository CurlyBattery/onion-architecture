import { Module } from '@nestjs/common';
import {
  PrismaModule,
  providePrismaClientExceptionFilter,
} from 'nestjs-prisma';

import { ReviewModule } from './review/review.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    ReviewModule,
    UserModule,
    AuthModule,
  ],
  providers: [providePrismaClientExceptionFilter()],
})
export class AppModule {}
