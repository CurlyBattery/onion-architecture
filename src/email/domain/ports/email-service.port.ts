import Mail from 'nodemailer/lib/mailer';

export const EMAIL_SERVICE_TOKEN = 'EMAIL_SERVICE_TOKEN';

export interface IEmailService {
  sendEmail(options: Mail.Options): Promise<any>;
}
