import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { UserDocument } from './users/model/users.schema';
import { Response } from 'express';
import { CurrentUser } from './current-user.decorator';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) response: Response) {
    await this.authService.login(user, response);
    response.send(user)
  }

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }
}
