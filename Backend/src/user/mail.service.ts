import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import {MailDto} from './dto/mail.dto';

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

  async sendVerificationToEmail(email: string, code: string, title : string, type : string): Promise<void> {    
  
    let test = '';
    if  (type === 'c') test =  await this.Verify(code);
    else if (type === 'i') test = await this.IDFinder(code);
    else if (type === 'p') test = await this.PasswordFinder(code);
    else return;

    const emailOptions: EmailOptions = {
      from: `TaskTribe ${process.env.EMAILADDRESS}`, // 보내는 사람 이메일 주소
      to: email, // 회원가입한 사람의 받는 이메일 주소
      subject: title,
      html: test,
    };

    return await this.transporter.sendMail(emailOptions);
  }

  async Verify(code:string) : Promise<string> {
    let dto = new MailDto();
    return `
    <!DOCTYPE html>
     <html lang="en">
     <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>TaskTribe 가입 인증 코드</title>
      ${dto.style}
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
  `
  }

  async IDFinder(code:string) : Promise<string> {
    let dto = new MailDto();
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>TaskTribe ID 인증 메일 입니다.</title>
      ${dto.style}
    </head>
    <body>
      <div class="container">
        <h1>아이디 </h1>
        <p>아래에 아이디를 전달드립니다.</p>
        <p class="code">${code}</p>
        <p>위의 아이디로 접속하시면 됩니다. </p>
        <p>감사합니다,<br>TaskTribe 팀</p>
      </div>
    </body>
    </html>
  `
  }

  async PasswordFinder(code:string) : Promise<string> {
    let dto = new MailDto();
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>TaskTribe 비밀번호 인증 메일입니다.</title>
      ${dto.style}
    </head>
    <body>
      <div class="container">
        <h1>비밀번호 인증 메일입니다.</h1>
        <p>아래는 인증코드입니다:</p>
        <p class="code">${code}</p>
        <p>위 코드를 입력하여 비밀번호를 변경하세요. </p>
        <p>감사합니다,<br>TaskTribe 팀</p>
      </div>
    </body>
    </html>
  `
  }
}
