import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

// Email 인터페이스. 타입을 지정해줍니다.
interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private transporter; // nodemailer에서 mail을 보내기 위한 것
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAILHOST,
      port: process.env.EMAILPORT,
      auth: {
        user: process.env.EMAILADDRESS,
        pass: process.env.EMAILPASSWORD,
      },
      secure: false,
      tls: {
        rejectUnauthorized: true,
        minVersion: "TLSv1.2",
      },
    });
  }

  async sendVerificationToEmail(email: string, code: string): Promise<void> {    
    const emailOptions: EmailOptions = {
      from: `TaskTribe ${process.env.EMAILADDRESS}`, // 보내는 사람 이메일 주소
      to: email, // 회원가입한 사람의 받는 이메일 주소
      subject: '가입 인증 메일',
      html: `
           <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>TaskTribe 가입 인증 코드</title>
              <style>
                body {
                  font-family: 'Arial', sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
                  text-align: center;
                }

                .container {
                  max-width: 600px;
                  margin: 50px auto;
                  background-color: #fff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }

                h1 {
                  color: #333;
                }

                p {
                  color: #666;
                }

                .code {
                  font-size: 24px;
                  color: #3498db;
                  margin-bottom: 20px;
                }

                .btn {
                  display: inline-block;
                  padding: 10px 20px;
                  background-color: #3498db;
                  color: #fff;
                  text-decoration: none;
                  border-radius: 5px;
                }

                .btn:hover {
                  background-color: #267bb5;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>TaskTribe 가입을 환영합니다!</h1>
                <p>아래는 가입 인증 코드입니다:</p>
                <p class="code">${code}</p>
                <p>위 코드를 사용하여 계정을 인증하세요. </p>
                <p>아래 버튼을 클릭하여 인증을 완료하세요:</p>
                <a href="http://localhost:3000/user/verify?token=${code}" class="btn">계정 인증하기</a>
                <p>계정 인증이 완료되면 TaskTribe의 모든 기능을 이용하실 수 있습니다.</p>
                <p>감사합니다,<br>TaskTribe 팀</p>
              </div>
            </body>
            </html>
    `,
    };

    return await this.transporter.sendMail(emailOptions);
  }
}