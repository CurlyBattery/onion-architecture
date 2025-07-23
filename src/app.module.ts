import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [PrismaModule, ReviewModule],
})
export class AppModule {}
