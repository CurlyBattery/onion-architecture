import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ReviewModule } from './review/review.module';
import { APP_FILTER } from '@nestjs/core';
import { PrismaExceptionFilter } from '@app/filters';

@Module({
  imports: [PrismaModule, ReviewModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: PrismaExceptionFilter,
    },
  ],
})
export class AppModule {}
