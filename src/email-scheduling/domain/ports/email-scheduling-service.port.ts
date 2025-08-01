import { EmailScheduleDto } from '../../dto/email-schedule.dto';

export const EMAIL_SCHEDULING_SERVICE_TOKEN = 'EMAIL_SCHEDULING_SERVICE_TOKEN';

export interface IEmailSchedulingService {
  scheduleEmail(emailSchedule: EmailScheduleDto): Promise<void>;
}
