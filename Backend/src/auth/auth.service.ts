import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(userid: string, password: string) {
    const user = await this.userService.getUser(userid);

    if (!user) {
      return null;
    }
    const { password: hashedPassword, ...userInfo } = user; //password 추출
    if (bcrypt.compareSync(password, hashedPassword)) {
      return userInfo;
    }
    return null;
  }
}
