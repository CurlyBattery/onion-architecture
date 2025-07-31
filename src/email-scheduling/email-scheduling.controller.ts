import { Body, Controller, Post } from '@nestjs/common';
import { EmailSchedulingService } from './email-scheduling.service';
import { EmailScheduleDto } from './dto/email-schedule.dto';

@Controller('email-scheduling')
export class EmailSchedulingController {
  constructor(
    private readonly emailSchedulingService: EmailSchedulingService,
  ) {}

  @Post('schedule')
  async scheduleEmail(@Body() emailSchedule: EmailScheduleDto) {
    this.emailSchedulingService.scheduleEmail(emailSchedule);
  }
}
