import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from './application/email.service';
import { EMAIL_SERVICE_TOKEN } from './domain/ports/email-service.port';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: EMAIL_SERVICE_TOKEN,
      useClass: EmailService,
    },
  ],
  exports: [EMAIL_SERVICE_TOKEN],
})
export class EmailModule {}
