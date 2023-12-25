import nodemailer from 'nodemailer';

class Email {
    to: string;
    from: string;
    data: any;
    constructor(email: string, data: any) {
        this.to = email;
        this.data = data;
        this.from = `Spoty <bao.nguyen2k1qn@gmail.com>`;
    }

    newTransport() {
        return nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'bao.nguyen2k1qn@gmail.com',
                pass: 'gfkjxllfykdxvyeo',
            },
        });
    }

    // Send the actual email
    async send(content: string, subject: string) {
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html: content,
            text: content,
        };

        // 3) Create a transport and send email
        await this.newTransport().sendMail(mailOptions);
    }

    async sendWelcome() {
        await this.send('welcome', 'Welcome to the Natours Family!');
    }

    async sendPasswordReset() {
        const content_passwordReset = `
            <div style="padding: 10px; background-color: white;">
                <h4 style="color: #0085ff">Đây là mail đặt lại mật khẩu của Spoty</h4>
                <span style="color: black">OTP đặt lại mật khẩu: <strong>${this.data}</strong></span>
            </div>
    `;
        await this.send(content_passwordReset, 'Your password reset token (valid for only 10 minutes)');
    }
}
export default Email;
