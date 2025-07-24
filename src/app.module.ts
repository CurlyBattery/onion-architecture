import { Module } from '@nestjs/common';
import {
  PrismaModule,
  providePrismaClientExceptionFilter,
} from 'nestjs-prisma';

import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    ReviewModule,
  ],
  providers: [providePrismaClientExceptionFilter()],
})
export class AppModule {}
