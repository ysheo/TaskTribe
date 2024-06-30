import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: any): Promise<boolean> {
    //context에서 req 정보 가져옴
    const request = context.switchToHttp().getRequest();
    //쿠키가 있으면 인증된 것
    if (request.cookies['login']) {
      return true;
    }
    //쿠키가 없으면 req의 body 정보 확인
    if (!request.body.userid || !request.body.password) {
      return false;
    }

    const user = await this.authService.validateUser(
      request.body.userid,
      request.body.password,
    );

    if (!user) {
      return false;
    }
    //유저 정보가 있으면 req에 user 정보를 추가하고 true 반환
    request.user = user;
    return true;
  }
}

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: any): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;
    //로컬
    const request = context.switchToHttp().getRequest();
    await super.logIn(request); //세션 저장
    return result;
  }
}

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return request.isAuthenticated(); //세션에서 정보를 읽어서 인증 확인
  }
}
