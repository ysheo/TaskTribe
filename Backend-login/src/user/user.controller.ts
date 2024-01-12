import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  createUser(@Body() user: CreateUserDto) {
    this.userService.createUser(user);
  }

  @Get('/:userid')
  async gitUser(@Param('userid') userid: string) {
    const user = await this.userService.getUser(userid);
    console.log(user);
    return user;
  }
}
