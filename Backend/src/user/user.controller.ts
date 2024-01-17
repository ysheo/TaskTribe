import { Body, Controller, Post, Get, Query, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(@Body() dto: CreateUserDto): Promise<void> {
    console.log(dto);
  }

  // 아이디 기준으로 회원 조회
  @Get('/:userid')
  async getUser(@Param('userid') userid: string) {
    const user = await this.userService.getUser(userid);
    console.log(user);
    return user;
  }

  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<string> {
    let result = await this.userService.duplicateCheck({ email: user.email });
    if (result === '중복') return result;

    await this.userService.create(user);
    await this.userService.sendVerificationCode(user.email, user.userid);
  }

  @Get('/duplicate')
  async IDVarify(@Query('id') id: string): Promise<string> {
    let result = await this.userService.duplicateCheck({ userid: id });
    return result;
  }

  @Post('/id')
  async duplicateCheck(@Body() dto: any): Promise<string> {
    let result = await this.userService.duplicateCheck(dto);
    return result;
  }

  @Get('/verify')
  async verifyEmail(@Query('token') token: string) {
    return await this.userService.update(token);
  }
}
