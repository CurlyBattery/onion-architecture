import { Module } from '@nestjs/common';
import { EmailModule } from '../email/email.module';
import { EmailSchedulingService } from './application/email-scheduling.service';
import { EMAIL_SCHEDULING_SERVICE_TOKEN } from './domain/ports/email-scheduling-service.port';
import { ReviewModule } from '../review/review.module';

@Module({
  imports: [EmailModule, ReviewModule],
  providers: [
    {
      provide: EMAIL_SCHEDULING_SERVICE_TOKEN,
      useClass: EmailSchedulingService,
    },
  ],
  exports: [EMAIL_SCHEDULING_SERVICE_TOKEN],
})
export class EmailSchedulingModule {}
