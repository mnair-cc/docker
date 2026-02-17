import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../../core/guards/localAuth.guard';
import { JwtGuard } from '../../core/guards/jwt.guard';
import { IUser } from '../users/users.interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    const user = req.user as IUser;
    const token = this.authService.getAuthToken(user);

    if (!token) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600 * 1000,
      path: '/',
      sameSite: 'lax',
    });

    this.authService.sendLoginEvent(user);

    return res.status(200).json(user);
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('token', {
      path: '/',
    });
    return res.status(200).json({ message: 'Logout successful' });
  }

  @Get('me')
  @UseGuards(JwtGuard)
  async getProfile(@Req() req: Request, @Res() res: Response) {
    const user = req.user;
    return res.status(200).json(user);
  }

  @Post('register')
  async register(@Body() user: IUser) {
    return this.authService.register(user);
  }
}
