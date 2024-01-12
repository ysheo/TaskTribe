import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard, LocalAuthGuard } from './auth.guard';

@Controller('api/auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('test-guard')
  testGuardWithSession(@Request() req) {
    return req.user;
  }
}
