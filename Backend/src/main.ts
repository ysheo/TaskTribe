import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); //전역 파이프에 validationPipe 객체 추가
  app.use(cookieParser()); //cookie를 request 객체에서 읽어오는 데 사용되는 미들웨어
  app.use(
    session({
      secret: 'very-important-secret', //세션 암호화에 사용되는 키
      resave: false, //세션을 항상 저장할지 여부
      saveUninitialized: false, //세션이 저장되기 전에는 초기화하지 않은 상태로 미리 만듬
      cookie: { maxAge: 3600000 }, //쿠키 유효기간 1시간
    }),
  );
  app.use(passport.initialize()); //세션 저장소 초기화
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
