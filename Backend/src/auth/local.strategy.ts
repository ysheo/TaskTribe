import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  //passportStrategy 믹스인: 클래스의 일부부만 확장하고 싶을 때 사용
  constructor(private authService: AuthService) {
    super({ usernameField: 'userid' });
  }

  async validate(userid: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(userid, password);
    if (!user) {
      return null; //유저 정보가 없으면 401 에러 발생
    }
    return user; //있으면 user 정보 반환
  }
}
