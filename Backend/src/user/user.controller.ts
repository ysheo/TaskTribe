import { Body, Controller, Post, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {UserService} from './user.service';

@Controller('user')
export class UserController {
    constructor (private readonly userService : UserService){}

    @Get()
    async getAll(@Body() dto: CreateUserDto): Promise<void> {
      console.log(dto);
    }

    @Post('/duplicate')
    async duplicateCheck(@Body() dto: any): Promise<string> {
      let result = await this.userService.duplicateCheck(dto);
      return result;
    }

    @Post()
    async createUser(@Body() user: CreateUserDto): Promise<void> {
       await this.userService.create(user);
    }
}
