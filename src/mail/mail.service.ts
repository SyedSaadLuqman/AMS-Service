import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { google } from 'googleapis';
import { Options } from 'nodemailer/lib/smtp-transport';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class MailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  // private async setTransport() {
  //   const OAuth2 = google.auth.OAuth2;
  //   const oauth2Client = new OAuth2(
  //     this.configService.get('GMAIL_CLIENT_ID'),
  //     this.configService.get('GMAIL_CLIENT_SECRET'),
  //     'https://developers.google.com/oauthplayground',
  //   );

  //   oauth2Client.setCredentials({
  //     refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  //   });

  //   const accessToken: string = await new Promise((resolve, reject) => {
  //     oauth2Client.getAccessToken((err, token) => {
  //       if (err) {
  //         reject('Failed to create access token');
  //       }
  //       resolve(token);
  //     });
  //   });

  //   const config: Options = {
  //     service: 'gmail',
  //     auth: {
  //       type: 'OAuth2',
  //       user: this.configService.get('GMAIL_EMAIL'),
  //       clientId: this.configService.get('GMAIL_CLIENT_ID'),
  //       clientSecret: this.configService.get('GMAIL_CLIENT_SECRET'),
  //       accessToken,
  //     },
  //   };
  //   this.mailerService.addTransporter('gmail', config);
  // }

  public async sendMail(to: string) {
    //await this.setTransport();
    const info = await this.mailerService.sendMail({
      //transporterName: 'gmail',
      to: to,
      from: 'no-reply@dsu.edu.pk',
      subject: 'Testing Nest Mailermodule with template ✔',
      template: 'welcome', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
      context: {
        // Data to be sent to template engine.
        code: 'cf1a3f828287',
        username: 'john doe',
      },
    });

    console.log(info);
  }

  public sendVerificationEmail(to: string, token: string, type: string): void {
    this.mailerService
      .sendMail({
        to: to,
        from: 'no-reply@dsu.edu.pk',
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
