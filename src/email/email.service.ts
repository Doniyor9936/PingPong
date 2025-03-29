import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor(private configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: this.configService.get<string>('EMAIL_USER'),
                pass: this.configService.get<string>('EMAIL_PASS'),
            },
        });
    }

    async sendVerificationCode(email: string, verificationCode: string): Promise<void> {
        const mailOptions = {
            from: this.configService.get<string>('EMAIL_USER'),
            to: email,
            subject: 'Email Tasdiqlash Kodingiz',
            text: `Sizning tasdiqlash kodingiz: ${verificationCode}`,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Tasdiqlash kodi ${email} manziliga yuborildi`);
        } catch (error) {
            console.error('Email yuborishda xatolik:', error);
            throw new Error('Email yuborishda xatolik yuz berdi.');
        }
    }
}
