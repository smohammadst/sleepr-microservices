import { Injectable } from '@nestjs/common';
import { UserDocument } from './users/model/users.schema';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ITokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) { }
  async login(user: UserDocument, res: Response) {
    const tokenPayload: ITokenPayload = {
      userId: user._id.toHexString()
    }
    const expires = new Date()
    expires.setSeconds(
      expires.getSeconds() + this.configService.get<number>('JWT_EXPIRATION')
    )
    const token = this.jwtService.sign(tokenPayload)
    res.cookie('Authentication', token, {
      httpOnly: true,
      expires
    })
  }

  getHello(): string {
    return 'Hello World!';
  }
}
