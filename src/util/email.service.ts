import * as nodemailer from 'nodemailer';

export async function sendEmail(email: string, subject: string, message: string) {
    try {

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })

        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: subject,
            text: message
        })
    } catch (error) {
        throw error
    }
}