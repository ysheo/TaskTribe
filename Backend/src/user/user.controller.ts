import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {UserService} from './user.service';

@Controller('user')
export class UserController {
    constructor (private readonly userService : UserService){}

    @Get()
    async getAll(@Body() dto: CreateUserDto): Promise<void> {
      console.log(dto);
    }

    @Post()
    async createUser(@Body() user: CreateUserDto) {
      const result = await  this.userService.create(user);
    }

    @Post('/email')
    async emailCheck(@Body() user: any): Promise<string> {      
      let result = await this.userService.duplicateCheck({email:user.email});
      if (result ==='중복') return result;
      await this.userService.sendVerificationCode(user.email); 
    }

    @Post('/duplicate')
    async duplicateCheck(@Body() dto: any): Promise<string> {
      //console.log(dto);
      let result = await this.userService.duplicateCheck(dto);
      return result;
    }

    @Get('/verify')
      async verifyEmail( @Query('token') token: string) {
      return await this.userService.update(token);
   }
  

}
