import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public sendMail(to: string): void {
    this.mailerService
      .sendMail({
        to: to,
        from: 'noreply@mailinator.com',
        subject: 'Testing Nest Mailermodule with template ✔',
        template: 'welcome', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
        context: {
          // Data to be sent to template engine.
          code: 'cf1a3f828287',
          username: 'john doe',
        },
      })
      .then(() => {})
      .catch(() => {});
  }

  public sendVerificationEmail(to: string, token: string, type: string): void {
    this.mailerService
      .sendMail({
        to: to,
        from: 'noreply@mailinator.com',
        subject:
          type === 'internal'
            ? 'Registration: Alumni Verification'
            : 'Registration: Email Verification',
        template: 'AlumniUniEmail', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
        context: {
          // Data to be sent to template engine.
          token,
          username: 'Alumni Name',
          domain: process.env.DOMAIN || 'https://alumni.dsu.edu.pk',
          link:
            type === 'internal'
              ? '/registrations/validateUniEmail'
              : '/registrations/validateAccountEmail',
        },
      })
      .then(() => {})
      .catch(() => {});
  }
}

// <h1>Hello {{code}}</h1>
// <p>This is my email template - Saad {{username}}</p>
