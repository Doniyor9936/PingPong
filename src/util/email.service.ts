import * as nodemailer from 'nodemailer';

export async function sendEmail(email: string, subject: string, message: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465, // faqat 465 bo‘lsa SSL yoqiladi
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      connectionTimeout: 10000, // 10s timeout
    });

    // ixtiyoriy, lekin foydali — SMTP ulanishini tekshiradi
    await transporter.verify();

    await transporter.sendMail({
      from: `"PingPong" <${process.env.SMTP_USER}>`,
      to: email,
      subject,
      text: message,
    });

    console.log(`✅ Email sent successfully to ${email}`);
  } catch (error) {
    console.error('❌ Email sending error:', error.message);
    // server to‘xtamasligi uchun foydalanuvchiga xatolikni yumshoq ko‘rsatish
    throw new Error(`Email sending failed: ${error.message}`);
  }
}
