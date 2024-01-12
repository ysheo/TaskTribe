import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async register(userDto: CreateUserDto) {
    const user = await this.userService.getUser(userDto.userid);
    if (user) {
      throw new HttpException(
        '이미 아이디가 존재합니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const encryptedPassword = bcrypt.hashSync(userDto.password, 10); //10번 암호화 진행

    try {
      const user = await this.userService.createUser({
        ...userDto,
        password: encryptedPassword,
      });
      user.password = undefined; //회원 가입 후 반환하는 값을 삭제
      return user;
    } catch (error) {
      throw new HttpException('서버 에러', 500);
    }
  }

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
