import { Body, Controller, Post, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {UserService} from './user.service';

@Controller('api/user')
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
      if (result.length > 0) return result;

      result = await this.userService.duplicateEmailCheck({email:user.email});
      if (result.length > 0) return result;

      await this.userService.sendVerificationCode(user.email,'c','가입을 환영합니다.'); 
    }

    @Post('/find')
    async find(@Body() condition: any): Promise<string> {
      const conditionType = condition.type;
      delete condition.type;
      if (conditionType=='CODE') 
      {
        let cnt = await this.userService.codeCheck(condition);
        if ( cnt > 0) return '';
        else throw new HttpException('인증오류', HttpStatus.NOT_ACCEPTABLE);;
       
      }
    
      const user = await this.userService.findIdPassword(condition);

      if (conditionType=='ID') return user['userid'].replace(/(?<!^).(?!$)/g, "*");
      else if (conditionType=='PASSWORD')this.userService.sendVerificationCode(user.email,'p','비밀번호 인증 메일입니다.'); 
      else if (conditionType=='IDALL')this.userService.sendVerificationCode(user.email,'i','아이디 찾기 메일입니다.', user.userid); 

      return '';
    }

    @Post('/change')
    async Change(@Body() condition: any): Promise<string> {
      this.userService.changePassword(condition["email"], condition["password"]); 
      return '';
    }

    @Post('/duplicate')
    async duplicateCheck(@Body() dto: any): Promise<string> {
      //console.log(dto);
      let result = await this.userService.duplicateCheck(dto);
      return result;
    }

    @Get('/verify')
      async verifyEmail( @Query('token') token: string) {
      return await this.userService.emailVerify(token);
   }
  

}
