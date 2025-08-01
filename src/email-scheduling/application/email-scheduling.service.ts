import { Inject, Injectable } from '@nestjs/common';
import { CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from '@nestjs/schedule/node_modules/cron';
import { EmailService } from '../../email/application/email.service';
import { EmailScheduleDto } from '../dto/email-schedule.dto';
import {
  EMAIL_SERVICE_TOKEN,
  IEmailService,
} from '../../email/domain/ports/email-service.port';
import { IEmailSchedulingService } from '../domain/ports/email-scheduling-service.port';
import {
  IReviewService,
  REVIEW_SERVICE_TOKEN,
} from '../../review/domain/ports/review-service.port';
import { text } from 'express';

@Injectable()
export class EmailSchedulingService implements IEmailSchedulingService {
  constructor(
    @Inject(EMAIL_SERVICE_TOKEN) private readonly emailService: IEmailService,
    private readonly schedulerRegistry: SchedulerRegistry,
    @Inject(REVIEW_SERVICE_TOKEN)
    private readonly reviewUseCase: IReviewService,
  ) {}

  async scheduleEmail(emailSchedule: EmailScheduleDto): Promise<void> {
    const popularReviews = await this.reviewUseCase.getPopularRecords();
    const content = popularReviews
      .map((review) => `- ${review.title}`)
      .join('\n');

    const job = new CronJob(CronExpression.EVERY_MINUTE, async () => {
      await this.emailService.sendEmail({
        to: emailSchedule.recipient,
        subject: emailSchedule.subject,
        text: `Popular Reviews:\n${content}`,
      });
    });

    this.schedulerRegistry.addCronJob(
      `${Date.now()}-${emailSchedule.subject}`,
      job,
    );
    job.start();
  }
}
